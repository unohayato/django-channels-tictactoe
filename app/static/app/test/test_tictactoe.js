const assert = require('assert');

let ttt = require('../src/tictactoe.js');

let testHello = () => {
  assert(ttt.hello === 'hello');
};

let runAll = () => {
  testHello();
  console.log('ok')
};

runAll();