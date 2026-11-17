import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    watch: {
      // Keep the dev server from watching unrelated OneDrive-locked folders.
      ignored: ['**/PROJECTS/**'],
    },
  },
  build: {
    target: 'es2020',
    assetsDir: 'static',
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          if (id.includes('node_modules/react') || id.includes('node_modules/scheduler')) {
            return 'react-vendor';
          }
          if (id.includes('node_modules/motion') || id.includes('node_modules/framer-motion')) {
            return 'motion-vendor';
          }
          if (id.includes('node_modules/lucide-react')) return 'icons-vendor';
          return 'vendor';
        },
      },
    },
  },
});
