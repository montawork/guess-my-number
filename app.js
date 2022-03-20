'use strict';
// select DOM elements
const selectFromDOM = (ele) => document.querySelector(ele);
const input = selectFromDOM('.guess');
const checkBtn = selectFromDOM('.check');
const number = selectFromDOM('.number');
const message = selectFromDOM('.message');
const scoreArea = selectFromDOM('.score');
const highscore = selectFromDOM('.highscore');
const againBtn = selectFromDOM('.again');

// global vars
let targetNumber;
let score = 20;

// events
window.addEventListener('DOMContentLoaded', resetGame);
againBtn.addEventListener('click', resetGame);
checkBtn.addEventListener('click', checkGess);

// reset game
function resetGame() {
  // get highscore from local storage
  highscore.innerHTML = localStorage.getItem('highscore') || 0;
  score = 20;
  input.value = '';
  targetNumber = Math.floor(Math.random() * 20) + 1;
  number.innerText = '?';
  message.innerText = 'Start guessing...';
  message.style.color = '#eee';
  scoreArea.innerHTML = score;
  document.body.style.background = '#222';
  checkBtn.disabled = false;
}

// check user gess
function checkGess() {
  if (input.value) {
    score--;
    scoreArea.innerHTML = score;
    const guessNumber = Number(input.value);
    if (guessNumber === targetNumber) {
      number.innerText = targetNumber;
      message.innerText = 'Correct number !!';
      document.body.style.background = '#60b347';
      checkBtn.disabled = true;
      // store highscore in localStorage
      if (Number(highscore.textContent) < score) {
        localStorage.setItem('highscore', score);
        highscore.innerHTML = score;
      }
    } else {
      if (guessNumber > targetNumber) {
        message.innerText = 'To high !!';
      } else {
        message.innerText = 'To low !!';
      }
    }
    if (score < 1) {
      message.innerText = 'You lost the game !!';
      message.style.color = '#dc2626';
      checkBtn.disabled = true;
    }
  }
}
