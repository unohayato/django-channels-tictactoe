const assert = require('assert');

let ttt = require('../src/tictactoe.js');

// プレイヤーのテスト
// 初期値、1->2->1(1ターン目), 1->2(2ターン目の最初)
let testPlayer = () => {
  console.log("testPlayer");
  p1 = ttt.player();
  p2 = ttt.player(p1);
  p3 = ttt.player(p2);
  p4 = ttt.player(p1);
  assert(p1 === 1);
  assert(p2 === 2);
  assert(p3 === 1);
  assert(p4 === 2);
};

let runAll = () => {
  testPlayer();
  console.log('ok')
};

runAll();