/* =========================================================
   Transición entre páginas del sitio.
   Al pulsar un enlace interno a otra página, la página actual se
   desvanece (html.route-cover) y luego se navega. La página de
   destino arranca cubierta gracias al script inline de su <head>
   (html.route-enter) y se desvanece al estar lista.
   ========================================================= */

export const VEIL_KEY = 'indecorp:veil';
const COVER_MS = 350;   // debe coincidir con la transición de html.route-cover

const pagePath = (url) => url.pathname.replace(/\/index\.html$/, '/');

export function initPageTransitions() {
  const html = document.documentElement;
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');

  const onClick = (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const link = e.target.closest('a[href]');
    if (!link || (link.target && link.target !== '_self') || link.hasAttribute('download')) return;

    const url = new URL(link.href, location.href);
    if (url.origin !== location.origin) return;                       // WhatsApp, redes, etc.
    if (pagePath(url) === pagePath(location) && url.search === location.search) return; // misma página: anclas
    if (reduceMotion.matches) return;

    e.preventDefault();
    try { sessionStorage.setItem(VEIL_KEY, '1'); } catch { /* sin storage: solo se pierde el fundido de entrada */ }
    html.classList.add('route-cover');

    // Se navega cuando el velo termina de cubrir (o por tiempo, si transitionend no llega).
    let gone = false;
    const go = () => {
      if (gone) return;
      gone = true;
      html.removeEventListener('transitionend', onCovered);
      window.location.href = url.href;
    };
    const onCovered = (ev) => {
      if (ev.target === html && ev.pseudoElement === '::after' && ev.propertyName === 'opacity') go();
    };
    html.addEventListener('transitionend', onCovered);
    window.setTimeout(go, COVER_MS + 150);
  };

  // Al volver con el botón "atrás" (bfcache) la página quedaría cubierta: se descubre.
  const onPageShow = (e) => {
    if (e.persisted) html.classList.remove('route-cover', 'route-enter');
  };

  document.addEventListener('click', onClick);
  window.addEventListener('pageshow', onPageShow);
  return () => {
    document.removeEventListener('click', onClick);
    window.removeEventListener('pageshow', onPageShow);
    html.classList.remove('route-cover');
  };
}
