package de.thm.mov2game.model.inventory

import de.thm.mov2game.model.items.Item
import de.thm.mov2game.model.items.ItemType

// All the different equippment slots
enum class EquipmentSlot {
    WEAPON,
    ARMOR_HEAD,
    ARMOR_CHEST,
    ARMOR_LEGS,
    ARMOR_FEET,
    //for example necklace and ring
    ACCESSORY_1,
    ACCESSORY_2;
    companion object {
        fun isValidSlotForItem(slot: EquipmentSlot, item: Item): Boolean {
            return when (slot) {
                WEAPON -> item.itemType == ItemType.WEAPON
                ARMOR_HEAD, ARMOR_CHEST, ARMOR_LEGS, ARMOR_FEET, ACCESSORY_1, ACCESSORY_2 -> item.itemType == ItemType.ARMOR
            }
        }
    }
}