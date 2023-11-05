// プレイヤーの定義
let player = (prev) => (prev === 1) ? 2 : 1; 

// ボードの定義
let board = (prev, index, value) => {
  if (!prev) {
    return Array(9).fill(0);
  } else {
    return prev.map((v, i) =>  (i === index ? value : v));
  }
};

// 勝利判定
// 縦 | 横 | 斜め -> 3パターン -> ボードから縦、横、斜めを切り出す -> 3要素の配列で判定
// 同じような反復行為は取り出して処理する 

let winnerLine = (line) => {
  if (line[0] === line[1] && line[1] === line[2]){
    return line[0];
  }

  return 0;
}

// 横
let row = (width) => (index) => (b) => {
  let start = width * index;
  return b.slice(start, start + width);
};

// 縦
let col = (width) =>(index) => (b) => {
  return [b[index], b[index + width], b[index + 2 * width]]
}
// 右斜め下
let crossL = (b) => {
  return [b[0], b[4], b[8]];
};

// 右斜め上
let crossR = (b) => {
  return [b[2], b[4], b[6]];
};

let winner = (b) => {
  // row | col | cross
  let row3 = row(3);
  let col3 = col(3);
  let wl = winnerLine;
  let rowW = wl(row3(0)(b)) || wl(row3(1)(b)) || wl(row3(2)(b));
  let colW = wl(col3(0)(b)) || wl(col3(1)(b)) || wl(col3(2)(b));
  let crossW = wl(crossR(b)) || wl(crossL(b));

  return rowW || colW || crossW;
};


// ドロー判定
let isDraw = (b) => b.every((v) => v != 0);

// 状態
let state = (prev, select) => {
  if (!prev) return {
    board: board(),
    player: player(),
    winner: 0,
    isDraw: false
  }

  let nextPlayer = player(prev.player);
  let nextBoard = board(prev.board, select, prev.player);
  let nextWinner = winner(nextBoard);
  let nextIsDraw = nextWinner ? false : isDraw(nextBoard);
  return {
    board: nextBoard,
    player: nextPlayer,
    winner: nextWinner,
    isDraw: nextIsDraw
  };
};

// 以下が実行される

let onLoad = (e) => {
  main();
};

let main = () => {
  let _state = [state()];
  let _buttons = buttons();
  let _drawBoard = drawBoard(_buttons);

  drawStatus(`Player${current(_state).player}'s turn`);
  _drawBoard(current(_state).board);

  let onClickButton = (index) => (e) => {
    _state.push(state(current(_state), index));
    drawStatus(`Player${current(_state).player}'s turn`);
    _drawBoard(current(_state).board);
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
    if (board[i]) {
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