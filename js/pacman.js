'use strict'
// const PACMAN = '😷';
const PACMAN = '<img src="img/pacman.jpg" />';
// ???? how can you get the background of an img to be transparent?

var gPacman;
function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false,
        direction: 0 + 'deg'
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}
function movePacman(ev) {
    if (!gGame.isOn) return;
    // console.log('ev', ev);
    var nextLocation = getNextLocation(ev)
    if (!nextLocation) return;
    // console.log('nextLocation', nextLocation);
    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('NEXT CELL', nextCell);
    if (nextCell === WALL) return;
    if (nextCell === FOOD) updateScore(1);
    if (nextCell === CHERRY) {
        updateScore(10);
        gCherry.isEaten = true;
        // we need to update the total food so the game won't end too soon
        gGame.totalFood += 10;
    }
    if (nextCell === POWER_FOOD) {
        if (gPacman.isSuper) return;
        gPacman.isSuper = true;
        powerFoodOn();
        setTimeout(powerFoodOff, 5 * 1000);
    }
    else if (nextCell === GHOST) {
        if (gPacman.isSuper) {
            // update the model
            gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
            // update the dom
            renderCell(gPacman.location, EMPTY);
            gPacman.location = nextLocation;
            // update the model
            gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
            // update the dom
            renderCell(gPacman.location, getPacmantHTML());
            var cellContent = killGhost();
            // in case the ghost is standing on food:
            if (cellContent === FOOD) updateScore(1);
            return
        }
        gameOver();
        renderCell(gPacman.location, EMPTY)
        return;
    }

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;

    // update the dom
    renderCell(gPacman.location, EMPTY);

    gPacman.location = nextLocation;

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
    // update the dom
    renderCell(gPacman.location, getPacmantHTML());
}


function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--;
            gPacman.direction = 270 + 'deg';
            break;
        case 'ArrowDown':
            nextLocation.i++;
            gPacman.direction = 90 + 'deg';
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            gPacman.direction = 180 + 'deg';
            break;
        case 'ArrowRight':
            nextLocation.j++;
            gPacman.direction = 0 + 'deg';
            break;
        default:
            return null;
    }
    return nextLocation;
}

function getPacmantHTML() {
    return `<div style="transform: rotate(${gPacman.direction});">${PACMAN}</div>`;
}   // ???? why did the div take all row? is that because of the cell?