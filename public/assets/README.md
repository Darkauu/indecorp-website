# Assets del home: lista de producción

Las imágenes de `img/` son **placeholders** con las dimensiones finales. Cada una lleva la etiqueta `PLACEHOLDER · nombre · tamaño`.
Para reemplazarlas, exporta el material final con **el mismo nombre y tamaño**, en **AVIF y WebP**. No hace falta tocar el código.

## Reglas de exportación

- **Formatos:** AVIF (calidad ≈ 50) y WebP (calidad ≈ 72), en sRGB. Se entregan los dos formatos de cada archivo.
- **Transparencia:** solo donde la tabla dice **Sí**. Recorte limpio, sin halos blancos, con el canal alfa en el mismo archivo.
- **Proporción:** no cambies el tamaño en píxeles. Las etiquetas `width`/`height` del HTML lo usan para evitar saltos de layout.
- **Peso máximo** para cumplir la meta (Lighthouse móvil ≥ 85, LCP < 2.5 s):
  - Capas del hero, por archivo: AVIF ≤ 150 KB en escritorio y ≤ 90 KB en móvil.
  - Resto de imágenes: AVIF ≤ 120 KB.
- **Video:** no se usa video en esta iteración.

## Lista de archivos

| # | Archivo (sin extensión) | Tamaño (px) | Transparencia | Dónde se usa | Qué debe mostrar |
|---|---|---|---|---|---|
| 1 | `img/hero/hero-bg-2560` | 2560 × 1440 | No | Hero, capa de fondo (escritorio, pantallas grandes) | Cielo y terreno de obra **sin maquinaria**. Horizonte a ~55–60 % de la altura. Zona izquierda limpia para el titular. |
| 2 | `img/hero/hero-bg-1280` | 1280 × 720 | No | Hero, capa de fondo (escritorio) | La misma imagen que #1, reducida. |
| 3 | `img/hero/hero-bg-mobile-828` | 828 × 1472 | No | Hero, capa de fondo (móvil, vertical) | El mismo escenario en vertical. Mitad superior despejada para el texto. |
| 4 | `img/hero/hero-machine-1600` | 1600 × 1000 | **Sí** | Hero, capa de máquina | Máquina principal (p. ej. excavadora) **recortada**, vista lateral o 3/4, apoyada en el borde inferior, con sombra de contacto suave. |
| 5 | `img/hero/hero-machine-800` | 800 × 500 | **Sí** | Hero, capa de máquina (móvil) | La misma imagen que #4, reducida. |
| 6 | `img/hero/hero-dust-2560` | 2560 × 800 | **Sí** | Hero, capa de polvo en primer plano | Nube de polvo o tierra. Parte superior semitransparente y difusa. El **~45 % inferior debe terminar 100 % opaco en `#e9e5df`** (variable `--sand`) para fundirse con la sección de flota. |
| 7 | `img/hero/hero-dust-1280` | 1280 × 400 | **Sí** | Hero, capa de polvo (móvil) | La misma imagen que #6, reducida. |
| 8 | `img/fleet/fleet-excavadoras-1400` | 1400 × 900 | **Sí** | Flota, categoría 01 | Excavadora recortada, centrada, con margen de ~5 %. |
| 9 | `img/fleet/fleet-excavadoras-700` | 700 × 450 | **Sí** | Flota (móvil) | La misma imagen que #8, reducida. |
| 10 | `img/fleet/fleet-tractores-1400` | 1400 × 900 | **Sí** | Flota, categoría 02 | Tractor de oruga (bulldozer) recortado. |
| 11 | `img/fleet/fleet-tractores-700` | 700 × 450 | **Sí** | Flota (móvil) | La misma imagen que #10, reducida. |
| 12 | `img/fleet/fleet-compactadoras-1400` | 1400 × 900 | **Sí** | Flota, categoría 03 | Compactadora de rodillo recortada. |
| 13 | `img/fleet/fleet-compactadoras-700` | 700 × 450 | **Sí** | Flota (móvil) | La misma imagen que #12, reducida. |
| 14 | `img/fleet/fleet-motoniveladoras-1400` | 1400 × 900 | **Sí** | Flota, categoría 04 | Motoniveladora recortada. |
| 15 | `img/fleet/fleet-motoniveladoras-700` | 700 × 450 | **Sí** | Flota (móvil) | La misma imagen que #14, reducida. |
| 16 | `img/services/servicio-alquiler-1200` | 1200 × 900 | No | Tarjeta "Alquiler con o sin operador" | Foto en obra: equipo trabajando, idealmente con operador visible. |
| 17 | `img/services/servicio-alquiler-600` | 600 × 450 | No | Misma tarjeta (móvil) | La misma imagen que #16, reducida. |
| 18 | `img/services/servicio-traslado-1200` | 1200 × 900 | No | Tarjeta "Traslado de maquinaria" | Cabezal con cama baja transportando una máquina. |
| 19 | `img/services/servicio-traslado-600` | 600 × 450 | No | Misma tarjeta (móvil) | La misma imagen que #18, reducida. |
| 20 | `img/cta/cta-bg-2560` | 2560 × 1440 | No | CTA final a pantalla completa | Foto de obra con ambiente (atardecer o amanecer). Lleva un oscurecido encima para que el texto blanco se lea. |
| 21 | `img/cta/cta-bg-1280` | 1280 × 720 | No | CTA final | La misma imagen que #20, reducida. |
| 22 | `img/cta/cta-bg-mobile-828` | 828 × 1472 | No | CTA final (móvil, vertical) | La misma escena en vertical. |

Total: 22 imágenes × 2 formatos = **44 archivos**.

## Otros assets pendientes

| Archivo | Formato | Notas |
|---|---|---|
| `/favicon.svg` (en `public/`) | SVG | Reemplazar por el isotipo de la marca [NOMBRE]. |
| Logo | SVG | El header y el footer usan un logo de texto provisional (`.logo` en `index.html`). |

## Contenido provisional (no son imágenes)

- **Marca [NOMBRE]:** texto "INDECORP" en `index.html` y `CONFIG.brand` en `src/config.js`.
- **WhatsApp [NÚMERO]:** `CONFIG.whatsapp` y `CONFIG.whatsappDisplay` en `src/config.js`. Todos los botones de WhatsApp se generan desde ahí.
- **Paleta [COLORES]:** variables en `:root` de `src/home/home.css`. Si cambia `--sand`, hay que reexportar la capa de polvo (#6 y #7) con ese mismo color base.
