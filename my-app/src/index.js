import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

<<<<<<< Updated upstream
import TicTacToeHooks from "./TicTacToeHooks";
import TicTacToeClasses from "./TicTacToeClasses";

const root = ReactDOM.createRoot(document.getElementById("root"));

//root.render(<TicTacToeClasses />);
root.render(<TicTacToeHooks />);
=======
import Reducer from "./reducer.js";
import TicTacToeClasses from "./ticTacToeClasses";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<TicTacToeClasses />);
>>>>>>> Stashed changes
