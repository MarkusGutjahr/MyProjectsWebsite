package de.thm.mov2game.model.dungeon

import kotlin.math.roundToInt
import kotlin.math.sqrt
import kotlin.random.Random

class DungeonGenerator(private val seed : Int){
    private val floor get() = TileData(0,false, rand.nextInt(-16,4).coerceAtLeast(0).toByte())
    private val wall get() = TileData(1, true, rand.nextInt(-8,3).coerceAtLeast(0).toByte())
    private val wallLeft get() = TileData(12, true)
    private val wallRight get() = TileData(11, true)
    private val entrance get() = TileData(10, false, 0)
    private val exit get() = TileData(10, false, 1)
    private val borderRight get() = TileData(2, true)
    private val borderLeft get() = TileData(3, true)
    private val borderTop get() = TileData(4, true)
    private val borderTopRight get() = TileData(13, true)
    private val borderTopLeft get() = TileData(14, true)
    private val cornerTL get() = TileData(5, true)
    private val cornerTR get() = TileData(6, true)
    private val cornerBL get() = TileData(7, true)
    private val cornerBR get() = TileData(8, true)
    private val edge get() = TileData(9, true)

    private val dirs = arrayOf(Coord(0,1), Coord(1, 0), Coord(0, -1), Coord(-1, 0))

    private var cellSize = 0
    private var cellsX = 0
    private var cellsY = 0
    private var minRoomRadius = 0f
    private var maxRoomRadius = 0f
    private var density = 0

    private lateinit var rand : Random
    private lateinit var dungeon : Dungeon

    fun generateLevel(level : Int) {
        rand = Random(seed + level)
        cellSize = (6.0 + sqrt(level.toDouble())).toInt()
        minRoomRadius = 1.5f + (cellSize - 7f) / 3.5f
        maxRoomRadius = (cellSize - 1f) / 2f
        cellsX = (2.0 + sqrt(level.toDouble() / 3.0)).toInt()
        cellsY = cellsX
        density = cellsX * cellsY / 2
    }

    fun generateDungeon() : Dungeon {
        this.dungeon = Dungeon(Coord(cellsX * cellSize + 1, cellsY * cellSize + 1))

        val paths = mutableListOf<Pair<RoomData, RoomData>>()
        var pos = Coord(cellsX-1, cellsY-1)
        var room : RoomData?
        var lastRoom : RoomData
        var dir : Coord

        //Dungeon Struktur
        room = generateRoom(pos)
        dungeon.rooms.add(room)
        for (i in 0 until density) {
            do {
               dir = dirs[rand.nextInt(0, 4)]
            }
            while (pos.x + dir.x < 0 || pos.x + dir.x >= cellsX || pos.y + dir.y < 0 || pos.y + dir.y >= cellsY)
            pos += dir
            lastRoom = room!!
            room = dungeon.rooms.firstOrNull{it.cell == pos}
            if (room == null) {
                room = generateRoom(pos)
                dungeon.rooms.add(room)
            }

            if (paths.none{it == Pair(lastRoom, room) || it == Pair(room, lastRoom)}) {
                paths.add( if (lastRoom.cell.x < room.cell.x || lastRoom.cell.y < room.cell.y) Pair(lastRoom, room) else Pair(room, lastRoom))
            }
        }
        //Spawnpoint
        room = dungeon.rooms.last()
        room.entrance = true
        dungeon.spawnpoint = Coord(room.pos1.x + 1, room.pos1.y + 1)
        room = dungeon.rooms.first()
        room.exit = true
        dungeon.exitpoint = Coord(room.pos2.x - 1, room.pos1.y + 1)

        //Rooms
        for (r in dungeon.rooms) {
            createRoom(r)
        }
        dungeon.setTile(dungeon.spawnpoint, entrance)
        dungeon.setTile(dungeon.exitpoint, exit)

        //Paths
        for (path in paths) {
            if (path.first.cell.x == path.second.cell.x) createPathV(path)
            else if (path.first.cell.y == path.second.cell.y) createPathH(path)
        }
        return dungeon
    }

    private fun generateRoom(pos: Coord): RoomData {
        val halfcell = cellSize / 2.0
        val pos1 = Coord(pos.x * cellSize + rand.nextDouble(halfcell - maxRoomRadius, halfcell - minRoomRadius).toInt(),
                         pos.y * cellSize + rand.nextDouble(halfcell - maxRoomRadius + 1, halfcell - minRoomRadius).toInt())//+1 ist Wichtig!!
        val pos2 = Coord(pos.x * cellSize + rand.nextDouble(halfcell + minRoomRadius, halfcell + maxRoomRadius).roundToInt(),
                         pos.y * cellSize + rand.nextDouble(halfcell + minRoomRadius, halfcell + maxRoomRadius).roundToInt())
        return RoomData(pos, pos1, pos2)
    }

    fun getCell(point : Coord) : Coord {
        return Coord(point.x / cellSize, point.y / cellSize)
    }
    fun isPointInCell(point : Coord, x : Int, y : Int) : Boolean {
        return (point.x > x * cellSize && point.x < (x + 1) * cellSize && point.y > y * cellSize && point.y < (y + 1) * cellSize)
    }

    private fun createRoom(room : RoomData) {
        val x1 = room.pos1.x
        val y1 = room.pos1.y
        val x2 = room.pos2.x
        val y2 = room.pos2.y

        //Floor
        for (i in x1 + 1 until x2) {
            for (j in y1 + 1 until y2) {
                dungeon.setTile(Coord(i, j), floor)
                dungeon.getTile(Coord(i, j)).isSpawnpoint = true
            }
        }
        //Wall
        for (i in x1+1 until x2) dungeon.setTile(Coord(i, y1), wall)
        for (i in x1+1 until x2) dungeon.setTile(Coord(i, y2), wall)
        //Border
        for (i in x1 + 1 until x2) dungeon.addTile(Coord(i, y1 - 1), borderTop)
        for (i in y1 until y2) dungeon.addTile(Coord(x1, i), borderRight)
        for (i in x1 + 1 until x2) dungeon.addTile(Coord(i, y2 - 1), borderTop)
        for (i in y1 until y2) dungeon.addTile(Coord(x2, i), borderLeft)
        //Corner
        dungeon.addTile(Coord(x1, y1 -1), cornerTL)
        dungeon.addTile(Coord(x1, y2), cornerBL)
        dungeon.addTile(Coord(x2, y1 -1), cornerTR)
        dungeon.addTile(Coord(x2, y2), cornerBR)
    }

    private fun createPathH(path : Pair<RoomData, RoomData>) {
        val x1 = path.first.pos2.x
        val x2 = path.second.pos1.x
        val y = path.first.cell.y * cellSize + cellSize / 2

        for (i in x1 .. x2) {
            dungeon.setTile(Coord(i, y), floor)
            if (dungeon.getTile(Coord(i, y+1)).isSolid) dungeon.setTile(Coord(i, y+1), edge)
        }
        dungeon.setTile(Coord(x1, y - 1), cornerBR)
        dungeon.addTile(Coord(x1, y + 1), borderLeft)
        dungeon.addTile(Coord(x1, y), cornerTR)

        dungeon.setTile(Coord(x2, y - 1), cornerBL)
        dungeon.addTile(Coord(x2, y + 1), borderRight)
        dungeon.addTile(Coord(x2, y), cornerTL)
    }
    private fun createPathV(path : Pair<RoomData, RoomData>) {
        val y1 = path.first.pos2.y
        val y2 = path.second.pos1.y
        val x = path.first.cell.x * cellSize + cellSize / 2

        for (i in (y1 - 1) .. y2) {
            dungeon.setTile(Coord(x, i), floor)
        }
        dungeon.setTile(Coord(x - 1, y1), wallLeft)
        dungeon.setTile(Coord(x + 1, y1), wallRight)
        dungeon.addTile(Coord(x - 1, y1 - 1), borderTopLeft)
        dungeon.addTile(Coord(x + 1, y1 - 1), borderTopRight)

        dungeon.setTile(Coord(x - 1, y2), wallLeft)
        dungeon.setTile(Coord(x + 1, y2), wallRight)
        dungeon.addTile(Coord(x - 1, y2 - 1), borderTopLeft)
        dungeon.addTile(Coord(x + 1, y2 - 1), borderTopRight)
    }
}