import React from "react";
import "./index.css";

function Game() {
  const [historySquares, setHistorySquares] = useLocalStorageState(
    "historySquares",
    [Array(9).fill(null)]
  );
  const [move, setMove] = useLocalStorageState("move", 0);

  const squares = historySquares[move];

  const winner = calculateWinner(squares);
  const nextValue = calculateNextValue(squares);
  const status = calculateStatus(winner, squares, nextValue);

  function selectSquare(square) {
    if (winner) {
      return;
    }

    const squaresCopy = [...historySquares[move]];
    squaresCopy[square] = nextValue;

    const historySquaresCopy = [...historySquares];
    historySquaresCopy.push(squaresCopy);

    setHistorySquares(historySquaresCopy);
    setMove(move + 1);
  }

  function moveToHistory(index) {
    setMove(index);
  }

  function restart() {
    setHistorySquares([Array(9).fill(null)]);
    setMove(0);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={squares}
          status={status}
          onSquareClick={selectSquare}
          onRestartClick={restart}
          historyMove={move}
        />
        <HistoryMoves
          historySquares={historySquares}
          onHistoryMoveClick={(index) => moveToHistory(index)}
        ></HistoryMoves>
      </div>
    </div>
  );
}

function HistoryMoves({ historySquares, onHistoryMoveClick }) {
  return historySquares.map((element, index) => {
    let buttonText =
      index === 0 ? "Go to game start" : "Go to move #" + index + ".";

    return (
      <div>
        <p>
          {index + 1 + ". "}{" "}
          <button
            className="history-button"
            onClick={() => onHistoryMoveClick(index)}
          >
            {buttonText}
          </button>
        </p>
      </div>
    );
  });
}

function Board({
  squares,
  status,
  historyMove,
  onSquareClick,
  onRestartClick,
}) {
  function renderSquare(i) {
    return <Square value={squares[i]} onClick={() => onSquareClick(i)} />;
  }

  return (
    <div>
      <div className="status">STATUS{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className="restart" onClick={onRestartClick}>
        restart
      </button>
    </div>
  );
}

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function useLocalStorageState(key, defaultValue = "") {
  const [state, setState] = React.useState(() =>
    initialValue(key, defaultValue)
  );

  React.useEffect(() => {
    var serialized = JSON.stringify(state);
    window.localStorage.setItem(key, serialized);
  }, [key, state]);

  return [state, setState];
}

function initialValue(key, defaultValue) {
  var item = window.localStorage.getItem(key);

  if (item !== null) {
    return JSON.parse(item);
  }

  return defaultValue;
}

function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`;
}

function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? "X" : "O";
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
      return squares[a];
    }
  }
  return null;
}

export default Game;
