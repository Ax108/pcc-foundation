import {useSEO} from '@app/hooks/useSEO';
import {AboutSection} from '@home/components/AboutSection';
import {GalleryTeaser} from '@home/components/GalleryTeaser';
import {HeroSequence} from '@home/components/HeroSequence';
import {PartnersStrip} from '@home/components/PartnersStrip';
import {RecentEvents} from '@home/components/RecentEvents';
import {FocusAreas} from '@home/components/FocusAreas';
import {ImpactMade} from '@home/components/ImpactMade';
import {UpcomingEvents} from '@home/components/UpcomingEvents';
import {
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_TITLE_HOME,
} from '@src/constants/site';

export const Home = () => {
  // #genai — home SEO uses shared site tagline / keywords
  useSEO({
    title: SITE_TITLE_HOME,
    description: SITE_DESCRIPTION,
    ogDescription: SITE_DESCRIPTION,
    keywords: SITE_KEYWORDS,
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
