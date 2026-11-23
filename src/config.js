/* Datos provisionales del brief. Reemplazar antes de publicar.
   Se usan en el build (componentes Astro) y en el navegador (enlaces y formulario de WhatsApp). */
export const CONFIG = {
  brand: 'INDECORP',                 // [NOMBRE] (también aparece como texto en las páginas)
  whatsapp: '50700000000',           // [NÚMERO] en formato internacional, sin "+" ni espacios
  whatsappDisplay: '+507 0000-0000', // [NÚMERO] tal como se muestra en pantalla
  phone: '+507 0000-0000',           // teléfono que se muestra en el navbar y el footer
  phoneHref: 'tel:+50700000000',
  email: 'ventas@indecorp.com',
  defaultMessage: 'Hola, quiero cotizar maquinaria pesada.',
};

export const waLink = (message = CONFIG.defaultMessage) =>
  `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;
