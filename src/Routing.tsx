import {lazy, Suspense} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {SiteLayout} from '@navigationBars/SiteLayout';

const Home = lazy(() =>
  import('@home/Home').then(module => ({default: module.Home})),
);
const OurInspiration = lazy(() =>
  import('@inspiration/OurInspiration').then(module => ({
    default: module.OurInspiration,
  })),
);
const Gallery = lazy(() =>
  import('@gallery/Gallery').then(module => ({default: module.Gallery})),
);
const Events = lazy(() =>
  import('@events/Events').then(module => ({default: module.Events})),
);
const ContactUs = lazy(() =>
  import('@contact/ContactUs').then(module => ({default: module.ContactUs})),
);

const pageFallback = (
  <div className="container-site flex min-h-[40vh] items-center justify-center py-16">
    <p className="text-text">Loading…</p>
  </div>
);

const Routing = () => (
  <BrowserRouter>
    <SiteLayout>
      <Suspense fallback={pageFallback}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/our-inspiration" element={<OurInspiration />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/events" element={<Events />} />
          <Route path="/contact-us" element={<ContactUs />} />
        </Routes>
      </Suspense>
    </SiteLayout>
  </BrowserRouter>
);

export default Routing;
