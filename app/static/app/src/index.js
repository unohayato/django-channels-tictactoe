const ttt = require("./tictactoe.js");

let onLoad = (e) => {
  main();
};

let main = () => {
  let state = ttt.state();
  let _buttons = buttons();
  let _drawBoard = drawBoard(_buttons);

  drawStatus(`Player${current(state).player}'s turn`);
  _drawBoard(current(state).board);

  let onClickButton = (draw) => (index) => (e) => {
    state.push(ttt.state(current(state), index));
    drawStatus(`Player${current(state).player}'s turn`);
    _drawBoard(current(state).board);
  };

  _buttons.map((v, i) => v.addEventListener('click', onClickButton(i)));
};

let current = (state) => {
  return state[state.length - 1];
};

let drawStatus = (msg) => {
  document.getElementById("status").innerText = msg;
};

let drawBoard = (buttons) => (board) => {
  buttons.map((v, i) => {
    if (ttt.board[i]) {
      v.innerText = board[i];
    } else {
      v.innerText = '';
    }
  });
};

let buttons = () => {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9].map((v) => button(v));
};

let button = (num) => {
  return document.getElementById(`button${num}`);
};

window.addEventListener("load", onLoad);

console.log("hello");