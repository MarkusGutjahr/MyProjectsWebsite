package de.thm.mov2game.model.mapObjects

import android.annotation.SuppressLint
import de.thm.mov2game.model.LevelModel
import de.thm.mov2game.model.inventory.Inventory
import de.thm.mov2game.model.inventory.GenerateItems
import de.thm.mov2game.model.items.Item
import de.thm.mov2game.model.items.ItemType

class Chest(
    name: String,
    spriteID: Int,
    private val levelModel: LevelModel,
    private var chestType: String
) : MapObject(name, spriteID) {
    private val chestInventory: Inventory = Inventory()
    private val typeProbabilities = listOf(0.1, 0.4, 0.4, 0.1)

    //private val probabilities = listOf(0.9, 0.05, 0.05) // Probabilities corresponding to each item

    @SuppressLint("SuspiciousIndentation")
    fun getChest(): Chest {
        val chest = Chest(name, spriteID, levelModel, chestType)
            chest.fillChest()
        return chest
    }

    fun fillChest() {
        var numberOfItems =
        when (chestType) {
            "random" -> {
                val minItems = 3
                val maxItems = 6
                (Math.random() * (maxItems - minItems + 1) + minItems).toInt()
            }
            "weapon" -> {
                1
            }
            "armor" -> {
                1
            }
            "potion" -> {
                3
            }
            else -> {1
            }
        }
        var selectedItemType: ItemType? = null
        repeat(numberOfItems) {
            val randomItemTypeValue = Math.random()
            var cumulativeTypeProbability = 0.0

            // Iterate through item types and find the type based on probabilities
            when (chestType) {
                "random" -> {
                    for ((index, itemType) in GenerateItems.allItemsList.map { it.itemType }.distinct().withIndex()) {
                        cumulativeTypeProbability += typeProbabilities[index]
                        if (randomItemTypeValue <= cumulativeTypeProbability) {
                            selectedItemType = itemType
                            println("------------> $selectedItemType")
                            break
                        }
                    }
                }
                "weapon" -> {
                    selectedItemType = ItemType.WEAPON
                }
                "armor" -> {
                    selectedItemType = ItemType.ARMOR
                }
                "potion" -> {
                    selectedItemType = ItemType.POTION
                }
                else -> {
                    selectedItemType = ItemType.POTION
                }
            }

            selectedItemType?.let { itemType ->
                val itemsOfType = GenerateItems.allItemsList.filter { it.itemType == itemType }
                if (itemsOfType.isNotEmpty()) {
                    val randomItemValue = Math.random()
                    var cumulativeItemProbability = 0.0
                    var selectedItem: Item? = null

                    // Iterate through items of the selected type and find the item based on probabilities
                    for (item in itemsOfType) {
                        cumulativeItemProbability += item.probability
                        if (randomItemValue <= cumulativeItemProbability) {
                            selectedItem = item
                            break
                        }
                    }

                    // Add the selected item to the inventory
                    selectedItem?.let {
                        chestInventory.add(it)
                        println("Added ${it.name} to the chest.")
                    }
                }
            }
        }

        levelModel.gameStateModel.reloadInventory()
    }



    /*
    private fun fillChest() {
        var numberOfItems = (Math.random() * 5).toInt()
        repeat(numberOfItems) {
            val randomValue = Math.random()
            var cumulativeProbability = 0.0
            var selectedItem: Item? = null

            // Iterate through items and find the item based on probabilities
            for ((index, item) in GenerateItems.allItemsList.withIndex()) {
                cumulativeProbability += probabilities[index]
                if (randomValue <= cumulativeProbability) {
                    selectedItem = item
                    break
                }
            }

            // Add the selected item to the inventory
            selectedItem?.let {
                chestInventory.add(it)
                println("Added ${it.name} to the chest.")
            }

            // Reset cumulativeProbability for the next iteration
            cumulativeProbability = 0.0
        }

        gameStateModel.reloadInventory()
    }
     */

    fun onOpen() {
        var infoText = ""
        val itemCounts = mutableMapOf<String, Int>()
        animationStart = true
        println("Chest Inventory:")

        for (item in chestInventory) {
            itemCounts[item.name] = itemCounts.getOrDefault(item.name, 0) + 1
            println("${item.name} - ${item.description}")
        }

        for ((itemName, itemCount) in itemCounts) {
            infoText += "$itemCount $itemName\n"
        }

        levelModel.controller.showInfoText(infoText)

        levelModel.gameStateModel.playerInventory.addAll(chestInventory)
        chestInventory.clear() // Clear the chestInventory after adding items to the playerInventory

        //gameStateModel.deleteChest(this)
        println("ChestOpened")
        levelModel.gameStateModel.reloadInventory()

        println("NewPlayerInventory Inventory:")
        for (item in levelModel.gameStateModel.playerInventory) {
            println("${item.name} - ${item.description}")
        }
    }

}