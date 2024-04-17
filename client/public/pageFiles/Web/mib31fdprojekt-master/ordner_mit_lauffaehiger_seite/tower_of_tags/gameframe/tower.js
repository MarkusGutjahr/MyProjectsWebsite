//____________________________TOWER__________________________
// Tower class
class Tower {
    constructor(row, column, containerID, attackRange, attackCooldown, color, attackDamage, maxTargets, towerType, radiusType = 'circle') {
        this.row = row;
        this.column = column;
        this.attackRange = attackRange;
        this.attackSpeed = attackCooldown;
        this.attackCooldown = attackCooldown;
        this.attackDamage = attackDamage
        this.maxTargets = maxTargets;
        this.towerType = towerType;
        this.radiusType = radiusType;

        this.containerID = containerID;
        this.$element = $('<' + towerType + ' />')
            .attr('class', 'tower')
            .attr('idTower', containerID)
            .attr('id', 'tower' + towerIDCounter++)
            .css('background-image', 'url("../IMG/sprites/tower/towerCut.png")')
            .appendTo('#grid');

        // Store the container in the array
        towersContainers.push(this.$element);

        this.updateTower();
    }

    // Function to attack enemies
    attack(enemies) {
        // Check if the tower can attack (cooldown is zero)
        if (this.attackCooldown === 0) {
            // Iterate through enemies to find ones in range
            let targetsCount = 0; // Counter for the number of targets attacked
            enemies.forEach(enemy => {
                const towerPosition = this.$element.offset();
                const enemyPosition = enemy.$element.offset();
                let distance = calculateDistance(towerPosition.top, towerPosition.left, enemyPosition.top, enemyPosition.left);


                switch (this.radiusType) {
                    case 'circle':
                        if (distance <= this.attackRange && targetsCount < this.maxTargets && enemy.health > 0) {
                            // Enemy is in range, attack it
                            console.log('Tower attacking enemy!');
                            // Trigger the arrow animation
                            this.animateArrow(enemy);
                            // Delay the damage to match with the animation
                            enemy.takeDamage(this.attackDamage, this.attackSpeed); // Adjust damage
                            this.attackCooldown = this.attackSpeed; // Set a cooldown before the tower can attack again
                            targetsCount++; // Increment the targets counter
                        }
                        break;
                    case 'row':
                        if (this.row === enemy.row && distance <= this.attackRange && targetsCount < this.maxTargets && enemy.health > 0) {
                            // Enemy is in range, attack it
                            console.log('Tower attacking enemy!');
                            // Trigger the arrow animation
                            this.animateArrow(enemy);
                            // Delay the damage to match with the animation
                            enemy.takeDamage(this.attackDamage, this.attackSpeed); // Adjust damage
                            this.attackCooldown = this.attackSpeed; // Set a cooldown before the tower can attack again
                            targetsCount++; // Increment the targets counter
                        }
                        break;
                    case 'column':
                        if (this.column === enemy.col && distance <= this.attackRange && targetsCount < this.maxTargets && enemy.health > 0) {
                            // Enemy is in range, attack it
                            console.log('Tower attacking enemy!');
                            // Trigger the arrow animation
                            this.animateArrow(enemy);
                            // Delay the damage to match with the animation
                            enemy.takeDamage(this.attackDamage, this.attackSpeed); // Adjust damage
                            this.attackCooldown = this.attackSpeed; // Set a cooldown before the tower can attack again
                            targetsCount++; // Increment the targets counter
                        }
                        break;
                }
            });
        } else {
            // Tower is on cooldown, decrement the cooldown
            this.attackCooldown = Math.max(0, this.attackCooldown - 10);
        }
    }

    animateArrow(targetEnemy) {
        // Create a new arrow element
        const arrow = $('<div />').addClass('arrow');
        // Append the arrow to the grid or any appropriate parent element
        $('#grid').append(arrow);

        // Get the position of the tower's element and the enemy's element
        const towerPosition = this.$element.offset();
        const enemyPosition = targetEnemy.$element.offset();

        // Set the initial position of the arrow
        arrow.css({
            top: towerPosition.top + 5, // Adjusted for border and margin
            left: towerPosition.left + 5, // Adjusted for border and margin
        });

        // Animate the arrow to the enemy's element position
        arrow.animate(
            {
                top: enemyPosition.top + 5,
                left: enemyPosition.left + 5,
            },
            this.attackSpeed, // Animation duration in milliseconds
            'linear',
            () => {
                // Animation complete, remove the arrow
                arrow.remove();
            }
        );
    }


    updateTower() {
        // Get the position of the grid tile
        const tilePosition = matrix[this.row][this.column].offset();

        // Update the position of the container
        this.$element.css({
            top: tilePosition.top + 5, // Adjusted for border and margin
            left: tilePosition.left + 5, // Adjusted for border and margin
        });

        // Update the position of the tower inside the container
        //this.$element.css({ top: 0, left: 0 });
    }


    updateNewTowerPosition() {
        // Get the position of the grid tile
        //const tilePosition = matrix[this.row][this.column].position();
        const tilePositionRow = this.$element.offset().left;
        const tilePositionCol = this.column;


        // Update the position of the container
        this.$element.css({
            top: tilePositionCol.top + 5, // Adjusted for border and margin
            left: tilePositionRow.left + 5, // Adjusted for border and margin
        });

        // Update the position of the tower inside the container
        //this.$element.css({ top: 0, left: 0 });
    }

    snapTowerToPath() {
        // Store current towers with their rows
        const currentTowersInfo = towers.map(tower => ({
            row: tower.row,
            column: tower.column,
            towerType: tower.towerType,
        }));

        // Delete all current towers
        deleteAllTowers();


        // Recreate towers based on the stored information
        currentTowersInfo.forEach(towerInfo => {
            //console.log("towerInfo.row: " + towerInfo.row);
            //console.log("towerInfo.column: " + towerInfo.column);
            //console.log("towerInfo.towerType: " + towerInfo.towerType);
            console.log("Placing tower:", towerInfo);

            // Place tower next to the path
            if (towerInfo.row >= 1 && towerInfo.row <= matrixRows) {
                for (let col = towerInfo.column + 1; col <= matrixCols; col++) {
                    if (matrix[towerInfo.row][col].data('partOfPath') === true) {
                        if(towerInfo.towerType === 'span') {
                            // Ensure the tile is not part of the path before placing the tower
                            if (!matrix[towerInfo.row][col + 1].data('partOfPath')) {
                                // Place the tower one column to the left of the path tile
                                placeTower(towerInfo.row, col + 1, towerInfo.towerType, false);
                                console.log("Placing tower");
                                break; // Stop searching after placing the tower
                            }
                        }
                        // Ensure the tile is not part of the path before placing the tower
                        if (!matrix[towerInfo.row][col - 1].data('partOfPath')) {
                            // Place the tower one column to the left of the path tile
                            placeTower(towerInfo.row, col - 1, towerInfo.towerType, false);
                            console.log("Placing tower");
                            break; // Stop searching after placing the tower
                        }
                    }
                }
            }
        });

        this.updateTower();

    }

}


// Function to place towers on the grid
function placeTower(row, column, towerType, offset = true) {
    // Check if the selected tile is not part of the path
    if (!matrix[row][column].data('partOfPath')) {
        // Create a new tower and add it to the towers array
        const containerID = 'tower-container-' + new Date().getTime();
        let tower;
        let nextRow = row;

        // Determine tower properties based on towerType (HTML tag type)
        switch (towerType) {
            case 'header':
                // Place header tower at the top row
                tower = new Tower(1, column, containerID, 3, 2000, 'rebeccapurple', 15, 1, towerType, 'row');
                break;
            case 'footer':
                // Place footer tower at the bottom row
                const bottomRow = matrix.length - 1;
                tower = new Tower(bottomRow, column, containerID, 3, 2000, 'rebeccapurple', 15, 1, towerType, 'row');
                break;
            case 'table':
                tower = new Tower(nextRow, column, containerID, 3, 1500, 'rebeccapurple', 10, 2, towerType);
                break;
            case 'nav':
                // Find the next available row for div and nav towers
                while (isTowerPresent(nextRow, column)) {
                    nextRow++;
                }
                tower = new Tower(nextRow, column, containerID, 3, 1500, 'rebeccapurple', 10, 1, towerType);
                break;
            case 'span':
                const newColumn = column++;
                tower = new Tower(nextRow, newColumn, containerID, 3, 1500, 'rebeccapurple', 10, 1, towerType);
                break;
            case 'a':
            case 'p':
            case 'h1':
            case 'h2':
            case 'h3':
            case 'h4':
            case 'h5':
            case 'h6':
            case 'ol':
            case 'ul':
            case 'li':
            case 'img':
            case 'em':
            case 'b':
            case 'i':
            case 'u':
            case 'strike':
            case 'div':
                // Find the next available row for div and nav towers
                if(offset){
                    nextRow = row + 1;
                }
                while (isTowerPresent(nextRow, column)) {
                    nextRow++;
                }
                tower = new Tower(nextRow, column, containerID, 3, 1500, 'rebeccapurple', 10, 1, towerType);
                break;
            default:
                console.log('Unknown or not intended tower type:', towerType);
                return;
        }

        // Append the tower element to the document body
        $('#tower-container').append(tower.$element);

        towers.push(tower);
        console.log(`Tower placed at row: ${tower.row}, column: ${tower.column}, type: ${towerType}`);
    } else {
        console.log('Cannot place tower on the path.');
    }
}

/*
// Function to check if a tower is present on a given tile
function isTowerPresent(row, column) {
        return towers.some(tower => tower.row === row && tower.column === column);
    }
 */

function isTowerPresent(row, column) {
    for (let i = 0; i < towers.length; i++) {
        if (towers[i].row === row && towers[i].column === column) {
            return true;
        }
    }
    return false;
}

// Function to calculate distance between two points
function calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))/50;
}


function startTowerAttacks() {
    //setInterval(handleTowerAttacks, 100);
    //setInterval(handleTowerAttacks);
    this.attackInterval = setInterval(() => {
        //console.log("attackInterval started");
        if (!gameOver){
            towers.forEach(tower => {
                tower.attack(enemies);
            });
        }else {
            clearInterval(this.attackInterval)
        }
    }, this.attackSpeed);
}

/*
// Update function to handle tower attacks
function handleTowerAttacks() {
    if (!gameOver) {
        towers.forEach(tower => {
            tower.attack(enemies);
        });
    }
}
 */
// Function to delete all towers
function deleteAllTowers() {
    // Remove towers from the grid
    towers.forEach(tower => {
        tower.$element.remove();
    });

    // Clear the towers array
    towers = [];
    console.log('All towers deleted.');
}

// Function to update all towers
function updateAllTowers() {
    // update all towers on the grid
    towers.forEach(tower => {
        tower.updateNewTowerPosition();
    });
    console.log('All towers updated.');
}


function snapAllTowerToPath() {
    // Snap all towers to the path
    towers.forEach(tower => {
        tower.snapTowerToPath();
    });
    console.log('All towers placed next to the path.');
}
