import { useState } from 'react';
import { verificarGanador, validarJugada, calcularNuevoPuntaje } from '../utils/reglasJuego';

/**
 * Custom Hook: Motor de estado del juego.
 * Principio de Responsabilidad Única (SRP): Toda la lógica de estado
 * y reglas vive aquí, separada de la interfaz visual.
 * @param {string} modoInicial - El modo de juego inicial ('caida' | 'domino').
 */
export const useJuego = (modoInicial = 'caida') => {
  const [modoJuego, setModoJuego] = useState(modoInicial);
  // Clean Code: Agrupamos datos relacionados en un solo estado
  const [puntajes, setPuntajes] = useState({ equipo1: 0, equipo2: 0 });
  const [ganador, setGanador] = useState(null);

  const cambiarModoJuego = (nuevoModo) => {
    setModoJuego(nuevoModo);
    reiniciarPartida();
  };

  /**
   * Suma puntos a un equipo. Incluye validaciones y verificación de ganador.
   * @param {string} equipo - Identificador del equipo ('equipo1' | 'equipo2').
   * @param {number} cantidad - Puntos a sumar (debe ser positivo).
   */
  const sumarPuntos = (equipo, cantidad) => {
    if (ganador) return; // Cláusula de guarda (Early Return)

    const { valido, error } = validarJugada(equipo, cantidad, modoJuego);
    if (!valido) {
      console.warn(`Jugada inválida: ${error}`);
      return;
    }

    setPuntajes((estadoAnterior) => {
      const nuevoPuntaje = calcularNuevoPuntaje(estadoAnterior[equipo], cantidad, modoJuego);

      if (verificarGanador(nuevoPuntaje, modoJuego)) {
        // Formatea 'equipo1' a 'Equipo 1' para la UI
        const nombreGanador = equipo === 'equipo1' ? 'Equipo 1' : 'Equipo 2';
        setGanador(nombreGanador);
      }

      // Retorna una copia del estado anterior actualizando solo el equipo correspondiente
      return { ...estadoAnterior, [equipo]: nuevoPuntaje };
    });
  };

  /**
   * Resta puntos a un equipo. Útil para corregir errores.
   * El puntaje nunca baja del mínimo configurado (0 por defecto).
   * @param {string} equipo - Identificador del equipo ('equipo1' | 'equipo2').
   * @param {number} cantidad - Puntos a restar (debe ser positivo, se convierte a negativo internamente).
   */
  const restarPuntos = (equipo, cantidad) => {
    if (ganador) return;

    // Convertimos a negativo para restar
    const cantidadNegativa = -Math.abs(cantidad);

    const { valido, error } = validarJugada(equipo, cantidadNegativa, modoJuego);
    if (!valido) {
      console.warn(`Jugada inválida: ${error}`);
      return;
    }

    setPuntajes((estadoAnterior) => {
      const nuevoPuntaje = calcularNuevoPuntaje(estadoAnterior[equipo], cantidadNegativa, modoJuego);
      return { ...estadoAnterior, [equipo]: nuevoPuntaje };
    });
  };

  const reiniciarPartida = () => {
    setPuntajes({ equipo1: 0, equipo2: 0 });
    setGanador(null);
  };

  return {
    modoJuego,
    puntajes,
    ganador,
    cambiarModoJuego,
    sumarPuntos,
    restarPuntos,
    reiniciarPartida,
  };
};
