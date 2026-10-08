/* =========================================================
   INDECORP · Mockup v1
   - Inserta header, footer, botón de WhatsApp y modal de cotización
     compartidos (así cada página solo contiene su contenido).
   - Animaciones: header al hacer scroll, aparición de secciones,
     contadores, acordeón FAQ, filtros del catálogo.
   ========================================================= */

(function () {
  "use strict";

  var DATA = window.INDECORP_DATA || { categories: [], machines: [] };
  var CONTACT = { phone: "+507 0000-0000", whatsapp: "+507 6000-0000", email: "ventas@indecorp.com" };

  /* ---------- Íconos (trazos simples, 24x24) ---------- */
  var ICONS = {
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
    whatsapp: '<path d="M3 21l1.7-5A9 9 0 1 1 8 19.4z"/><path d="M9 9.5c.5 2.5 2.5 4.5 5 5l1.2-1.2 2 .9-.4 1.6c-3.8.4-8.5-4.3-8.1-8.1l1.6-.4.9 2z"/>',
    wrench: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.1L3 17.7 6.3 21l6.3-6.3a4 4 0 0 0 5.1-5.4l-2.6 2.6-2.4-.6-.6-2.4z"/>',
    shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3.5 6"/>',
    truck: '<path d="M2 6h11v10H2zM13 9h4l4 4v3h-8z"/><circle cx="6" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
    key: '<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M16 7l3 3M14 9l2 2"/>',
    award: '<circle cx="12" cy="9" r="6"/><path d="M8.5 14l-2 7 5.5-3 5.5 3-2-7"/>',
    handshake: '<path d="M2 12l4-4 4 2 4-3 4 3 4 4"/><path d="M6 8v6l5 5 3-2 4-4"/><path d="M10 15l2 2"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
    check: '<path d="M4 12l5 5L20 6"/>',
    pin: '<path d="M12 21s7-6 7-12a7 7 0 0 0-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
    mail: '<path d="M3 5h18v14H3z"/><path d="M3 6l9 7 9-7"/>',
    hardhat: '<path d="M3 17h18v3H3zM5 17a7 7 0 0 1 14 0"/><path d="M10 10V6h4v4"/>',
    cog: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/>',
    calendar: '<path d="M3 5h18v16H3zM3 10h18M8 3v4M16 3v4"/>',
    refresh: '<path d="M20 11a8 8 0 0 0-14.9-3M4 13a8 8 0 0 0 14.9 3"/><path d="M5 3v5h5M19 21v-5h-5"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'
  };
  function icon(name, size) {
    var s = size || 20;
    return '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[name] || "") + "</svg>";
  }

  /* ---------- Siluetas de maquinaria (placeholders) ---------- */
  var A = 'fill="var(--accent)"';
  var SHAPES = {
    excavator:
      '<rect x="18" y="94" width="112" height="18" rx="9"/><circle cx="30" cy="103" r="5" fill="#fff" opacity=".35"/><circle cx="118" cy="103" r="5" fill="#fff" opacity=".35"/>' +
      '<rect x="34" y="64" width="84" height="28" rx="3" ' + A + '/><rect x="86" y="38" width="30" height="28" rx="3" ' + A + '/><rect x="91" y="43" width="20" height="14" fill="#fff" opacity=".45"/>' +
      '<path d="M62 66 L138 18 L146 26 L72 74 Z" ' + A + '/><path d="M138 18 L176 58 L168 64 L132 28 Z" ' + A + '/><path d="M166 60 L190 66 L184 88 L162 80 Z"/>',
    dozer:
      '<rect x="30" y="92" width="110" height="20" rx="10"/><rect x="44" y="62" width="90" height="30" rx="3" ' + A + '/><rect x="56" y="34" width="38" height="30" rx="3" ' + A + '/><rect x="62" y="40" width="26" height="14" fill="#fff" opacity=".45"/>' +
      '<path d="M134 74 L160 70 L160 82 L134 84 Z"/><path d="M160 46 Q176 78 160 112 L170 112 Q186 78 170 46 Z" ' + A + '/><path d="M22 84 L44 80 L44 90 L26 96 Z"/>',
    loader:
      '<circle cx="50" cy="96" r="18"/><circle cx="130" cy="96" r="18"/><circle cx="50" cy="96" r="7" fill="#fff" opacity=".35"/><circle cx="130" cy="96" r="7" fill="#fff" opacity=".35"/>' +
      '<rect x="26" y="62" width="120" height="24" rx="3" ' + A + '/><rect x="56" y="30" width="36" height="34" rx="3" ' + A + '/><rect x="62" y="36" width="24" height="16" fill="#fff" opacity=".45"/>' +
      '<path d="M120 64 L168 82 L164 90 L116 72 Z" ' + A + '/><path d="M160 66 L192 72 L188 104 L160 100 Z"/>',
    roller:
      '<circle cx="146" cy="88" r="26"/><circle cx="146" cy="88" r="12" fill="#fff" opacity=".3"/><circle cx="50" cy="96" r="18"/><circle cx="50" cy="96" r="7" fill="#fff" opacity=".35"/>' +
      '<rect x="28" y="64" width="96" height="24" rx="3" ' + A + '/><rect x="50" y="30" width="38" height="36" rx="3" ' + A + '/><rect x="56" y="36" width="26" height="18" fill="#fff" opacity=".45"/><path d="M118 66 L150 56 L156 62 L124 76 Z" ' + A + '/>',
    backhoe:
      '<circle cx="62" cy="96" r="16"/><circle cx="128" cy="98" r="14"/><rect x="46" y="66" width="98" height="22" rx="3" ' + A + '/><rect x="72" y="34" width="34" height="34" rx="3" ' + A + '/><rect x="78" y="40" width="22" height="16" fill="#fff" opacity=".45"/>' +
      '<path d="M140 72 L176 76 L174 84 L140 82 Z" ' + A + '/><path d="M172 64 L196 68 L194 96 L170 92 Z"/>' +
      '<path d="M50 70 L22 34 L30 30 L58 64 Z" ' + A + '/><path d="M22 34 L10 70 L18 72 L30 38 Z" ' + A + '/><path d="M6 68 L22 70 L18 86 L4 82 Z"/>',
    grader:
      '<circle cx="34" cy="98" r="14"/><circle cx="150" cy="98" r="14"/><circle cx="180" cy="98" r="14"/>' +
      '<rect x="20" y="70" width="40" height="10" ' + A + '/><path d="M28 70 L130 60 L130 72 L28 80 Z" ' + A + '/><rect x="124" y="60" width="66" height="26" rx="3" ' + A + '/><rect x="130" y="30" width="34" height="32" rx="3" ' + A + '/><rect x="136" y="36" width="22" height="16" fill="#fff" opacity=".45"/>' +
      '<path d="M70 92 L118 86 L118 94 L70 100 Z"/>',
    skid:
      '<circle cx="72" cy="98" r="14"/><circle cx="118" cy="98" r="14"/><rect x="56" y="54" width="78" height="34" rx="4" ' + A + '/><rect x="76" y="34" width="40" height="24" rx="3" ' + A + '/><rect x="82" y="38" width="28" height="14" fill="#fff" opacity=".45"/>' +
      '<path d="M128 56 L156 72 L152 80 L124 66 Z" ' + A + '/><path d="M150 62 L178 66 L174 98 L150 94 Z"/>',
    telehandler:
      '<circle cx="54" cy="98" r="15"/><circle cx="134" cy="98" r="15"/><rect x="34" y="68" width="120" height="20" rx="3" ' + A + '/><rect x="80" y="36" width="30" height="34" rx="3" ' + A + '/><rect x="85" y="42" width="20" height="16" fill="#fff" opacity=".45"/>' +
      '<path d="M44 66 L166 28 L170 38 L50 76 Z" ' + A + '/><path d="M166 26 L172 26 L172 66 L196 66 L196 70 L166 70 Z"/>',
    truck:
      '<circle cx="40" cy="98" r="14"/><circle cx="120" cy="98" r="14"/><circle cx="156" cy="98" r="14"/>' +
      '<rect x="16" y="50" width="44" height="38" rx="3" ' + A + '/><rect x="22" y="56" width="24" height="16" fill="#fff" opacity=".45"/><rect x="58" y="74" width="20" height="10"/>' +
      '<path d="M76 46 L190 40 L184 88 L80 88 Z" ' + A + '/>'
  };
  function machineSvg(shape) {
    return '<svg viewBox="0 0 200 120" fill="currentColor" aria-hidden="true">' + (SHAPES[shape] || SHAPES.excavator) + "</svg>";
  }

  /* ---------- Componentes compartidos ---------- */
  var page = document.body.getAttribute("data-page");
  var NAV = [
    { id: "inicio", label: "Inicio", href: "index.html" },
    { id: "nosotros", label: "Nosotros", href: "nosotros.html" },
    { id: "catalogo", label: "Catálogo", href: "catalogo.html" },
    { id: "servicios", label: "Servicios", href: "servicios.html" }
  ];

  var headerHtml =
    '<header class="site-header" id="top">' +
    '<div class="container header-inner">' +
    '<a href="index.html" class="logo" aria-label="Indecorp inicio"><span class="logo-mark">I</span><span>INDECORP<small>RENTA DE MAQUINARIA</small></span></a>' +
    '<nav class="nav" id="nav">' +
    NAV.map(function (n) { return '<a href="' + n.href + '"' + (n.id === page ? ' class="active" aria-current="page"' : "") + ">" + n.label + "</a>"; }).join("") +
    "</nav>" +
    '<div class="header-actions">' +
    '<a class="header-phone" href="tel:' + CONTACT.phone.replace(/\s/g, "") + '">' + icon("phone", 16) + CONTACT.phone + "</a>" +
    '<button class="btn btn--accent" data-quote>Cotizar</button>' +
    '<button class="menu-toggle" aria-label="Abrir menú" aria-expanded="false"><span></span><span></span><span></span></button>' +
    "</div></div></header>";

  var footerHtml =
    '<footer class="site-footer"><div class="container">' +
    '<div class="footer-grid">' +
    '<div><a href="index.html" class="logo"><span class="logo-mark">I</span><span>INDECORP<small>RENTA DE MAQUINARIA</small></span></a>' +
    '<p style="margin-top:18px">Renta de maquinaria pesada Caterpillar® con soporte técnico, operadores y transporte para su obra.</p>' +
    '<div class="socials"><a href="#" aria-label="Facebook">FB</a><a href="#" aria-label="Instagram">IG</a><a href="#" aria-label="LinkedIn">IN</a></div></div>' +
    "<div><h4>Navegación</h4><ul>" + NAV.map(function (n) { return '<li><a href="' + n.href + '">' + n.label + "</a></li>"; }).join("") + "</ul></div>" +
    '<div><h4>Catálogo</h4><ul>' + DATA.categories.slice(0, 5).map(function (c) { return '<li><a href="catalogo.html#' + c.id + '">' + c.name + "</a></li>"; }).join("") + "</ul></div>" +
    "<div><h4>Contacto directo</h4><ul>" +
    '<li style="display:flex;gap:10px">' + icon("phone", 16) + CONTACT.phone + "</li>" +
    '<li style="display:flex;gap:10px">' + icon("whatsapp", 16) + "WhatsApp " + CONTACT.whatsapp + "</li>" +
    '<li style="display:flex;gap:10px">' + icon("mail", 16) + CONTACT.email + "</li>" +
    '<li style="display:flex;gap:10px">' + icon("pin", 16) + "Cobertura nacional</li>" +
    "</ul></div></div>" +
    '<div class="footer-bottom"><span>© ' + new Date().getFullYear() + " INDECORP — Todos los derechos reservados.</span><span>Mockup v1 · contenido de ejemplo</span></div>" +
    "</div></footer>" +
    '<a class="float-wa" href="#" aria-label="WhatsApp">' + icon("whatsapp", 28) + "</a>";

  var modalHtml =
    '<div class="modal" id="quote-modal" role="dialog" aria-modal="true" aria-labelledby="quote-title">' +
    '<div class="modal-dialog">' +
    '<button class="modal-close" aria-label="Cerrar">&times;</button>' +
    '<form id="quote-form">' +
    '<span class="eyebrow">Cotización</span><h3 id="quote-title" style="font-size:2rem">Solicite su equipo</h3>' +
    '<p style="font-size:.9rem">Complete el formulario y un asesor le contactará. <em>(Formulario demostrativo, no envía datos.)</em></p>' +
    '<div class="form-row"><div class="field"><label for="q-name">Nombre</label><input id="q-name" required></div>' +
    '<div class="field"><label for="q-company">Empresa</label><input id="q-company"></div></div>' +
    '<div class="form-row"><div class="field"><label for="q-phone">Teléfono</label><input id="q-phone" type="tel" required></div>' +
    '<div class="field"><label for="q-email">Correo</label><input id="q-email" type="email"></div></div>' +
    '<div class="field"><label for="q-machine">Equipo de interés</label><select id="q-machine"><option value="">Seleccione…</option>' +
    DATA.machines.map(function (m) { return "<option>CAT " + m.model + " · " + m.type + "</option>"; }).join("") +
    "</select></div>" +
    '<div class="form-row"><div class="field"><label for="q-period">Modalidad</label><select id="q-period"><option>Por día</option><option>Por semana</option><option>Por mes</option><option>Por proyecto</option></select></div>' +
    '<div class="field"><label for="q-operator">Operador</label><select id="q-operator"><option>Con operador</option><option>Sin operador</option></select></div></div>' +
    '<div class="field"><label for="q-msg">Detalles del proyecto</label><textarea id="q-msg" rows="3"></textarea></div>' +
    '<button class="btn btn--accent btn--block" type="submit">Enviar solicitud <span class="arrow">' + icon("arrow", 16) + "</span></button>" +
    "</form>" +
    '<div class="form-success"><div class="icon-box" style="margin:0 auto 16px">' + icon("check", 22) + '</div><h3>¡Solicitud recibida!</h3><p>Un asesor le contactará en breve.</p><button class="btn btn--outline" data-close>Cerrar</button></div>' +
    "</div></div>";

  document.body.insertAdjacentHTML("afterbegin", headerHtml);
  document.body.insertAdjacentHTML("beforeend", footerHtml + modalHtml);

  /* ---------- Reemplazo de íconos y placeholders declarativos ---------- */
  document.querySelectorAll("[data-icon]").forEach(function (el) {
    el.innerHTML = icon(el.getAttribute("data-icon"), el.getAttribute("data-size") || 22);
  });
  document.querySelectorAll("[data-shape]").forEach(function (el) {
    el.insertAdjacentHTML("afterbegin", machineSvg(el.getAttribute("data-shape")));
  });

  /* ---------- Header: estado al hacer scroll + menú móvil ---------- */
  var header = document.querySelector(".site-header");
  var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 40); };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("nav");
  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("is-open");
    toggle.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  });

  /* ---------- Modal de cotización ---------- */
  var modal = document.getElementById("quote-modal");
  var form = document.getElementById("quote-form");
  var success = modal.querySelector(".form-success");
  function openQuote(machine) {
    form.style.display = "";
    success.classList.remove("is-visible");
    if (machine) {
      var sel = document.getElementById("q-machine");
      Array.prototype.forEach.call(sel.options, function (o) { if (o.text.indexOf("CAT " + machine + " ") === 0) sel.value = o.value; });
    }
    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }
  function closeQuote() { modal.classList.remove("is-open"); document.body.style.overflow = ""; }
  document.addEventListener("click", function (e) {
    var trigger = e.target.closest("[data-quote]");
    if (trigger) { e.preventDefault(); openQuote(trigger.getAttribute("data-quote")); }
    if (e.target === modal || e.target.closest(".modal-close") || e.target.closest("[data-close]")) closeQuote();
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeQuote(); });
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    form.style.display = "none";
    success.classList.add("is-visible");
    form.reset();
  });

  /* ---------- Home: líneas de equipos generadas desde los datos ---------- */
  var linesEl = document.getElementById("lines");
  if (linesEl) {
    linesEl.innerHTML = DATA.categories.map(function (c, i) {
      var count = DATA.machines.filter(function (m) { return m.cat === c.id; }).length;
      return '<a class="line reveal delay-' + (i % 5 > 3 ? 3 : i % 5) + '" href="catalogo.html#' + c.id + '">' +
        '<div class="line-shape">' + machineSvg(c.shape) + "</div>" +
        "<h3>" + c.name + "</h3><p>" + c.desc + "</p>" +
        '<div class="line-foot"><span>' + count + " modelo" + (count === 1 ? "" : "s") + '</span><span class="link-arrow">Ver equipos →</span></div></a>';
    }).join("");
  }

  /* ---------- Catálogo: render + filtros + búsqueda ---------- */
  var grid = document.getElementById("catalog-grid");
  if (grid) {
    var chipsEl = document.getElementById("chips");
    var searchEl = document.getElementById("search");
    var countEl = document.getElementById("results-count");
    var emptyEl = document.getElementById("empty-state");
    var catById = {};
    DATA.categories.forEach(function (c) { catById[c.id] = c; });

    chipsEl.innerHTML = '<button class="chip is-active" data-filter="all">Todos</button>' +
      DATA.categories.map(function (c) { return '<button class="chip" data-filter="' + c.id + '">' + c.name + "</button>"; }).join("");

    grid.innerHTML = DATA.machines.map(function (m) {
      var c = catById[m.cat];
      return '<article class="card machine" data-cat="' + m.cat + '" data-text="' + (m.model + " " + m.type + " " + c.name).toLowerCase() + '">' +
        '<div class="ph" data-label="Foto CAT ' + m.model + '">' + machineSvg(c.shape) +
        '<span class="availability' + (m.available ? "" : " is-busy") + '">' + (m.available ? "Disponible" : "En obra") + "</span></div>" +
        '<div class="card-body"><div><span class="brand-tag">CATERPILLAR</span></div>' +
        "<h3>CAT " + m.model + '</h3><div class="meta">' + m.type + "</div>" +
        '<dl class="specs"><div><dt>Peso operativo</dt><dd>' + m.weight + "</dd></div><div><dt>Potencia</dt><dd>" + m.power + "</dd></div>" +
        "<div><dt>" + m.k3 + "</dt><dd>" + m.v3 + "</dd></div><div><dt>" + m.k4 + "</dt><dd>" + m.v4 + "</dd></div></dl>" +
        '<button class="btn btn--dark btn--block" data-quote="' + m.model + '">Solicitar equipo <span class="arrow">' + icon("arrow", 16) + "</span></button>" +
        "</div></article>";
    }).join("");

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
    if (catById[fromHash]) current = fromHash;
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
