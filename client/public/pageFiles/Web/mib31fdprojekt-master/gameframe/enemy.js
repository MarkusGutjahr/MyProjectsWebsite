//__________________________________ENEMY_____________________________________

class Enemy {
    constructor(path, containerID) {
        console.log("EnemyCreated")
        this.path = generatedPath;
        this.currentStep = 0;
        this.health = 30;

        this.containerID = containerID;
        // Create the enemy container and append it to the grid
        this.$container = $('<div />').attr('idEnemy', containerID).css({
            position: 'absolute',
            width: '30px', // Adjust the width as needed
            height: '30px', // Adjust the height as needed
            background: 'transparent', // Set the background color as needed
            zIndex: '1', // Ensure it's above the grid tiles
        }).appendTo('#grid');
        this.$element = $('<span />').attr('class', 'enemy');
        this.$element.css('background-image', 'url("../IMG/sprites/enemy/1/S_Preattack.png")');

        this.$container.append(this.$element);

        // Store the container in the array
        enemiesContainers.push(this.$container);


        // Create a health bar container
        this.$healthBarContainer = $('<div />').addClass('health-bar-container');
        this.$container.append(this.$healthBarContainer);

        // Create the health bar element
        this.$healthBar = $('<div />').addClass('health-bar');
        this.$healthBarContainer.append(this.$healthBar);

        // Set initial health
        this.health = 100; // You can set the initial health as needed

        this.updatePosition();
    }

    takeDamage(damage, attackSpeed) {
        this.health -= damage;
        if (this.health <= 0) {
            // Enemy is defeated, remove it
            this.$container.remove();
            this.$element.remove();
            enemies.splice(enemies.indexOf(this), 1);
            // Check for winning condition with a delay
            setTimeout(() => {
                if (enemies.length === 0) {
                    displayWinningScreen();
                }
            }, 4500); // Adjust the delay as needed
        }
        this.updateHealthBar(attackSpeed);
        //console.log("Enemy " + this.containerID + " has " + this.health + " life left.")
    }

    updateHealthBar(attackSpeed) {
        // Update the health bar width based on the current health
        setTimeout(() => {
            const healthPercentage = (this.health / 100) * 100;
            this.$healthBar.width(healthPercentage + '%');
        }, attackSpeed); // Adjust the delay
    }

    move() {
        // Move the enemy along the path
        if (this.currentStep < this.path.length - 1) {
            this.currentStep++;
            this.updatePosition();
            //console.log(`Enemy position after move: ${this.row}, ${this.column}`);
        } else {
            console.log("EnemyGotTrough")

            // Enemy reached the end of the path, remove it
            this.$container.remove();
            this.$element.remove();
            // Remove the enemy from the array
            enemies.splice(enemies.indexOf(this), 1);

            decrementPlayerHealth();
        }
    }
    updatePosition() {
        const [row, column] = this.path[this.currentStep];
        this.row = row;
        this.column = column;

        // Get the position of the grid tile
        const tilePosition = matrix[row][column].position();

        // Update the position of the container
        this.$container.css({
            top: tilePosition.top + 5, // Adjusted for border and margin
            left: tilePosition.left + 5, // Adjusted for border and margin
        });

        // Update the position of the enemy inside the container
        this.$element.css({ top: 0, left: 0 });

        // Update the health bar
        this.updateHealthBar();
    }
}


// Call this function to start spawning enemies
function startEnemyWave(numEnemies, enemyMovingSpeed, enemySpawnRate, generatedPath) {
    console.log("EnemyWaveStarted");

    // Start spawning enemies with a delay
    spawnEnemiesWithDelay(numEnemies, enemySpawnRate, generatedPath);

    setInterval(moveEnemies, enemyMovingSpeed);
}

function spawnEnemiesWithDelay(numEnemies, enemySpawnRate, path) {
    let enemyCounter = 0;

    function spawnEnemy() {
        // Check if the game is not over
        if (!gameOver && enemyCounter < numEnemies) {
            // Generate a unique ID for the enemy container
            const containerID = 'enemy-container-' + new Date().getTime();

            // Create a new enemy
            let enemy = new Enemy(path, containerID);
            enemies.push(enemy);

            // Increment the counter
            enemyCounter++;

            // Set a delay before spawning the next enemy
            setTimeout(spawnEnemy, enemySpawnRate); // Adjust the delay here
        }
    }

    // Start the initial spawn
    spawnEnemy();
}



// Function to move all enemies in the array
function moveEnemies() {
    if (!gameOver) {
        enemies.forEach(enemy => {
            enemy.move();
        });
    }
}
