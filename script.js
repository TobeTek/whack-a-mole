const holes = document.querySelectorAll('.hole');
let gameStatus = document.querySelector('#gameStatus');
const timeLeft = document.querySelector('#timeLeft');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let startButton = document.querySelector('#startButton');
let lastHole;
let timeUp = false;
let isGameOver = false;
let score = 0;

let currentTime = 60;
let countDownTimerId = null;

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) {
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function peep() {
    if (!isGameOver) {
        const time = randomTime(200, 1000);
        const hole = randomHole(holes);
        hole.classList.add('up');
        setTimeout(() => {
            hole.classList.remove('up');
            if (!timeUp) peep();
        }, time);
    }
}

function updateGameStatus() {
    gameStatus.textContent = "Game Over!";
    timeUp = true;
}

function startGame() {
    if (isGameOver) {
        restartGame();
    }
    countDownTimerId = setInterval(countDown, 1000)
    gameStatus.textContent = "Game Started!";
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp, 10000)
}

function whack(e) {
    if (!e.isTrusted) return;
    score++;
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
}

function countDown() {
    if (!isGameOver) {
        currentTime--;
        timeLeft.textContent = currentTime;

        if (currentTime == 0) {
            gameOver();
            alert('Game Over! Your final Score is ' + score);
        }
    }
}

function gameOver() {
    isGameOver = true;
    gameStatus.textContent = "Game Over!";
    startButton.textContent = "Restart!";
}

function restartGame() {
    isGameOver = false;
    currentTime = 60;
    clearInterval(countDownTimerId);
    // clearInterval(timerId)
    gameStatus.textContent = "Game Started!";
}

moles.forEach(mole => mole.addEventListener('click', whack));