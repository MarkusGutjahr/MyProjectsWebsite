package de.thm.mov2game.model.dungeon

import kotlin.math.roundToInt

data class Coord(val x : Int = 0, val y : Int = 0) {
    operator fun plus(b : Coord) : Coord {
        return Coord(this.x + b.x, this.y + b.y)
    }
    operator fun minus(b : Coord) : Coord {
        return Coord(this.x - b.x, this.y - b.y)
    }

    fun toFloat() : CoordF {
        return CoordF(x.toFloat(), y.toFloat())
    }
}

data class CoordF(val x : Float  = 0f, val y : Float = 0f) {
    operator fun plus(b : CoordF) : CoordF {
        return CoordF(this.x + b.x, this.y + b.y)
    }
    operator fun minus(b : CoordF) : CoordF {
        return CoordF(this.x - b.x, this.y - b.y)
    }

    fun toInt() : Coord {
        return Coord(x.roundToInt(), y.roundToInt())
    }
}