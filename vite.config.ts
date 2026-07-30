import {defineConfig, loadEnv, type Plugin} from 'vite';
import react, {reactCompilerPreset} from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// #genai — sibling hosted-assets repo (pcc-data)
const PCC_DATA_ASSETS = path.resolve(__dirname, '../pcc-data/assets');

/** Serve `/assets/*` from sibling `pcc-data` when VITE_ASSET_BASE_URL is unset. */
function servePccDataAssets(assetBaseUrl: string): Plugin {
  const serveFromDisk = !assetBaseUrl;

  const middleware = (
    req: {url?: string},
    res: {
      setHeader: (k: string, v: string) => void;
      statusCode: number;
      end: (b?: string) => void;
    },
    next: () => void,
  ) => {
    if (!serveFromDisk || !req.url?.startsWith('/assets/')) {
      next();
      return;
    }
    const rel = decodeURIComponent(req.url.slice('/assets/'.length).split('?')[0] ?? '');
    const filePath = path.normalize(path.join(PCC_DATA_ASSETS, rel));
    if (!filePath.startsWith(PCC_DATA_ASSETS) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      next();
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    const types: Record<string, string> = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif',
      '.webp': 'image/webp',
      '.svg': 'image/svg+xml',
      '.pdf': 'application/pdf',
      '.mp4': 'video/mp4',
    };
    res.setHeader('Content-Type', types[ext] ?? 'application/octet-stream');
    res.setHeader('Cache-Control', 'no-cache');
    fs.createReadStream(filePath).pipe(res as unknown as NodeJS.WritableStream);
  };

  return {
    name: 'serve-pcc-data-assets',
    configureServer(server) {
      server.middlewares.use(middleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware);
    },
    transformIndexHtml(html) {
      // #genai — base is the assets root (…/pcc-data/assets), not the site origin
      const base = assetBaseUrl.replace(/\/$/, '');
      if (!base) return html;
      return html
        .replace(
          'href="/assets/home/slide-1-header-1.jpg"',
          `href="${base}/home/slide-1-header-1.jpg"`,
        )
        .replaceAll(
          'https://pratimachandrafoundation.org/assets/logo/logo-full.jpg',
          `${base}/logo/logo-full.png`,
        )
        .replace(
          '<!-- Preconnect / prefetch -->',
          `<!-- Preconnect / prefetch -->\n    <link rel="preconnect" href="https://ax108.github.io" crossorigin />\n    <link rel="dns-prefetch" href="https://ax108.github.io" />`,
        );
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, __dirname, '');
  const assetBaseUrl = (env.VITE_ASSET_BASE_URL ?? '').trim();

  return {
    plugins: [
      react(),
      tailwindcss(),
      babel({presets: [reactCompilerPreset()]}),
      servePccDataAssets(assetBaseUrl),
    ],
    resolve: {
      alias: {
        '@src': path.resolve(__dirname, './src'),
        '@app': path.resolve(__dirname, './src/app'),
        '@navigationBars': path.resolve(__dirname, './src/navigationBars'),
        '@home': path.resolve(__dirname, './src/pages/home'),
        '@inspiration': path.resolve(__dirname, './src/pages/our-inspiration'),
        '@gallery': path.resolve(__dirname, './src/pages/gallery'),
        '@events': path.resolve(__dirname, './src/pages/events'),
        '@contact': path.resolve(__dirname, './src/pages/contact-us'),
        '@public': path.resolve(__dirname, './public'),
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      minify: 'oxc',
    },
    server: {
      fs: {
        allow: [__dirname, PCC_DATA_ASSETS],
      },
    },
  };
});
