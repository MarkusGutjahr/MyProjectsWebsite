package de.thm.mov2game.model.entities

import de.thm.mov2game.model.dungeon.Coord
import de.thm.mov2game.model.dungeon.Dungeon
import java.util.LinkedList
import java.util.Queue
import kotlin.math.pow
import kotlin.random.Random

data class Node(val coord: Coord, val pointer : Int)

class EntityAI(private val dungeon : Dungeon) {

    private val dirs = arrayOf(
        Coord(0,1), Coord(1, 0), Coord(0, -1), Coord(-1, 0),
        Coord(1,1), Coord(1, -1), Coord(-1, -1), Coord(-1, 1),
    )

    fun randomPath(pos : Coord, length : Int) : List<Coord> {
        var p = pos
        val path = mutableListOf(pos)
        var dir = randomDir(Coord(0,0))

        while (path.size < length) {
            if (!dungeon.isObstacle(p + dir)) {
                p += dir
                path.add(p)
                if (Random.nextFloat() > 0.7) dir = randomDir(Coord(-dir.x, -dir.y))
            }
            else dir = randomDir(Coord(-dir.x, -dir.y))
        }
        return path
    }

    private fun randomDir(mask : Coord) : Coord {
        var dir = mask
        while (dir == mask || dir == Coord(0,0)) {
            dir = Coord(Random.nextInt(-1, 2), Random.nextInt(-1, 2))
        }
        return dir
    }

    fun pathfind(from : Coord, to: Coord, range : Int): List<Coord> {
        return pathfind(to, breathFirstSearch(from, range))
    }

    fun pathfind(to: Coord, data : List<Node>): List<Coord> {
        val path = mutableListOf<Coord>(to)
        var node = data.firstOrNull{it.coord == to}

        if (node != null) {
            while (node!!.pointer != -1) {
                node = data[node.pointer]
                path.add(node.coord)
            }
            return path.reversed()
        }
        else return emptyList()
    }

    fun breathFirstSearch(a: Coord, range : Int) : List<Node>{
        val result = mutableListOf<Node>()
        val queue : Queue<Node> = LinkedList<Node>()

        var node : Node
        var nextCoord : Coord

        queue.add(Node(a, -1))
        while (queue.isNotEmpty()) {
            node = queue.remove()
            if (sqrDistance(a, node.coord) > range || result.any{it. coord == node.coord}) continue
            result.add(node)

            for (dir in dirs) {
                nextCoord = Coord(node.coord.x + dir.x, node.coord.y + dir.y)
                if (!dungeon.isObstacle(nextCoord) && result.none{it.coord == nextCoord}) {
                    queue.add(Node(nextCoord, result.count() - 1))
                }
            }
        }
        return result
    }

    private fun sqrDistance(a: Coord, b: Coord): Double {
        return kotlin.math.sqrt((a.x - b.x).toDouble().pow(2) + (a.y - b.y).toDouble().pow(2))
    }
}