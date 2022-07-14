import React from "react";

// TIC TAC TOE GAME written using class components
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squaresHistory: [Array(9).fill(null)],
      move: 0,
      xIsNext: true,
      winner: null,
    };
  }

  handleClick(i) {
    if (this.state.winner != null) {
      return;
    }

    const squaresHistoryCopy = this.state.squaresHistory.slice();
    const xIsNextToggled = !this.state.xIsNext;
    const player = xIsNextToggled === true ? "X" : "O";
    const squares = squaresHistoryCopy[this.state.move].slice();

    squares[i] = player;

    squaresHistoryCopy.push(squares);

    const winner = calculateWinner(squares);

    this.setState({
      squaresHistory: squaresHistoryCopy,
      move: this.state.move + 1,
      xIsNext: xIsNextToggled,
      winner: winner,
    });
  }

  handleHistoryClick(index) {
    this.setState({ move: index });
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={this.state.squaresHistory[this.state.move]}
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
  var historyElements = props.squaresHistory.map((element, index) => {
    return (
      <HistoryOption
        index={index}
        onClick={(index) => props.onClick(index)}
      ></HistoryOption>
    );
  });

  return historyElements;
}

function HistoryOption(props) {
  let buttonText = "";

  if (props.index === 0) {
    buttonText = "Go to game start";
  } else {
    buttonText = "Go to move #" + props.index + ".";
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

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function Board(props) {
  return (
    <div>
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
    </div>
  );

  function renderSquare(rowIndex) {
    return (
      <Square
        value={props.squares[rowIndex]}
        onClick={(index) => props.onClick(rowIndex)}
      />
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

export default Game;
