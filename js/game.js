'use strict'
const WALL = '<img class="wall-img" src="img/wall.jpg" />'
const FOOD = '.'
const EMPTY = ' ';
const POWER_FOOD = '*';
var gBoard;
var gIsFirstCherry;
var gIntervalCherry;
var gGame = {
    score: 0,
    isOn: false,
    totalFood: 0
}

function init() {
    // gIsSuper = false;
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container')
    gGame.isOn = true;
    createCherry();
    gIsFirstCherry = true;
    setTimeout(initCherryInterval, 3 * 1000);
}

function resetGame() {
    hideElement(document.querySelector('.modal'));
    gGame.score = 0;
    gGame.totalFood = 0;
    init();
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            }
            if ((i === 1 && j === 1) ||
                (i === 1 && j === SIZE - 2) ||
                (i === SIZE - 2 && j === 1) ||
                (i === SIZE - 2 && j === SIZE - 2)) {
                board[i][j] = POWER_FOOD;
            }
            if (board[i][j] === FOOD) gGame.totalFood++;
        }
    }
    // gBoard[6][6] = gCherry;
    gGame.totalFood--; // because pacman is created on a food that doesn't count
    return board;
}

function updateScore(diff) {
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score
    if (gGame.score === gGame.totalFood) victory();
}

function gameOver() {
    console.log('Game Over');
    gGame.isOn = false;
    clearInterval(gIntervalGhosts);
    clearInterval(gIntervalCherry);
    var elModal = document.querySelector('.modal');
    var elModalH2 = document.querySelector('.modal h2');
    setTimeout(showElement, 2 * 1000, elModal);
    elModalH2.innerText = 'Game Over!';
}

function victory() {
    console.log('Victory!');
    gGame.isOn = false;
    clearInterval(gIntervalGhosts);
    clearInterval(gIntervalCherry);
    var elModal = document.querySelector('.modal');
    var elModalH2 = document.querySelector('.modal h2');
    setTimeout(showElement, 1 * 1000, elModal);
    elModalH2.innerText = 'Victory!';


}

function getEmptyCells() {
    var cells = [];
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var cell = gBoard[i][j];
            if (cell === EMPTY) {
                cells.push({ i: i, j: j });
            }
        }
    }
    return cells;
}

