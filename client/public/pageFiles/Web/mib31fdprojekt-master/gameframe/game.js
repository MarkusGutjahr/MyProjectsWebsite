class Game {
    constructor(level) {
        this.level = level;
    }

    startGame() {
        // Start the game at level 1
        this.startLevel(this.level);
    }

    startLevel() {
        console.log(`Starting Level ${this.level}`);

        // Implement level-specific logic
        switch (this.level) {
            case 0:
                this.setupLevelZero();
                break;
            case 1:
                this.setupLevelOne();
                break;
            case 2:
                this.setupLevelTwo();
                break;
            case 3:
                this.setupLevelThree();
                break;
            case 4:
                this.setupLevelFour();
                break;
            case 5:
                this.setupLevelFive();
                break;

            default:
                console.log('Game completed!');
                break;
        }
    }

    //LEVEL 0
    //Tutorial
    setupLevelZero() {
        console.log('Started Level 0');
    }

    //LEVEL 1
    //HTML 1
    setupLevelOne() {
        console.log('Started Level 1');
    }

    //LEVEL 2
    //HTML2
    setupLevelTwo() {
        console.log('Started Level 2');
    }

    //LEVEL 3
    //CSS 1
    setupLevelThree() {
        console.log('Started Level 3');

        placeTower(1,1, 'header');
        placeTower(3,1, 'nav');
        placeTower(5,1, 'div');
        placeTower(7,1, 'table');
        placeTower(9,1, 'footer');
    }

    //LEVEL 4
    //CSS 2
    setupLevelFour() {
        console.log('Started Level 4');

        placeTower(1,1, 'header');
        placeTower(2,1, 'nav');
        placeTower(3,1, 'div');
        placeTower(5,1, 'table');
        placeTower(7,1, 'div');
        placeTower(8,1, 'div');
        placeTower(9,1, 'footer');
    }

    //LEVEL 5
    //BOSS-LEVEl
    setupLevelFive() {
        console.log('Started Level 5');
    }

    // Function to progress to the next level
    nextLevel() {
        if (this.currentLevel < this.maxLevels) {
            this.currentLevel++;
            this.startLevel(this.currentLevel);
        } else {
            console.log('Game completed!');
        }
    }
    startWave () {
        if(this.level === 0){
            startEnemyWave(3, 2000, 4000, generatedPath);
        }else if(this.level === 1){
            startEnemyWave(6, 1800, 3500, generatedPath);
        }else if(this.level === 2){
            startEnemyWave(9, 1500, 2800, generatedPath);
        }else if(this.level === 3){
            startEnemyWave(12, 1200, 2500, generatedPath);
        }else if(this.level === 4){
            startEnemyWave(15, 900, 2000, generatedPath);
        }else if(this.level === 5){
            startEnemyWave(20, 500, 1500, generatedPath);
        }

        startTowerAttacks();
    }

}

// Listen for messages from the parent frame
window.addEventListener('message', function(event) {
    if (event.data && event.data.do === 'start') {
        game.startWave();
    }
});
