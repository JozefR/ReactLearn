import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function HistoryOption(props) {
  let buttonText = "";

  if (props.index === 0) {
    buttonText += "Go to game start";
  } else {
    buttonText += "Go to move #" + props.index;
  }

  return (
    <div>
      <p>
        {props.index + 1 + ". "}{" "}
        <button className="history-button">{buttonText}</button>
      </p>
    </div>
  );
}

function ChossedOptions(props) {
  const historyOptions = props.squaresHistory.slice();

  let index = -1;
  var historyElement = historyOptions.map((element) => {
    if (element != null) {
      index++;
      return <HistoryOption index={index}></HistoryOption>;
    }
  });

  return historyElement;
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      squaresHistory: [],
      xIsNext: true,
      winner: null,
    };
  }

  handleClick(i) {
    if (this.state.winner != null) {
      return;
    }

    const squares = this.state.squares.slice();
    const squaresHistory = this.state.squaresHistory.slice();
    const xIsNext = !this.state.xIsNext;
    const player = this.state.xIsNext === true ? "X" : "O";

    const history = {
      player: player,
    };

    squares[i] = player;
    squaresHistory.push(history);

    const winner = calculateWinner(squares);

    this.setState({
      squares: squares,
      squaresHistory: squaresHistory,
      xIsNext: xIsNext,
      winner: winner,
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    let status = this.state.xIsNext ? "Next player: X" : "Next player: O";

    if (this.state.winner != null) {
      status = "The winner is: " + this.state.winner + " !!!";
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <div className="choosed-options">
          <ChossedOptions
            squaresHistory={this.state.squaresHistory}
          ></ChossedOptions>
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
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

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
