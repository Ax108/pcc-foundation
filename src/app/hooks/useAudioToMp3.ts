import {useCallback, useEffect, useRef, useState} from 'react';
// Vite ?worker import — handles TS transpilation + CJS deps correctly in both dev and build
import Mp3Worker from '../../workers/mp3Worker.ts?worker';

const MAX_FILE_SIZE_BYTES = 20 * 1024 * 1024; // 20 MB

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

export function useAudioToMp3(): UseAudioToMp3Result {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<ConversionStatus>('idle');
  const [mp3File, setMp3File] = useState<File | null>(null);
  const [mp3ObjectUrl, setMp3ObjectUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const workerRef = useRef<Worker | null>(null);
  const objectUrlRef = useRef<string | null>(null);

  // Revoke any previously created object URL to avoid memory leaks
  const revokeUrl = useCallback(() => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
  }, []);

  // Terminate worker on unmount
  useEffect(() => {
    return () => {
      workerRef.current?.terminate();
      revokeUrl();
    };
  }, [revokeUrl]);

  const reset = useCallback(() => {
    workerRef.current?.terminate();
    workerRef.current = null;
    revokeUrl();
    setProgress(0);
    setStatus('idle');
    setMp3File(null);
    setMp3ObjectUrl(null);
    setError(null);
  }, [revokeUrl]);

  const convert = useCallback(
    async (file: File) => {
      reset();

      // ── 1. Validate size ──────────────────────────────────────────────────
      if (file.size > MAX_FILE_SIZE_BYTES) {
        setStatus('error');
        setError(
          `File is too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Maximum allowed size is 20 MB.`,
        );
        return;
      }

      // ── 2. Fast path: already MP3 ─────────────────────────────────────────
      const isMp3 =
        file.type === 'audio/mpeg' ||
        file.type === 'audio/mp3' ||
        file.name.toLowerCase().endsWith('.mp3');

      if (isMp3) {
        const url = URL.createObjectURL(file);
        objectUrlRef.current = url;
        setMp3File(file);
        setMp3ObjectUrl(url);
        setProgress(100);
        setStatus('done');
        return;
      }

      // ── 3. Decode using Web Audio API ─────────────────────────────────────
      setStatus('converting');
      setProgress(0);

      let audioBuffer: AudioBuffer;
      try {
        const arrayBuffer = await file.arrayBuffer();
        const audioCtx = new AudioContext();
        audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
        await audioCtx.close();
      } catch {
        setStatus('error');
        setError(
          'Could not decode this audio file. The format may not be supported by your browser.',
        );
        return;
      }

      // ── 4. Extract PCM channel data ───────────────────────────────────────
      const channelData: Float32Array[] = [];
      for (let c = 0; c < Math.min(audioBuffer.numberOfChannels, 2); c++) {
        channelData.push(audioBuffer.getChannelData(c));
      }

      // ── 5. Spin up the Web Worker ─────────────────────────────────────────
      workerRef.current?.terminate();
      const worker = new Mp3Worker();
      workerRef.current = worker;

      worker.onmessage = (e: MessageEvent) => {
        const msg = e.data as {
          type: 'progress' | 'done' | 'error';
          percent?: number;
          mp3Blob?: Blob;
          message?: string;
        };

        if (msg.type === 'progress' && msg.percent !== undefined) {
          setProgress(msg.percent);
        } else if (msg.type === 'done' && msg.mp3Blob) {
          const baseName = file.name.replace(/\.[^.]+$/, '');
          const mp3 = new File([msg.mp3Blob], `${baseName}.mp3`, {
            type: 'audio/mpeg',
          });
          const url = URL.createObjectURL(mp3);
          objectUrlRef.current = url;
          setMp3File(mp3);
          setMp3ObjectUrl(url);
          setProgress(100);
          setStatus('done');
          worker.terminate();
        } else if (msg.type === 'error') {
          setStatus('error');
          setError(msg.message ?? 'Encoding failed.');
          worker.terminate();
        }
      };

      worker.onerror = (err) => {
        setStatus('error');
        setError(err.message ?? 'Worker crashed during encoding.');
        worker.terminate();
      };

      // Post PCM data to worker (transferable buffers for zero-copy)
      const transferable = channelData.map((ch) => ch.buffer);
      worker.postMessage(
        {
          sampleRate: audioBuffer.sampleRate,
          numberOfChannels: Math.min(audioBuffer.numberOfChannels, 2),
          channelData,
        },
        transferable,
      );
    },
    [reset],
  );

  return {convert, progress, status, mp3File, mp3ObjectUrl, error, reset};
}
