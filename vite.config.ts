import {defineConfig} from 'vite';
import react, {reactCompilerPreset} from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), babel({presets: [reactCompilerPreset()]})],
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
});
