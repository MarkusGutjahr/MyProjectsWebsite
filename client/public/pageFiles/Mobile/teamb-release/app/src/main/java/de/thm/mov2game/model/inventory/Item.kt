package de.thm.mov2game.model.items

import de.thm.mov2game.model.inventory.EquipmentSlot

// Class for items
data class Item(
        val name: String,
        val description: String,
        val itemType: ItemType,
        var statModifier: StatModifier? = null,
        val imageResource: Int? = null,
        val size: Int? = null,
        var isActive: Boolean = false,
        var probability: Double = 0.0,
        var equipmentSlot: EquipmentSlot? = null
) {
    var isMarked: Boolean = false
    var alpha: Float = 1.0f

        // Copy constructor to create a new instance with the same properties
        constructor(other: Item) : this(
            other.name,
            other.description,
            other.itemType,
            other.statModifier,
            other.imageResource,
            other.size,
            other.isActive,
            other.probability,
            other.equipmentSlot
        )
    }



// Different item types
enum class ItemType {
    WEAPON,
    ARMOR,
    POTION,
    QUEST_ITEM
}

    // Modifying stats, when equipping or unequipping items
data class StatModifier(
    val healthModifier: Int = 0,
    val attackDamageModifier: Int = 0,
    val armorModifier: Int = 0,
    val critChanceModifier: Double = 0.0,
    val critDamageModifier: Double = 0.0
)