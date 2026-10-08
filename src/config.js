/* Datos provisionales del brief. Reemplazar antes de publicar. */
export const CONFIG = {
  brand: 'INDECORP',                 // [NOMBRE] (también aparece como texto en index.html)
  whatsapp: '50700000000',           // [NÚMERO] en formato internacional, sin "+" ni espacios
  whatsappDisplay: '+507 0000-0000', // [NÚMERO] tal como se muestra en pantalla
  defaultMessage: 'Hola, quiero cotizar maquinaria pesada.',
};

export const waLink = (message = CONFIG.defaultMessage) =>
  `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;
