package de.thm.mov2game.model.mapObjects

import de.thm.mov2game.model.dungeon.Coord
import de.thm.mov2game.model.dungeon.CoordF

open class MapObject(
    val name: String,
    val spriteID : Int
    ) {
    var position = Coord()
    var realPosition = CoordF()
    var animationState = 0
    var animationStart = false
    var active = false
}