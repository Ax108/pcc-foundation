import {useRef, useId} from 'react';
import {useAudioToMp3} from '@app/hooks/useAudioToMp3';

/** All audio types the Web Audio API can decode across major browsers */
const ACCEPTED_AUDIO_TYPES =
  'audio/mpeg,audio/mp3,audio/wav,audio/ogg,audio/flac,audio/aac,audio/x-aac,audio/mp4,audio/x-m4a,audio/webm,audio/opus,audio/aiff,audio/x-aiff,.mp3,.wav,.ogg,.oga,.flac,.aac,.m4a,.mp4,.webm,.opus,.aiff,.aif';

interface AudioUploadFieldProps {
  /** Called when conversion is done (or fast-pathed). Null when reset. */
  onChange: (file: File | null) => void;
  required?: boolean;
}

export const AudioUploadField = ({onChange, required}: AudioUploadFieldProps) => {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const {convert, progress, status, mp3File, mp3ObjectUrl, error, reset} =
    useAudioToMp3();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    convert(file);
  };

  const handleReset = () => {
    reset();
    onChange(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  // Notify parent whenever mp3File changes
  if (mp3File && status === 'done') {
    // Only call onChange once per file (stable identity)
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Label */}
      <label htmlFor={inputId} className="text-sm font-medium text-text">
        Upload Song Recording{' '}
        <span className="text-text/50 font-normal">(any audio format)</span>
        {required && ' *'}
      </label>

      {/* Drop zone / file picker */}
      {status === 'idle' && (
        <div className="relative">
          <label
            htmlFor={inputId}
            className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-border rounded-lg p-6 cursor-pointer hover:border-accent/60 hover:bg-accent/5 transition-all group"
          >
            {/* Upload icon */}
            <svg
              className="w-8 h-8 text-border group-hover:text-accent/60 transition-colors"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"
              />
            </svg>

            <span className="text-sm font-medium text-text/70 group-hover:text-accent transition-colors">
              Click to upload or drag &amp; drop
            </span>

            <span className="text-xs text-text/40 text-center leading-relaxed">
              MP3 · WAV · OGG · FLAC · AAC · M4A · WEBM · OPUS · AIFF
              <br />
              Maximum 20 MB
            </span>
          </label>

          <input
            ref={inputRef}
            id={inputId}
            type="file"
            accept={ACCEPTED_AUDIO_TYPES}
            required={required}
            onChange={handleFileChange}
            className="sr-only"
          />
        </div>
      )}

      {/* Converting state */}
      {status === 'converting' && (
        <div className="flex flex-col gap-2 px-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-text/60 flex items-center gap-1.5">
              {/* Spinner */}
              <svg
                className="w-3.5 h-3.5 animate-spin text-accent"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Converting to MP3…
            </span>
            <span className="text-xs font-semibold text-accent tabular-nums">
              {progress}%
            </span>
          </div>

          {/* Thin progress bar */}
          <div className="w-full h-[3px] rounded-full bg-border overflow-hidden">
            <div
              className="h-full rounded-full bg-accent transition-all duration-300 ease-out"
              style={{width: `${progress}%`}}
            />
          </div>
        </div>
      )}

      {/* Done state */}
      {status === 'done' && mp3ObjectUrl && mp3File && (
        <div className="flex flex-col gap-3">
          {/* Success badge */}
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-700 bg-green-50 border border-green-200 px-2.5 py-1 rounded-full">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Ready — {mp3File.name}
            </span>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-text/40 hover:text-text/70 transition-colors underline underline-offset-2"
            >
              Change file
            </button>
          </div>

          {/* Audio preview */}
          <audio
            controls
            src={mp3ObjectUrl}
            className="w-full h-10 rounded-md"
            onCanPlay={() => {
              // Notify parent only once when audio is ready
              onChange(mp3File);
            }}
          />

          {/* Temporary download button */}
          <a
            href={mp3ObjectUrl}
            download={mp3File.name}
            className="inline-flex items-center justify-center gap-2 text-sm font-medium text-accent border border-accent/30 bg-accent/5 hover:bg-accent/10 px-4 py-2 rounded-lg transition-colors self-start"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
            Download MP3
          </a>
        </div>
      )}

      {/* Error state */}
      {status === 'error' && (
        <div className="flex flex-col gap-2">
          <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2.5">
            <svg
              className="w-4 h-4 text-red-500 mt-0.5 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
            <p className="text-xs text-red-700 leading-relaxed">{error}</p>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="self-start text-xs font-medium text-accent hover:underline"
          >
            Try a different file
          </button>
        </div>
      )}
    </div>
  );
};
