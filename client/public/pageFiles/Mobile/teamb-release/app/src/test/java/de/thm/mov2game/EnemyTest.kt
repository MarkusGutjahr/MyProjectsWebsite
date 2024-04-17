package de.thm.mov2game

/*
class EnemyTest {

    @Test
    fun testTakeDamage() {
        val enemy = Enemy("TestEnemy", 100, 20)
        val damage = 30

        // Simulate the enemy taking damage, verify that the damage was taken
        enemy.takeDamage(damage)
        assertEquals(70, enemy.health)
    }

    @Test
    fun testEnemyAttackPlayerInRange() {
        val player = Player("Player", 100, 15, 0, 0)
        val enemy = Enemy("Enemy", 100, 20, 4, 0, 0.0, 2.0)

        // Place the player and enemy exactly 1 tile away from each other
        player.currentPositionX = 0
        player.currentPositionY = 1
        enemy.currentPositionX = 0
        enemy.currentPositionY = 0

        // Enemy attacks the player, verify that damage was taken
        enemy.attackPlayerIfInRange(player)
        assertEquals(80, player.health)
    }
    @Test
    fun attackPlayerOutOfRange() {
        val player = Player("Player", 100, 20, 0, 0)
        val enemy = Enemy("Enemy", 100, 15, 1, 0, 0.0, 2.0)

        // Place the player and enemy more than movableDistance tiles away from each other
        player.currentPositionX = 0
        player.currentPositionY = 3
        enemy.currentPositionX = 0
        enemy.currentPositionY = 0

        // Enemy tries to attack the player, verify that no damage was taken
        enemy.attackPlayerIfInRange(player)
        assertEquals(100, player.health)
    }

    @Test
    fun testMoveWithinMovableDistance() {
        val enemy = Enemy("TestEnemy", 100, 10, 3)
        enemy.move(2, 3)
        assertEquals(2, enemy.currentPositionX)
        assertEquals(3, enemy.currentPositionY)
    }

}

 */