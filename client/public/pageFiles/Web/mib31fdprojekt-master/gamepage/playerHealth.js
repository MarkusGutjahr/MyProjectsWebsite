
/*
----------------------------PLAYER STATS-------------------------------------
*/
// Initialize player health
let playerStartingHealth = 2;
let playerHealth = playerStartingHealth;

// Display player health
updatePlayerHealth();

// Function to update player health display
function updatePlayerHealth() {
    document.getElementById('player-health').textContent = 'Player Health: ' + playerHealth;
    console.log("Player Health:" + playerHealth)
}

// Function to decrement player health
function decrementPlayerHealth() {
    playerHealth--;

    // Update display
    updatePlayerHealth();

    // Check for game over
    if (playerHealth <= 0) {
        //gameOver(); // You can implement your game over logic here

        const iframeGameOver = (document.getElementById('embedded-iframe')).contentWindow;
        iframeGameOver.postMessage({ type: 'gameOver'}, '*');
    }
}
