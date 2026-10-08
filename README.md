# Indecorp · Sitio web

Prototipo del sitio de alquiler de maquinaria pesada, con y sin operador.

- **Home (`index.html`):** prototipo con scroll animado, según el brief de esta iteración.
- **Nosotros, Catálogo y Servicios:** mockup v1 anterior, fuera del alcance de esta iteración.

## Cómo correrlo

Requiere Node 18 o superior.

```bash
npm install
npm run dev       # servidor local con recarga en caliente
npm run build     # build de producción en dist/
npm run preview   # sirve dist/ en http://localhost:4173
```

## Home: qué incluye

1. **Scroll suave** con Lenis, sincronizado con GSAP ScrollTrigger (un solo `requestAnimationFrame` vía `gsap.ticker`).
2. **Hero por capas con parallax:** fondo, máquina recortada y polvo en primer plano, cada capa a distinta velocidad. Tiene dos botones: "Cotizar por WhatsApp" y "Ver flota".
3. **Transición hero → flota:** la capa de polvo sube y cubre el corte entre ambas secciones.
4. **Flota fijada (pin):** recorre 4 categorías (excavadoras, tractores, compactadoras y motoniveladoras). En móvil es un carrusel horizontal con `scroll-snap`, sin pin.
5. **Servicios:** dos tarjetas que aparecen al entrar en pantalla.
6. **Cifras:** 4 contadores animados.
7. **CTA final** a pantalla completa y botón flotante de WhatsApp siempre visible.

### Reglas técnicas aplicadas

- Solo se animan `transform` y `opacity`. El pin también usa `pinType: 'transform'`.
- `prefers-reduced-motion: reduce` desactiva Lenis, parallax, pin y reveals; el contenido queda estático.
- En pantallas < 768px el parallax se reduce a la mitad y no hay pins.
- Las imágenes van en AVIF + WebP con `width`/`height`. Las capas del hero se precargan; el resto usa `loading="lazy"`.
- Todas las animaciones viven en un `gsap.matchMedia()`. `initHome()` devuelve `destroyHome()`, que revierte las animaciones, mata los ScrollTriggers, destruye Lenis y quita los listeners. Se llama en `pagehide` y en HMR; si el home se monta en un router, llamarla al cambiar de ruta.

## Estructura

```
index.html               home
src/config.js            marca y WhatsApp provisionales ([NOMBRE], [NÚMERO])
src/home/main.js         animaciones (Lenis + GSAP ScrollTrigger)
src/home/home.css        estilos del home (paleta en :root)
public/assets/img/       placeholders con dimensiones finales
public/assets/README.md  lista de assets a producir
nosotros.html, catalogo.html, servicios.html, assets/   mockup v1
```

## Librerías

| Paquete | Uso |
| --- | --- |
| `gsap` (incluye ScrollTrigger) | Parallax, pin, reveals y contadores |
| `lenis` | Scroll suave |
| `@fontsource/barlow-condensed`, `@fontsource/inter` | Fuentes alojadas localmente: sans condensada pesada para titulares y sans neutra para texto |
| `vite` (dev) | Servidor local y build |
