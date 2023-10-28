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

let winnerLine = (l) => {
  if (l[0] === l[1] && l[1] === l[2]) {
    return true;
  } else {
    return false;
  }
}

let winner = (b) => {
  // row | col | cross
}


// ドロー判定
let isDraw = (b) => b.every((v) => v != 0);


module.exports = {
  player,
  board,
  isDraw,
  winnerLine,
};