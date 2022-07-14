import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import TicTacToeHooks from "./TicTacToeHooks";
import TicTacToeClasses from "./TicTacToeClasses";
import Reducer from "./reducer.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<TicTacToeClasses />);
