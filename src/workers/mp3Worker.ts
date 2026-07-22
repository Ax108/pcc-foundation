import lamejs from '@breezystack/lamejs';

interface WorkerInput {
  arrayBuffer: ArrayBuffer;
  sampleRate: number;
  numberOfChannels: number;
  channelData: Float32Array[];
}

interface ProgressMessage {
  type: 'progress';
  percent: number;
}

interface DoneMessage {
  type: 'done';
  mp3Blob: Blob;
}

interface ErrorMessage {
  type: 'error';
  message: string;
}

type WorkerMessage = ProgressMessage | DoneMessage | ErrorMessage;

/** Convert Float32 PCM [-1, 1] to Int16 [-32768, 32767] */
function floatTo16Bit(float32Array: Float32Array): Int16Array {
  const int16 = new Int16Array(float32Array.length);
  for (let i = 0; i < float32Array.length; i++) {
    const clamped = Math.max(-1, Math.min(1, float32Array[i]));
    int16[i] = clamped < 0 ? clamped * 32768 : clamped * 32767;
  }
  return int16;
}

self.onmessage = (e: MessageEvent<WorkerInput>) => {
  try {
    const { sampleRate, numberOfChannels, channelData } = e.data;

    const channels = Math.min(numberOfChannels, 2) as 1 | 2;
    const bitRate = 128; // medium quality
    const blockSize = 1152; // optimal MPEG frame size for lamejs

    const encoder = new lamejs.Mp3Encoder(channels, sampleRate, bitRate);
    const mp3Chunks: Uint8Array[] = [];

    const totalSamples = channelData[0].length;
    let processed = 0;
    let lastReportedPercent = -1;

    for (let offset = 0; offset < totalSamples; offset += blockSize) {
      const end = Math.min(offset + blockSize, totalSamples);

      const leftChunk = floatTo16Bit(channelData[0].subarray(offset, end));
      const rightChunk =
        channels === 2
          ? floatTo16Bit(channelData[1].subarray(offset, end))
          : leftChunk;

      const encoded =
        channels === 2
          ? encoder.encodeBuffer(leftChunk, rightChunk)
          : encoder.encodeBuffer(leftChunk);

      if (encoded.length > 0) mp3Chunks.push(encoded as unknown as Uint8Array);

      processed += end - offset;
      const percent = Math.floor((processed / totalSamples) * 100);

      // Post progress every 5% to avoid message flooding
      if (percent !== lastReportedPercent && percent % 5 === 0) {
        lastReportedPercent = percent;
        const msg: ProgressMessage = { type: 'progress', percent };
        self.postMessage(msg);
      }
    }

    const flushed = encoder.flush();
    if (flushed.length > 0) mp3Chunks.push(flushed as unknown as Uint8Array);

    const mp3Blob = new Blob(mp3Chunks as unknown as BlobPart[], { type: 'audio/mpeg' });

    const doneMsg: DoneMessage = { type: 'done', mp3Blob };
    self.postMessage(doneMsg);
  } catch (err) {
    const errMsg: ErrorMessage = {
      type: 'error',
      message: err instanceof Error ? err.message : 'Unknown encoding error',
    };
    self.postMessage(errMsg);
  }
};

export type { WorkerMessage, WorkerInput };
