import {solidIcon} from '@app/utils/icons';

type HeroSliderControlsProps = {
  slideCount: number;
  activeIndex: number;
  onPrev: () => void;
  onNext: () => void;
  onGoTo: (index: number) => void;
};

const controlButtonClass =
  'inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/40 text-lg text-white transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2';

export const HeroSliderControls = ({
  slideCount,
  activeIndex,
  onPrev,
  onNext,
  onGoTo,
}: HeroSliderControlsProps) => (
  <>
    <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-2 sm:px-4">
      <button
        type="button"
        className={`${controlButtonClass} pointer-events-auto`}
        onClick={onPrev}
        aria-label="Previous slide">
        <i className={solidIcon('chevron-left')} aria-hidden />
      </button>
      <button
        type="button"
        className={`${controlButtonClass} pointer-events-auto`}
        onClick={onNext}
        aria-label="Next slide">
        <i className={solidIcon('chevron-right')} aria-hidden />
      </button>
    </div>

    <div
      className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2 sm:bottom-4"
      role="group"
      aria-label="Slide pagination">
      {Array.from({length: slideCount}, (_, index) => (
        <button
          key={index}
          type="button"
          aria-current={index === activeIndex ? 'true' : undefined}
          aria-label={`Slide ${index + 1} of ${slideCount}`}
          onClick={() => onGoTo(index)}
          className={[
            'h-2.5 w-2.5 rounded-full transition-colors',
            index === activeIndex ? 'bg-gold' : 'bg-white/50 hover:bg-white/80',
          ].join(' ')}
        />
      ))}
    </div>
  </>
);
