package de.thm.mov2game.model

import de.thm.mov2game.model.dungeon.Coord
import de.thm.mov2game.model.dungeon.CoordF
import de.thm.mov2game.model.dungeon.Dungeon
import de.thm.mov2game.model.dungeon.DungeonGenerator
import de.thm.mov2game.model.dungeon.RoomData
import de.thm.mov2game.model.entities.Enemy
import de.thm.mov2game.model.entities.Entity
import de.thm.mov2game.model.entities.EntityAI
import de.thm.mov2game.model.mapObjects.Chest
import kotlin.random.Random

class LevelModel(val controller : LevelController, var level: Int, var lives : Int, var score : Int, var seed : Int){

    val gameStateModel = GameStateModel(this)
    val timer = GameTimer(controller)
    val animator = EntityAnimator(this, 5f)

    lateinit var dungeonGenerator : DungeonGenerator
    lateinit var dungeon : Dungeon

    lateinit var allEntities : MutableList<Entity>
    lateinit var allChests: MutableList<Chest>

    var camPosition = CoordF()

    private var displayWidth = 9
    private var displayHeight = 19

    fun initGame() {
        // playsoud when he croses a level
        controller.playlevelfx()

        //Generate Level
        generateLevel(level)

        //Generate Entities and Chests
        allEntities = mutableListOf<Entity>()
        allChests = mutableListOf<Chest>()
        gameStateModel.initGame()

        //Initialise Canvas
        controller.createCanvas(dungeon)

        //Spawn Player
        placeEntity(gameStateModel.player, dungeon.spawnpoint)

        //Spawn Monster
        spawnEnemies()

        //Draw Map
        camPosition = dungeon.spawnpoint.toFloat()
        render()

        //Start animation Thread
        if (!timer.running) timer.start(30f)

        //Begin Player Turn
        gameStateModel.beginTurn()
    }

    fun render() {
        controller.updateEntities(allEntities)
        controller.updateChests(allChests)
        controller.renderLevelAt( camPosition, displayWidth, displayHeight)
    }

    private fun spawnEnemies() {
        for (room in dungeon.rooms) {
            if (room.entrance) continue

            val enemy = gameStateModel.enemyPrefabs.filter{it.difficulty <= level}.maxBy{Random.nextInt(it.rarity) }
            val count = kotlin.math.max(room.pos2.x - room.pos1.x - 3, room.pos2.y - room.pos1.y - 3)
            spawnEnemiesInCell(enemy, count, room)
        }
    }

    private fun spawnEnemiesInCell(enemy: Enemy, count : Int, room: RoomData) {
        var pos : Coord
        var counter = count
        while (counter > 0) {
            pos = dungeon.randomPointInCell(room.cell.x, room.cell.y)
            if (dungeon.canSpawn(pos)) {
                placeEntity(gameStateModel.instantiate(enemy), pos)
                room.enemyCount++
                counter--
            }
        }
    }

    private fun spawnChestsInCell(chest: Chest, count : Int, cellX : Int, cellY : Int) {
        var pos : Coord
        var counter = count
        while (counter > 0) {
            pos = dungeon.randomPointInCell(cellX, cellY)
            if (dungeon.canSpawn(pos)) {
                placeChest(gameStateModel.instantiateChest(chest), pos)
                counter--
            }
        }
    }

    fun trySpawnChest(pos : Coord) {
        val room = dungeon.rooms.first { it.cell == dungeonGenerator.getCell(pos)}
        room.enemyCount--
        if (room.enemyCount == 0) {
            spawnChestsInCell(gameStateModel.chestPrefabs[Random.nextInt(1, 4)], 1, room.cell.x, room.cell.y)
        }
        if (gameStateModel.enemies.isEmpty()) {
            spawnChestsInCell(gameStateModel.chestPrefabs[0], 1, room.cell.x, room.cell.y)
        }
    }

    private fun generateLevel(level : Int) {
        dungeonGenerator = DungeonGenerator(seed)
        dungeonGenerator.generateLevel(level)
        dungeon = dungeonGenerator.generateDungeon()
        gameStateModel.aiModel = EntityAI(dungeon)
    }

    fun placeEntity(entity: Entity, pos : Coord) {
        entity.position = pos
        entity.realPosition = pos.toFloat()
        allEntities.add(entity)
        dungeon.getTile(entity.position).isOccupied = true
    }

    fun placeChest(chest: Chest, pos : Coord) {
        chest.position = pos
        chest.realPosition = pos.toFloat()
        allChests.add(chest)
        dungeon.getTile(chest.position).isOccupied = true
    }

    fun moveEntity(entity : Entity, path : List<Coord>, speed : Float) {
        if (path.isNotEmpty()) {

           if (entity.spriteID == 0 ) controller.playwalkingfx() // spritID 0 is the player .moved it here because it is certain that here a path has been found.and he is walking

            dungeon.getTile(entity.position).isOccupied = false
            entity.position = path.last()
            dungeon.getTile(entity.position).isOccupied = true
            animator.animatePath(entity, path, speed)
        }
    }

    fun removeEntity(entity: Entity) {
        dungeon.getTile(entity.position).isOccupied = false
        allEntities.remove(entity)
    }

    fun removeChest(chest: Chest) {
        dungeon.getTile(chest.position).isOccupied = false
        allChests.remove(chest)
    }

    fun onPlayerMoved() {
        if (gameStateModel.player.position == dungeon.exitpoint) {
            level++
            initGame()
            updateFragments()
        }
        controller.stopwalkingfx()
    }

    fun onAnimationFinished() {
        gameStateModel.beginTurn()
    }

    fun updateFragments() {
        controller.savePrefs(level, lives, score, seed)
        controller.setScoreText(level, score)
        controller.updateHealthBar(1f, lives)
        controller.updateEnemyHealthBar(0f)
    }
}