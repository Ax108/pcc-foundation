import {NavLink} from 'react-router-dom';
import {NAV_LINKS} from '@navigationBars/constants/navLinks';

const linkClassName = ({isActive}: {isActive: boolean}) =>
  [
    'min-h-11 inline-flex items-center px-1 text-sm font-medium transition-colors md:text-base',
    isActive
      ? 'text-accent underline decoration-2 underline-offset-4'
      : 'text-primary hover:text-accent',
  ].join(' ');

export const NavLinks = () => (
  <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
    <ul className="flex items-center gap-6">
      {NAV_LINKS.map(item => (
        <li key={item.path}>
          <NavLink
            to={item.path}
            className={linkClassName}
            end={item.path === '/'}>
            {item.label}
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
);
