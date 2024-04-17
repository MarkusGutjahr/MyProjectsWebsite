package de.thm.mov2game.model

import de.thm.mov2game.model.dungeon.Coord
import de.thm.mov2game.model.dungeon.CoordF
import de.thm.mov2game.model.entities.Entity

data class AnimationData (
    val path : List<Coord>,
    val entity : Entity,
    var speed : Float,
) {
    var frameStep : Int = 1
    var step : Int = 0
    var finished = false
}

class GameTimer(private val contr : LevelController) : Thread() {
    private var updateRate = 0f
    private var frame = 0
    var running = false

    fun start(updateRate: Float) {
        this.updateRate = updateRate
        this.running = true
        start()
    }

    override fun run() {
        val delay = (1000f / updateRate).toLong()
        var miliTime = System.nanoTime() / 1000000

        while (running) {
            //Wait for next frame
            while (miliTime + delay > System.nanoTime() / 1000000) {
                sleep(1)
            }
            miliTime = System.nanoTime() / 1000000
            contr.update(frame, updateRate)
            frame++
        }
    }
}

class EntityAnimator(val model : LevelModel, private val spriteAnimationSpeed : Float)  {
    private var activeAnimations = mutableListOf<AnimationData>()
    var animating = false

    fun animatePath(entity : Entity, path : List<Coord>, speed : Float) {
        animating = true
        entity.animationState += 4
        activeAnimations.add(AnimationData(path, entity, speed))
    }

    fun update(frame : Int, updateRate: Float) {
        var update = false
        var player : Boolean
        var x : Float
        var y : Float
        var interp : Float
        val spriteRate = (updateRate / spriteAnimationSpeed).toInt()

        //SpriteAnimation
        if (frame % spriteRate == 0){

            for (e in model.allEntities) {
                if (e.active) {
                    update = true

                    e.animationState++
                    if (e.animationState % 4 == 0) e.animationState -= 4
                }
            }
            for (c in model.allChests) {
                if (c.active && c.animationStart && c.animationState < 2) {
                    update = true
                    c.animationState++
                }
            }
        }
        //MovementAnimation
        for (anim in activeAnimations) {
            if (anim.entity.active && !anim.finished) {
                update = true
                player = (anim.entity.name == "Bob")
                interp = updateRate / anim.speed

                x = anim.path[anim.step].x + anim.frameStep / interp * (anim.path[anim.step + 1].x - anim.path[anim.step].x)
                y = anim.path[anim.step].y + anim.frameStep / interp * (anim.path[anim.step + 1].y - anim.path[anim.step].y)

                anim.entity.realPosition = CoordF(x, y)
                if (player) model.camPosition = CoordF(x, y)
                anim.frameStep++

                if (anim.frameStep >= interp) {
                    anim.frameStep = 1
                    anim.step++
                }
                if (anim.step >= anim.path.size - 1) {
                    anim.entity.realPosition = anim.path.last().toFloat()
                    if (player) {
                        model.camPosition = anim.path.last().toFloat()
                        model.onPlayerMoved()
                    }
                    anim.finished = true
                    anim.entity.animationState -= 4
                }
            }
        }
        activeAnimations.removeIf{it.finished}
        if (animating && activeAnimations.isEmpty()) {
            animating = false
            model.onAnimationFinished()
        }
        if (update) {
            model.render()
        }
    }
}