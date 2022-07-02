import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      squaresHistory: [],
      showHistoryStep: null,
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

    squares[i] = player;

    const history = {
      player: player,
      squares: squares,
    };

    squaresHistory.push(history);

    const winner = calculateWinner(squares);

    this.setState({
      squares: squares,
      squaresHistory: squaresHistory,
      xIsNext: xIsNext,
      winner: winner,
    });
  }

  handleHistoryClick(index) {
    this.setState({ showHistoryStep: index });
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board
            winner={this.state.winner}
            squares={this.state.squares}
            squaresHistory={this.state.squaresHistory}
            showHistoryStep={this.state.showHistoryStep}
            onClick={(index) => this.handleClick(index)}
          ></Board>
        </div>
        <div className="game-info">
          <PlayerStatus
            xIsNext={this.state.xIsNext}
            winner={this.state.winner}
          ></PlayerStatus>
          <div className="choosed-options">
            <ChossedOptions
              squaresHistory={this.state.squaresHistory}
              onClick={(index) => this.handleHistoryClick(index)}
            ></ChossedOptions>
          </div>
        </div>
      </div>
    );
  }
}

function PlayerStatus(props) {
  let playerStatus = props.xIsNext ? "Next player: X" : "Next player: O";

  if (props.winner != null) {
    playerStatus = "The winner is: " + props.winner + " !!!";
  }

  return <div className="status">{playerStatus}</div>;
}

function ChossedOptions(props) {
  const historyOptions = props.squaresHistory.slice();

  let index = -1;
  var historyElements = historyOptions.map((element) => {
    if (element != null) {
      index++;
      return (
        <HistoryOption
          index={index}
          onClick={(index) => props.onClick(index)}
        ></HistoryOption>
      );
    }
    return "";
  });

  return historyElements;
}

function HistoryOption(props) {
  let buttonText = "";

  if (props.index === 0) {
    buttonText += "Go to game start";
  } else {
    buttonText += "Go to move #" + props.index + ".";
  }

  return (
    <div>
      <p>
        {props.index + 1 + ". "}{" "}
        <button
          className="history-button"
          onClick={(index) => props.onClick(props.index)}
        >
          {buttonText}
        </button>
      </p>
    </div>
  );
}

function RenderSquareHistory(props) {
  const value = props.squares.squares[props.index];

  if (value !== null) {
    return <Square value={value} onClick={props.onClick} />;
  } else {
    return <Square value="" onClick={props.onClick} />;
  }
}

function RenderSquare(props) {
  return (
    <Square
      value={props.squares[props.index]}
      onClick={(index) => props.onClick(props.index)}
    />
  );
}

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function Board(props) {
  if (props.winner != null) {
    const squares = props.squares.slice();
    const historySquares = props.squaresHistory.slice();
    const historyStep =
      props.showHistoryStep != null
        ? props.showHistoryStep
        : props.squaresHistory.length - 1;

    return (
      <div>
        <div className="board-row">
          {squares.map((element, index) => {
            if (index < 3) {
              return (
                <RenderSquareHistory
                  squares={historySquares[historyStep]}
                  index={index}
                  onClick={props.onHistoryClick}
                ></RenderSquareHistory>
              );
            }
          })}
        </div>
        <div className="board-row">
          {squares.map((element, index) => {
            if (index > 2 && index < 6) {
              return (
                <RenderSquareHistory
                  squares={historySquares[historyStep]}
                  index={index}
                  onClick={props.onHistoryClick}
                ></RenderSquareHistory>
              );
            }
          })}
        </div>
        <div className="board-row">
          {squares.map((element, index) => {
            if (index > 5) {
              return (
                <RenderSquareHistory
                  squares={historySquares[historyStep]}
                  index={index}
                  onClick={props.onHistoryClick}
                ></RenderSquareHistory>
              );
            }
          })}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="board-row">
        <RenderSquare
          index={0}
          squares={props.squares}
          onClick={props.onClick}
        ></RenderSquare>
        <RenderSquare
          index={1}
          squares={props.squares}
          onClick={props.onClick}
        ></RenderSquare>
        <RenderSquare
          index={2}
          squares={props.squares}
          onClick={props.onClick}
        ></RenderSquare>
      </div>
      <div className="board-row">
        <RenderSquare
          index={3}
          squares={props.squares}
          onClick={props.onClick}
        ></RenderSquare>
        <RenderSquare
          index={4}
          squares={props.squares}
          onClick={props.onClick}
        ></RenderSquare>
        <RenderSquare
          index={5}
          squares={props.squares}
          onClick={props.onClick}
        ></RenderSquare>
      </div>
      <div className="board-row">
        <RenderSquare
          index={6}
          squares={props.squares}
          onClick={props.onClick}
        ></RenderSquare>
        <RenderSquare
          index={7}
          squares={props.squares}
          onClick={props.onClick}
        ></RenderSquare>
        <RenderSquare
          index={8}
          squares={props.squares}
          onClick={props.onClick}
        ></RenderSquare>
      </div>
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
      return squares[a];
    }
  }
  return null;
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
