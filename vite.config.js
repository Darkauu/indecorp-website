import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const page = (file) => fileURLToPath(new URL(file, import.meta.url));

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: page('./index.html'),
        nosotros: page('./nosotros.html'),
        catalogo: page('./catalogo.html'),
        servicios: page('./servicios.html'),
      },
    },
  },
});
