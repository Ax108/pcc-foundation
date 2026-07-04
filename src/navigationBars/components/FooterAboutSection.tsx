import {SITE_CONTACT} from '@navigationBars/constants/siteContact';
import {FooterColumnHeading} from '@navigationBars/components/FooterColumnHeading';

export const FooterAboutSection = () => (
  <section aria-labelledby="footer-about-heading">
    <FooterColumnHeading id="footer-about-heading">
      About The Foundation
    </FooterColumnHeading>
    <p className="text-sm leading-relaxed text-white/75 md:text-base">
      {SITE_CONTACT.about}
    </p>
  </section>
);
