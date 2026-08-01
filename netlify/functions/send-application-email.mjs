import path from 'node:path';
import busboy from 'busboy';
import nodemailer from 'nodemailer';

const SMTP_HOST = 'smtp.hostinger.com';
const SMTP_PORT = 465;
const SMTP_SECURE = true;
const SMTP_USER = 'contact@astrax.dev';
const SMTP_FROM_EMAIL = 'noreply@astrax.dev';
const SMTP_FROM_NAME = 'AstraX Mailer';
const DEFAULT_RECIPIENT_EMAIL = 'arindamc.ax@gmail.com';
// #genai — per-file upload ceilings; there is no combined-size cap.
const MAX_SONG_BYTES = 10 * 1024 * 1024;
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const FILE_LIMITS = {
  idProof: {label: 'ID proof', maxBytes: MAX_IMAGE_BYTES},
  passportPhoto: {label: 'Passport size photo', maxBytes: MAX_IMAGE_BYTES},
  songFile: {label: 'Song recording', maxBytes: MAX_SONG_BYTES},
};
const MAX_FILE_BYTES = Math.max(
  ...Object.values(FILE_LIMITS).map(({maxBytes}) => maxBytes),
);
const requiredEnvVars = ['SMTP_PASS'];

const jsonResponse = (statusCode, body) => ({
  statusCode,
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify(body),
});

function sanitize(value) {
  return String(value ?? '').trim();
}

function escapeHtml(value) {
  return sanitize(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function parseMultipart(event) {
  return new Promise((resolve, reject) => {
    const contentType = event.headers['content-type'] ?? event.headers['Content-Type'];
    if (!contentType?.includes('multipart/form-data')) {
      reject(new Error('The request must use multipart form data.'));
      return;
    }

    const fields = {};
    const files = [];
    let oversizedMessage = '';
    const parser = busboy({
      headers: {'content-type': contentType},
      limits: {
        fields: 20,
        files: 3,
        fileSize: MAX_FILE_BYTES,
      },
    });

    parser.on('field', (name, value) => {
      fields[name] = sanitize(value);
    });

    parser.on('file', (fieldName, stream, info) => {
      const chunks = [];
      let fileBytes = 0;
      const limit = FILE_LIMITS[fieldName];

      const flagOversized = () => {
        if (!limit || oversizedMessage) return;
        oversizedMessage = `${limit.label} must be ${Math.round(limit.maxBytes / 1024 / 1024)} MB or less.`;
      };

      stream.on('data', (chunk) => {
        fileBytes += chunk.length;
        if (limit && fileBytes > limit.maxBytes) {
          flagOversized();
        }
        chunks.push(chunk);
      });
      stream.on('limit', flagOversized);
      stream.on('end', () => {
        if (info.filename && fileBytes > 0) {
          files.push({
            fieldName,
            filename: path.basename(info.filename),
            contentType: info.mimeType || 'application/octet-stream',
            content: Buffer.concat(chunks),
          });
        }
      });
    });

    parser.on('error', reject);
    parser.on('finish', () => {
      if (oversizedMessage) {
        reject(new Error(oversizedMessage));
        return;
      }
      resolve({fields, files});
    });

    parser.end(
      Buffer.from(event.body ?? '', event.isBase64Encoded ? 'base64' : 'utf8'),
    );
  });
}

function buildRow(label, value) {
  return `<tr><td style="padding:8px 12px 8px 0;font-weight:600;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:8px 0;color:#444;">${escapeHtml(value || '-')}</td></tr>`;
}

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, {success: false, message: 'Method not allowed.'});
  }

  const missingEnvVars = requiredEnvVars.filter((key) => !process.env[key]);
  if (missingEnvVars.length > 0) {
    console.error('Missing SMTP env vars:', missingEnvVars.join(', '));
    return jsonResponse(500, {
      success: false,
      message: 'Email service is not configured.',
    });
  }

  let submission;
  try {
    submission = await parseMultipart(event);
  } catch (error) {
    return jsonResponse(400, {
      success: false,
      message:
        error instanceof Error ? error.message : 'Invalid application submission.',
    });
  }

  const {fields, files} = submission;
  const requiredFields = [
    'fullName',
    'dob',
    'phone',
    'email',
    'address',
    'pincode',
    'auditionLocation',
    'tnc',
  ];
  const missingFields = requiredFields.filter((field) => !fields[field]);
  const requiredFiles = ['idProof', 'passportPhoto', 'songFile'];
  const missingFiles = requiredFiles.filter(
    (fieldName) => !files.some((file) => file.fieldName === fieldName),
  );

  if (missingFields.length > 0 || missingFiles.length > 0) {
    return jsonResponse(400, {
      success: false,
      message: 'Please complete every required field and upload all three files.',
    });
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE,
    auth: {
      user: SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  const recipient =
    process.env.APPLICATION_RECIPIENT_EMAIL || DEFAULT_RECIPIENT_EMAIL;
  const details = [
    ['Name', fields.fullName],
    ['Date of birth', fields.dob],
    ['Phone', fields.phone],
    ['Email', fields.email],
    ['Address', fields.address],
    ['Pincode', fields.pincode],
    ['Audition location', fields.auditionLocation],
  ];

  try {
    await transporter.sendMail({
      from: `"${SMTP_FROM_NAME}" <${SMTP_FROM_EMAIL}>`,
      to: recipient,
      replyTo: fields.email,
      subject: `PC Foundation application from ${fields.fullName}`,
      text: details.map(([label, value]) => `${label}: ${value}`).join('\n'),
      html: `
        <div style="font-family:Arial,sans-serif;max-width:680px;margin:0 auto;padding:24px;">
          <h2 style="margin:0 0 16px;color:#7d2637;">New PC Foundation application</h2>
          <p style="margin:0 0 20px;color:#555;">A new online application was received.</p>
          <table style="width:100%;border-collapse:collapse;">
            ${details.map(([label, value]) => buildRow(label, value)).join('')}
          </table>
        </div>
      `,
      attachments: files.map(({filename, contentType, content}) => ({
        filename,
        contentType,
        content,
      })),
    });

    return jsonResponse(200, {
      success: true,
      message: 'Thank you. Your application has been submitted successfully.',
    });
  } catch (error) {
    console.error('Failed to send application email:', error);
    return jsonResponse(500, {
      success: false,
      message: 'We could not submit your application right now. Please try again.',
    });
  }
}
