# Indecorp · Mockup del sitio web

Mockup navegable (v1) del sitio de **Indecorp**, empresa de renta de maquinaria pesada Caterpillar®.
Su objetivo es validar con el cliente las páginas, la estructura de cada sección y el estilo general antes del desarrollo final.
La distribución interna de cada página puede cambiar.

## Páginas

| Página | Archivo | Secciones |
| --- | --- | --- |
| Inicio | `index.html` | Hero, franja de capacidades, cifras animadas, qué hacemos, propuesta de valor, líneas de equipos, cómo funciona, equipo humano, CTA |
| Nosotros | `nosotros.html` | Hero, historia, línea de tiempo, misión y visión, valores, equipo, clientes, CTA |
| Catálogo | `catalogo.html` | Hero, filtros por categoría, búsqueda por modelo, fichas con especificaciones y disponibilidad, modal "Solicitar equipo", beneficios, CTA |
| Servicios | `servicios.html` | Hero, servicios principales (renta, traslado, operadores), respaldo, modalidades de renta, sectores, proceso, preguntas frecuentes, CTA |

Todas comparten header fijo, footer, botón flotante de WhatsApp y modal de cotización (insertados desde `assets/js/main.js`).

## Cómo verlo

No requiere instalación ni build: abre `index.html` en el navegador.
También se puede publicar tal cual en GitHub Pages.

## Estructura

```
index.html, nosotros.html, catalogo.html, servicios.html
assets/css/styles.css   estilos y animaciones (paleta en variables :root)
assets/js/data.js       categorías y equipos del catálogo
assets/js/main.js       componentes compartidos e interacciones
```

## Personalización rápida

- **Color de acento:** cambia `--accent` y `--accent-dark` en `assets/css/styles.css`.
- **Equipos del catálogo:** edita `assets/js/data.js`. El catálogo y las líneas de equipos del Inicio se generan desde ahí.
- **Teléfono, WhatsApp y correo:** objeto `CONTACT` al inicio de `assets/js/main.js`.
- **Imágenes:** los bloques grises con etiqueta (`data-label`) son placeholders de fotos reales.

## Notas

- Los textos, cifras, teléfonos y clientes son de ejemplo.
- Las especificaciones técnicas son referenciales y deben validarse con las fichas oficiales.
- El formulario de cotización es demostrativo y no envía datos.
- No se usa el logo de Caterpillar (marca registrada); solo se menciona la marca en texto.
