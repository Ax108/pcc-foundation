// #genai — Shrinks applicant photos in the browser so the whole submission
// stays under Netlify's buffered request cap.

const MAX_EDGE_PX = 1600;
const QUALITY_STEPS = [0.82, 0.7, 0.6, 0.5, 0.4];

function toBlob(canvas: HTMLCanvasElement, quality: number): Promise<Blob | null> {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), 'image/jpeg', quality);
  });
}

function withJpgExtension(name: string): string {
  const base = name.replace(/\.[^./\\]+$/, '');
  return `${base || 'upload'}.jpg`;
}

/**
 * Re-encode an image as a smaller JPEG, stopping at the first quality step that
 * fits `maxBytes`. Non-images (a PDF scan, say) and unreadable files are
 * returned untouched so the caller's size check can reject them.
 */
export async function compressImage(file: File, maxBytes: number): Promise<File> {
  if (!file.type.startsWith('image/') || file.size <= maxBytes) return file;

  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    return file;
  }

  const scale = Math.min(1, MAX_EDGE_PX / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));

  const context = canvas.getContext('2d');
  if (!context) {
    bitmap.close();
    return file;
  }

  // JPEG has no alpha channel, so transparent source pixels would render black.
  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  let smallest: Blob | null = null;
  for (const quality of QUALITY_STEPS) {
    const blob = await toBlob(canvas, quality);
    if (!blob) continue;
    if (!smallest || blob.size < smallest.size) smallest = blob;
    if (blob.size <= maxBytes) break;
  }

  if (!smallest || smallest.size >= file.size) return file;
  return new File([smallest], withJpgExtension(file.name), {type: 'image/jpeg'});
}
