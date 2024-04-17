package de.thm.mov2game

/*
class PlayerTest {

    @Test
    fun testTakeDamage() {
        val player = Player("TestPlayer", 100, 10)
        val damage = 25
        player.takeDamage(damage)
        assertEquals(75, player.health)
    }
    @Test
    fun testMoveWithinMovableDistance() {
        val player = Player("TestPlayer", 100, 10, 5)
        player.move(2, 3)
        assertEquals(2, player.currentPositionX)
        assertEquals(3, player.currentPositionY)
    }

    @Test
    fun testMoveBeyondMovableDistance() {
        val player = Player("TestPlayer", 100, 10, 5)
        player.move(8, 2) // Total steps exceed movable distance
        assertEquals(0, player.currentPositionX) // Player should not move
        assertEquals(0, player.currentPositionY)
    }


    @Test
    fun testUseItem() {
        val player = Player("TestPlayer", 80, 10)
        val itemName = Item(
            name = "Healing Potion",
            description = "Restores 20 health points when used.",
            itemType = ItemType.POTION,
            statModifier = StatModifier(healthModifier = 50)
        )
        player.takeDamage(40)
        player.useItem(itemName)
        assertEquals(80, player.health) // For example, assuming a health potion restores 20 health points.
    }

    @Test
    fun testEquipItem() {
        val player = Player("TestPlayer", 100, 10)
        val sword = Item("Sword", "A sharp sword", ItemType.WEAPON, StatModifier(attackDamageModifier = 20))
        player.equipItem(sword, EquipmentSlot.WEAPON)
        assertEquals(sword, player.equipment[EquipmentSlot.WEAPON])
    }

    @Test
    fun testUnequipItem() {
        val player = Player("TestPlayer", 100, 10)
        val sword = Item("Sword", "A sharp sword", ItemType.WEAPON, StatModifier(attackDamageModifier = 20))
        player.equipItem(sword, EquipmentSlot.WEAPON)
        player.unequipItem(EquipmentSlot.WEAPON)
        assertNull(player.equipment[EquipmentSlot.WEAPON])
    }
}


 */