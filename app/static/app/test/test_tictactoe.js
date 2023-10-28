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

  wl1 = ttt.winnerLine([0, 0, 0]);
  wl2 = ttt.winnerLine([1, 1, 1]);
  wl3 = ttt.winnerLine([2, 0, 0]);
  wl4 = ttt.winnerLine([0, 3, 0]);
  wl5 = ttt.winnerLine([0, 0, 3]);
  wl6 = ttt.winnerLine([2, 3, 0]);
  wl7 = ttt.winnerLine([2, 2, 3]);

  assert(wl1);
  assert(wl2);
  assert(!wl3);
  assert(!wl4);
  assert(!wl5);
  assert(!wl6);
  assert(!wl7);
};

let runAll = () => {
  testPlayer();
  testBoard();
  testIsDraw();
  testWinnerLine();
  console.log('ok')
};

runAll();