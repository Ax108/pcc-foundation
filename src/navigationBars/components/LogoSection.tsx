import {Link} from 'react-router-dom';
import {IMAGES, IMAGE_DIMENSIONS} from '@src/constants/images';

export const LogoSection = () => (
  <Link
    to="/"
    className="inline-flex shrink-0 items-center rounded-sm transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2"
    aria-label="Pratima Chandra Foundation — Home">
    <img
      src={IMAGES.LOGO_HEADER}
      alt="Pratima Chandra Foundation"
      width={IMAGE_DIMENSIONS.LOGO_HEADER.width}
      height={IMAGE_DIMENSIONS.LOGO_HEADER.height}
      fetchPriority="high"
      decoding="async"
      className="h-auto w-full max-w-[240px] md:max-w-[320px] lg:max-w-[360px]"
    />
  </Link>
);
