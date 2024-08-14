import "./App.css";
import { useState } from "react";

function App() {
  const [turn, setTurn] = useState("O");
  const [turnInd, setTurnInd] = useState(0);
  const [finished, setFinished] = useState(false);
  const [indexAll, setIndexAll] = useState("");
  let winInd = 0;
  let winIndex = false;
  const [howWin, setHowWin] = useState();
  // let howWin;
  let actionWin;
  const [winX, setWinX] = useState(0);
  const [winO, setWinO] = useState(0);
  const [array, setArray] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const turnChange = (val) => {
    if (turn === "O") {
      setTurn("X");
    } else if (turn === "X") setTurn("O");
  };
  const setVal = (val, val2) => {
    if (!finished) {
      // console.log(array[0][0] = "X")
      let tempArray = [...array];
      if (!tempArray[val][val2]?.length) {
        turnChange();
        tempArray[val][val2] = turn;
        setArray(tempArray);
        setTurnInd(turnInd + 1);
        draw();
        checkWin();
      }
    } else {
      alert("finished");
    }
  };
  const checkWin = () => {
    let win = false;
    array.map((item, index) => {
      let check = false;
      item.map((val, ind) => {
        if(array[ind][1] === array[ind][2] && array[ind][0] === array[ind][1] && array[ind][1] !== ""){
          check = val;
          setIndexAll(ind);
          actionWin = "s";
          setHowWin(actionWin + ind);
        }
      });
      if (check) win = check;
    });
    array.map((item, index) => {
      let check = false;
      item.map((val, ind) => {
        if (
          array[1][ind] === array[0][ind] &&
          array[2][ind] === array[0][ind] &&
          array[1][ind] === array[2][ind] &&
          array[0][ind] !== ""
        ) {
          check = val;
          setIndexAll(ind);
          actionWin = "stand";
          setHowWin(actionWin + ind);
          // alert(i)
        } else if (
          val[ind] === array[2][2] &&
          array[ind][ind] === array[1][1] &&
          array[1][1] === array[2][2] &&
          array[ind][ind] !== ""
        ) {
          check = val;
          setIndexAll(1);
          actionWin = "tilt";
          setHowWin(actionWin + 1);
        } else if (
          array[0][2] === array[2][0] &&
          array[0][2] === array[1][1] &&
          array[1][1] === array[2][0] &&
          array[1][1] !== ""
        ) {
          check = val;
          setIndexAll(2);
          setHowWin("tilt" + 2);
        }
      });
      if (check) win = check;
    });
    if (win) winFunc(win);
  };
  const winFunc = (player) => {
    setFinished(true);
    if (player === "O") {
      setWinO(winO + 1);
      setTurn(player);
      console.log(howWin);
      draw()
      // finished = true
    } else {
      console.log(howWin);
      setWinX(winX + 1);
      draw()
    }
  };
  const reset = () => {
    setFinished(false);
    console.log(finished)
    setArray([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
    setTurnInd(0);
    console.log(turnInd);
  };
  const draw = () => {
    if (turnInd > 7) {
      // setFinished(false);
        // setArray([
        //   ["", "", ""],
        //   ["", "", ""],
        //   ["", "", ""],
        // ]);
      // setTurnInd(0);
      reset(); 
      // reset();
    }
  };
  return (
    <div className="App">
      <div className="mainGame">
        <div className="score">
          <p>
            <b className="blue">O: </b>
            {winO}
          </p>
          <p>
            <b className="red">X: </b>
            {winX}
          </p>
          <button onClick={reset}>reset</button>
        </div>
        {array?.map((item, index) => (
          <div
            className={`${
              index === 0 ? "firstRow" : index === 1 ? "secondRow" : "thirdRow"
            } row`}
          >
            {item?.map((item2, index2) => (
              <div
                className={`s ${
                  index === 0 ? "a a" : index === 1 ? "b b" : "c c"
                }${index2} ${
                  index2 === 0 ? "one" : index2 === 1 ? "two" : "three"
                }`}
              >
                <h1
                  className={`${item2 === "O" ? "blue" : "red"}`}
                  onClick={() => setVal(index, index2)}
                >
                  {item2}
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
