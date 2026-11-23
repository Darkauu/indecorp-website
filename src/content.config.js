/* =========================================================
   Colecciones de contenido (Astro Content Layer).
   Hoy los datos vienen de JSON en src/data/. Para el panel del cliente
   (CMS headless, p. ej. Sanity) solo se reemplaza el `loader` de cada
   colección: el esquema, src/lib/catalog.js y las páginas no cambian.
   ========================================================= */

import { defineCollection, reference } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

// Siluetas disponibles mientras no haya fotos reales (ver src/lib/icons.js).
const SHAPES = ['excavator', 'dozer', 'loader', 'roller', 'backhoe', 'grader', 'skid', 'telehandler', 'truck'];

const categories = defineCollection({
  loader: file('src/data/categories.json'),
  schema: z.object({
    order: z.number(),                       // posición en filtros, footer y listados
    name: z.string(),
    description: z.string(),
    shape: z.enum(SHAPES),
  }),
});

const machines = defineCollection({
  loader: file('src/data/machines.json'),
  schema: z.object({
    order: z.number(),                       // posición en el catálogo
    model: z.string(),                       // p. ej. "320" (se muestra como "CAT 320")
    category: reference('categories'),       // id de una categoría existente
    type: z.string(),
    weight: z.string(),                      // peso operativo
    power: z.string(),                       // potencia
    specs: z.array(z.object({ label: z.string(), value: z.string() })).length(2),
  }),
});

export const collections = { categories, machines };
