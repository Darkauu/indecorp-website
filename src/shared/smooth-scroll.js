/* =========================================================
   Scroll suave compartido (Lenis) para todas las páginas.
   - Con GSAP (home): Lenis avanza en gsap.ticker y avisa a ScrollTrigger,
     así scroll y animaciones van en el mismo frame.
   - Sin GSAP (páginas internas): Lenis usa su propio requestAnimationFrame.
   Con prefers-reduced-motion no se crea (scroll nativo).
   ========================================================= */

import Lenis from 'lenis';

export const prefersReducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

export function createSmoothScroll({ gsap, ScrollTrigger } = {}) {
  // Las anclas internas no las maneja Lenis: el home usa su fundido entre secciones.
  const lenis = new Lenis({ autoRaf: !gsap });
  if (!gsap) return { lenis, destroy: () => lenis.destroy() };

  const tick = (time) => lenis.raf(time * 1000);
  if (ScrollTrigger) lenis.on('scroll', ScrollTrigger.update);
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
