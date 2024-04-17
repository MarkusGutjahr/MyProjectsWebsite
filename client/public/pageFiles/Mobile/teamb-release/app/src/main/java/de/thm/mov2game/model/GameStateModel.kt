package de.thm.mov2game.model

import de.thm.mov2game.model.dungeon.Coord
import de.thm.mov2game.view.InventoryFragment
import de.thm.mov2game.model.entities.Enemy
import de.thm.mov2game.model.entities.Entity
import de.thm.mov2game.model.entities.EntityAI
import de.thm.mov2game.model.entities.Node
import de.thm.mov2game.model.entities.Player
import de.thm.mov2game.model.inventory.Inventory
import de.thm.mov2game.model.inventory.GenerateItems
import de.thm.mov2game.model.mapObjects.Chest
import kotlin.random.Random

class GameStateModel(private val levelModel: LevelModel) {
    lateinit var inventoryFragment: InventoryFragment
    val playerInventory: Inventory = Inventory()

    lateinit var aiModel : EntityAI

    val enemyPrefabs = mutableListOf<Enemy>()
    val chestPrefabs = mutableListOf<Chest>()

    lateinit var enemies : MutableList<Enemy>
    var player = Player("Bob", 0,50, 10)
    private lateinit var chests: MutableList<Chest>

    var playerTurn = false
    private var playerKilled = false

    lateinit var pathData : List<Node>
    //Konstruktor
    init {
        //Fill Player Inventory
        GenerateItems.allItemsList.find { it.name == "Rusty Sword" }
            ?.let { playerInventory.add(it) }
        GenerateItems.allItemsList.find { it.name == "Small Healing Potion" }
            ?.let { playerInventory.add(it) }
        GenerateItems.allItemsList.find { it.name == "Small Healing Potion" }
            ?.let { playerInventory.add(it) }
        GenerateItems.allItemsList.find { it.name == "Small Healing Potion" }
            ?.let { playerInventory.add(it) }

        //Generate Monsters for level
        enemyPrefabs.add(Enemy("Zombie",18,5,1,5,1,1))
        enemyPrefabs.add(Enemy("Skeleton", 1, 30, 5, 5, 2,2, true))
        enemyPrefabs.add(Enemy("Plant Zombie",5,50,5,7,3,3, true))
        enemyPrefabs.add(Enemy("Muddy",10,40,5,8,5,3))
        enemyPrefabs.add(Enemy("Ice Zombie",7,25,10,6,7,5))
        enemyPrefabs.add(Enemy("Orc", 2, 50, 10, 6, 9,7, true))
        enemyPrefabs.add(Enemy("Walking Pumpkin",15,40,3,8,4,5, true))
        enemyPrefabs.add(Enemy("Wogol",17,30,10,8,12,8, true))
        enemyPrefabs.add(Enemy("Goblin",6,20,15,7,15,5, true))
        enemyPrefabs.add(Enemy("Female Lizard",8,40,15,6,20,10, true))
        enemyPrefabs.add(Enemy("Male Lizard",9,40,15,7,20,10, true))
        enemyPrefabs.add(Enemy("Orc Shaman",13,30,20,7,25,8, true))
        enemyPrefabs.add(Enemy("Orc Warrior",14,50,15,9,25,8, true))
        enemyPrefabs.add(Enemy("Troll",3, 40, 20, 10,30,12, true))
        enemyPrefabs.add(Enemy("Ogre",12,80,20,10,32,15, true))
        enemyPrefabs.add(Enemy("Necromancer",11,70,2,9,18,15))
        enemyPrefabs.add(Enemy("Demon", 4,100,30,10,40,20, true))
        enemyPrefabs.add(Enemy("Swampy",16,50,50,9,35,15))

        //Generate Chests for Level
        chestPrefabs.add(Chest("Random Chest", 0, levelModel, "random"))
        chestPrefabs.add(Chest("Weapon Chest", 1, levelModel, "weapon"))
        chestPrefabs.add(Chest("Armor Chest", 2, levelModel, "armor"))
        chestPrefabs.add(Chest("Potion Chest", 3, levelModel, "potion"))
    }

    //Wenn Level neustartet
    fun initGame() {
        //heal Player
        player.health = player.maxHealth

        enemies = mutableListOf<Enemy>()
        chests = mutableListOf<Chest>()
    }

    fun beginTurn() {
        if (playerKilled) respawnPlayer()

        pathData = aiModel.breathFirstSearch(player.position, player.movableDistance)
        playerTurn = true
    }

    fun handleTouchEvent(pos : Coord) {
        if (playerTurn) {
            val entity = tryGetEntityAt(pos)
            val chest = tryGetChestAt(pos)

            if (entity != null && playerAttackCheck(entity)) {
                levelModel.controller.playplayerAttackfx()

                val enemyKilled = player.attack(player, entity) <= 0
                levelModel.controller.updateEnemyHealthBar(entity.health.toFloat() / entity.maxHealth)

                if (enemyKilled) {
                    levelModel.score += entity.experience
                    killEnemy(entity)
                    levelModel.trySpawnChest(entity.position)
                    levelModel.controller.setScoreText(levelModel.level, levelModel.score)
                }
            }
            if (playerChestCheck(chest)) {
                chest?.onOpen()
            }
        }
    }

    fun handleReleaseEvent(endTile : Coord){
        if (playerTurn) {
            movePlayer(endTile)
            endTurn()
        }
    }

    private fun endTurn(){
        playerTurn = false

        for(e in enemies) {
            if (e.active) {
                takeTurn(e)
            }
        }
        //erst wenn animation fertig
        if (!levelModel.animator.animating){
            beginTurn()
        }
    }

    private fun takeTurn(enemy: Enemy) {
        if(enemy.weaponRangeCheck(enemy.position, player.position, 1)){
            enemy.attack(enemy, player)
            if (player.health <= 0){
                levelModel.gameStateModel.playerKilled = true
            }
            levelModel.controller.updateHealthBar(player.health.toFloat() / player.maxHealth, levelModel.lives)
        }
        else if (enemy.canWalk && Random.nextFloat() > 0.5f) {
            val freeSpace = playerSurroundingCheck()
            if(freeSpace.isNotEmpty()){
                levelModel.gameStateModel.moveEnemy(enemy, freeSpace.random())
            }
            else levelModel.gameStateModel.moveEnemy(enemy)
        }
    }

    private fun respawnPlayer() {
        levelModel.lives--
        if (levelModel.lives <= 0) {
            levelModel.controller.savePrefs(1, 3, 0, 0)
            levelModel.controller.showInfoText("Game Over!")
            levelModel.timer.running = false
            playerTurn = false
        } else {
            levelModel.controller.savePrefs(levelModel.level, levelModel.lives, levelModel.score, levelModel.seed)
            levelModel.controller.showInfoText("You Died! ")
            levelModel.controller.updateHealthBar(1f, levelModel.lives)
            levelModel.controller.updateEnemyHealthBar(0f)
            levelModel.removeEntity(player)
            player.health = player.maxHealth
            levelModel.placeEntity(player, levelModel.dungeon.spawnpoint)
            levelModel.camPosition = player.realPosition
            playerKilled = false
            levelModel.controller.playbobdyingfx() // when player dies
        }
    }

    fun instantiate(enemy: Enemy) : Enemy {
        val newEnemy = enemy.clone()
        enemies.add(newEnemy)
        return newEnemy
    }

    fun instantiateChest(chest: Chest) : Chest {
        val newChest = chest.getChest()
        chests.add(newChest)
        return newChest
    }

    private fun tryGetEntityAt(pos : Coord) : Entity? {
        for (e in enemies) {
            if (e.active && e.position == pos) return e
        }
        return null
    }

    private fun tryGetChestAt(pos : Coord) : Chest? {
        for (e in chests) {
            if (e.active && e.position == pos) return e
        }
        return null
    }

    private fun playerRangeCheck(pos : Coord) : Boolean {
        return !levelModel.dungeon.isObstacle(pos) && player.playerRangeCheck(pos.x, pos.y)
    }
    fun playerAttackCheck(entity : Entity?) : Boolean {
        return entity != null && entity != player && player.weaponRangeCheck(player.position, entity.position, 1)
    }
    private fun playerChestCheck(chest : Chest?) : Boolean {
        return chest != null && player.weaponRangeCheck(player.position, chest.position, 1)
    }

    private fun playerSurroundingCheck(): MutableList<Coord> {
        val playerSurrounding = mutableListOf<Coord>()
        for(x in -1..1){
            for(y in -1..1){
                val tempCoord = Coord(player.position.x + x, player.position.y + y)

                if (!levelModel.dungeon.isObstacle(tempCoord)){
                    playerSurrounding.add(tempCoord)
                }
            }
        }
        return playerSurrounding
    }

    private fun movePlayer(to : Coord) {
        if (playerRangeCheck(to)) {
            val path = aiModel.pathfind(to, pathData)
            levelModel.moveEntity(player, path, 4f)
        }
    }

    private fun moveEnemy(enemy: Enemy, target: Coord? = null) {
        val cell = levelModel.dungeonGenerator.getCell(player.position)
        val path : List<Coord>
        if (levelModel.dungeonGenerator.isPointInCell(enemy.position, cell.x, cell.y)) {
            path = if (target != null) aiModel.pathfind(enemy.position, target, enemy.movableDistance)
            else aiModel.randomPath(enemy.position, enemy.movableDistance)
            levelModel.moveEntity(enemy, path, 2f)
        }
    }

    private fun killEnemy(entity: Entity){
        levelModel.removeEntity(entity)
        enemies.remove(entity)

        if (entity.maxHealth >= 50 ) // play specific sound for each enemy while dying
            levelModel.controller.playdyingfx()

        if (entity.maxHealth <= 50 && (entity.name != "Skeleton"))
            levelModel.controller.playminidyingfx()
            // default fighting sound will be played since they die with one click

    }
    fun deleteChest(chest: Chest){
        levelModel.removeChest(chest)
        chests.remove(chest)
    }

    fun updateHealth() {
       levelModel.controller.updateHealthBar(player.health.toFloat() / player.maxHealth, levelModel.lives)
    }

    fun specialAttack(specialAttack : Int) {
        player.attackDamage += specialAttack // it should have changed it for ever , but in the attack, it is reset
    }

    fun specialDefend(specialDefend : Int) {
      player.armor+= specialDefend // player is protected for few seconds

    }

    fun specialDefendReset(specialDefend : Int ) {
        player.armor-= specialDefend // then reset here
    }

    fun reloadInventory(){
        if (::inventoryFragment.isInitialized) {
            inventoryFragment.reloadInventoryItems()
        }
    }
}