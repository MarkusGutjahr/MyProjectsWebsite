package de.thm.mov2game

import de.thm.mov2game.model.inventory.Inventory
import de.thm.mov2game.model.items.Item
import de.thm.mov2game.model.items.ItemType
import org.junit.Before
import org.junit.Test
import org.junit.Assert.*


class InventoryTest {
    private lateinit var inventory: Inventory

    @Before
    fun setUp() {
        // Initialize a new inventory before each test
        inventory = Inventory()
    }

    @Test
    fun testAddItemToInventory() {
        val item1 = Item("Item1", "Description1", ItemType.WEAPON)
        val item2 = Item("Item2", "Description2", ItemType.ARMOR)

        assertTrue(inventory.add(item1))
        assertTrue(inventory.add(item2))
    }

    @Test
    fun testAddItemToFullInventory() {
        // Initialize an inventory with limited capacity (base value is 20)
        inventory = Inventory(2)

        val item1 = Item("Item1", "Description1", ItemType.WEAPON)
        val item2 = Item("Item2", "Description2", ItemType.ARMOR)
        val item3 = Item("Item3", "Description3", ItemType.POTION)

        assertTrue(inventory.add(item1))
        assertTrue(inventory.add(item2))
        assertFalse(inventory.add(item3)) // Should fail, inventory is full
    }

    @Test
    fun testRemoveItemFromInventory() {
        val item1 = Item("Item1", "Description1", ItemType.WEAPON)
        val item2 = Item("Item2", "Description2", ItemType.ARMOR)

        inventory.add(item1)
        inventory.add(item2)

        assertTrue(inventory.remove(item1))
        assertFalse(inventory.remove(item1)) // Should fail, item1 is already removed
    }

    @Test
    fun testListItems() {
        val item1 = Item("Item1", "Description1", ItemType.WEAPON)
        val item2 = Item("Item2", "Description2", ItemType.ARMOR)

        inventory.add(item1)
        inventory.add(item2)

        val itemsListed = inventory.listItems()

        assertTrue(itemsListed.contains("1. Item1 - Description1"))
        assertTrue(itemsListed.contains("2. Item2 - Description2"))
    }
}