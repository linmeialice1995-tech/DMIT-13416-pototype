import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    // Use relative path for static hosting (GitHub Pages, etc.)
    base: './',
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'html-fallback-transform',
        transformIndexHtml(html) {
          return html
            .replace(
              /<link rel="stylesheet"[^>]*href="[^"]*"[^>]*>/g,
              '<link rel="stylesheet" href="/dmit-13416/style.css" onerror="this.onerror=null;this.href=\'style.css\';">'
            )
            .replace(
              /<script type="module"[^>]*src="[^"]*"[^>]*><\/script>/g,
              '<script type="module" src="/dmit-13416/app.js" onerror="this.onerror=null;var s=document.createElement(\'script\');s.type=\'module\';s.src=\'app.js\';document.body.appendChild(s);"></script>'
            );
        },
      },
    ],
    build: {
      rollupOptions: {
        output: {
          entryFileNames: 'app.js',
          chunkFileNames: 'assets/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            if (assetInfo.name && assetInfo.name.endsWith('.css')) {
              return 'style.css';
            }
            return 'assets/[name]-[hash].[ext]';
          },
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
