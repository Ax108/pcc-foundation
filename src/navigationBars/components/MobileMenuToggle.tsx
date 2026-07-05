import {solidIcon} from '@app/utils/icons';

type MobileMenuToggleProps = {
  isOpen: boolean;
  onToggle: () => void;
};

export const MobileMenuToggle = ({isOpen, onToggle}: MobileMenuToggleProps) => (
  <button
    type="button"
    className="text-primary hover:text-accent inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm text-2xl lg:hidden"
    onClick={onToggle}
    aria-expanded={isOpen}
    aria-controls="mobile-primary-nav"
    aria-label={isOpen ? 'Close menu' : 'Open menu'}>
    <i className={solidIcon(isOpen ? 'xmark' : 'bars')} aria-hidden="true" />
  </button>
);
