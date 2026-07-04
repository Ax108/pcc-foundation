import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

/** Scrolls to top on client-side route changes */
export const ScrollToTop = () => {
  const {pathname} = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
