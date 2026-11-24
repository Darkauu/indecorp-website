/* =========================================================
   INDECORP · comportamiento de las páginas internas (Nosotros, Catálogo, Servicios).
   El marcado (navbar, footer, formulario, fichas del catálogo) ya viene
   en el HTML desde el build de Astro; aquí solo va la interacción:
   WhatsApp, navbar, scroll suave, formulario, filtros del catálogo,
   acordeón FAQ, apariciones al hacer scroll y contadores.
   ========================================================= */

import { initPageTransitions } from '../page-transitions.js';
import { setupNavbar } from '../shared/navbar.js';
import { createSmoothScroll, prefersReducedMotion } from '../shared/smooth-scroll.js';
import { waLink } from '../config.js';
import { createMachineSearch } from './machine-search.js';

initPageTransitions();   // fundido al cambiar de página (compartido con el home)

(function () {
  "use strict";

  // Datos del catálogo que deja el build (src/layouts/SitePage.astro) para el buscador del formulario.
  var dataEl = document.getElementById("catalog-data");
  var DATA = dataEl ? JSON.parse(dataEl.textContent) : { categories: [], machines: [] };

  /* ---------- Enlaces de WhatsApp → número configurado (src/config.js) ---------- */
  // El botón "Cotizar" del navbar también lleva data-wa (para el home); aquí abre el formulario.
  document.querySelectorAll("[data-wa]:not([data-quote])").forEach(function (a) {
    a.href = waLink(a.getAttribute("data-wa") || undefined);
    a.target = "_blank";
    a.rel = "noopener";
  });

  /* ---------- Navbar compartido (src/shared/navbar.*) ---------- */
  setupNavbar();

  /* ---------- Scroll suave, igual que en el home (src/shared/smooth-scroll.js) ---------- */
  var smooth = prefersReducedMotion() ? null : createSmoothScroll();

  /* ---------- Modal de cotización ---------- */
  var modal = document.getElementById("quote-modal");
  var form = document.getElementById("quote-form");
  var success = modal.querySelector(".form-success");
  var catById = {};
  DATA.categories.forEach(function (c) { catById[c.id] = c.name; });
  var machineSearch = createMachineSearch({
    input: document.getElementById("q-machine"),
    list: document.getElementById("q-machine-list"),
    clearButton: modal.querySelector(".machine-search__clear"),
    machines: DATA.machines,
    categoryName: function (id) { return catById[id] || ""; },
  });

  // machine: modelo del catálogo (ej. "320") si viene de una tarjeta; vacío si viene de otro CTA.
  function openQuote(machine) {
    form.style.display = "";
    success.classList.remove("is-visible");
    machineSearch.reset(machine || null);
    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
    if (smooth) smooth.lenis.stop();   // la página no se desplaza detrás del formulario
  }
  function closeQuote() {
    modal.classList.remove("is-open");
    document.body.style.overflow = "";
    if (smooth) smooth.lenis.start();
  }
  document.addEventListener("click", function (e) {
    var trigger = e.target.closest("[data-quote]");
    if (trigger) { e.preventDefault(); openQuote(trigger.getAttribute("data-quote")); }
    if (e.target === modal || e.target.closest(".modal-close") || e.target.closest("[data-close]")) closeQuote();
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeQuote(); });
  // Envío: arma el mensaje y abre WhatsApp (wa.me) con el número de src/config.js.
  function field(id) { return document.getElementById(id).value.trim(); }
  function optional(label, id) { return field(id) ? "*" + label + ":* " + field(id) : null; }   // se omite si está vacío
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var lines = [
      "Hola, quiero solicitar una cotización:",
      "",
      "*Nombre:* " + field("q-name"),
      optional("Empresa", "q-company"),
      "*Teléfono:* " + field("q-phone"),
      optional("Correo", "q-email"),
      "*Equipo de interés:* " + (machineSearch.getValue() || "Por definir"),
      "*Modalidad:* " + field("q-period"),
      "*Operador:* " + field("q-operator"),
      optional("Detalles", "q-msg"),
    ].filter(function (line) { return line !== null; });
    var url = waLink(lines.join("\n"));
    window.open(url, "_blank", "noopener");             // en el mismo clic: los navegadores no lo bloquean
    success.querySelector(".form-success__link").href = url; // por si aun así no se abrió
    form.style.display = "none";
    success.classList.add("is-visible");
    form.reset();
    machineSearch.reset(null);
  });

  /* ---------- Catálogo: filtros + búsqueda (las fichas vienen del build) ---------- */
  var grid = document.getElementById("catalog-grid");
  if (grid) {
    var chipsEl = document.getElementById("chips");
    var searchEl = document.getElementById("search");
    var countEl = document.getElementById("results-count");
    var emptyEl = document.getElementById("empty-state");
    var categoryIds = {};
    DATA.categories.forEach(function (c) { categoryIds[c.id] = true; });

    var current = "all";
    function apply() {
      var q = searchEl.value.trim().toLowerCase();
      var shown = 0;
      grid.querySelectorAll(".machine").forEach(function (card) {
        var ok = (current === "all" || card.getAttribute("data-cat") === current) &&
          (!q || card.getAttribute("data-text").indexOf(q) !== -1);
        card.classList.toggle("is-hidden", !ok);
        card.classList.remove("is-entering");
        if (ok) { void card.offsetWidth; card.classList.add("is-entering"); card.style.animationDelay = (shown * 40) + "ms"; shown++; }
      });
      countEl.textContent = shown + " equipo" + (shown === 1 ? "" : "s") + " encontrado" + (shown === 1 ? "" : "s");
      emptyEl.classList.toggle("is-visible", shown === 0);
      chipsEl.querySelectorAll(".chip").forEach(function (ch) { ch.classList.toggle("is-active", ch.getAttribute("data-filter") === current); });
    }
    chipsEl.addEventListener("click", function (e) {
      var chip = e.target.closest(".chip");
      if (!chip) return;
      current = chip.getAttribute("data-filter");
      history.replaceState(null, "", current === "all" ? location.pathname : "#" + current);
      apply();
    });
    searchEl.addEventListener("input", apply);
    var fromHash = location.hash.slice(1);
    if (categoryIds[fromHash]) current = fromHash;
    apply();
  }

  /* ---------- Acordeón FAQ ---------- */
  document.querySelectorAll(".faq-q").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.parentElement;
      var panel = item.querySelector(".faq-a");
      var open = item.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(open));
      panel.style.maxHeight = open ? panel.scrollHeight + "px" : 0;
    });
  });

  /* ---------- Aparición al hacer scroll + contadores ---------- */
  function countUp(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var dur = 1400, start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  var revealEls = document.querySelectorAll(".reveal, [data-count]");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        if (el.hasAttribute("data-count")) countUp(el); else el.classList.add("is-visible");
        io.unobserve(el);
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) {
      if (el.hasAttribute("data-count")) el.textContent = el.getAttribute("data-count"); else el.classList.add("is-visible");
    });
  }
})();
