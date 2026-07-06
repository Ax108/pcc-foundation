import type {CSSProperties} from 'react';
import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {SkipToContentLink} from '@navigationBars/components/SkipToContentLink';
import {LogoSection} from '@navigationBars/components/LogoSection';
import {NavLinks} from '@navigationBars/components/NavLinks';
import {MobileMenuToggle} from '@navigationBars/components/MobileMenuToggle';
import {MobileMenu} from '@navigationBars/components/MobileMenu';
import {useMobileNav} from '@navigationBars/hooks/useMobileNav';

export const TopNavBar = () => {
  const {pathname} = useLocation();
  const {isOpen, close, toggle} = useMobileNav();

  useEffect(() => {
    close();
  }, [pathname, close]);

  return (
    <header
      className="sticky top-0 z-50 border-b border-border/50 bg-surface shadow-sm transition-all duration-300"
      style={{'--topnav-height': '4.5rem'} as CSSProperties}>
      <SkipToContentLink />
      <div className="container-site flex min-h-[4.5rem] items-center justify-between gap-4">
        <LogoSection />
        <NavLinks />
        <MobileMenuToggle isOpen={isOpen} onToggle={toggle} />
      </div>
      <MobileMenu isOpen={isOpen} onClose={close} />
    </header>
  );
};
