package de.thm.mov2game

/*
class EnemyAITest {

    private lateinit var player: Player
    private lateinit var enemy: Enemy
    private lateinit var inventory: Inventory

    @Before
    fun setUp() {
        // Create an enemy, player and an inventory(enemy) for testing
        player = Player("Player", 100, 20, 0, 0)
        enemy = Enemy("Enemy", 100, 15, 1, 0, 0.0, 2.0)

        inventory = Inventory()
    }

    @Test
    fun testUseHealingPotion() {
        // Add a healing potion to the inventory
        val healingPotion = Item(
            name = "Healing Potion",
            description = "Restores health.",
            itemType = ItemType.POTION,
            statModifier = StatModifier(healthModifier = 50)
        )
        inventory.addItem(healingPotion)

        // Set the inventory for the enemy
        enemy.inventory = inventory

        // Set the enemy's health to a value below full health
        enemy.health = 75

        // Use the healing potion
        healingPotion.let { enemy.useItem(it) }

        // Check if the enemy's health has been restored by the correct amount
        assertEquals(100, enemy.health)
    }

    @Test
    fun testUseHealingPotionNoPotion() {
        // Ensure the inventory is empty
        // Set the inventory for the enemy
        enemy.inventory = inventory

        // Set the enemy's health to a value below full health
        enemy.health = 75

        // Use the healing potion (which is not in the inventory)
        val healingPotion = inventory.findItemByName("healingPotion")
        healingPotion?.let { enemy.useItem(it) }

        // Check if the enemy's health remains unchanged
        assertEquals(75, enemy.health)
    }

    @Test
    fun testEnemyAIMoveTowardsPlayer() {
        // Place the player and enemy in different positions
        player.currentPositionX = 2
        player.currentPositionY = 2
        enemy.currentPositionX = 0
        enemy.currentPositionY = 0

        // Create an EnemyAI instance
        val enemyAI = EnemyAI(enemy, player)

        // Call takeTurn to make the enemy AI move
        enemyAI.takeTurn()

        // Check if the enemy has moved towards the player
        assertTrue(enemy.currentPositionX > 0 || enemy.currentPositionY > 0)
    }

    @Test
    fun testEnemyAIMoveWithinMovableDistance() {
        // Place the player and enemy in different positions
        player.currentPositionX = 4
        player.currentPositionY = 4
        enemy.currentPositionX = 0
        enemy.currentPositionY = 0

        // Create an EnemyAI instance
        val enemyAI = EnemyAI(enemy, player)

        // Call takeTurn to make the enemy AI move
        enemyAI.takeTurn()

        // Check if the enemy has moved within its movable distance
        assertTrue(enemy.currentPositionX in (-2..2) && enemy.currentPositionY in (-2..2))
    }

    @Test
    fun testEnemyAIAttackPlayerInRange() {
        // Place the player and enemy one tile away from each other
        player.currentPositionX = 0
        player.currentPositionY = 1
        enemy.currentPositionX = 0
        enemy.currentPositionY = 0

        // Create an EnemyAI instance
        val enemyAI = EnemyAI(enemy, player)

        // Call takeTurn to make the enemy AI attack
        enemyAI.takeTurn()

        // Check if the player's health has been reduced
        assertTrue(player.health < 100)
    }

    @Test
    fun testEnemyAIAttackPlayerOutOfRange() {
        // Place the player and enemy far from each other
        player.currentPositionX = 0
        player.currentPositionY = 3
        enemy.currentPositionX = 0
        enemy.currentPositionY = 0

        // Create an EnemyAI instance
        val enemyAI = EnemyAI(enemy, player)

        // Call takeTurn to make the enemy AI skip attack
        enemyAI.takeTurn()

        // Check if the player's health remains the same
        assertEquals(100, player.health)
    }


}

 */