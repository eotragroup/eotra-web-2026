import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import postcssRTLCSS from 'postcss-rtlcss';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    // Generates mirrored rules for right-to-left (Arabic): [dir="rtl"] .pl-5 { padding-right: ... } etc.
    css: { postcss: { plugins: [postcssRTLCSS()] } },
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname || '.'),
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
