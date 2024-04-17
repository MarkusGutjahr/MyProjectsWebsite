package de.thm.mov2game.model.entities

class Enemy (
    name: String,
    spriteID : Int,
    maxHealth: Int,
    attackDamage: Int,

    var rarity : Int, //Höhererer Wert = höherere spawnrate
    var difficulty : Int, //Höherer Wert = taucht erst später auf
    experience : Int,
    canWalk : Boolean = false,
    armor: Int = 0,
    critChance: Double = 0.0,
    critDamage: Double = 2.0
) : Entity(name, spriteID,maxHealth, attackDamage, experience, canWalk, armor, critChance, critDamage){

    // Only use for non-Combat Damage, for example special ability of player
    override fun takeDamage(damageDealt: Int) {
        super.takeDamage(damageDealt)
        println("$name takes $damageDealt damage.")
    }

    fun clone(): Enemy {
        return Enemy(this.name, this.spriteID, this.maxHealth, this.attackDamage, this.rarity, this.difficulty, this.experience, this.canWalk)
    }
}