package de.thm.mov2game.model.entities

import android.os.Bundle
import android.widget.Toast
import androidx.fragment.app.setFragmentResult
import kotlin.math.pow


class Player(
    name: String,
    spriteID: Int,
    maxHealth: Int,
    attackDamage: Int,
    //var movableDistance: Int = 4, // Default movable distance for the player
    armor: Int = 0,
    critChance: Double = 0.0,
    critDamage: Double = 2.0
) : Entity(name, spriteID,maxHealth, attackDamage, 0, true, armor, critChance, critDamage) {


        //Only use for non-Combat Damage, for example trap
    override fun takeDamage(damageDealt: Int) {
        super.takeDamage(damageDealt)

        println("You take $damageDealt damage.")
    }

    fun playerRangeCheck(x: Int, y: Int): Boolean{
        val distance = kotlin.math.sqrt((x - position.x).toDouble().pow(2) + (y - position.y).toDouble().pow(2))
        return distance <= movableDistance
    }
}