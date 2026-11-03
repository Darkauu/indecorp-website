import { readFileSync } from 'node:fs';
import { basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const page = (file) => fileURLToPath(new URL(file, import.meta.url));

// Navbar compartido: se inserta en cada página donde haya <!-- navbar --> (dev y build),
// marcando como activo el enlace de esa página. Una sola fuente: src/shared/navbar.html.
const NAVBAR_FILE = page('./src/shared/navbar.html');
const PAGE_IDS = { 'index.html': 'inicio', 'nosotros.html': 'nosotros', 'catalogo.html': 'catalogo', 'servicios.html': 'servicios' };

function sharedNavbar() {
  return {
    name: 'indecorp-shared-navbar',
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        if (!html.includes('<!-- navbar -->')) return html;
        const id = PAGE_IDS[basename(ctx.filename)];
        const navbar = readFileSync(NAVBAR_FILE, 'utf8')
          .replace(`data-nav="${id}"`, `data-nav="${id}" aria-current="page"`);
        return html.replace('<!-- navbar -->', navbar);
      },
    },
    configureServer(server) {
      server.watcher.add(NAVBAR_FILE);
      server.watcher.on('change', (file) => {
        if (file === NAVBAR_FILE) server.ws.send({ type: 'full-reload' });
      });
    },
  };
}

export default defineConfig({
  plugins: [sharedNavbar()],
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
