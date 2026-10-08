/* =========================================================
   Datos del mockup: categorías y equipos.
   Las especificaciones son REFERENCIALES (aproximadas) y
   deben validarse con la ficha técnica oficial antes de publicar.
   ========================================================= */

window.INDECORP_DATA = {
  categories: [
    { id: "excavadoras",     name: "Excavadoras",          shape: "excavator",  desc: "Excavación profunda, zanjas y movimiento de tierras." },
    { id: "mini-excavadoras",name: "Mini excavadoras",     shape: "excavator",  desc: "Equipos compactos para obras urbanas y espacios reducidos." },
    { id: "retroexcavadoras",name: "Retroexcavadoras",     shape: "backhoe",    desc: "Pala cargadora y retro en un solo equipo versátil." },
    { id: "tractores",       name: "Tractores de oruga",   shape: "dozer",      desc: "Bulldozers para empuje, corte y nivelación." },
    { id: "cargadores",      name: "Cargadores frontales", shape: "loader",     desc: "Carga masiva y acarreo de materiales en patio y cantera." },
    { id: "motoniveladoras", name: "Motoniveladoras",      shape: "grader",     desc: "Nivelación y perfilado de precisión para vialidad." },
    { id: "compactadoras",   name: "Compactadoras",        shape: "roller",     desc: "Rodillos lisos y pata de cabra para suelos y asfalto." },
    { id: "minicargadores",  name: "Minicargadores",       shape: "skid",       desc: "Carga y limpieza en espacios reducidos." },
    { id: "telehandlers",    name: "Manipuladores telescópicos", shape: "telehandler", desc: "Elevación y manipulación de cargas en altura." },
    { id: "camiones",        name: "Camiones articulados", shape: "truck",      desc: "Acarreo de material en terrenos exigentes." }
  ],

  machines: [
    { model: "313 GC",  cat: "excavadoras",      type: "Excavadora hidráulica", weight: "13 t",   power: "94 HP",  k3: "Cucharón",         v3: "0.52 m³", k4: "Prof. excavación", v4: "5.1 m",  available: true },
    { model: "320",     cat: "excavadoras",      type: "Excavadora hidráulica", weight: "22 t",   power: "162 HP", k3: "Cucharón",         v3: "1.19 m³", k4: "Prof. excavación", v4: "6.7 m",  available: true },
    { model: "336",     cat: "excavadoras",      type: "Excavadora hidráulica", weight: "37 t",   power: "311 HP", k3: "Cucharón",         v3: "1.88 m³", k4: "Prof. excavación", v4: "7.4 m",  available: false },
    { model: "305 CR",  cat: "mini-excavadoras", type: "Mini excavadora",       weight: "5.3 t",  power: "46 HP",  k3: "Cucharón",         v3: "0.18 m³", k4: "Prof. excavación", v4: "3.5 m",  available: true },
    { model: "308 CR",  cat: "mini-excavadoras", type: "Mini excavadora",       weight: "8.4 t",  power: "70 HP",  k3: "Cucharón",         v3: "0.33 m³", k4: "Prof. excavación", v4: "4.4 m",  available: true },
    { model: "416",     cat: "retroexcavadoras", type: "Retroexcavadora",       weight: "7.5 t",  power: "74 HP",  k3: "Cuchara frontal",  v3: "1.0 m³",  k4: "Prof. excavación", v4: "4.3 m",  available: true },
    { model: "420 XE",  cat: "retroexcavadoras", type: "Retroexcavadora",       weight: "8.2 t",  power: "93 HP",  k3: "Cuchara frontal",  v3: "1.15 m³", k4: "Prof. excavación", v4: "4.6 m",  available: false },
    { model: "D4",      cat: "tractores",        type: "Tractor de oruga",      weight: "13 t",   power: "130 HP", k3: "Hoja",             v3: "2.6 m³",  k4: "Ancho de hoja",    v4: "3.1 m",  available: true },
    { model: "D6",      cat: "tractores",        type: "Tractor de oruga",      weight: "23 t",   power: "215 HP", k3: "Hoja",             v3: "5.6 m³",  k4: "Ancho de hoja",    v4: "3.9 m",  available: true },
    { model: "D8",      cat: "tractores",        type: "Tractor de oruga",      weight: "39 t",   power: "354 HP", k3: "Hoja",             v3: "8.7 m³",  k4: "Ancho de hoja",    v4: "4.3 m",  available: false },
    { model: "950 GC",  cat: "cargadores",       type: "Cargador de ruedas",    weight: "18.7 t", power: "225 HP", k3: "Cucharón",         v3: "3.1 m³",  k4: "Carga de vuelco",  v4: "12 t",   available: true },
    { model: "966",     cat: "cargadores",       type: "Cargador de ruedas",    weight: "23.6 t", power: "303 HP", k3: "Cucharón",         v3: "4.2 m³",  k4: "Carga de vuelco",  v4: "15 t",   available: true },
    { model: "120",     cat: "motoniveladoras",  type: "Motoniveladora",        weight: "15.6 t", power: "158 HP", k3: "Ancho de hoja",    v3: "3.7 m",   k4: "Tracción",         v4: "6x4",    available: true },
    { model: "140",     cat: "motoniveladoras",  type: "Motoniveladora",        weight: "19.5 t", power: "213 HP", k3: "Ancho de hoja",    v3: "3.7 m",   k4: "Tracción",         v4: "6x6",    available: false },
    { model: "CS54B",   cat: "compactadoras",    type: "Rodillo vibratorio",    weight: "11.3 t", power: "131 HP", k3: "Ancho de tambor",  v3: "2.13 m",  k4: "Tipo",             v4: "Liso / Pata de cabra", available: true },
    { model: "CB10",    cat: "compactadoras",    type: "Compactador de asfalto",weight: "10.3 t", power: "142 HP", k3: "Ancho de tambor",  v3: "1.7 m",   k4: "Tipo",             v4: "Doble tambor", available: true },
    { model: "262D3",   cat: "minicargadores",   type: "Minicargador",          weight: "3.8 t",  power: "74 HP",  k3: "Carga nominal",    v3: "1 225 kg", k4: "Implementos",     v4: "Cucharón, barredora", available: true },
    { model: "TH408D",  cat: "telehandlers",     type: "Manipulador telescópico", weight: "7.5 t", power: "100 HP", k3: "Capacidad",       v3: "3.6 t",   k4: "Altura máx.",      v4: "7.3 m",  available: true },
    { model: "730",     cat: "camiones",         type: "Camión articulado",     weight: "23.5 t", power: "381 HP", k3: "Carga útil",       v3: "28 t",    k4: "Tracción",         v4: "6x6",    available: false }
  ]
};
