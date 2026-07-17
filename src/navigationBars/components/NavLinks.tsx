import {Fragment} from 'react';
import {NavLink, Link} from 'react-router-dom';
import {NAV_LINKS} from '@navigationBars/constants/navLinks';

const linkClassName = ({isActive}: {isActive: boolean}) =>
  [
    'inline-flex items-center transition-all duration-300 text-sm md:text-base font-medium py-2 relative',
    isActive
      ? 'text-primary'
      : 'text-text hover:text-primary',
  ].join(' ');

export const NavLinks = () => (
  <nav className="hidden items-center lg:flex" aria-label="Primary">
    <ul className="flex items-center gap-8">
      {NAV_LINKS.map((item) => (
        <li key={item.path}>
          <NavLink
            to={item.path}
            className={linkClassName}
            end={item.path === '/'}>
            {({isActive}) => (
              <>
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary rounded-t-sm" />
                )}
              </>
            )}
          </NavLink>
        </li>
      ))}
      <li>
        <Link 
          to="/application-form"
          className="ml-4 inline-block bg-primary text-white px-6 py-2.5 rounded-sm font-medium hover:bg-secondary transition-colors shadow-sm text-sm"
        >
          Download Form
        </Link>
      </li>
    </ul>
  </nav>
);
