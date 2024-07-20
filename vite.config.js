import { defineConfig } from 'vite';

export default defineConfig({
  root: '.', // Diretório raiz
  build: {
    outDir: 'dist', // Diretório de saída
    rollupOptions: {
      input: {
        main: 'pub/js/app.js',
        secondary: 'input_formatter.js',
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    watch: {
      usePolling: true,
    },
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  },
});

