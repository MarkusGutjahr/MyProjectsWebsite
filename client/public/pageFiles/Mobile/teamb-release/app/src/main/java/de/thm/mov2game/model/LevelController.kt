package de.thm.mov2game.model

import de.thm.mov2game.model.dungeon.CoordF
import de.thm.mov2game.model.dungeon.Dungeon
import de.thm.mov2game.model.entities.Entity
import de.thm.mov2game.model.mapObjects.Chest

interface LevelController {

    fun playwalkingfx()
    fun stopwalkingfx()
    fun playplayerAttackfx()
    fun playdyingfx()
    fun playminidyingfx()
    fun playlevelfx()
    fun playbobdyingfx()

    fun savePrefs(level : Int, lives : Int, score : Int, seed : Int)
    fun setScoreText(level: Int, score: Int)
    fun showInfoText(text : String)
    fun updateHealthBar(health : Float, lives : Int)
    fun updateEnemyHealthBar(enemyHealth : Float)

    fun createCanvas(dungeon: Dungeon)
    fun updateEntities(entities : List<Entity>)
    fun updateChests(chests: List<Chest>)
    fun renderLevelAt(pos : CoordF, width : Int, height : Int)
    fun update(frame : Int, updateRate : Float)
}