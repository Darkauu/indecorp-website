# Indecorp · Sitio web

Sitio de alquiler de maquinaria pesada, con y sin operador. Está construido con **Astro**: cada página se genera como HTML estático completo en el build, sin servidor, y queda lista para buscadores.

- **Home (`src/pages/index.astro`):** prototipo con scroll animado.
- **Nosotros, Catálogo y Servicios:** páginas internas (mockup v1).

## Cómo correrlo

Requiere **Node 22.23.4 o superior**, la versión que exige Astro 7. Verifica con `node -v`.

```bash
npm install
npm run dev       # servidor local con recarga en caliente (http://localhost:4321)
npm run build     # build de producción en dist/
npm run preview   # sirve dist/ para revisarlo antes de publicar
```

Si un `git pull` trae cambios en `package.json`, vuelve a ejecutar `npm install`.

## Arquitectura

```
astro.config.mjs            build.format 'file' → mantiene las URLs /nosotros.html, /catalogo.html, …
src/
  pages/                    una página = un archivo (index, nosotros, catalogo, servicios)
  layouts/
    BaseLayout.astro        <head> común, tema sin parpadeo, fundido entre páginas, navbar
    SitePage.astro          páginas internas: estilos, footer, formulario, datos del buscador
  components/               Navbar, SiteFooter, QuoteModal, MachineCard, Icon, MachineShape
  content.config.js         colecciones de contenido (categorías y equipos) con esquema validado
  data/                     categories.json y machines.json: fuente de datos actual del catálogo
  lib/
    catalog.js              acceso único a los datos del catálogo (getCategories, getMachines, getCatalog)
    icons.js                íconos y siluetas de maquinaria
  scripts/                  JS del navegador de las páginas internas (site.js, machine-search.js)
  styles/site.css           estilos de las páginas internas
  home/                     JS (GSAP + Lenis) y CSS del home
  shared/                   navbar, tema, scroll suave: compartidos por todas las páginas
  page-transitions.*        fundido al cambiar de página
  config.js                 marca, teléfono, correo y WhatsApp ([NOMBRE], [NÚMERO])
public/                     archivos que se publican tal cual (imágenes, favicon, robots.txt)
```

- **HTML completo desde el build:** navbar, footer, formulario y las fichas del catálogo se renderizan al compilar. El JavaScript del navegador solo añade la interacción: animaciones, filtros, formulario, tema y scroll suave.
- **Sin servidor:** el resultado de `npm run build` (`dist/`) se publica en cualquier hosting estático.

## Datos del catálogo y panel futuro (CMS)

- **Origen actual:** los equipos y categorías están en `src/data/*.json`. Astro los carga como colecciones de contenido (`src/content.config.js`) y valida su esquema; un dato mal escrito hace fallar el build en lugar de publicarse roto.
- **Orden:** cada entrada tiene un `order` que define su posición. Cada equipo tiene un `id` estable (`cat-320`, `cat-d6`…), pensado para futuras URLs por equipo.
- **Acceso:** páginas y componentes leen los datos solo a través de `src/lib/catalog.js`.
- **Para conectar un panel** (por ejemplo, Sanity): se reemplaza el `loader` de cada colección en `src/content.config.js` por uno que lea del CMS, y se configura un webhook que reconstruya el sitio al guardar. El esquema, `src/lib/catalog.js`, las páginas y los componentes no cambian.
- **Para agregar un equipo hoy:** añade una entrada a `src/data/machines.json` con su `id`, `order` y `category` (id de una categoría existente), y vuelve a compilar.

## Home: qué incluye

1. **Scroll suave** con Lenis, sincronizado con GSAP ScrollTrigger mediante `gsap.ticker`.
2. **Hero por capas con parallax:** fondo, máquina recortada y polvo en primer plano.
3. **Transición hero → flota:** la capa de polvo sube y cubre el corte entre ambas secciones.
4. **Flota fijada (pin):** recorre 3 categorías. En móvil es un carrusel con `scroll-snap`, sin pin.
5. **Servicios, cifras animadas y CTA final** a pantalla completa, con botón flotante de WhatsApp.

Reglas técnicas:
- Solo se animan `transform` y `opacity`.
- `prefers-reduced-motion` desactiva Lenis, parallax, pin y reveals.
- En pantallas < 768 px el parallax se reduce a la mitad y no hay pins.
- Imágenes en AVIF + WebP: las del hero se precargan y el resto usa `loading="lazy"`.

## Tema claro / oscuro

- **Botón:** el de luna o sol del navbar cambia el tema en todas las páginas.
- **Por defecto** sigue al sistema operativo. Al pulsar el botón, la elección se guarda en `localStorage`.
- **Sin parpadeo:** `src/shared/theme-init.js` fija el tema antes del primer pintado; `BaseLayout.astro` lo inserta en línea al inicio del `<head>`.
- **Colores:** variables en `:root` y `:root[data-theme="dark"]` de `src/home/home.css`, `src/styles/site.css` y `src/shared/navbar.css`.

## Tipografía

**Títulos y énfasis:** Montserrat. **Texto:** Inter. Las dos se sirven desde el propio sitio con `@fontsource`.

## Formulario de cotización (páginas internas)

- **Equipo de interés:** buscador dinámico (`src/scripts/machine-search.js`) sobre los equipos del catálogo. Si se abre desde una ficha, el equipo llega preseleccionado; desde cualquier otro CTA, vacío.
- **Envío:** abre WhatsApp (`wa.me`) con la solicitud escrita, al número de `CONFIG.whatsapp` en `src/config.js`.

## Librerías

| Paquete | Uso |
| --- | --- |
| `astro` (dev) | Framework: páginas, componentes, colecciones de contenido y build estático (usa Vite internamente) |
| `gsap` (incluye ScrollTrigger) | Animaciones del home: parallax, pin, reveals y contadores |
| `lenis` | Scroll suave |
| `@fontsource/montserrat`, `@fontsource/inter` | Fuentes alojadas en el propio sitio |
