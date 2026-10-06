import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        services: resolve(__dirname, 'services.html'),
        premium: resolve(__dirname, 'premium-detailing.html'),
        quote: resolve(__dirname, 'quote.html'),
      },
    },
  },
});
