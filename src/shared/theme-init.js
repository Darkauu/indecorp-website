/* Se inserta en línea al inicio del <head> de cada página (vite.config.js) para fijar el
   tema antes del primer pintado: la elección guardada o, si no hay, la del sistema operativo. */
(function () {
  var theme = null;
  try { theme = localStorage.getItem('indecorp:theme'); } catch (e) {}
  if (theme !== 'light' && theme !== 'dark') {
    theme = window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  document.documentElement.setAttribute('data-theme', theme);
})();
