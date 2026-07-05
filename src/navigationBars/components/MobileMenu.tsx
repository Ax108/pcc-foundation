import {NavLink} from 'react-router-dom';
import {NAV_LINKS} from '@navigationBars/constants/navLinks';

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

const mobileLinkClass = ({isActive}: {isActive: boolean}) =>
  [
    'block min-h-11 rounded-sm px-4 py-3 text-base font-medium transition-colors',
    isActive
      ? 'bg-muted text-accent'
      : 'text-primary hover:bg-muted hover:text-accent',
  ].join(' ');

export const MobileMenu = ({isOpen, onClose}: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        aria-label="Close menu overlay"
        onClick={onClose}
      />
      <nav
        id="mobile-primary-nav"
        className="border-border fixed top-[var(--topnav-height)] right-0 left-0 z-50 border-b bg-white shadow-lg lg:hidden"
        aria-label="Primary mobile">
        <ul className="container-site py-2">
          {NAV_LINKS.map(item => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={mobileLinkClass}
                end={item.path === '/'}
                onClick={onClose}>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};
