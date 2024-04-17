package de.thm.mov2game.model.inventory

import de.thm.mov2game.model.items.Item
import java.util.Collections

class Inventory(private val capacity: Int = 20) : MutableList<Item> {
    private val items: MutableList<Item> = mutableListOf()

    fun swapItems(fromPosition: Int, toPosition: Int) {
        Collections.swap(items, fromPosition, toPosition)
    }

    override fun add(element: Item): Boolean {
        println("addOben")
        return items.takeIf { it.size < capacity }?.add(Item(element)) ?: false
    }

    override fun remove(element: Item): Boolean {
        val removed = items.remove(element)
        if (removed) {
            println("Removed ${element.name} from the inventory.")
        }
        println("addAllOben")
        return removed
    }

        // Used to show the players inventory to the player
        fun listItems(): List<String> {
            if (items.isEmpty()) {
                println("Inventory is empty.")
                return emptyList()
            } else {
                val listedItems = mutableListOf<String>()
                items.forEachIndexed { index, item ->
                    listedItems.add("${index + 1}. ${item.name} - ${item.description}")
                }
                return listedItems
            }
        }

    override fun addAll(elements: Collection<Item>): Boolean {
        val remainingCapacity = capacity - size
        val addedSuccessfully = elements.takeIf { it.size <= remainingCapacity }?.let {
            this.items.addAll(it)
            true
        } ?: false

        println("addAllOben: $addedSuccessfully")
        return addedSuccessfully
    }

    // find item
    fun findItemByName(targetName: String): Item? {
        return items.firstOrNull { it.name.equals(targetName, ignoreCase = true) }
    }

    override val size: Int
        get() = items.size

    override fun clear() {
        items.clear()
    }


    override fun addAll(index: Int, elements: Collection<Item>): Boolean {
        println("addAllUnten")
        return items.addAll(index, elements)
    }

    override fun add(index: Int, element: Item) {
        items.add(index, Item(element))
        println("addUnten")
    }


    override fun get(index: Int): Item {
        return items[index]
    }

    override fun isEmpty(): Boolean {
        return items.isEmpty()
    }

    override fun iterator(): MutableIterator<Item> {
        return items.iterator()
    }

    override fun listIterator(): MutableListIterator<Item> {
        return items.listIterator()
    }

    override fun listIterator(index: Int): MutableListIterator<Item> {
        return items.listIterator(index)
    }

    override fun removeAt(index: Int): Item {
        return items.removeAt(index)
    }

    override fun subList(fromIndex: Int, toIndex: Int): MutableList<Item> {
        return items.subList(fromIndex, toIndex)
    }

    override fun set(index: Int, element: Item): Item {
        return items.set(index, element)
    }

    override fun retainAll(elements: Collection<Item>): Boolean {
        return items.retainAll(elements)
    }

    override fun removeAll(elements: Collection<Item>): Boolean {
        return items.removeAll(elements)
    }


    override fun lastIndexOf(element: Item): Int {
        return items.lastIndexOf(element)
    }

    override fun indexOf(element: Item): Int {
        return items.indexOf(element)
    }

    override fun containsAll(elements: Collection<Item>): Boolean {
        return items.containsAll(elements)
    }

    override fun contains(element: Item): Boolean {
        return items.contains(element)
    }
}