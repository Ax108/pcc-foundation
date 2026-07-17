import {useSEO} from '@app/hooks/useSEO';
import {AboutSection} from '@home/components/AboutSection';
import {GalleryTeaser} from '@home/components/GalleryTeaser';
import {HeroSequence} from '@home/components/HeroSequence';
import {PartnersStrip} from '@home/components/PartnersStrip';
import {RecentEvents} from '@home/components/RecentEvents';
import {FocusAreas} from '@home/components/FocusAreas';
import {ImpactMade} from '@home/components/ImpactMade';
import {UpcomingEvents} from '@home/components/UpcomingEvents';

const HOME_DESCRIPTION =
  'Pratima Chandra Foundation is an independent research, training and support institution for the promotion and development of performing arts and traditional Indian music.';

export const Home = () => {
  useSEO({
    description: HOME_DESCRIPTION,
    ogDescription: HOME_DESCRIPTION,
    keywords:
      'Pratima Chandra Foundation, Indian music, performing arts, Kolkata, memorial award, Rabindra Sangeet',
  });

  return (
    <article aria-label="Home">
      <HeroSequence />
      <ImpactMade />
      <FocusAreas />
      <div id="about-section">
        <AboutSection />
      </div>
      <PartnersStrip />
      <UpcomingEvents />
      <RecentEvents />
      <GalleryTeaser />
    </article>
  );
};
