'use strict'
const GHOST = '&#9781;';

var gGhosts = [];
var gDeadGhosts = [];
var gIntervalGhosts;

function createGhost(board) {
    var ghost = {
        location: {
            i: 3,
            j: 3
        },
        color: getRandomColor(),
        superFoodColor: '#3c85f3',
        currCellContent: FOOD
    }
    gGhosts.push(ghost);
    board[ghost.location.i][ghost.location.j] = GHOST
}

function createGhosts(board) {
    gDeadGhosts = [];
    gGhosts = [];
    createGhost(board);
    createGhost(board);
    createGhost(board);
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        moveGhost(ghost)
    }
}

function moveGhost(ghost) {
    var moveDiff = getMoveDiff();
    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    if (nextCell === WALL) return;
    if (nextCell === GHOST) return;
    if (nextCell === CHERRY) return;
    if (nextCell === PACMAN) {
        if (gPacman.isSuper) {
            // model
            gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent;
            // dom
            renderCell(ghost.location, ghost.currCellContent)
            ghost.location = nextLocation;
            killGhost();
        } else {
            renderCell(gPacman.location, EMPTY)
            gameOver();
            return;
        }
    }

    // model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // dom
    renderCell(ghost.location, ghost.currCellContent)

    // model
    ghost.location = nextLocation;
    ghost.currCellContent = gBoard[ghost.location.i][ghost.location.j]
    gBoard[ghost.location.i][ghost.location.j] = GHOST;
    // dom
    renderCell(ghost.location, getGhostHTML(ghost));
}

function powerFoodOn() {
    // changing the color of all the ghosts to blue
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        var tempColor = ghost.superFoodColor;
        ghost.superFoodColor = ghost.color;
        ghost.color = tempColor;
        renderCell(ghost.location, getGhostHTML(ghost));
    }
}

function powerFoodOff() {
    gPacman.isSuper = false;
    reviveGhosts();
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        var tempColor = ghost.superFoodColor;
        ghost.superFoodColor = ghost.color;
        ghost.color = tempColor;
        renderCell(ghost.location, getGhostHTML(ghost));
    }
}
function reviveGhosts() {
    for (var i = 0; i < gDeadGhosts.length; i++) {
        gDeadGhosts[i].currCellContent = EMPTY;
        gGhosts.push(gDeadGhosts[i]);
    }
    gDeadGhosts = [];
}

function killGhost() {
    for (var i = 0; i < gGhosts.length; i++) {
        if (gPacman.location.i === gGhosts[i].location.i &&
            gPacman.location.j === gGhosts[i].location.j) {
            break;
        }
    }
    // in case the ghost is standing on food:
    var cellContent = gGhosts[i].currCellContent;
    gDeadGhosts.push(gGhosts[i]);
    gGhosts.splice(i, 1);
    // gDeadGhosts.push(gGhosts.splice(i, 1)[0])
    return cellContent;
}



function getMoveDiff() {
    var randNum = getRandomInt(0, 100);
    if (randNum < 25) {
        return { i: 0, j: 1 }
    } else if (randNum < 50) {
        return { i: -1, j: 0 }
    } else if (randNum < 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}


function getGhostHTML(ghost) {
    return `<span style="color:${ghost.color};">${GHOST}</span>`
}