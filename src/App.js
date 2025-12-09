import "./App.css";
import { useState } from "react";

function App() {
  const [turn, setTurn] = useState("O");
  const [turnInd, setTurnInd] = useState(0);
  const [finished, setFinished] = useState(false);
  const [indexAll, setIndexAll] = useState("");
  const [howWin, setHowWin] = useState();
  const [winX, setWinX] = useState(0);
  const [winO, setWinO] = useState(0);

  const [array, setArray] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  // ---------- TURN SWITCH ----------
  const turnChange = () => {
    setTurn((prev) => (prev === "O" ? "X" : "O"));
  };

  // ---------- HANDLE CLICK ----------
  const setVal = (r, c) => {
    if (finished) {
      alert("finished");
      return;
    }

    // deep clone 2D array
    let tempArray = array.map((row) => [...row]);

    if (tempArray[r][c] === "") {
      tempArray[r][c] = turn; // use current turn BEFORE switching
      setArray(tempArray);

      setTurnInd((prev) => prev + 1);

      checkWin(tempArray); // pass new board

      turnChange(); // NOW switch
    }
  };

  // ---------- CHECK WIN ----------
  const checkWin = (board) => {
    let win = false;

    // ROWS
    for (let r = 0; r < 3; r++) {
      if (
        board[r][0] !== "" &&
        board[r][0] === board[r][1] &&
        board[r][1] === board[r][2]
      ) {
        win = board[r][0];
        setIndexAll(r);
        setHowWin("s" + r);
      }
    }

    // COLUMNS
    for (let c = 0; c < 3; c++) {
      if (
        board[0][c] !== "" &&
        board[0][c] === board[1][c] &&
        board[1][c] === board[2][c]
      ) {
        win = board[0][c];
        setIndexAll(c);
        setHowWin("stand" + c);
      }
    }

    // DIAGONAL 1
    if (
      board[0][0] !== "" &&
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2]
    ) {
      win = board[0][0];
      setIndexAll(1);
      setHowWin("tilt1");
    }

    // DIAGONAL 2
    if (
      board[0][2] !== "" &&
      board[0][2] === board[1][1] &&
      board[1][1] === board[2][0]
    ) {
      win = board[0][2];
      setIndexAll(2);
      setHowWin("tilt2");
    }

    if (win) {
      winFunc(win);
    } else {
      draw(); // check for draw
    }
  };

  // ---------- WIN HANDLER ----------
  const winFunc = (player) => {
  setFinished(true);

  if (player === "O") {
    setWinO((prev) => prev + 1);
  } else {
    setWinX((prev) => prev + 1);
  }

  // next round starts with the winner
  setTurn(player);
};


  // ---------- DRAW CHECK ----------
  const draw = () => {
  if (turnInd >= 8 && !finished) {
    turnChange(); // draw switches turn
    reset(false); // false = preserve turn
  }
};


  // ---------- RESET ----------// resetGameTurn === true  --> keep current turn
// resetGameTurn === false --> don't change turn
const reset = (keepTurn = true) => {
  setFinished(false);

  setArray([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  setTurnInd(0);
  setHowWin("");
  setIndexAll("");

  if (!keepTurn) {
    // draw → turn should switch
    return; 
  }

  // winner keeps turn (do nothing)
};


  return (
    <div className="App">
      <div className="mainGame">
        <div className="score">
          <p>
            <b className="blue">O: </b> {winO}
          </p>
          <p>
            <b className="red">X: </b> {winX}
          </p>
          <button onClick={reset}>reset</button>
        </div>

        {array.map((row, r) => (
          <div
            key={r}
            className={`${r === 0 ? "firstRow" : r === 1 ? "secondRow" : "thirdRow"} row`}
          >
            {row.map((cell, c) => (
              <div
                key={c}
                className={`s ${
                  r === 0 ? "a a" : r === 1 ? "b b" : "c c"
                }${c} ${c === 0 ? "one" : c === 1 ? "two" : "three"}`}
              >
                <h1
                  className={cell === "O" ? "blue" : "red"}
                  onClick={() => setVal(r, c)}
                >
                  {cell}
                </h1>
              </div>
            ))}
          </div>
        ))}

        <h2 className={`over ${finished ? "show" : "hide"} ${howWin}`}></h2>
      </div>
    </div>
  );
}

export default App;
