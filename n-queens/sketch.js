let board;
let blockSize;
let piecePicked;
let moveSound;
let switchSound;
let errorSound;
let fixed;
let showRay;
let n;

function preload() {
  moveSound = loadSound('assets/move.mp3');
  switchSound = loadSound('assets/switch.mp3');
  // errorSound = loadSound('error.wav');
}

let windowScale;

window.onload = function () {
  windowScale = window.getComputedStyle(document.getElementById('main'), null).getPropertyValue('scale');
  windowScale = windowScale === "none" ? 1 : windowScale;
}


function windowResized() {
  windowScale = window.getComputedStyle(document.getElementById('main'), null).getPropertyValue('scale');
  windowScale = windowScale === "none" ? 1 : windowScale;
  board.setScale(windowScale);
}

function setup() {
  let params = getURLParams();
  n = Number(params.n) || 8;
  blockSize = 80;
  showRay = false;
  piecePicked = false;
  fixed = n === 8 ? [[4, 0], [1, 1], [3, 2], [6, 3]] : [[1, 0]];
  createCanvas((n + 1) * blockSize, n * blockSize);
  board = new Board(n, blockSize, windowScale, fixed);
  select('#reset').mousePressed(() => {
    moveSound.play();
    board.reset();
  });
  select('#ray').mousePressed(() => {
    select('#ray').style('background-color', showRay ? '#1976d2' : '#2196f3');
    switchSound.play();
    showRay = !showRay;
  });
}

function draw() {
  background(255);
  board.show(showRay);
  fill(255);
  textSize(35);
  stroke(255);
  strokeWeight(2);
  textAlign(CENTER);
  // rect(blockSize*n, 0, width - blockSize*n, height);
}

function mousePressed() {
  piecePicked = board.pick();
}


function mouseReleased() {
  if (!piecePicked) return;
  if (board.place()) {
    moveSound.play();
  } else {
    // errorSound.play();
  }
  piecePicked = false;
}


// function keyPressed() {
//   if (keyCode === UP_ARROW) {
//     board.toggle();
//   }
// }