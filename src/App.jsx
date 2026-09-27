import { useJuego } from './hooks/useJuego';
import { REGLAS_JUEGO } from './utils/reglasJuego';
import './App.css';

/**
 * Componente principal: Solo responsabilidad visual.
 * Toda la lógica de estado se importa desde useJuego.
 * Se usan etiquetas semánticas: <nav>, <main>, <section>.
 */
function App() {
  const {
    modoJuego,
    puntajes,
    ganador,
    cambiarModoJuego,
    sumarPuntos,
    restarPuntos,
    reiniciarPartida,
  } = useJuego('caida');

  const reglasActuales = REGLAS_JUEGO[modoJuego];
  const limiteActual = reglasActuales?.limitePuntos;
  const botonesPuntos = reglasActuales?.botonesPuntos || [];

  return (
    <div className="contenedor-principal">
      <header className="encabezado">
        <h1 className="titulo">
          <span className="titulo-icono">🎲</span>
          Anotador: <span className="modo-badge">{modoJuego.toUpperCase()}</span>
        </h1>
        <p className="subtitulo">Partida hasta {limiteActual} puntos</p>
      </header>

      <nav className="controles-modo">
        <button
          className={`btn-modo ${modoJuego === 'caida' ? 'activo' : ''}`}
          onClick={() => cambiarModoJuego('caida')}
        >
          🃏 Caída
        </button>
        <button
          className={`btn-modo ${modoJuego === 'domino' ? 'activo' : ''}`}
          onClick={() => cambiarModoJuego('domino')}
        >
          🁣 Dominó
        </button>
      </nav>

      {ganador && (
        <div className="alerta-ganador">
          <span className="trofeo">🏆</span>
          <h2>¡Triunfo del {ganador}!</h2>
          <p>¡Felicitaciones, campeones!</p>
        </div>
      )}

      <main className="tablero">
        {/* ── Equipo 1 ── */}
        <section className="equipo equipo-1">
          <div className="equipo-header">
            <span className="equipo-icono">🔴</span>
            <h3>Equipo 1</h3>
          </div>
          <p className="puntaje-gigante">{puntajes.equipo1}</p>
          <div className="barra-progreso">
            <div
              className="barra-fill"
              style={{ width: `${Math.min((puntajes.equipo1 / limiteActual) * 100, 100)}%` }}
            />
          </div>
          <div className="controles-puntos">
            {botonesPuntos.map((boton) => (
              <button
                key={`e1-suma-${boton.cantidad}`}
                className="btn-punto btn-suma"
                onClick={() => sumarPuntos('equipo1', boton.cantidad)}
              >
                +{boton.cantidad} <span className="btn-label">{boton.etiqueta}</span>
              </button>
            ))}
            <button
              className="btn-punto btn-resta"
              onClick={() => restarPuntos('equipo1', botonesPuntos[0]?.cantidad || 1)}
            >
              -{botonesPuntos[0]?.cantidad || 1} <span className="btn-label">Corregir</span>
            </button>
          </div>
        </section>

        <div className="separador-vs">VS</div>

        {/* ── Equipo 2 ── */}
        <section className="equipo equipo-2">
          <div className="equipo-header">
            <span className="equipo-icono">🔵</span>
            <h3>Equipo 2</h3>
          </div>
          <p className="puntaje-gigante">{puntajes.equipo2}</p>
          <div className="barra-progreso">
            <div
              className="barra-fill barra-fill-2"
              style={{ width: `${Math.min((puntajes.equipo2 / limiteActual) * 100, 100)}%` }}
            />
          </div>
          <div className="controles-puntos">
            {botonesPuntos.map((boton) => (
              <button
                key={`e2-suma-${boton.cantidad}`}
                className="btn-punto btn-suma"
                onClick={() => sumarPuntos('equipo2', boton.cantidad)}
              >
                +{boton.cantidad} <span className="btn-label">{boton.etiqueta}</span>
              </button>
            ))}
            <button
              className="btn-punto btn-resta"
              onClick={() => restarPuntos('equipo2', botonesPuntos[0]?.cantidad || 1)}
            >
              -{botonesPuntos[0]?.cantidad || 1} <span className="btn-label">Corregir</span>
            </button>
          </div>
        </section>
      </main>

      <button className="btn-reinicio" onClick={reiniciarPartida}>
        🔄 Limpiar Mesa
      </button>
    </div>
  );
}

export default App;
