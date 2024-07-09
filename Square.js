import React from 'react';

function Square({ value, onClick, isWinningSquare }) {
  return (
    <button className={`square ${isWinningSquare ? 'winning-square' : ''}`} onClick={onClick}>
      {value === 'X' ? <span className="cross">✖️</span> : value === 'O' ? <span className="tick">✔️</span> : null}
    </button>
  );
}

export default Square;
