/*
----------------------------PLAYER LIFE-------------------------------------
 */
let gameOver = false;

// Decrement player health
function decrementPlayerHealth() {
// Send a message to the parent window
    window.parent.postMessage({ type: 'decrement'}, '*');
}
window.addEventListener('message', function (event) {
    const messageType = event.data.type;

    if (messageType === 'gameOver') {
        gameOver = true;

        displayGameOverScreen();
        console.log('Game Over message received in the iframe.');
    }
});

// Function to display the game over screen
function displayGameOverScreen() {
    // Create a div for the game over screen
    const gameOverScreen = document.createElement('div');
    gameOverScreen.id = 'game-over-screen';

    // Style the div to cover the entire iframe and darken the background
    gameOverScreen.style.position = 'fixed';
    gameOverScreen.style.top = '0';
    gameOverScreen.style.left = '0';
    gameOverScreen.style.width = '100%';
    gameOverScreen.style.height = '100%';
    gameOverScreen.style.zIndex = '5';
    gameOverScreen.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'; // Adjust the alpha value for darkness

    // Style the text for "Game Over"
    const gameOverText = document.createElement('h1');
    gameOverText.innerText = 'Game Over';
    gameOverText.style.color = 'white';
    gameOverText.style.position = 'absolute';
    gameOverText.style.top = '50%';
    gameOverText.style.left = '50%';
    gameOverText.style.zIndex = '6';
    gameOverText.style.transform = 'translate(-50%, -50%)';

    // Style the button for "Game Over"
    const gameOverButton = document.createElement('button');
    gameOverButton.id = 'restart-button'
    gameOverButton.innerText = 'restart'
    gameOverButton.style.backgroundColor = 'white';
    gameOverButton.style.color = 'black';
    gameOverButton.style.position = 'absolute';
    gameOverButton.style.top = '60%';
    gameOverButton.style.left = '50%';
    gameOverScreen.style.zIndex = '6';
    gameOverButton.style.transform = 'translate(-50%, -50%)';

    // Append the text to the game over screen
    gameOverScreen.appendChild(gameOverText);
    gameOverScreen.appendChild(gameOverButton);

    // Append the game over screen to the body
    document.body.appendChild(gameOverScreen);

    gameOverButton.addEventListener('click', function () {
        // Reset player health count
        window.parent.postMessage({ type: 'resetPlayerHealthCount'}, '*');
        // Reload the iframe to restart the game
        location.reload();
    });
}

// Function to display the winning screen
function displayWinningScreen() {
    // Create a div for the winning screen
    const winningScreen = document.createElement('div');
    winningScreen.id = 'winning-screen';

    // Style the div to cover the entire iframe and darken the background
    winningScreen.style.position = 'fixed';
    winningScreen.style.top = '0';
    winningScreen.style.left = '0';
    winningScreen.style.width = '100%';
    winningScreen.style.height = '100%';
    winningScreen.style.zIndex = '5';
    winningScreen.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'; // Adjust the alpha value for darkness

    // Style the text for "You Won"
    const winningText = document.createElement('h1');
    winningText.innerText = 'You Won';
    winningText.style.color = 'white';
    winningText.style.position = 'absolute';
    winningText.style.top = '50%';
    winningText.style.left = '50%';
    winningText.style.zIndex = '6';
    winningText.style.transform = 'translate(-50%, -50%)';

    // Style the button for "You Won"
    const winningButton = document.createElement('button');
    winningButton.id = 'back-to-levels-button'
    winningButton.innerText = 'back to levels'
    winningButton.style.backgroundColor = 'white';
    winningButton.style.color = 'black';
    winningButton.style.position = 'absolute';
    winningButton.style.top = '60%';
    winningButton.style.left = '50%';
    winningButton.style.zIndex = '6';
    winningButton.style.transform = 'translate(-50%, -50%)';

    // Append the text to the winning screen
    winningScreen.appendChild(winningText);
    winningScreen.appendChild(winningButton);

    // Append the winning screen to the body
    document.body.appendChild(winningScreen);

    winningButton.addEventListener('click', function () {
        // Go back to the levels
        window.parent.postMessage({ type: 'backToLevels'}, '*');
    });
}
