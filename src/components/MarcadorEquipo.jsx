import React, { useState } from 'react';

export default function MarcadorEquipo({ 
  nombreEquipo, 
  onCambiarNombre,
  puntos, 
  onSumar, 
  onRestar, 
  juegoTerminado 
}) {
  const [editando, setEditando] = useState(false);
  const [tempNombre, setTempNombre] = useState(nombreEquipo);

  const etapa = puntos >= 12 ? 'Buenas' : 'Malas';

  const guardarNombre = () => {
    if (tempNombre.trim() !== '') {
      onCambiarNombre(tempNombre);
    }
    setEditando(false);
  };

  const manejarKeyDown = (e) => {
    if (e.key === 'Enter') guardarNombre();
  };

  return (
    <div className="marcador-equipo">
      {/* Edición interactiva de nombre */}
      <div className="header-equipo">
        {editando ? (
          <input
            type="text"
            className="input-nombre"
            value={tempNombre}
            onChange={(e) => setTempNombre(e.target.value)}
            onBlur={guardarNombre}
            onKeyDown={manejarKeyDown}
            autoFocus
            maxLength={14}
          />
        ) : (
          <h2 onClick={() => setEditando(true)} title="Haz clic para editar el nombre">
            {nombreEquipo} <span className="icon-edit">✏️</span>
          </h2>
        )}
      </div>

      {/* Pantalla de puntos estilo Neon/Casino */}
      <div className="puntos-display">
        <span className="numero-puntos">{puntos}</span>
        <span className={`etapa-puntos ${puntos >= 12 ? 'buenas' : 'malas'}`}>
          {etapa}
        </span>
      </div>

      {/* Botonera con mejor jerarquía visual y UX */}
      <div className="botonera">
        <button 
          className="btn-accion btn-pata"
          onClick={() => onSumar(1)} 
          disabled={juegoTerminado}
        >
          <span className="btn-icon">⚡</span>
          <span>+1 Cantada / Pata</span>
        </button>

        <button 
          className="btn-accion btn-caida"
          onClick={() => onSumar(4)} 
          disabled={juegoTerminado}
        >
          <span className="btn-icon">💥</span>
          <span>+4 Caída</span>
        </button>

        <button 
          className="btn-accion btn-restar"
          onClick={() => onRestar(1)} 
          disabled={juegoTerminado || puntos === 0}
        >
          <span className="btn-icon">↩️</span>
          <span>-1 Corregir</span>
        </button>
      </div>
    </div>
  );
