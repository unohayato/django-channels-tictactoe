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
let col = (width) =>(index) => b => {
  return [b[index], b[index + width], b[index + 2 * width]]
}
// 左斜め下
// 右斜め上

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
  row,
  col,
};