import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

function Game() {
  const [squares, setSquares] = useLocalStorageState(
    "squares",
    Array(9).fill(null)
  );
  const [historySquares, setHistorySquares] = React.useState([]);
  const [historyMove, setHistoryMove] = React.useState(null);

  const winner = calculateWinner(squares);
  const nextValue = calculateNextValue(squares);
  const status = calculateStatus(winner, squares, nextValue);

  function selectSquare(square) {
    if (winner) {
      return;
    }

    const squaresCopy = [...squares];
    squaresCopy[square] = nextValue;

    const history = { player: nextValue, squares: squaresCopy };
    const historySquaresCopy = [...historySquares];
    historySquaresCopy.push(history);

    setSquares(squaresCopy);
    setHistorySquares(historySquaresCopy);
  }

  function moveToHistory(index) {
    if (winner == null) {
      return null;
    }

    setHistoryMove(index);
  }

  function restart() {
    setSquares(Array(9).fill(null));
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={squares}
          historySquares={historySquares}
          status={status}
          onSquareClick={selectSquare}
          onRestartClick={restart}
          historyMove={historyMove}
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
  historySquares,
  status,
  historyMove,
  onSquareClick,
  onRestartClick,
}) {
  function renderSquare(i) {
    return <Square value={squares[i]} onClick={() => onSquareClick(i)} />;
  }

  function renderSquareHistory(startRow) {
    return squares.slice(startRow, startRow + 3).map((element, index) => {
      if (index !== 0) {
        startRow++;
      }

      return (
        <Square
          value={historySquares[historyMove].squares[startRow] || ""}
        ></Square>
      );
    });
  }

  if (historyMove != null) {
    return (
      <div>
        <div className="board-row">{renderSquareHistory(0)}</div>
        <div className="board-row">{renderSquareHistory(3)}</div>
        <div className="board-row">{renderSquareHistory(6)}</div>
      </div>
    );
  } else {
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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
