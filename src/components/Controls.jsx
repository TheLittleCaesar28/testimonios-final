import React from 'react';

export default function Controls({ onPrev, onNext, onRandom }) {
  return (
    <div className="controls">
      <button onClick={onPrev} aria-label="Testimonio anterior">
        ◀ Anterior
      </button>
      <button onClick={onNext} aria-label="Testimonio siguiente">
        Siguiente ▶
      </button>
      <button onClick={onRandom} aria-label="Testimonio aleatorio">
        🎲 Aleatorio
      </button>
    </div>
  );
}