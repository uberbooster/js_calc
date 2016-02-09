var Calculator = {
  current: 0,
  memory: 0,
  add: add,
  subtract: subtract,
  multiply: multiply,
  divide: divide,
  result: result,
  reset: reset,
  addToMemory: addToMemory,
  subtractFromMemory: subtractFromMemory,
}

function add(num){
  this.current += num;
}
function subtract(num){
  this.current -= num;
}
function multiply(num){
  this.current *= num;
}
function divide(num){
  this.current /= num;
}
function result(){
  return this.current;
}
function reset(num){
  this.current = 0;
}

function addToMemory(num){
  this.memory += num;
}

function subtractFromMemory(num){
  this.current -= num;
}

function clearMemory(){
  this.memory = 0;
}

function getMemory(){
  return this.memory;
}
