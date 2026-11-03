/* Comportamiento del navbar compartido: estado al hacer scroll y menú móvil. */

export function setupNavbar(navbar = document.querySelector('[data-navbar]')) {
  if (!navbar) return () => {};
  const toggle = navbar.querySelector('.navbar__toggle');
  const links = navbar.querySelector('.navbar__links');

  const onScroll = () => navbar.classList.toggle('is-scrolled', window.scrollY > 40);
  const setOpen = (open) => {
    navbar.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  };
  const onToggle = () => setOpen(!navbar.classList.contains('is-open'));
  const onLink = (e) => { if (e.target.closest('a')) setOpen(false); };
  const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };

  window.addEventListener('scroll', onScroll, { passive: true });
  toggle.addEventListener('click', onToggle);
  links.addEventListener('click', onLink);
  document.addEventListener('keydown', onKey);
  onScroll();

  return () => {
    window.removeEventListener('scroll', onScroll);
    toggle.removeEventListener('click', onToggle);
    links.removeEventListener('click', onLink);
    document.removeEventListener('keydown', onKey);
    setOpen(false);
    navbar.classList.remove('is-scrolled');
  };
}
