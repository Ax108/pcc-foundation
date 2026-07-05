import {FooterAboutSection} from '@navigationBars/components/FooterAboutSection';
import {FooterQuickLinks} from '@navigationBars/components/FooterQuickLinks';
import {FooterContactInfo} from '@navigationBars/components/FooterContactInfo';
import {FooterSocialLinks} from '@navigationBars/components/FooterSocialLinks';
import {FooterCopyright} from '@navigationBars/components/FooterCopyright';

export const Footer = () => (
  <footer className="footer-site bg-footer text-white">
    <div className="container-site py-12 md:py-14">
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
        <FooterAboutSection />
        <FooterQuickLinks />
        <FooterContactInfo />
      </div>
      <div className="mt-10 border-t border-white/10 pt-8">
        <FooterSocialLinks />
      </div>
    </div>
    <FooterCopyright />
  </footer>
);
