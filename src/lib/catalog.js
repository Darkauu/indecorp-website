/* =========================================================
   Acceso único a los datos del catálogo para páginas y componentes.
   Devuelve objetos planos ordenados por `order`. Si mañana los datos
   vienen de un CMS, este archivo sigue siendo la única puerta de entrada.
   ========================================================= */

import { getCollection } from 'astro:content';

const byOrder = (a, b) => a.order - b.order;   // getCollection no garantiza el orden de la fuente

export async function getCategories() {
  const entries = await getCollection('categories');
  return entries.map((entry) => ({ id: entry.id, ...entry.data })).sort(byOrder);
}

export async function getMachines() {
  const entries = await getCollection('machines');
  return entries
    .map((entry) => ({ id: entry.id, ...entry.data, category: entry.data.category.id }))
    .sort(byOrder);
}

/** Categorías y equipos, con cada equipo enlazado a su categoría (`machine.categoryData`). */
export async function getCatalog() {
  const [categories, machines] = await Promise.all([getCategories(), getMachines()]);
  const byId = new Map(categories.map((c) => [c.id, c]));
  return {
    categories,
    machines: machines.map((m) => ({ ...m, categoryData: byId.get(m.category) })),
  };
}
