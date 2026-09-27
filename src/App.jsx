import { useState } from 'react';
import MarcadorEquipo from './components/MarcadorEquipo';
import './App.css';

export default function App() {
  const [nombreEquipoA, setNombreEquipoA] = useState('Equipo 1');
  const [nombreEquipoB, setNombreEquipoB] = useState('Equipo 2');

  const [puntosEquipoA, setPuntosEquipoA] = useState(0);
  const [puntosEquipoB, setPuntosEquipoB] = useState(0);

  const LIMITE_PUNTOS = 24;

  const ganador = 
    puntosEquipoA >= LIMITE_PUNTOS ? nombreEquipoA :
    puntosEquipoB >= LIMITE_PUNTOS ? nombreEquipoB : null;

  const sumarEquipoA = (cantidad) => {
    setPuntosEquipoA((prev) => Math.min(prev + cantidad, LIMITE_PUNTOS));
  };

  const restarEquipoA = (cantidad) => {
    setPuntosEquipoA((prev) => Math.max(prev - cantidad, 0));
  };

  const sumarEquipoB = (cantidad) => {
    setPuntosEquipoB((prev) => Math.min(prev + cantidad, LIMITE_PUNTOS));
  };

  const restarEquipoB = (cantidad) => {
    setPuntosEquipoB((prev) => Math.max(prev - cantidad, 0));
  };

  const reiniciarJuego = () => {
    setPuntosEquipoA(0);
    setPuntosEquipoB(0);
  };

  return (
    <div className="app-container">
      <header>
        <div className="logo-badge">♠️ ♥️ ♦️ ♣️</div>
        <h1>Caída Libre</h1>
        <p className="subtitle">Anotador Oficial de Cartas</p>
      </header>

      {ganador && (
        <div className="ganador-modal">
          👑 ¡<strong>{ganador}</strong> ha ganado la partida! 👑
        </div>
      )}

      <main className="tablero">
        <MarcadorEquipo
          nombreEquipo={nombreEquipoA}
          onCambiarNombre={setNombreEquipoA}
          puntos={puntosEquipoA}
          onSumar={sumarEquipoA}
          onRestar={restarEquipoA}
          juegoTerminado={!!ganador}
        />

        <MarcadorEquipo
          nombreEquipo={nombreEquipoB}
          onCambiarNombre={setNombreEquipoB}
          puntos={puntosEquipoB}
          onSumar={sumarEquipoB}
          onRestar={restarEquipoB}
          juegoTerminado={!!ganador}
        />
      </main>

      <footer>
        <button className="btn-reiniciar" onClick={reiniciarJuego}>
          🔄 Nueva Partida
        </button>
      </footer>
    </div>
  );
}