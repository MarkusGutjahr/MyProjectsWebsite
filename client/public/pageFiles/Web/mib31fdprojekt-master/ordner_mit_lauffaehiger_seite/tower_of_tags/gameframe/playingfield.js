function initializeMatrixState() {
    // Initialize originalMatrixState with the default matrix values
    for (let i = 1; i <= matrixRows; i++) {
        initialMatrixState[i] = [];
        for (let j = 1; j <= matrixCols; j++) {
            initialMatrixState[i][j] = colorEn[Math.floor(Math.random() * colorEn.length)];
        }
    }
}

function createMyGrid() {
    for (let i = 0; i < matrixRows; i++) {
        matrix[i + 1] = [];
        initialMatrixState[i + 1] = [];
        for (let j = 0; j < matrixCols; j++) {
            let colorIndex = Math.floor(Math.random() * colorEn.length);
            //let $span = $('<span />').attr('class', 'colorSquare').html("[" + (i + 1) + "][" + (j + 1) + "]");
            //let $span = $('<span />').attr('class', 'colorSquare');
            let $span = $('<span />').attr('class', 'colorSquare')
                .attr('id', 'tile-' + (i + 1) + '-' + (j + 1));

            // Set background color dynamically from colorEn array
            //$span.css('background-color', colorEn[colorIndex]);

            // $span.css('background-image', 'url("IMG/sprites/grid/Tiles/FieldsTile_38.png")');
            // $span.css('background-size', 'cover');


            // Get random decoration images from different folders
            let decorationBig = getRandomImage('../IMG/sprites/decoration/decoObjectsMix/big', 9, 0.3);
            let decorationMedium = getRandomImage('../IMG/sprites/decoration/decoObjectsMix/medium', 21, 0.3);
            let decorationSmall = getRandomImage('../IMG/sprites/decoration/decoObjectsMix/small', 30, 0.3);
            let basic = "../IMG/sprites/grid/Tiles/FieldsTile_38.png"

            // Set background image dynamically with multiple decorations
            //console.log(basic + ", " + decorationBig + ", "+ decorationMedium + ", "+ decorationSmall)
            $span.css('background-image', `url("${decorationBig}"), url("${decorationMedium}"), url("${decorationSmall}"), url("${basic}")`);
            $span.css('background-position', 'center, center, center, center');
            $span.css('background-repeat', 'no-repeat');
            $span.css('background-size', 'contain, auto, auto, cover');
            $span.css('overflow', 'visible, visible, visible, hidden');


            $("#grid").append($span);
            matrix[i + 1][j + 1] = $span;
            initialMatrixState[i + 1][j + 1] = colorEn[colorIndex]; // Store the initial color
        }
    }
    updateGridAndPath();
    console.log("createMyGrid in iframe");
}

// Helper function to get a random image from a folder
function getRandomImage(folderPath, numImages, chance) {
    let images = [];
    for (let i = 1; i <= numImages; i++) {
        images.push(`${i}.png`);
    }
    // console.log(folderPath + "/" + randomImage);

    // Check the chance before selecting an image
    if (Math.random() < chance) {
        let randomImage = images[Math.floor(Math.random() * images.length)];
        return `${folderPath}/${randomImage}`;
    } else {
        return '';
    }
}

function createPath() {
    let row = 1;
    let randomColumn;

    // Ensure the randomColumn is not in the first column
    do {
        randomColumn = Math.floor(Math.random() * (matrix[1].length - 1)) + 1;
    } while (randomColumn === 1);
    generatedPath = [[row, randomColumn]];

    console.log("randomColumn: " + randomColumn)

    matrix[1][randomColumn].data('partOfPath', true);
    matrix[1][randomColumn].addClass("red");
    matrix[1][randomColumn].css('background-image', 'url("../IMG/sprites/grid/Tiles/FieldsTile_01.png")');
    matrix[1][randomColumn].css('background-size', 'cover');

    //Main loop, runs until we reach the final row.
    do {
        CreateNewFrontier(row, randomColumn);
        //list now contains a list of all legal moves to make

        let randomNumber = Math.floor((Math.random() * (list.length)));
        row = list[randomNumber][0];
        randomColumn = list[randomNumber][1];

        generatedPath.push([row, randomColumn]);

        //And mark it
        MarkPath(row, randomColumn);
    } while (row < matrixRows)
    console.log("createPath in iframe");
    return generatedPath;
}

//This function clears out the previous list of valid moves and generates a new one.
function CreateNewFrontier(row, column) {
    list = [];

    //Check if each cardinal direction falls within the bounds of the matrix.
    //If it does pass that node to the addtofrontier function for further consideration.

    //if (row - 1 >= 1) AddToFrontier(row - 1, column);
    //Commented out, as we are no longer considering paths that lead up.
    // Exclude the first column from possible moves
    if (column + 1 < matrix[row].length && column + 1 !== 1) AddToFrontier(row, column + 1);
    if (row + 1 < matrix.length) AddToFrontier(row + 1, column);
    if (column - 1 > 0 && column - 1 !== 1) AddToFrontier(row, column - 1);
}

//This function checks to make sure nodes to be added to the frontier don't violate any restrictions
//Mainly, per the question description, no node can touch more than 2 nodes on any cardinal direction

function AddToFrontier(row, column) {
    //First we make sure this node is not already on the path. No backtracking, as it would violate the condition that there be only one continuous path.

    if (matrix[row][column].data('partOfPath') !== true) {

        //Now we need to make sure that this node currently only has 1 neighbor at the most that
        //is already on a path, otherwise we will violate the single path condition.
        //So count up all marked neighbors...
        let markedNeighbors = 0;
        if (row - 1 > 0 && !IsNotMarked(row - 1, column)) {
            markedNeighbors++;
        }
        if (column + 1 < matrix[row].length && !IsNotMarked(row, column + 1)) {
            markedNeighbors++;
        }
        if (row + 1 < matrix.length && !IsNotMarked(row + 1, column)) {
            markedNeighbors++;
        }
        if (column - 1 > 0 && !IsNotMarked(row, column - 1)) {
            markedNeighbors++;
        }

        //...and if there is only 1, we add the node to the list of possible moves.
        if (markedNeighbors < 2) {
            let index = list.length;
            list[index] = [];
            list[index][0] = row;
            list[index][1] = column;
        }
    }
}

//Helper function to mark a node as visited.
function MarkPath(row, column) {
    matrix[row][column].data('partOfPath', true);
    matrix[row][column].addClass("red");
    matrix[row][column].css('background-image', 'url("../IMG/sprites/grid/Tiles/FieldsTile_01.png")');
    matrix[row][column].css('background-size', 'cover');
}

//Helper function to check if a path is marked.
function IsNotMarked(row, column) {
    if (row < 1 || row > matrix.length-1) return true;
    if (column < 1 || column > matrix[row].length-1) return true;
    return matrix[row][column].data('partOfPath') !== true;
}

function updateGridAndPath() {
    console.log('Updating grid and path in iframe');

    for (let i = 1; i <= matrixRows; i++) {
        for (let j = 1; j <= matrixCols; j++) {
            //console.log("inFor-For")
            const tile = matrix[i][j].css('background-color')
            //console.log(tile)

            if (!isTowerPresent(i, j)) {
                switch (tile) {
                    case 'rgb(102, 51, 153)':
                        console.log('TileIsRebeccapurple');
                        placeTower(i, j, 'rebeccapurple');
                        break;
                    case 'rgb(0, 0, 255)':
                        console.log('TileIsBlue');
                        placeTower(i, j, 'blue');
                        break;
                    case 'rgb(128, 0, 128)':
                        console.log('TileIsPurple');
                        placeTower(i, j, 'purple');
                        break;
                }
            }
        }
    }


    /*
    // Loop through the matrix and reset to the original state
    for (let i = 1; i <= matrixRows; i++) {
        for (let j = 1; j <= matrixCols; j++) {
            const tile = matrix[i][j];
            tile.css('background-color', initialMatrixState[i][j]);
            //console.log(initialMatrixState[i][j])
            // Check if the color is blue and there is no tower on this tile
            if (initialMatrixState[i][j] === 'blue' && !isTowerPresent(i, j)) {
                // Convert the tile to a tower
                placeTower(i, j);
            }
        }
    }
     */

    /*
    try {
        const temporaryMatrix = JSON.parse(JSON.stringify(initialMatrixState)); // Create a deep copy
        //console.log("updateGridAndPathTry")
        // Apply changes from the temporary matrix to the displayed matrix
        for (let i = 1; i <= matrixRows; i++) {
            for (let j = 1; j <= matrixCols; j++) {
                const newColor = temporaryMatrix[i][j];
                matrix[i][j].css('background-color', newColor);

                // Check if the color is blue and there is no tower on this tile
                if (newColor === 'blue' && !isTowerPresent(i, j)) {
                    // Convert the tile to a tower
                    let tower = new Tower(i, j);
                    towers.push(tower);
                }
            }
        }
    } catch (error) {
        console.error('Error executing user code:', error);
    }
     */
}
