import {useSEO} from '@app/hooks/useSEO';
import {IMAGES, IMAGE_DIMENSIONS} from '@src/constants/images';
import {brandIcon, solidIcon} from '@app/utils/icons';

export const Home = () => {
  useSEO();

  return (
    <div className="container-site py-12">
      <img
        src={IMAGES.LOGO_HEADER}
        alt="Pratima Chandra Foundation"
        width={IMAGE_DIMENSIONS.LOGO_HEADER.width}
        height={IMAGE_DIMENSIONS.LOGO_HEADER.height}
        fetchPriority="high"
        decoding="async"
        className="h-auto w-full max-w-xs"
      />

      <h1 className="text-accent mt-8 text-4xl font-semibold">
        Pratima Chandra Foundation
      </h1>
      <p className="text-text mt-4 max-w-2xl">
        An independent research, training and support institution for the
        promotion and development of performing arts and traditional Indian
        music.
      </p>

      <ul
        className="text-text mt-8 flex flex-wrap gap-4 text-xl"
        aria-label="Contact">
        <li>
          <i className={solidIcon('phone')} aria-hidden="true" />
          <span className="sr-only">Phone</span>
        </li>
        <li>
          <i className={solidIcon('envelope')} aria-hidden="true" />
          <span className="sr-only">Email</span>
        </li>
        <li>
          <i className={brandIcon('facebook')} aria-hidden="true" />
          <span className="sr-only">Facebook</span>
        </li>
        <li>
          <i className={brandIcon('instagram')} aria-hidden="true" />
          <span className="sr-only">Instagram</span>
        </li>
        <li>
          <i className={brandIcon('youtube')} aria-hidden="true" />
          <span className="sr-only">YouTube</span>
        </li>
      </ul>
    </div>
  );
};
