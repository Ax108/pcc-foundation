import {lazy, Suspense} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

const Home = lazy(() =>
  import('@home/Home').then(module => ({default: module.Home})),
);

const Routing = () => (
  <BrowserRouter>
    <Suspense
      fallback={
        <div className="container-site flex min-h-[40vh] items-center justify-center py-16">
          <p className="text-text">Loading…</p>
        </div>
      }>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default Routing;
