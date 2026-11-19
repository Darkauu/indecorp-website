/* =========================================================
   Tema claro / oscuro compartido por todas las páginas.
   - Por defecto sigue al sistema operativo (y cambia si el sistema cambia).
   - Al pulsar el botón del navbar, la elección se guarda y manda sobre el sistema.
   El tema inicial lo fija src/shared/theme-init.js antes de pintar (sin parpadeo).
   ========================================================= */

const KEY = 'indecorp:theme';
const THEME_COLOR = { light: '#f6f4f1', dark: '#121416' };

const readStored = () => {
  try { return localStorage.getItem(KEY); } catch { return null; }
};

export function setupThemeToggle(button = document.querySelector('[data-theme-toggle]')) {
  const root = document.documentElement;
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  const meta = document.querySelector('meta[name="theme-color"]');

  const apply = (theme) => {
    root.setAttribute('data-theme', theme);
    if (button) button.setAttribute('aria-label', theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro');
    if (meta) meta.setAttribute('content', THEME_COLOR[theme]);
  };
  apply(root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');

  const onClick = () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem(KEY, next); } catch { /* sin storage: el cambio dura hasta recargar */ }
    // Fundido entre temas (View Transitions: anima opacidad) si el navegador lo permite y hay movimiento.
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (document.startViewTransition && !reduce) document.startViewTransition(() => apply(next));
    else apply(next);
  };
  const onSystemChange = (e) => {
    if (!readStored()) apply(e.matches ? 'dark' : 'light');   // solo si el usuario no eligió
  };

  if (button) button.addEventListener('click', onClick);
  system.addEventListener('change', onSystemChange);
  return () => {
    if (button) button.removeEventListener('click', onClick);
    system.removeEventListener('change', onSystemChange);
  };
}
