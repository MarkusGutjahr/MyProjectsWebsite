package de.thm.mov2game.model.entities

import android.util.Log
import de.thm.mov2game.model.dungeon.Coord
import de.thm.mov2game.model.dungeon.CoordF
import de.thm.mov2game.model.inventory.EquipmentSlot
import de.thm.mov2game.model.inventory.Inventory
import de.thm.mov2game.model.items.Item
import de.thm.mov2game.model.items.ItemType
import de.thm.mov2game.model.items.StatModifier

open class Entity (
    val name: String,
    val spriteID : Int,
    var maxHealth: Int,
    var attackDamage: Int,
    var experience: Int,
    var canWalk : Boolean = false,
    var armor: Int = 0,
    var critChance: Double = 0.0,
    var critDamage: Double = 2.0,
    var movableDistance: Int = 4
) {
    var position = Coord()
    var realPosition = CoordF()
    var animationState = 0
    var active = false

    var health = maxHealth
    var level: Int = 1
    var inventory: Inventory = Inventory()
    var equipment: MutableMap<EquipmentSlot, Item?> = mutableMapOf()

    // Functions for combat
    open fun attack(attacker: Entity, target: Entity): Int {
        //target.health = target.health - attackDamage
        target.health = target.health - calculateTotalDamage(attacker, target)
        Log.d("check","$name attacks ${target.name} for ${calculateTotalDamage(attacker, target)}.")
        Log.d("check","${target.name} has  ${target.health}hp left.")

        //Moved to EnemyAI.kt
       //EventBus.getDefault().post(AttackEvent(attacker, target, target.health))

       if (attacker.spriteID == 0 && attackDamage > 29 ){ attackDamage += -20 } // reset the sepcial attack after it has been used once

        return target.health
    }
    open fun takeDamage(damageDealt: Int) {

        health -= damageDealt
        if (health <= 0) {
            println("$name has been defeated!")
        }
    }

    private fun calculateTotalDamage(attacker: Entity, target: Entity): Int {
        val damage = attacker.attackDamage
        val isCrit = Math.random() < attacker.critChance
        val damageReduction = (damage * target.armor / 100)
        val effectiveDamage = damage - damageReduction
        return if (isCrit) (effectiveDamage * attacker.critDamage).toInt() else effectiveDamage
    }

    // Functions for movement
    open fun move(coord: Coord) {
        position = coord
    }


    // Functions for inventory and equipment
    fun addItem(item: Item) {
        inventory.add(item)
        println("$name adds ${item.name} into the Inventory.")
    }

    /*
    fun equipItem(item: Item, slot: EquipmentSlot): Boolean {
        val currentItemInSlot = equipment[slot]
        if (currentItemInSlot != null) {
            // Unequip the current item in the slot before equipping the new one
            unequipItem(slot)
        }

        equipment[slot] = item
        println("$name equips ${item.name} in ${slot.name}.")
        applyItemModifiers(item.statModifier)
        return true
    }
     */

    fun equipItem(item: Item): Boolean {
        val slot = findAvailableSlotForItem(item)
        return if (slot != null) {
            val unequippedItem = equipment[slot]
            equipment[slot] = item
            println("$name equips ${item.name} in ${slot.name}.")
            unequippedItem?.isActive = false // Deactivate the previously equipped item
            item.isActive = true // Activate the newly equipped item
            println("Alte Stats:")
            println("$maxHealth $attackDamage $armor $critChance $critDamage $movableDistance")
            applyItemModifiers(unequippedItem?.statModifier, true)
            applyItemModifiers(item.statModifier)
            println("Neue Stats:")
            println("$maxHealth $attackDamage $armor $critChance $critDamage $movableDistance")
            //unequippedItem // Return the unequipped item (if any)
            true
        } else {
            println("No available slot for ${item.name}.")
            false
        }
    }

    private fun findAvailableSlotForItem(item: Item): EquipmentSlot? {
        val validSlots = EquipmentSlot.values().filter { EquipmentSlot.isValidSlotForItem(it, item) }
        return validSlots.firstOrNull {
            equipment[it] == null || (equipment[it]?.itemType == item.itemType && equipment[it]?.equipmentSlot == item.equipmentSlot)
        }
    }


    fun unequipItem(item: Item): Item? {
        val slot = equipment.entries.find { it.value == item }?.key
        return if (slot != null) {
            item.isActive = false // Deactivate the unequipped item
            equipment.remove(slot)
            println("$name unequips ${item.name} from ${slot.name}.")
            applyItemModifiers(item.statModifier, true)
            item
        } else {
            println("$name does not have ${item.name} equipped.")
            null
        }
    }


/*
    fun unequipItem(slot: EquipmentSlot): Boolean {
        val itemToUnequip = equipment[slot]
        if (itemToUnequip != null) {
            equipment[slot] = null
            println("$name unequips ${itemToUnequip.name} from ${slot.name}.")
            applyItemModifiers(itemToUnequip.statModifier, true)
            return true
        }
        return false
    }
 */

    // For now only Potions can be used, other items like Weapons can be equipped
        // Maybe add QuestItems for usable (for example Book)
    open fun useItem(item: Item) {
        if (item.itemType == ItemType.POTION) {
            applyItemModifiers(item.statModifier)
            println("$name uses ${item.name}.")
        } else {
            println("$name cannot use ${item.name}.")
        }
    }
    // For now only for healing
    /*
    private fun applyStatModifier(statModifier: StatModifier?) {
        if (statModifier != null) {
            if (health + statModifier.healthModifier > maxHealth)health = maxHealth else health += statModifier.healthModifier
        }
    }
     */


    fun applyItemModifiers(modifier: StatModifier?, reverse: Boolean = false) {
        if (modifier != null) {
            val factor = if (reverse) -1 else 1
            if (health + modifier.healthModifier > maxHealth)health = maxHealth else health += modifier.healthModifier
            attackDamage += modifier.attackDamageModifier * factor
            armor += modifier.armorModifier * factor
            critChance += modifier.critChanceModifier * factor
            critDamage += modifier.critDamageModifier * factor
        }
    }


    // Function for experience points
    fun gainExperience(amount: Int) {
        experience += amount
        // Check for level-up
        if (experience >= calculateExperienceRequiredForNextLevel()) {
            levelUp()
        }
    }

    private fun calculateExperienceRequiredForNextLevel(): Int {
        // Calculate experience required for the next level
        return level * 100
    }

    private fun levelUp() {
        level++
        // Adjust entity's stats upon leveling up
            // add later
        println("$name leveled up to level $level!")
    }

    fun weaponRangeCheck(coordAttacker: Coord, coordTarget: Coord?, range:Int): Boolean{

        coordTarget?.let {
            if(coordAttacker.x + range >= it.x && coordAttacker.x - range <= it.x) {
                if(coordAttacker.y + range >= it.y && coordAttacker.y - range <= it.y){
                    return true
                }
            }
        }

        return false
    }

    fun printStats(){
        println("$name Stats:")
        println("Health: $health (/$maxHealth)")
        println("Attack Damage: $attackDamage")
        println("Armor: $armor")
        println("Crit Chance: ${critChance * 100}%")
        println("Crit Damage: ${critDamage * 100}%")
        println("Level: $level")
        println("Experience: $experience")
    }
}