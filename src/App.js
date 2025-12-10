import "./App.css";
import { useState } from "react";

function App() {
  const [turn, setTurn] = useState("O");
  const [turnInd, setTurnInd] = useState(0);
  const [finished, setFinished] = useState(false);
  const [indexAll, setIndexAll] = useState("");
  const [howWin, setHowWin] = useState("");
  const [winX, setWinX] = useState(0);
  const [winO, setWinO] = useState(0);

  const [array, setArray] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  // turn change
  const turnChange = () => {
    setTurn((prev) => (prev === "O" ? "X" : "O"));
  };

  // set value on click
  const setVal = (r, c) => {
    if (finished) return;

    const tempArray = array.map((row) => [...row]);

    if (tempArray[r][c] === "") {
      tempArray[r][c] = turn;
      setArray(tempArray);

      setTurnInd((prev) => prev + 1);
      checkWin(tempArray);
      turnChange();
    }
  };

  // win check
  const checkWin = (board) => {
    let win = false;

    // ROWS
    for (let r = 0; r < 3; r++) {
      if (
        board[r][0] &&
        board[r][0] === board[r][1] &&
        board[r][1] === board[r][2]
      ) {
        win = board[r][0];
        setHowWin("row" + r);
      }
    }

    // COLUMNS
    for (let c = 0; c < 3; c++) {
      if (
        board[0][c] &&
        board[0][c] === board[1][c] &&
        board[1][c] === board[2][c]
      ) {
        win = board[0][c];
        setHowWin("col" + c);
      }
    }

    // DIAG 1
    if (
      board[0][0] &&
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2]
    ) {
      win = board[0][0];
      setHowWin("diag1");
    }

    // DIAG 2
    if (
      board[0][2] &&
      board[0][2] === board[1][1] &&
      board[1][1] === board[2][0]
    ) {
      win = board[0][2];
      setHowWin("diag2");
    }

    win ? winFunc(win) : draw();
  };

  // win function
  const winFunc = (player) => {
    setFinished(true);

    if (player === "O") setWinO((prev) => prev + 1);
    else setWinX((prev) => prev + 1);

    setTurn(player);
  };

  // draw handler
  const draw = () => {
    if (turnInd >= 8 && !finished) {
      turnChange();
      reset(false);
    }
  };

  // reset
  const reset = (keepTurn = true) => {
    setFinished(false);
    setArray([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
    setTurnInd(0);
    setHowWin("");

    if (!keepTurn) return;
  };

  return (
    <div className="app">
      <div className="scoreBar">
        <p><span className="blue">O:</span> {winO}</p>
        <p><span className="red">X:</span> {winX}</p>
        <button onClick={reset}>Reset</button>
      </div>

      <div className="board">
        {array.map((row, r) =>
          row.map((cell, c) => (
            <div
              key={r + "-" + c}
              className="cell"
              onClick={() => setVal(r, c)}
            >
              <span className={cell === "O" ? "blue glow" : "red glow"}>
                {cell}
              </span>
            </div>
          ))
        )}

        <div className={`winLine ${howWin}`}></div>
      </div>
    </div>
  );
}

export default App;
