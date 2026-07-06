import {NavLink} from 'react-router-dom';
import {NAV_LINKS} from '@navigationBars/constants/navLinks';

const linkClassName = ({isActive}: {isActive: boolean}) =>
  [
    'min-h-11 inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 md:text-base',
    isActive
      ? 'bg-accent/10 text-accent font-semibold'
      : 'text-primary hover:bg-gray-100 hover:text-accent',
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
