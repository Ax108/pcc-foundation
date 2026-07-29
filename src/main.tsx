import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from '@src/App';
import {loadFontAwesome} from '@app/utils/icons';
import {SmoothScroll} from '@app/components/SmoothScroll';

loadFontAwesome();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SmoothScroll>
      <App />
    </SmoothScroll>
  </StrictMode>,
);
