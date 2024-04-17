package de.thm.mov2game.model.inventory

import de.thm.mov2game.R
import de.thm.mov2game.model.items.Item
import de.thm.mov2game.model.items.ItemType
import de.thm.mov2game.model.items.StatModifier

class GenerateItems {

    companion object {
        val allItemsList = listOf(

//useable
//
//
//
//
//
//

            Item(
                "Small Healing Potion",
                "Heals you for 20 HP.",
                ItemType.POTION,
                statModifier = StatModifier(
                    healthModifier = 20,
                    attackDamageModifier = 0,
                    armorModifier = 0,
                    critChanceModifier = 0.0,
                    critDamageModifier = 0.0
                ),
                R.drawable.flask_blue,
                probability = 0.8
            ),
            Item(
                "Big Healing Potion",
                "Heals you for 50 HP.",
                ItemType.POTION,
                statModifier = StatModifier(
                    healthModifier = 50,
                    attackDamageModifier = 0,
                    armorModifier = 0,
                    critChanceModifier = 0.0,
                    critDamageModifier = 0.0
                ),
                R.drawable.flask_big_blue,
                probability = 0.2
            ),
            Item(
                "Extra Life Potion",
                "Gives an extra life.",
                ItemType.POTION,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 0,
                    armorModifier = 0,
                    critChanceModifier = 0.0,
                    critDamageModifier = 0.0
                ),
                R.drawable.flask_big_red,
                probability = 0.05
            ),

//quest items
//
//
//
//
//
//
            Item(
                "Bag",
                "A heavy bag. Who could it belong to?",
                ItemType.QUEST_ITEM,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 0,
                    armorModifier = 0,
                    critChanceModifier = 0.0,
                    critDamageModifier = 0.0
                ),
                R.drawable.rpg_inventory_button_icon,
                probability = 0.05
            ),
            Item(
                "Blue Star",
                "Maybe you get something if you collect them all.",
                ItemType.QUEST_ITEM,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 0,
                    armorModifier = 0,
                    critChanceModifier = 0.0,
                    critDamageModifier = 0.0
                ),
                R.drawable.star_blue,
                probability = 0.01
            ),
            Item(
                "Cursed Star",
                "Maybe you get something if you collect them all.",
                ItemType.QUEST_ITEM,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 0,
                    armorModifier = 0,
                    critChanceModifier = 0.0,
                    critDamageModifier = 0.0
                ),
                R.drawable.star_cursed,
                probability = 0.01
            ),
            Item(
                "Green Star",
                "Maybe you get something if you collect them all.",
                ItemType.QUEST_ITEM,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 0,
                    armorModifier = 0,
                    critChanceModifier = 0.0,
                    critDamageModifier = 0.0
                ),
                R.drawable.star_green,
                probability = 0.01
            ),
            Item(
                "Purple Star",
                "Maybe you get something if you collect them all.",
                ItemType.QUEST_ITEM,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 0,
                    armorModifier = 0,
                    critChanceModifier = 0.0,
                    critDamageModifier = 0.0
                ),
                R.drawable.star_purple,
                probability = 0.01
            ),
            Item(
                "Red Star",
                "Maybe you get something if you collect them all.",
                ItemType.QUEST_ITEM,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 0,
                    armorModifier = 0,
                    critChanceModifier = 0.0,
                    critDamageModifier = 0.0
                ),
                R.drawable.star_red,
                probability = 0.01
            ),
            Item(
                "White Star",
                "Maybe you get something if you collect them all.",
                ItemType.QUEST_ITEM,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 0,
                    armorModifier = 0,
                    critChanceModifier = 0.0,
                    critDamageModifier = 0.0
                ),
                R.drawable.star_white,
                probability = 0.01
            ),
            Item(
                "Yellow Star",
                "Maybe you get something if you collect them all.",
                ItemType.QUEST_ITEM,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 0,
                    armorModifier = 0,
                    critChanceModifier = 0.0,
                    critDamageModifier = 0.0
                ),
                R.drawable.star_yellow,
                probability = 0.01
            ),
//weapons
//
//
//
//
//
//
            Item(
                "Placeholder Sword",
                "",
                ItemType.WEAPON,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 0,
                    armorModifier = 0,
                    critChanceModifier = 0.0,
                    critDamageModifier = 0.0
                ),
                null,
                probability = 0.0,
                equipmentSlot = EquipmentSlot.WEAPON
            ),
            Item(
                "Knight Sword",
                "A sword made for a knight.",
                ItemType.WEAPON,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 10,
                    armorModifier = 0,
                    critChanceModifier = 0.1,
                    critDamageModifier = 0.0
                ),
                R.drawable.weapon_knight_sword,
                probability = 0.1,
                equipmentSlot = EquipmentSlot.WEAPON
            ),
            Item(
                "Lavish Sword",
                "A lavish sword.",
                ItemType.WEAPON,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 10,
                    armorModifier = 0,
                    critChanceModifier = 0.2,
                    critDamageModifier = 0.0
                ),
                R.drawable.weapon_lavish_sword,
                probability = 0.1,
                equipmentSlot = EquipmentSlot.WEAPON
            ),
            Item(
                "Basic Sword",
                "A basic Sword.",
                ItemType.WEAPON,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 5,
                    armorModifier = 0,
                    critChanceModifier = 0.0,
                    critDamageModifier = 0.0
                ),
                R.drawable.weapon_anime_sword,
                probability = 0.1,
                equipmentSlot = EquipmentSlot.WEAPON
            ),
            Item(
                "Lumberjack Axe",
                "An axe for lumberjacks.",
                ItemType.WEAPON,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 15,
                    armorModifier = 0,
                    critChanceModifier = 0.1,
                    critDamageModifier = 0.2
                ),
                R.drawable.weapon_axe,
                probability = 0.1,
                equipmentSlot = EquipmentSlot.WEAPON
            ),
            Item(
                "Spiked Baton",
                "A baton with many sharp spikes.",
                ItemType.WEAPON,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 15,
                    armorModifier = 0,
                    critChanceModifier = 0.2,
                    critDamageModifier = 0.1
                ),
                R.drawable.weapon_baton_with_spikes,
                probability = 0.1,
                equipmentSlot = EquipmentSlot.WEAPON
            ),
            Item(
                "Big Hammer",
                "Now a big hammer? How should i fight with this?",
                ItemType.WEAPON,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 25,
                    armorModifier = 0,
                    critChanceModifier = 0.0,
                    critDamageModifier = 0.0
                ),
                R.drawable.weapon_big_hammer,
                probability = 0.05,
                equipmentSlot = EquipmentSlot.WEAPON
            ),
            Item(
                "Bow",
                "A bow, finally i can fight at range.",
                ItemType.WEAPON,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 15,
                    armorModifier = 0,
                    critChanceModifier = 0.2,
                    critDamageModifier = 0.2
                ),
                R.drawable.weapon_bow,
                probability = 0.05,
                equipmentSlot = EquipmentSlot.WEAPON
            ),
            Item(
                "Cleaver",
                "a cleaver, nice to chop.",
                ItemType.WEAPON,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 10,
                    armorModifier = 0,
                    critChanceModifier = 0.2,
                    critDamageModifier = 0.4
                ),
                R.drawable.weapon_cleaver,
                probability = 0.1,
                equipmentSlot = EquipmentSlot.WEAPON
            ),
            Item(
                "Double Axe",
                "A double sided axe, why would you do that?",
                ItemType.WEAPON,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 20,
                    armorModifier = 0,
                    critChanceModifier = 0.2,
                    critDamageModifier = 0.4
                ),
                R.drawable.weapon_double_axe,
                probability = 0.05,
                equipmentSlot = EquipmentSlot.WEAPON
            ),
            Item(
                "Duel Sword",
                "A duel sword with a nice handle.",
                ItemType.WEAPON,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 15,
                    armorModifier = 0,
                    critChanceModifier = 0.3,
                    critDamageModifier = 0.6
                ),
                R.drawable.weapon_duel_sword,
                probability = 0.05,
                equipmentSlot = EquipmentSlot.WEAPON
            ),
            Item(
                "Golden Sword",
                "A golden Sword, this looks valuable.",
                ItemType.WEAPON,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 15,
                    armorModifier = 0,
                    critChanceModifier = 0.15,
                    critDamageModifier = 0.2
                ),
                R.drawable.weapon_golden_sword,
                probability = 0.1,
                equipmentSlot = EquipmentSlot.WEAPON
            ),
            Item(
                "Green Magic Staff",
                "A green what staff?? Since when can i use magic.",
                ItemType.WEAPON,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 20,
                    armorModifier = 0,
                    critChanceModifier = 0.1,
                    critDamageModifier = 0.4
                ),
                R.drawable.weapon_green_magic_staff,
                probability = 0.1,
                equipmentSlot = EquipmentSlot.WEAPON
            ),
            Item(
                "Hammer",
                "A hammer? I don't think that was made for fighting?",
                ItemType.WEAPON,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 15,
                    armorModifier = 0,
                    critChanceModifier = 0.0,
                    critDamageModifier = 0.0
                ),
                R.drawable.weapon_hammer,
                probability = 0.1,
                equipmentSlot = EquipmentSlot.WEAPON
            ),
            Item(
                "Katana",
                "A katana, looks really old.",
                ItemType.WEAPON,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 15,
                    armorModifier = 0,
                    critChanceModifier = 0.5,
                    critDamageModifier = 0.5
                ),
                R.drawable.weapon_katana,
                probability = 0.05,
                equipmentSlot = EquipmentSlot.WEAPON
            ),
            Item(
                "Knife",
                "A knife, good in really close combat.",
                ItemType.WEAPON,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 10,
                    armorModifier = 0,
                    critChanceModifier = 0.5,
                    critDamageModifier = 0.5
                ),
                R.drawable.weapon_knife,
                probability = 0.1,
                equipmentSlot = EquipmentSlot.WEAPON
            ),
            Item(
                "Mace",
                "A mace, good for smashing.",
                ItemType.WEAPON,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 20,
                    armorModifier = 0,
                    critChanceModifier = 0.2,
                    critDamageModifier = 0.0
                ),
                R.drawable.weapon_mace,
                probability = 0.1,
                equipmentSlot = EquipmentSlot.WEAPON
            ),
            Item(
                "Machete",
                "A Machete, looks like a bigger dagger.",
                ItemType.WEAPON,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 15,
                    armorModifier = 0,
                    critChanceModifier = 0.2,
                    critDamageModifier = 0.2
                ),
                R.drawable.weapon_machete,
                probability = 0.1,
                equipmentSlot = EquipmentSlot.WEAPON
            ),
            Item(
                "Red Gem Sword",
                "A sword with a red gem, something seems not normal with this sword.",
                ItemType.WEAPON,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 25,
                    armorModifier = 0,
                    critChanceModifier = 0.4,
                    critDamageModifier = 0.6
                ),
                R.drawable.weapon_red_gem_sword,
                probability = 0.03,
                equipmentSlot = EquipmentSlot.WEAPON
            ),
            Item(
                "Red Magic Staff",
                "A red what staff?? Since when can i use magic.",
                ItemType.WEAPON,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 20,
                    armorModifier = 0,
                    critChanceModifier = 0.1,
                    critDamageModifier = 0.4
                ),
                R.drawable.weapon_red_magic_staff,
                probability = 0.1,
                equipmentSlot = EquipmentSlot.WEAPON
            ),
            Item(
                "Regular Sword",
                "Just a regular sword.",
                ItemType.WEAPON,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 15,
                    armorModifier = 0,
                    critChanceModifier = 0.1,
                    critDamageModifier = 0.2
                ),
                R.drawable.weapon_regular_sword,
                probability = 0.1,
                equipmentSlot = EquipmentSlot.WEAPON
            ),
            Item(
                "Rusty Sword",
                "I don't think i should use this.",
                ItemType.WEAPON,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 5,
                    armorModifier = 0,
                    critChanceModifier = 0.0,
                    critDamageModifier = 0.0
                ),
                R.drawable.weapon_rusty_sword,
                probability = 0.1,
                equipmentSlot = EquipmentSlot.WEAPON
            ),
            Item(
                "Saw Sword",
                "A sword with a saw on the back side, this could be useful.",
                ItemType.WEAPON,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 15,
                    armorModifier = 0,
                    critChanceModifier = 0.2,
                    critDamageModifier = 0.2
                ),
                R.drawable.weapon_saw_sword,
                probability = 0.1,
                equipmentSlot = EquipmentSlot.WEAPON
            ),
            Item(
                "Spear",
                "A spear, another way to fight.",
                ItemType.WEAPON,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 20,
                    armorModifier = 0,
                    critChanceModifier = 0.3,
                    critDamageModifier = 0.4
                ),
                R.drawable.weapon_spear,
                probability = 0.1,
                equipmentSlot = EquipmentSlot.WEAPON
            ),
            Item(
                "Throwing Axe",
                "Wait, do i need to grab it after every throw?",
                ItemType.WEAPON,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 20,
                    armorModifier = 0,
                    critChanceModifier = 0.3,
                    critDamageModifier = 0.4
                ),
                R.drawable.weapon_throwing_axe,
                probability = 0.1,
                equipmentSlot = EquipmentSlot.WEAPON
            ),
            Item(
                "Waraxe",
                "This waraxe seems nice to fight with.",
                ItemType.WEAPON,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 25,
                    armorModifier = 0,
                    critChanceModifier = 0.4,
                    critDamageModifier = 0.7
                ),
                R.drawable.weapon_waraxe,
                probability = 0.03,
                equipmentSlot = EquipmentSlot.WEAPON
            ),

//armor
//
//
//
//
//
//
            Item(
                "Placeholder Helmet",
                "",
                ItemType.ARMOR,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 0,
                    armorModifier = 0,
                    critChanceModifier = 0.0,
                    critDamageModifier = 0.0
                ),
                null,
                probability = 0.0,
                equipmentSlot = EquipmentSlot.ARMOR_HEAD
            ),
            Item(
                "Placeholder Chest",
                "",
                ItemType.ARMOR,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 0,
                    armorModifier = 0,
                    critChanceModifier = 0.0,
                    critDamageModifier = 0.0
                ),
                null,
                probability = 0.0,
                equipmentSlot = EquipmentSlot.ARMOR_HEAD
            ),
            Item(
                "Placeholder Legs",
                "",
                ItemType.ARMOR,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 0,
                    armorModifier = 0,
                    critChanceModifier = 0.0,
                    critDamageModifier = 0.0
                ),
                null,
                probability = 0.0,
                equipmentSlot = EquipmentSlot.ARMOR_HEAD
            ),
            Item(
                "Placeholder Feet",
                "",
                ItemType.ARMOR,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 0,
                    armorModifier = 0,
                    critChanceModifier = 0.0,
                    critDamageModifier = 0.0
                ),
                null,
                probability = 0.0,
                equipmentSlot = EquipmentSlot.ARMOR_HEAD
            ),




            Item(
                "Leather Chest",
                "A leather chest, better than nothing.",
                ItemType.ARMOR,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 0,
                    armorModifier = 5,
                    critChanceModifier = 0.0,
                    critDamageModifier = 0.0
                ),
                R.drawable.chest_leather,
                probability = 0.15,
                equipmentSlot = EquipmentSlot.ARMOR_CHEST
            ),
            Item(
                "Leather Legs",
                "Leather legs, better than nothing.",
                ItemType.ARMOR,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 0,
                    armorModifier = 5,
                    critChanceModifier = 0.0,
                    critDamageModifier = 0.0
                ),
                R.drawable.legs_leather,
                probability = 0.15,
                equipmentSlot = EquipmentSlot.ARMOR_LEGS
            ),
            Item(
                "Leather Boots",
                "Leather boots, better than nothing.",
                ItemType.ARMOR,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 0,
                    armorModifier = 5,
                    critChanceModifier = 0.0,
                    critDamageModifier = 0.0
                ),
                R.drawable.feet_leather,
                probability = 0.15,
                equipmentSlot = EquipmentSlot.ARMOR_FEET
            ),
            Item(
                "Iron Helmet",
                "A iron helmet, gives some defense.",
                ItemType.ARMOR,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 0,
                    armorModifier = 10,
                    critChanceModifier = 0.0,
                    critDamageModifier = 0.0
                ),
                R.drawable.helmet_iron,
                probability = 0.1,
                equipmentSlot = EquipmentSlot.ARMOR_HEAD
            ),
            Item(
                "Iron Chest",
                "A iron chest, gives some defense.",
                ItemType.ARMOR,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 0,
                    armorModifier = 10,
                    critChanceModifier = 0.0,
                    critDamageModifier = 0.0
                ),
                R.drawable.chest_iron,
                probability = 0.1,
                equipmentSlot = EquipmentSlot.ARMOR_CHEST
            ),
            Item(
                "Iron Legs",
                "Iron legs, gives some defense.",
                ItemType.ARMOR,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 0,
                    armorModifier = 10,
                    critChanceModifier = 0.0,
                    critDamageModifier = 0.0
                ),
                R.drawable.legs_iron,
                probability = 0.1,
                equipmentSlot = EquipmentSlot.ARMOR_LEGS
            ),
            Item(
                "Iron Boots",
                "Iron boots, gives some defense.",
                ItemType.ARMOR,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 0,
                    armorModifier = 10,
                    critChanceModifier = 0.0,
                    critDamageModifier = 0.0
                ),
                R.drawable.feet_iron,
                probability = 0.1,
                equipmentSlot = EquipmentSlot.ARMOR_FEET
            ),
            Item(
                "Gold Helmet",
                "A golden helmet, looks too valuable to be used.",
                ItemType.ARMOR,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 0,
                    armorModifier = 15,
                    critChanceModifier = 0.0,
                    critDamageModifier = 0.0
                ),
                R.drawable.helmet_gold,
                probability = 0.08,
                equipmentSlot = EquipmentSlot.ARMOR_HEAD
            ),
            Item(
                "Gold Chest",
                "A golden chest, looks too valuable to be used.",
                ItemType.ARMOR,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 0,
                    armorModifier = 15,
                    critChanceModifier = 0.0,
                    critDamageModifier = 0.0
                ),
                R.drawable.chest_gold,
                probability = 0.08,
                equipmentSlot = EquipmentSlot.ARMOR_CHEST
            ),
            Item(
                "Gold Legs",
                "Golden legs, looks too valuable to be used.",
                ItemType.ARMOR,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 0,
                    armorModifier = 15,
                    critChanceModifier = 0.0,
                    critDamageModifier = 0.0
                ),
                R.drawable.legs_gold,
                probability = 0.08,
                equipmentSlot = EquipmentSlot.ARMOR_LEGS
            ),
            Item(
                "Gold Boots",
                "Golden boots, looks too valuable to be used.",
                ItemType.ARMOR,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 0,
                    armorModifier = 15,
                    critChanceModifier = 0.0,
                    critDamageModifier = 0.0
                ),
                R.drawable.feet_gold,
                probability = 0.08,
                equipmentSlot = EquipmentSlot.ARMOR_FEET
            ),
            Item(
                "Lords Helmet",
                "Helmet from a lord, well designed.",
                ItemType.ARMOR,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 0,
                    armorModifier = 20,
                    critChanceModifier = 0.0,
                    critDamageModifier = 0.0
                ),
                R.drawable.helmet_lord,
                probability = 0.05,
                equipmentSlot = EquipmentSlot.ARMOR_HEAD
            ),
            Item(
                "Lords Chest",
                "Chest from a lord, well designed.",
                ItemType.ARMOR,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 0,
                    armorModifier = 20,
                    critChanceModifier = 0.0,
                    critDamageModifier = 0.0
                ),
                R.drawable.chest_lord,
                probability = 0.05,
                equipmentSlot = EquipmentSlot.ARMOR_CHEST
            ),
            Item(
                "Lords Legs",
                "Legs from a lord, well designed.",
                ItemType.ARMOR,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 0,
                    armorModifier = 20,
                    critChanceModifier = 0.0,
                    critDamageModifier = 0.0
                ),
                R.drawable.legs_lord,
                probability = 0.05,
                equipmentSlot = EquipmentSlot.ARMOR_LEGS
            ),
            Item(
                "Lords Boots",
                "Boots from a lord, well designed.",
                ItemType.ARMOR,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 0,
                    armorModifier = 20,
                    critChanceModifier = 0.0,
                    critDamageModifier = 0.0
                ),
                R.drawable.feet_lord,
                probability = 0.05,
                equipmentSlot = EquipmentSlot.ARMOR_FEET
            ),
            Item(
                "Legendary Helmet",
                "A legendary helmet, this must be really good.",
                ItemType.ARMOR,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 0,
                    armorModifier = 25,
                    critChanceModifier = 0.0,
                    critDamageModifier = 0.0
                ),
                R.drawable.helmet_legend,
                probability = 0.03,
                equipmentSlot = EquipmentSlot.ARMOR_HEAD
            ),
            Item(
                "Legendary Chest",
                "A legendary chest, this must be really good.",
                ItemType.ARMOR,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 0,
                    armorModifier = 25,
                    critChanceModifier = 0.0,
                    critDamageModifier = 0.0
                ),
                R.drawable.chest_legend,
                probability = 0.03,
                equipmentSlot = EquipmentSlot.ARMOR_CHEST
            ),
            Item(
                "Legendary Legs",
                "Legendary legs, this must be really good.",
                ItemType.ARMOR,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 0,
                    armorModifier = 25,
                    critChanceModifier = 0.0,
                    critDamageModifier = 0.0
                ),
                R.drawable.legs_legend,
                probability = 0.03,
                equipmentSlot = EquipmentSlot.ARMOR_LEGS
            ),
            Item(
                "Legendary Boots",
                "Legendary Boots, this must be really good.",
                ItemType.ARMOR,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 0,
                    armorModifier = 25,
                    critChanceModifier = 0.0,
                    critDamageModifier = 0.0
                ),
                R.drawable.feet_legend,
                probability = 0.03,
                equipmentSlot = EquipmentSlot.ARMOR_FEET
            ),

//accessory
//
//
//
//
//
//
            Item(
                "Placeholder Necklace",
                "",
                ItemType.ARMOR,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 0,
                    armorModifier = 0,
                    critChanceModifier = 0.0,
                    critDamageModifier = 0.0
                ),
                null,
                probability = 0.0,
                equipmentSlot = EquipmentSlot.ACCESSORY_1
            ),
            Item(
                "Placeholder Ring",
                "",
                ItemType.ARMOR,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 0,
                    armorModifier = 0,
                    critChanceModifier = 0.0,
                    critDamageModifier = 0.0
                ),
                null,
                probability = 0.0,
                equipmentSlot = EquipmentSlot.ACCESSORY_2
            ),


            Item(
                "Bronze Necklace",
                "A bronze necklace, not that valuable.",
                ItemType.ARMOR,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 0,
                    armorModifier = 0,
                    critChanceModifier = 0.1,
                    critDamageModifier = 0.2
                ),
                R.drawable.necklace_bronze,
                probability = 0.15,
                equipmentSlot = EquipmentSlot.ACCESSORY_1
            ),
            Item(
                "Bronze Ring",
                "A bronze ring, not that valuable.",
                ItemType.ARMOR,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 0,
                    armorModifier = 0,
                    critChanceModifier = 0.1,
                    critDamageModifier = 0.2
                ),
                R.drawable.ring_bronze,
                probability = 0.15,
                equipmentSlot = EquipmentSlot.ACCESSORY_2
            ),
            Item(
                "Iron Necklace",
                "An iron necklace, looks fine.",
                ItemType.ARMOR,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 0,
                    armorModifier = 0,
                    critChanceModifier = 0.15,
                    critDamageModifier = 0.3
                ),
                R.drawable.necklace_iron,
                probability = 0.1,
                equipmentSlot = EquipmentSlot.ACCESSORY_1
            ),
            Item(
                "Iron Ring",
                "An iron ring, looks fine.",
                ItemType.ARMOR,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 0,
                    armorModifier = 0,
                    critChanceModifier = 0.15,
                    critDamageModifier = 0.3
                ),
                R.drawable.ring_iron,
                probability = 0.1,
                equipmentSlot = EquipmentSlot.ACCESSORY_2
            ),
            Item(
                "Gold Necklace",
                "A golden necklace, must be valuable.",
                ItemType.ARMOR,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 0,
                    armorModifier = 0,
                    critChanceModifier = 0.2,
                    critDamageModifier = 0.4
                ),
                R.drawable.necklace_gold,
                probability = 0.08,
                equipmentSlot = EquipmentSlot.ACCESSORY_1
            ),
            Item(
                "Gold Ring",
                "A golden ring, must be valuable.",
                ItemType.ARMOR,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 0,
                    armorModifier = 0,
                    critChanceModifier = 0.2,
                    critDamageModifier = 0.4
                ),
                R.drawable.ring_gold,
                probability = 0.08,
                equipmentSlot = EquipmentSlot.ACCESSORY_2
            ),
            Item(
                "Gold Sapphire Necklace",
                "A golden necklace with a sapphire, must be really valuable.",
                ItemType.ARMOR,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 0,
                    armorModifier = 5,
                    critChanceModifier = 0.5,
                    critDamageModifier = 0.3
                ),
                R.drawable.necklace_gold_sapphire,
                probability = 0.07,
                equipmentSlot = EquipmentSlot.ACCESSORY_1
            ),
            Item(
                "Emerald Ring",
                "A golden ring with an emerald, must be really valuable.",
                ItemType.ARMOR,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 0,
                    armorModifier = 5,
                    critChanceModifier = 0.5,
                    critDamageModifier = 0.3
                ),
                R.drawable.ring_emerald,
                probability = 0.07,
                equipmentSlot = EquipmentSlot.ACCESSORY_2
            ),
            Item(
                "Sapphire Necklace",
                "A necklace with a sapphire, must be valuable.",
                ItemType.ARMOR,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 5,
                    armorModifier = 0,
                    critChanceModifier = 0.5,
                    critDamageModifier = 0.5
                ),
                R.drawable.necklace_sapphire,
                probability = 0.05,
                equipmentSlot = EquipmentSlot.ACCESSORY_1
            ),
            Item(
                "Sapphire Ring",
                "A ring with a sapphire, must be valuable.",
                ItemType.ARMOR,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 5,
                    armorModifier = 0,
                    critChanceModifier = 0.5,
                    critDamageModifier = 0.5
                ),
                R.drawable.ring_sapphire,
                probability = 0.05,
                equipmentSlot = EquipmentSlot.ACCESSORY_2
            ),
            Item(
                "Legendary Necklace",
                "A legendary necklace, I should keep this.",
                ItemType.ARMOR,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 5,
                    armorModifier = 5,
                    critChanceModifier = 0.4,
                    critDamageModifier = 0.6
                ),
                R.drawable.necklace_legend,
                probability = 0.03,
                equipmentSlot = EquipmentSlot.ACCESSORY_1
            ),
            Item(
                "Legendary Ring",
                "A legendary ring, I should keep this.",
                ItemType.ARMOR,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 5,
                    armorModifier = 5,
                    critChanceModifier = 0.4,
                    critDamageModifier = 0.6
                ),
                R.drawable.ring_legend,
                probability = 0.03,
                equipmentSlot = EquipmentSlot.ACCESSORY_2
            ),
            Item(
                "Knights Ring",
                "A knights ring, he must have lost it.",
                ItemType.ARMOR,
                statModifier = StatModifier(
                    healthModifier = 0,
                    attackDamageModifier = 0,
                    armorModifier = 5,
                    critChanceModifier = 0.2,
                    critDamageModifier = 0.3
                ),
                R.drawable.ring_knight,
                probability = 0.01,
                equipmentSlot = EquipmentSlot.ACCESSORY_2
            ),




//
//
//
//
//
//
        )
    }
}