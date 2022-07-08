import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import TicTacToeHooks from "./TicTacToeHooks";
import TicTacToeClasses from "./TicTacToeClasses";

const root = ReactDOM.createRoot(document.getElementById("root"));

//root.render(<TicTacToeClasses />);
root.render(<TicTacToeHooks />);
