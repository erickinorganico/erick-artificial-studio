// Preset local del canal Erick Artificial (V13 «Soy imparcial»; usado sin cambios de color en V14). NO es el default de la skill.
// Decisión humana (Erick, V13): todos los fondos negros; blanco/gris para objetos y texto;
// color sólo en áreas que explican algo y con significado fijo en toda la pieza.
window.MONO_PRESETS = window.MONO_PRESETS || {};
window.MONO_PRESETS['erick-artificial-negro'] = {
  dark: true,
  bg: [[0, '#0b0b0b'], [.6, '#050505'], [1, '#000000']], // negro casi puro con leve elevación central (sin gris medio)
  ink: '#f2f2f0', ink2: '#a6a6a2', line: '#8a8a86', dot: '170,170,166',
  paper: ['#f2f1ec', '#c4c3bd'], paperInk: '#111111',
  floor: .07,                 // suelo iluminado tenue para leer sombras de contacto
  groundBase: [70, 70, 68], groundLine: '235,235,230',
  tile: ['#1b1b1b', '#d8d8d4'],
  accents: {                  // significado semántico fijo
    rojos: '#e5484d',         // salsa/pedidos/votos rojos
    verdes: '#3fb950',        // salsa/pedidos/votos verdes
    duda: '#f2b640',          // información que el dato no contiene: «¿prefieren?», disponibilidad/agotados, preguntar a clientes
  },
};
