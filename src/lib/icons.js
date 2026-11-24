/* =========================================================
   Íconos (trazos 24x24) y siluetas de maquinaria (placeholders).
   Se usan en el build desde los componentes Icon.astro y MachineShape.astro.
   ========================================================= */

/* ---------- Íconos (trazos simples, 24x24) ---------- */
export const ICONS = {
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
export function icon(name, size) {
  var s = size || 20;
  return '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[name] || "") + "</svg>";
}

/* ---------- Siluetas de maquinaria (placeholders) ---------- */
const A = 'fill="var(--accent)"';
export const SHAPES = {
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
export function machineSvg(shape) {
  return '<svg viewBox="0 0 200 120" fill="currentColor" aria-hidden="true">' + (SHAPES[shape] || SHAPES.excavator) + "</svg>";
}
