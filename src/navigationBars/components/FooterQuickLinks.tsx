import {Link} from 'react-router-dom';
import {NAV_LINKS} from '@navigationBars/constants/navLinks';
import {FooterColumnHeading} from '@navigationBars/components/FooterColumnHeading';

const footerLinkClass =
  'inline-flex min-h-11 items-center text-sm text-white/75 transition-colors hover:text-gold md:text-base';

export const FooterQuickLinks = () => (
  <nav aria-labelledby="footer-quick-links-heading">
    <FooterColumnHeading id="footer-quick-links-heading">
      Quick Links
    </FooterColumnHeading>
    <ul className="space-y-1">
      {NAV_LINKS.map(item => (
        <li key={item.path}>
          <Link to={item.path} className={footerLinkClass}>
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);
