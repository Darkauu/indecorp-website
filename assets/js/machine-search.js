/* =========================================================
   Buscador ligero de equipos (combobox ARIA 1.2) para el
   formulario de cotización. Sin dependencias.
   - Filtra mientras se escribe, sin distinguir mayúsculas ni acentos
     (cada palabra debe aparecer en modelo, tipo o categoría).
   - Teclado: ↑/↓ recorre, Enter elige, Escape cierra la lista.
   - Si se escribe algo que no está en el catálogo, se conserva como
     texto libre (getValue() lo devuelve tal cual).
   ========================================================= */

const MAX_RESULTS = 8;

const normalize = (text) => text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();

export function createMachineSearch({ input, list, clearButton, machines, categoryName }) {
  const items = machines.map((m) => {
    const label = `CAT ${m.model} · ${m.type}`;
    return { machine: m, label, haystack: normalize(`cat ${m.model} ${m.type} ${categoryName(m.cat)}`) };
  });
  let selected = null;
  let results = [];
  let active = -1;

  const isOpen = () => !list.hidden;

  function render() {
    list.innerHTML = '';
    if (!results.length) {
      const empty = document.createElement('li');
      empty.className = 'machine-search__empty';
      empty.textContent = 'No está en el catálogo: lo enviaremos tal cual lo escribiste.';
      list.appendChild(empty);
      return;
    }
    results.forEach((item, i) => {
      const li = document.createElement('li');
      li.id = `${list.id}-opt-${i}`;
      li.className = 'machine-search__option';
      li.setAttribute('role', 'option');
      li.setAttribute('aria-selected', String(i === active));
      li.innerHTML = `<strong>CAT ${item.machine.model}</strong><span>${item.machine.type}</span>`;
      li.addEventListener('pointerdown', (e) => {   // pointerdown + preventDefault: el input no pierde el foco
        e.preventDefault();
        choose(item);
      });
      list.appendChild(li);
    });
  }

  function search() {
    const tokens = normalize(selected ? '' : input.value).split(/\s+/).filter(Boolean);
    const found = items.filter((item) => tokens.every((t) => item.haystack.includes(t)));
    // Primero los modelos que empiezan por lo escrito (ej. "3" → 313 GC, 320, 336, 305 CR, 308 CR).
    const first = tokens[0] || '';
    const startsWith = (item) => normalize(item.machine.model).startsWith(first);
    found.sort((a, b) => Number(!startsWith(a)) - Number(!startsWith(b)));   // sort estable: conserva el orden del catálogo
    results = found.slice(0, MAX_RESULTS);
    active = -1;
  }

  function open() {
    search();
    render();
    list.hidden = false;
    input.setAttribute('aria-expanded', 'true');
    input.removeAttribute('aria-activedescendant');
  }

  function close() {
    list.hidden = true;
    input.setAttribute('aria-expanded', 'false');
    input.removeAttribute('aria-activedescendant');
    active = -1;
  }

  function setActive(i) {
    active = i;
    [...list.querySelectorAll('[role="option"]')].forEach((li, j) => li.setAttribute('aria-selected', String(j === i)));
    const current = list.querySelector(`#${list.id}-opt-${i}`);
    if (current) {
      input.setAttribute('aria-activedescendant', current.id);
      current.scrollIntoView({ block: 'nearest' });
    }
  }

  function choose(item) {
    selected = item;
    input.value = item.label;
    clearButton.hidden = false;
    close();
  }

  function clear() {
    selected = null;
    input.value = '';
    clearButton.hidden = true;
    close();
  }

  input.addEventListener('focus', open);
  input.addEventListener('click', () => { if (!isOpen()) open(); });
  input.addEventListener('input', () => {
    selected = null;                       // al editar, deja de ser una selección del catálogo
    clearButton.hidden = !input.value;
    open();
  });
  input.addEventListener('blur', close);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!isOpen()) open();
      if (!results.length) return;
      const step = e.key === 'ArrowDown' ? 1 : -1;
      setActive((active + step + results.length) % results.length);
    } else if (e.key === 'Enter' && isOpen() && active >= 0) {
      e.preventDefault();                  // elige la opción en vez de enviar el formulario
      choose(results[active]);
    } else if (e.key === 'Escape' && isOpen()) {
      e.stopPropagation();                 // cierra la lista, no el formulario
      close();
    }
  });
  clearButton.addEventListener('click', () => { clear(); input.focus(); });

  return {
    /** Selecciona un modelo del catálogo (ej. "320") o vacía el campo si no se indica. */
    reset(model) {
      const item = model && items.find((it) => it.machine.model === model);
      if (item) choose(item); else clear();
    },
    /** Texto para el mensaje: el equipo elegido, lo escrito a mano o "" si está vacío. */
    getValue() {
      return selected ? selected.label : input.value.trim();
    },
  };
}
