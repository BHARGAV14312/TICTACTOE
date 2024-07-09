import React, { useState } from 'react';
import Board from './Board';

function Game() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const current = history[stepNumber];
  const { winner, winningSquares } = calculateWinner(current.squares);

  const handleClick = (i) => {
    const historyCopy = history.slice(0, stepNumber + 1);
    const currentCopy = historyCopy[historyCopy.length - 1];
    const squares = currentCopy.squares.slice();

    if (winner || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? 'X' : 'O';
    setHistory(historyCopy.concat([{ squares: squares }]));
    setStepNumber(historyCopy.length);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setHistory([{ squares: Array(9).fill(null) }]);
    setStepNumber(0);
    setXIsNext(true);
  };

  const status = winner ? `Player ${winner === 'X' ? '1' : '2'} Won!` : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className="game">
      <h1 className="game-title">TIC-TAC-TOE</h1>
      <div className="status">{status}</div>
      <div className="game-board">
        <Board squares={current.squares} onClick={handleClick} winningSquares={winningSquares || []} />
      </div>
      <button className="reset-button" onClick={resetGame}>Reset</button>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        winningSquares: [a, b, c],
      };
    }
  }
  return {
    winner: null,
    winningSquares: [],
  };
}

export default Game;
