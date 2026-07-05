import {SITE_CONTACT} from '@navigationBars/constants/siteContact';

export const FooterCopyright = () => (
  <div className="border-t border-white/10 py-5 text-center">
    <div className="container-site">
      <small className="text-sm text-white/60">{SITE_CONTACT.copyright}</small>
    </div>
  </div>
);
