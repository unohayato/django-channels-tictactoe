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

// ドロー判定
let isDraw = (b) => b.every((v) => v != 0);


module.exports = {
  player,
  board,
  isDraw,
};