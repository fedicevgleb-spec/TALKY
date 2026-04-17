import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        refund: resolve(__dirname, 'refund/index.html'),
        thanks88: resolve(__dirname, 'thanks88/index.html'),
        paymentFailed: resolve(__dirname, 'payment-failed/index.html'),
        privacy: resolve(__dirname, 'privacy/index.html'),
        terms: resolve(__dirname, 'terms/index.html'),
      },
    },
  },
  server: {
    proxy: {
      '/create-checkout-session': { target: 'http://127.0.0.1:4242', changeOrigin: true },
      '/download': { target: 'http://127.0.0.1:4242', changeOrigin: true },
      '/thanks': { target: 'http://127.0.0.1:4242', changeOrigin: true },
      '/cancel': { target: 'http://127.0.0.1:4242', changeOrigin: true },
      '/webhook': { target: 'http://127.0.0.1:4242', changeOrigin: true },
    },
  },
});
