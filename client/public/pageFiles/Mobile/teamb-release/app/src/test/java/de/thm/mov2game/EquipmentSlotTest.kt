package de.thm.mov2game

import de.thm.mov2game.model.inventory.EquipmentSlot
import org.junit.Test
import org.junit.Assert.*

class EquipmentSlotTest {

    @Test
    fun testEquipmentSlots() {
        val equipmentSlots = EquipmentSlot.values()

        // Verify that all expected equipment slots are present
        assertTrue(EquipmentSlot.WEAPON in equipmentSlots)
        assertTrue(EquipmentSlot.ARMOR_HEAD in equipmentSlots)
        assertTrue(EquipmentSlot.ARMOR_CHEST in equipmentSlots)
        assertTrue(EquipmentSlot.ARMOR_LEGS in equipmentSlots)
        assertTrue(EquipmentSlot.ARMOR_FEET in equipmentSlots)
        assertTrue(EquipmentSlot.ACCESSORY_1 in equipmentSlots)
        assertTrue(EquipmentSlot.ACCESSORY_2 in equipmentSlots)

        // Verify the total number of equipment slots
        assertEquals(7, equipmentSlots.size)
    }

}