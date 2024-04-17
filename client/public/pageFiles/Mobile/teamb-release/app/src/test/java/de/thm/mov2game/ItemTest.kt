package de.thm.mov2game

import de.thm.mov2game.model.items.Item
import de.thm.mov2game.model.items.ItemType
import de.thm.mov2game.model.items.StatModifier
import org.junit.Test
import org.junit.Assert.*

class ItemTest {

    @Test
    fun testItemProperties() {
        val item =
            Item("Sword", "A sharp sword", ItemType.WEAPON, StatModifier(attackDamageModifier = 10))

        assertEquals("Sword", item.name)
        assertEquals("A sharp sword", item.description)
        assertEquals(ItemType.WEAPON, item.itemType)
        assertEquals(10, item.statModifier?.attackDamageModifier)
    }
}


class ItemTypeTest {

    @Test
    fun testItemTypeValues() {
        assertEquals(4, ItemType.values().size) // Assuming there are 4 item types (atm there are only 4 types)

        assertTrue(ItemType.WEAPON in ItemType.values())
        assertTrue(ItemType.ARMOR in ItemType.values())
        assertTrue(ItemType.POTION in ItemType.values())
        assertTrue(ItemType.QUEST_ITEM in ItemType.values())
    }
}

class StatModifierTest {

    @Test
    fun testStatModifierProperties() {
        val statModifier = StatModifier(healthModifier = 20, attackDamageModifier = 5)

        assertEquals(20, statModifier.healthModifier)
        assertEquals(5, statModifier.attackDamageModifier)
    }
}