let colorEn = ["LawnGreen", "orange", "yellow", "green", "darkGreen"];
let $color = "null";
let matrix = [];
let list = [];
let initialMatrixState = [];
let matrixRows = 10;
let matrixCols = 10;
let temporaryMatrixChanges = null;
let generatedPath = [];
let enemies = [];
let enemiesContainers = [];
let towersContainers = [];
let towers = [];
let towerIDCounter = 1;
let handleLevelCode;
let game;

//let numEnemies = 3;
//let enemyMovingSpeed = 1000;
//let enemySpawnRate = 2500;


// Set custom properties for CSS variables
document.documentElement.style.setProperty('--matrix-cols', matrixCols);
document.documentElement.style.setProperty('--matrix-rows', matrixRows);

$(document).ready(function () {
    initializeMatrixState();
    createMyGrid();
    createPath();

    //startEnemyWave(generatedPath);
    //startTowerAttacks();


    updateGridAndPath(matrix);
});

// Listen for messages from the parent frame
window.addEventListener('message', function(event) {
    if (event.data && event.data.type === 'level') {

        // Handle the received data
        const level = event.data.level;
        console.log('Received level:', level);

        handleLevelCode = level;

        // Create an instance of the game
        game = new Game(level);

        // Start the game at the specified level
        game.startGame();
    }
});
