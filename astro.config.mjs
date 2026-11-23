import { defineConfig } from 'astro/config';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  build: {
    // Mantiene las URLs actuales: /nosotros.html, /catalogo.html, /servicios.html.
    format: 'file',
  },
  trailingSlash: 'never',   // recomendado junto a format: 'file'
  // HTML sin minificar: conserva los espacios entre elementos en línea tal como estaban.
  compressHTML: false,
});
