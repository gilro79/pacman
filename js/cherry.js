'use strict'


const CHERRY = 'CEHRRY';
var gCherry;
var CHERRY_IMG = '<img src="img/cherries.png" />';

function createCherry() {
    gCherry = {
        location: {
            i: null,
            j: null
        },
        isEaten : false
    }
}

function initCherryInterval() {
    moveCherry();
    gIntervalCherry = setInterval(moveCherry, 15 * 1000);
}


function moveCherry() {
    if (gIsFirstCherry) {
        gIsFirstCherry = false;
    } else if (!gCherry.isEaten) {
        // Model:
        gBoard[gCherry.location.i][gCherry.location.j] = EMPTY;
        // DOM:
        renderCell(gCherry.location, EMPTY);
    }
    gCherry.isEaten = false;
    var emptyCells = getEmptyCells();
    if(emptyCells.length === 0){
        gIsFirstCherry = true;
        return;
    }
    var randIdx = getRandomInt(0, emptyCells.length);
    var cellLocation = emptyCells[randIdx];
    gCherry.location.i = cellLocation.i;
    gCherry.location.j = cellLocation.j;
    // Model:
    gBoard[cellLocation.i][cellLocation.j] = CHERRY;
    // DOM:
    renderCell(cellLocation, CHERRY_IMG)
}