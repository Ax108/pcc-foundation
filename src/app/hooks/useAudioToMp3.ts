import {useCallback, useEffect, useRef, useState} from 'react';
// Vite ?worker import — handles TS transpilation + CJS deps correctly in both dev and build
import Mp3Worker from '../../workers/mp3Worker.ts?worker';

const MAX_SOURCE_BYTES = 20 * 1024 * 1024; // 20 MB
/** #genai — Hard ceiling for the converted song that is emailed via Netlify. */
export const MAX_SONG_OUTPUT_BYTES = 3 * 1024 * 1024;
/** Descending bitrates tried until the encoded MP3 fits under MAX_SONG_OUTPUT_BYTES. */
const BITRATE_STEPS = [128, 96, 64, 48, 32] as const;

export type ConversionStatus = 'idle' | 'converting' | 'done' | 'error';

export interface UseAudioToMp3Result {
  convert: (file: File) => void;
  progress: number;
  status: ConversionStatus;
  mp3File: File | null;
  mp3ObjectUrl: string | null;
  error: string | null;
  reset: () => void;
}

function formatMb(bytes: number) {
  const mb = bytes / 1024 / 1024;
  return `${Number.isInteger(mb) ? mb : mb.toFixed(1)} MB`;
}

function cloneChannels(channelData: Float32Array[]): Float32Array[] {
  return channelData.map((channel) => channel.slice());
}

function encodeMp3(
  workerFactory: () => Worker,
  sampleRate: number,
  channelData: Float32Array[],
  bitRate: number,
  onProgress: (percent: number) => void,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const worker = workerFactory();
    // Clone before transfer so the caller can retry at a lower bitrate.
    const channels = cloneChannels(channelData);
    const transferable = channels.map((ch) => ch.buffer);

    worker.onmessage = (e: MessageEvent) => {
      const msg = e.data as {
        type: 'progress' | 'done' | 'error';
        percent?: number;
        mp3Blob?: Blob;
        message?: string;
      };

      if (msg.type === 'progress' && msg.percent !== undefined) {
        onProgress(msg.percent);
      } else if (msg.type === 'done' && msg.mp3Blob) {
        worker.terminate();
        resolve(msg.mp3Blob);
      } else if (msg.type === 'error') {
        worker.terminate();
        reject(new Error(msg.message ?? 'Encoding failed.'));
      }
    };

    worker.onerror = (err) => {
      worker.terminate();
      reject(new Error(err.message ?? 'Worker crashed during encoding.'));
    };

    worker.postMessage(
      {
        sampleRate,
        numberOfChannels: Math.min(channels.length, 2),
        channelData: channels,
        bitRate,
      },
      transferable,
    );
  });
}

export function useAudioToMp3(): UseAudioToMp3Result {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<ConversionStatus>('idle');
  const [mp3File, setMp3File] = useState<File | null>(null);
  const [mp3ObjectUrl, setMp3ObjectUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const cancelledRef = useRef(false);
  const objectUrlRef = useRef<string | null>(null);

  const revokeUrl = useCallback(() => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    cancelledRef.current = true;
    revokeUrl();
    setProgress(0);
    setStatus('idle');
    setMp3File(null);
    setMp3ObjectUrl(null);
    setError(null);
  }, [revokeUrl]);

  useEffect(() => {
    return () => {
      cancelledRef.current = true;
      revokeUrl();
    };
  }, [revokeUrl]);

  const finishWithFile = useCallback(
    (mp3: File) => {
      if (cancelledRef.current) return;
      const url = URL.createObjectURL(mp3);
      objectUrlRef.current = url;
      setMp3File(mp3);
      setMp3ObjectUrl(url);
      setProgress(100);
      setStatus('done');
    },
    [],
  );

  const convert = useCallback(
    async (file: File) => {
      cancelledRef.current = false;
      revokeUrl();
      setProgress(0);
      setMp3File(null);
      setMp3ObjectUrl(null);
      setError(null);

      if (file.size > MAX_SOURCE_BYTES) {
        setStatus('error');
        setError(
          `File is too large (${formatMb(file.size)}). Maximum source size is ${formatMb(MAX_SOURCE_BYTES)}.`,
        );
        return;
      }

      const isMp3 =
        file.type === 'audio/mpeg' ||
        file.type === 'audio/mp3' ||
        file.name.toLowerCase().endsWith('.mp3');

      // Already MP3 and under the budget — no re-encode needed.
      if (isMp3 && file.size <= MAX_SONG_OUTPUT_BYTES) {
        finishWithFile(file);
        return;
      }

      setStatus('converting');
      setProgress(0);

      let audioBuffer: AudioBuffer;
      try {
        const arrayBuffer = await file.arrayBuffer();
        const audioCtx = new AudioContext();
        audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
        await audioCtx.close();
      } catch {
        if (cancelledRef.current) return;
        setStatus('error');
        setError(
          'Could not decode this audio file. The format may not be supported by your browser.',
        );
        return;
      }

      if (cancelledRef.current) return;

      const channelData: Float32Array[] = [];
      for (let c = 0; c < Math.min(audioBuffer.numberOfChannels, 2); c++) {
        channelData.push(audioBuffer.getChannelData(c));
      }

      const durationSec = audioBuffer.duration;
      const baseName = file.name.replace(/\.[^.]+$/, '') || 'song';
      let bestBlob: Blob | null = null;

      for (let i = 0; i < BITRATE_STEPS.length; i++) {
        if (cancelledRef.current) return;
        const bitRate = BITRATE_STEPS[i];
        const passStart = (i / BITRATE_STEPS.length) * 100;

        try {
          const blob = await encodeMp3(
            () => new Mp3Worker(),
            audioBuffer.sampleRate,
            channelData,
            bitRate,
            (percent) => {
              if (cancelledRef.current) return;
              const scaled =
                passStart + (percent / BITRATE_STEPS.length);
              setProgress(Math.min(99, Math.floor(scaled)));
            },
          );

          if (cancelledRef.current) return;
          if (!bestBlob || blob.size < bestBlob.size) bestBlob = blob;

          if (blob.size <= MAX_SONG_OUTPUT_BYTES) {
            finishWithFile(
              new File([blob], `${baseName}.mp3`, {type: 'audio/mpeg'}),
            );
            return;
          }
        } catch (err) {
          if (cancelledRef.current) return;
          setStatus('error');
          setError(
            err instanceof Error ? err.message : 'Encoding failed.',
          );
          return;
        }
      }

      if (cancelledRef.current) return;

      // Still over budget after the lowest bitrate — reject at upload time.
      const minutes = Math.max(1, Math.round(durationSec / 60));
      setStatus('error');
      setError(
        `This recording is too long (~${minutes} min) to fit under ${formatMb(MAX_SONG_OUTPUT_BYTES)} even after compression${
          bestBlob ? ` (smallest encode ${formatMb(bestBlob.size)})` : ''
        }. Please upload a shorter song.`,
      );
    },
    [finishWithFile, revokeUrl],
  );

  return {convert, progress, status, mp3File, mp3ObjectUrl, error, reset};
}
