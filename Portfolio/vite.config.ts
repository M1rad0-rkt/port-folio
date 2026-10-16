import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import seoPlugin from './seo.plugin.js';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), seoPlugin()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
