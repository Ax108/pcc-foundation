import {Link} from 'react-router-dom';
import {IMAGES, IMAGE_DIMENSIONS} from '@src/constants/images';

export const LogoSection = () => (
  <Link
    to="/"
    className="inline-flex min-w-0 shrink items-center gap-2 rounded-sm transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 md:gap-3"
    aria-label="Pratima Chandra Foundation — Home">
    {/* #genai — Separate images keep the portrait prominent without shrinking the wordmark. */}
    <img
      src={IMAGES.LOGO_MARK}
      alt=""
      aria-hidden="true"
      width={IMAGE_DIMENSIONS.LOGO_MARK.width}
      height={IMAGE_DIMENSIONS.LOGO_MARK.height}
      fetchPriority="high"
      decoding="async"
      className="h-14 w-auto shrink-0 md:h-16"
    />
    <img
      src={IMAGES.LOGO_WORDMARK}
      alt="Pratima Chandra Foundation"
      width={IMAGE_DIMENSIONS.LOGO_WORDMARK.width}
      height={IMAGE_DIMENSIONS.LOGO_WORDMARK.height}
      fetchPriority="high"
      decoding="async"
      className="h-auto min-w-0 w-[210px] sm:w-[250px] md:w-[300px] lg:w-[340px]"
    />
  </Link>
);
