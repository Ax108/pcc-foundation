import {useState, useEffect, useCallback} from 'react';
import {createPortal} from 'react-dom';

type LightboxItem = {
  imageSrc: string;
  alt: string;
  id: string;
};

type LightboxProps = {
  items: LightboxItem[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
};

export const Lightbox = ({
  items,
  initialIndex,
  isOpen,
  onClose,
}: LightboxProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      setIsZoomed(false);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, initialIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex(prev => (prev === items.length - 1 ? 0 : prev + 1));
    setIsZoomed(false);
  }, [items.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex(prev => (prev === 0 ? items.length - 1 : prev - 1));
    setIsZoomed(false);
  }, [items.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleNext, handlePrev, onClose]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const toggleZoom = () => {
    setIsZoomed(prev => !prev);
  };

  const shareImage = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: items[currentIndex].alt,
          url: window.location.origin + items[currentIndex].imageSrc,
        });
      } else {
        await navigator.clipboard.writeText(
          window.location.origin + items[currentIndex].imageSrc,
        );
        alert('Image URL copied to clipboard');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Close when clicking outside the image
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 transition-opacity"
      onClick={handleBackdropClick}>
      {/* Top Bar */}
      <div className="pointer-events-none absolute top-0 right-0 left-0 z-10 flex items-center justify-between p-2 text-white/80 md:p-4">
        <div className="pointer-events-auto pl-2 text-xs font-medium tracking-wide md:text-sm">
          {currentIndex + 1} / {items.length}
        </div>
        <div className="pointer-events-auto flex items-center gap-2 pr-2 md:gap-4">
          <button
            onClick={toggleFullscreen}
            className="transition hover:text-white"
            aria-label="Toggle Fullscreen">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
            </svg>
          </button>
          <button
            onClick={toggleZoom}
            className="transition hover:text-white"
            aria-label="Toggle Zoom">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="11" y1="8" x2="11" y2="14" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          </button>
          <button
            onClick={shareImage}
            className="transition hover:text-white"
            aria-label="Share">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
              <polyline points="16 6 12 2 8 6" />
              <line x1="12" y1="2" x2="12" y2="15" />
            </svg>
          </button>
          <button
            onClick={onClose}
            className="ml-2 transition hover:text-white"
            aria-label="Close">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Navigation Left */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-1 z-10 -translate-y-1/2 p-1 text-white/50 transition hover:text-white md:left-4 md:p-2"
        aria-label="Previous image">
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* Image Container */}
      <div
        className="scrollbar-hide relative flex h-full w-full items-center justify-center overflow-auto p-4 pt-14 pb-12 md:p-24"
        onClick={handleBackdropClick}>
        <img
          src={items[currentIndex].imageSrc}
          alt={items[currentIndex].alt}
          className={`max-h-full max-w-full object-contain transition-transform duration-300 select-none ${
            isZoomed ? 'scale-150 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
          }`}
          onClick={toggleZoom}
          draggable={false}
        />
        {/* Caption */}
        <div className="pointer-events-none absolute right-0 bottom-4 left-0 px-4 text-center text-xs font-medium text-white/80 md:bottom-6 md:text-sm">
          {items[currentIndex].id}
        </div>
      </div>

      {/* Navigation Right */}
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-1 z-10 -translate-y-1/2 p-1 text-white/50 transition hover:text-white md:right-4 md:p-2"
        aria-label="Next image">
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>,
    document.body,
  );
};
