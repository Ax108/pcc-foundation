import {brandIcon} from '@app/utils/icons';
import {SITE_CONTACT} from '@navigationBars/constants/siteContact';

const socialButtonClass =
  'inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-lg text-white transition-colors hover:bg-accent hover:text-white';

export const FooterSocialLinks = () => (
  <nav aria-label="Social media">
    <ul className="flex flex-wrap items-center gap-3">
      {SITE_CONTACT.social.map(item => (
        <li key={item.icon}>
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className={socialButtonClass}
            aria-label={item.label}>
            <i className={brandIcon(item.icon)} aria-hidden />
          </a>
        </li>
      ))}
    </ul>
  </nav>
);
