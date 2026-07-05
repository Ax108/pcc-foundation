import type {ReactNode} from 'react';
import {TopNavBar} from '@navigationBars/TopNavBar';
import {Footer} from '@navigationBars/Footer';
import {ScrollToTop} from '@navigationBars/components/ScrollToTop';

type SiteLayoutProps = {
  children: ReactNode;
};

export const SiteLayout = ({children}: SiteLayoutProps) => (
  <>
    <ScrollToTop />
    <div className="flex min-h-screen flex-col">
      <TopNavBar />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  </>
);
