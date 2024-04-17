package de.thm.mov2game.model.dungeon

import kotlin.random.Random

data class TileData (
    var spriteID : Byte,
    val isSolid : Boolean,
    var spriteVariant : Byte = 0
) {
    var secundarySpriteID : Byte = -1

    var isSpawnpoint = false
    var isOccupied = false
}

data class RoomData (
    val cell : Coord,
    val pos1 : Coord,
    val pos2 : Coord,
) {
    var entrance: Boolean = false
    var exit: Boolean = false
    var enemyCount : Int = 0
}

class Dungeon(val size : Coord) {
    var tiles = Array(size.x * size.y){ TileData(-1, true) }
    var rooms = mutableListOf<RoomData>()

    var spawnpoint = Coord(0,0)
    var exitpoint = Coord(0,0)

    fun setTile(pos : Coord, tile: TileData) {
        tiles[size.x * pos.y + pos.x] = tile
    }
    fun getTile(pos : Coord): TileData {
        return tiles[size.x * pos.y + pos.x]
    }

    fun addTile(pos : Coord, tile : TileData) {
        if (tiles[size.x * pos.y + pos.x].spriteID.toInt() != -1 ) {
            tiles[size.x * pos.y + pos.x].secundarySpriteID = tile.spriteID
        }
        else tiles[size.x * pos.y + pos.x].spriteID = tile.spriteID
    }

    fun canSpawn(pos : Coord) : Boolean {
        val tile = getTile(pos)
        return tile.isSpawnpoint && !tile.isOccupied
    }

    fun isObstacle(pos : Coord) : Boolean {
        val index = size.x * pos.y + pos.x
        if (index < 0 || index >= tiles.size) return true
        val tile = tiles[index]
        return tile.isSolid || tile.isOccupied
    }

    fun randomPointInCell(x : Int, y : Int) : Coord {
        val room = rooms.first{it.cell == Coord(x, y) }
        return Coord(Random.nextInt(room.pos1.x + 1, room.pos2.x), Random.nextInt(room.pos1.y + 1, room.pos2.y))
    }
}