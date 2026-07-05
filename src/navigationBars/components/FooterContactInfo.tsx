import {solidIcon} from '@app/utils/icons';
import {SITE_CONTACT} from '@navigationBars/constants/siteContact';
import {FooterColumnHeading} from '@navigationBars/components/FooterColumnHeading';

const contactRowClass =
  'inline-flex min-h-11 items-center gap-3 text-sm text-white/75 transition-colors hover:text-gold md:text-base';

export const FooterContactInfo = () => (
  <section aria-labelledby="footer-contact-heading">
    <FooterColumnHeading id="footer-contact-heading">
      Contact Info
    </FooterColumnHeading>
    <address className="space-y-1 not-italic">
      <p className={contactRowClass}>
        <i
          className={solidIcon('location-dot', 'text-gold w-4 shrink-0')}
          aria-hidden
        />
        <span>{SITE_CONTACT.address}</span>
      </p>
      <p>
        <a href={SITE_CONTACT.phoneHref} className={contactRowClass}>
          <i
            className={solidIcon('phone', 'text-gold w-4 shrink-0')}
            aria-hidden
          />
          <span>{SITE_CONTACT.phone}</span>
        </a>
      </p>
      <p>
        <a href={SITE_CONTACT.emailHref} className={contactRowClass}>
          <i
            className={solidIcon('envelope', 'text-gold w-4 shrink-0')}
            aria-hidden
          />
          <span>{SITE_CONTACT.email}</span>
        </a>
      </p>
    </address>
  </section>
);
