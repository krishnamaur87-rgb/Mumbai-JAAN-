import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: './',
  server: {
    port: 5173,
    strictPort: false,
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        menu: path.resolve(__dirname, 'menu.html'),
        dashboard: path.resolve(__dirname, 'dashboard.html'),
      },
    },
  },
});
