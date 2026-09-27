// Diccionario de configuración (Elimina los "Números Mágicos" 24 y 100 del código)
// Principio Abierto/Cerrado: para agregar un juego nuevo (ej: "truco"),
// solo se añade una entrada aquí sin modificar ninguna función.
export const REGLAS_JUEGO = {
  caida: {
    limitePuntos: 24,
    puntajeMinimo: 0,
    // Botones de puntuación disponibles para este modo
    botonesPuntos: [
      { cantidad: 1, etiqueta: 'Cantada / Pata' },
      { cantidad: 4, etiqueta: 'Caída' },
    ],
  },
  domino: {
    limitePuntos: 100,
    puntajeMinimo: 0,
    botonesPuntos: [
      { cantidad: 5, etiqueta: '+5' },
      { cantidad: 10, etiqueta: '+10' },
      { cantidad: 15, etiqueta: '+15' },
      { cantidad: 20, etiqueta: '+20' },
      { cantidad: 25, etiqueta: '+25' },
      { cantidad: 30, etiqueta: '+30' },
    ],
  },
};

// Equipos válidos del juego
export const EQUIPOS_VALIDOS = ['equipo1', 'equipo2'];

/**
 * Verifica si un puntaje superó el límite establecido.
 * Función pura: Siempre retorna el mismo resultado para los mismos parámetros.
 * @param {number} puntajeActual - El puntaje actual del equipo.
 * @param {string} modoJuego - La clave del modo de juego (ej: 'caida', 'domino').
 * @returns {boolean} true si el puntaje alcanzó o superó el límite.
 */
export const verificarGanador = (puntajeActual, modoJuego) => {
  const limite = REGLAS_JUEGO[modoJuego]?.limitePuntos || 0;
  return puntajeActual >= limite;
};

/**
 * Valida que los parámetros de una jugada sean correctos.
 * @param {string} equipo - El identificador del equipo.
 * @param {number} cantidad - La cantidad de puntos a sumar/restar.
 * @param {string} modoJuego - El modo de juego actual.
 * @returns {{ valido: boolean, error: string|null }}
 */
export const validarJugada = (equipo, cantidad, modoJuego) => {
  if (!EQUIPOS_VALIDOS.includes(equipo)) {
    return { valido: false, error: `Equipo inválido: "${equipo}"` };
  }

  if (typeof cantidad !== 'number' || isNaN(cantidad) || cantidad === 0) {
    return { valido: false, error: 'La cantidad debe ser un número distinto de cero' };
  }

  if (!REGLAS_JUEGO[modoJuego]) {
    return { valido: false, error: `Modo de juego desconocido: "${modoJuego}"` };
  }

  return { valido: true, error: null };
};

/**
 * Calcula el nuevo puntaje asegurando que no baje del mínimo permitido.
 * @param {number} puntajeActual - Puntaje actual del equipo.
 * @param {number} cantidad - Puntos a sumar (positivo) o restar (negativo).
 * @param {string} modoJuego - Modo de juego actual.
 * @returns {number} El nuevo puntaje, nunca menor al mínimo.
 */
export const calcularNuevoPuntaje = (puntajeActual, cantidad, modoJuego) => {
  const minimo = REGLAS_JUEGO[modoJuego]?.puntajeMinimo ?? 0;
  return Math.max(puntajeActual + cantidad, minimo);
};
