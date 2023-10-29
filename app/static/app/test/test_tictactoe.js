const assert = require('assert');

let ttt = require('../src/tictactoe.js');
const { default: test } = require('node:test');

let arrayEqual = (a, b) => {
  for (i = 1;  i < 9; i++){
    if (a[i] !== b[i]) return false;
  }
  return true;
} 

// プレイヤーのテスト
// 初期値、1->2->1(1ターン目), 1->2(2ターン目の最初)
let testPlayer = () => {
  console.log("testPlayer");
  p1 = ttt.player();
  p2 = ttt.player(p1);
  p3 = ttt.player(p2);
  p4 = ttt.player(p3);
  assert(p1 === 1);
  assert(p2 === 2);
  assert(p3 === 1);
  assert(p4 === 2);
};

// 初期化->0*9のArrayの比較, (prev, index, value)を受け取ってArrayの比較
let testBoard = () => {
  console.log("testBoard");
  b1 = ttt.board();
  b2 = ttt.board(b1, 0, 4);
  b3 = ttt.board(b2, 8, 10);
  b4 = ttt.board(b3, 5, 6);
  assert(arrayEqual(b1, [0, 0, 0, 0, 0, 0, 0, 0, 0]));
  assert(arrayEqual(b2, [4, 0, 0, 0, 0, 0, 0, 0, 0]));
  assert(arrayEqual(b3, [4, 0, 0, 0, 0, 0, 0, 0, 10]));
  assert(arrayEqual(b4, [4, 0, 0, 0, 0, 6, 0, 0, 10]));
};

let testIsDraw = () => {
  console.log("testIsDraw");
  let d = ttt.isDraw;
  b1 = ttt.board();
  b2 = ttt.board(b1, 0, 4);
  b3 = ttt.board(b2, 8, 10);
  b4 = ttt.board(b3, 5, 6);
  b5 = [1,1,1,1,1,1,1,1,1,1]; // 全部埋まっている
  b6 = [1,1,1,0,1,1,1,1,1,1]; // 一つだけ埋まっていない

  assert(!d(b1));
  assert(!d(b2));
  assert(!d(b3));
  assert(!d(b4));
  assert(d(b5));
  assert(!d(b6));
};

let testWinnerLine = () => {
  console.log("testWinnerLine");

  wl = ttt.winnerLine;

  assert(wl([0, 0, 0]) === 0);
  assert(wl([1, 1, 1]) === 1);
  assert(wl([2, 2, 2]) === 2);
  assert(wl([2, 0, 2]) === 0);
  assert(wl([0, 2, 2]) === 0);
  assert(wl([1, 1, 0]) === 0);
  assert(wl([1, 1, 2]) === 0);
};

let testRow = () => {
  console.log("testRow");
  let row = ttt.row;
  let row3 = row(3);

  let b = [
    0, 1, 2,
    3, 4, 5,
    6, 7, 8,
  ];

  assert(arrayEqual(row3(0)(b), [0, 1, 2]));
  assert(arrayEqual(row3(1)(b), [3, 4, 5]));
  assert(arrayEqual(row3(2)(b), [6, 7, 8]));
};

let testCol = () => {
  console.log("testCol");
  let col = ttt.col;
  let col3 = col(3);

  let b = [
    0, 1, 2,
    3, 4, 5,
    6, 7, 8,
  ];

  assert(arrayEqual(col3(0)(b), [0, 3, 6]));
  assert(arrayEqual(col3(1)(b), [1, 4, 7]));
  assert(arrayEqual(col3(2)(b), [2, 5, 8]));
};

let runAll = () => {
  testPlayer();
  testBoard();
  testIsDraw();
  testWinnerLine();
  testRow();
  testCol();
  console.log('ok')
};

runAll();