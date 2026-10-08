/* =========================================================
   Home · scroll animado
   - Lenis (scroll suave) sincronizado con GSAP ScrollTrigger.
   - Hero por capas con parallax + polvo que funde con la flota.
   - Flota fijada (pin) en escritorio; carrusel CSS en móvil.
   - Reveal de servicios, contadores y parallax del CTA.
   Reglas: solo se animan transform y opacity. Con
   prefers-reduced-motion no hay Lenis, parallax ni pin. En < 768px
   el parallax se reduce a la mitad y no hay pins.
   ========================================================= */

import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// Los estilos se cargan con <link> en index.html (no desde JS) para que no haya parpadeo sin estilos.

import { CONFIG, waLink } from '../config.js';

gsap.registerPlugin(ScrollTrigger);

const QUERIES = {
  isDesktop: '(min-width: 768px)',
  motion: '(prefers-reduced-motion: no-preference)',
};

/* ---------- Utilidades sin animación ---------- */

function setupWhatsApp(root) {
  root.querySelectorAll('[data-wa]').forEach((a) => {
    a.href = waLink(a.dataset.wa || undefined);
    a.target = '_blank';
    a.rel = 'noopener';
  });
  root.querySelectorAll('[data-wa-display]').forEach((el) => {
    el.textContent = CONFIG.whatsappDisplay;
  });
}

function setupMenu(header) {
  const toggle = header.querySelector('.menu-toggle');
  const nav = header.querySelector('.nav');
  const setOpen = (open) => {
    header.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  };
  const onToggle = () => setOpen(!header.classList.contains('nav-open'));
  const onNav = (e) => { if (e.target.closest('a')) setOpen(false); };
  toggle.addEventListener('click', onToggle);
  nav.addEventListener('click', onNav);
  return () => {
    toggle.removeEventListener('click', onToggle);
    nav.removeEventListener('click', onNav);
    setOpen(false);
  };
}

/* ---------- Scroll suave ---------- */

function createSmoothScroll() {
  const lenis = new Lenis({ autoRaf: false, anchors: true }); // las anclas respetan scroll-margin-top
  const tick = (time) => lenis.raf(time * 1000);
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  return {
    lenis,
    destroy() {
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
    },
  };
}

/* ---------- Hero ---------- */

let introPlayed = false;

function heroIntro(hero) {
  // Solo en la primera carga (no al cruzar el breakpoint) y si el hero está a la vista.
  if (introPlayed || window.scrollY > hero.offsetHeight / 2) return;
  introPlayed = true;
  const bgImg = hero.querySelector('.hero-bg img');
  const machine = hero.querySelector('.hero-machine');
  const dust = hero.querySelector('.hero-dust');
  const title = hero.querySelector('h1');
  const rest = hero.querySelectorAll('.hero-copy > :not(h1)');
  // Valores finales explícitos: así GSAP no toma como destino el estado previo de .intro-pending.
  gsap.set([bgImg, machine, dust, title, ...rest], { x: 0, y: 0, xPercent: 0, yPercent: 0, scale: 1, opacity: 1 });
  gsap.timeline({ defaults: { ease: 'power3.out' } })
    .from(bgImg, { scale: 1.08, duration: 1.8 }, 0)
    .from(machine, { xPercent: 12, opacity: 0, duration: 1.3 }, 0.1)
    .from(dust, { yPercent: 30, duration: 1.4 }, 0.1)
    // El titular no se oculta (es candidato a LCP): solo se desplaza.
    .from(title, { y: 30, duration: 0.9 }, 0)
    .from(rest, { y: 24, opacity: 0, duration: 0.8, stagger: 0.08 }, 0.15);
}

function heroParallax(hero, k) {
  const h = () => hero.offsetHeight;
  gsap.timeline({
    defaults: { ease: 'none', duration: 1 },   // duración 1 = todo el recorrido del hero
    scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true, invalidateOnRefresh: true },
  })
    // Cada capa a distinta velocidad: fondo lento, máquina media, polvo rápido hacia arriba.
    .to(hero.querySelector('.hero-bg'), { y: () => h() * 0.12 * k }, 0)
    .to(hero.querySelector('.hero-machine'), { y: () => h() * 0.05 * k, scale: 1 + 0.06 * k }, 0)
    .to(hero.querySelector('.hero-copy'), { y: () => h() * 0.2 * k }, 0)
    .to(hero.querySelector('.hero-copy'), { opacity: 0, duration: 0.55 }, 0)
    .to(hero.querySelector('.hero-scroll'), { opacity: 0, duration: 0.15 }, 0)
    // Transición: el polvo sube y cubre el corte con la sección de flota.
    .to(hero.querySelector('.hero-dust'), { y: () => -h() * 0.4 * k }, 0);
}

/* ---------- Flota fijada (solo escritorio con movimiento) ---------- */

function fleetPin(section, smooth) {
  const slides = gsap.utils.toArray(section.querySelectorAll('.fleet-slide'));
  const items = [...section.querySelectorAll('.fleet-index li')];
  const n = slides.length;
  document.documentElement.classList.add('has-pin');

  const setActive = (i) => items.forEach((li, j) => {
    li.classList.toggle('is-active', i === j);
    li.querySelector('button').setAttribute('aria-current', i === j ? 'true' : 'false');
  });
  setActive(0);
  gsap.set(slides.slice(1), { autoAlpha: 0 });

  const tl = gsap.timeline({
    defaults: { ease: 'power2.inOut', duration: 0.7 },
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: () => '+=' + window.innerHeight * (n - 1),
      pin: true,
      pinType: 'transform',            // fija con transform (sin saltos de layout)
      scrub: 0.5,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      // Tiempo del timeline = índice de la categoría (las etiquetas s0..s3 están en 0..3).
      onUpdate: (self) => setActive(Math.min(n - 1, Math.round(self.progress * self.animation.duration()))),
    },
  });

  tl.addLabel('s0', 0);
  for (let i = 1; i < n; i++) {
    const prev = slides[i - 1];
    const next = slides[i];
    const at = i - 1 + 0.3;
    tl.to(prev.querySelector('.fleet-media img'), { xPercent: -14, opacity: 0 }, at)
      .to(prev.querySelector('.fleet-word'), { xPercent: -18, opacity: 0 }, at)
      .to(prev.querySelector('.fleet-copy'), { y: -40, opacity: 0 }, at)
      .set(prev, { autoAlpha: 0 }, at + 0.7)
      .set(next, { autoAlpha: 1 }, at)
      .from(next.querySelector('.fleet-media img'), { xPercent: 14, opacity: 0 }, at)
      .from(next.querySelector('.fleet-word'), { xPercent: 18, opacity: 0 }, at)
      .from(next.querySelector('.fleet-copy'), { y: 40, opacity: 0 }, at + 0.1)
      .addLabel(`s${i}`, i);
  }
  tl.fromTo(section.querySelector('.fleet-progress span'), { scaleX: 1 / n }, { scaleX: 1, ease: 'none', duration: n - 1 }, 0);

  // Índice lateral: salta a la categoría.
  const onIndex = (e) => {
    const btn = e.target.closest('[data-goto]');
    if (!btn) return;
    const st = tl.scrollTrigger;
    const progress = tl.labels[`s${btn.dataset.goto}`] / tl.duration();
    smooth.lenis.scrollTo(st.start + (st.end - st.start) * progress);
  };
  section.addEventListener('click', onIndex);

  return () => {
    section.removeEventListener('click', onIndex);
    document.documentElement.classList.remove('has-pin');
    items.forEach((li) => li.classList.remove('is-active'));
  };
}

/* ---------- Reveals, contadores y CTA ---------- */

function reveals(root) {
  root.querySelectorAll('[data-reveal]').forEach((el) => {
    gsap.from(el, {
      y: 48,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      delay: (Number(el.dataset.reveal) || 0) * 0.12,
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    });
  });
}

function counters(root) {
  const els = [...root.querySelectorAll('[data-count]')];
  els.forEach((el) => {
    const end = Number(el.dataset.count);
    const state = { value: 0 };
    el.textContent = '0';
    gsap.to(state, {
      value: end,
      duration: 1.6,
      ease: 'power2.out',
      onUpdate: () => { el.textContent = String(Math.round(state.value)); },
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    });
  });
  // Al desmontar, los números vuelven a su valor final (contenido estático).
  return () => els.forEach((el) => { el.textContent = el.dataset.count; });
}

function ctaParallax(section, k) {
  const h = () => section.offsetHeight;
  gsap.fromTo(section.querySelector('.cta-bg'),
    { y: () => -h() * 0.08 * k },
    {
      y: () => h() * 0.08 * k,
      ease: 'none',
      scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true, invalidateOnRefresh: true },
    });
}

/* ---------- Montaje / desmontaje ---------- */

export function initHome(root = document) {
  const header = root.querySelector('.site-header');
  const hero = root.querySelector('.hero');
  const fleet = root.querySelector('.fleet');
  const cta = root.querySelector('.cta');

  setupWhatsApp(root);
  const cleanupMenu = setupMenu(header);

  // gsap.matchMedia revierte automáticamente todas las animaciones y
  // ScrollTriggers creados dentro cuando cambia una condición o al desmontar.
  const mm = gsap.matchMedia();
  mm.add(QUERIES, (ctx) => {
    const { isDesktop, motion } = ctx.conditions;
    const cleanups = [];

    ScrollTrigger.create({
      start: 40,
      end: 'max',
      onToggle: (self) => header.classList.toggle('is-scrolled', self.isActive),
    });
    cleanups.push(() => header.classList.remove('is-scrolled'));

    if (motion) {
      const k = isDesktop ? 1 : 0.5;          // parallax a la mitad en móvil
      const smooth = createSmoothScroll();
      cleanups.push(() => smooth.destroy());

      heroIntro(hero);
      heroParallax(hero, k);
      if (isDesktop) cleanups.push(fleetPin(fleet, smooth));   // sin pins en móvil
      reveals(root);
      cleanups.push(counters(root));
      ctaParallax(cta, k);
    }

    return () => cleanups.reverse().forEach((fn) => fn());
  });
  // mm.add se ejecuta de forma síncrona: la intro ya fijó sus estados iniciales,
  // así que se puede quitar el estado previo de CSS sin que se vea un salto.
  document.documentElement.classList.remove('intro-pending');

  return function destroyHome() {
    mm.revert();
    ScrollTrigger.getAll().forEach((t) => t.kill());
    cleanupMenu();
  };
}

let destroy = initHome();

// Limpieza al salir de la página (o al cambiar de ruta si esto se monta en un router).
window.addEventListener('pagehide', (e) => {
  if (e.persisted) return;          // se conserva en bfcache
  destroy?.();
  destroy = null;
});
window.addEventListener('pageshow', (e) => {
  if (e.persisted && !destroy) destroy = initHome();
});

if (import.meta.hot) {
  import.meta.hot.dispose(() => destroy?.());
}
