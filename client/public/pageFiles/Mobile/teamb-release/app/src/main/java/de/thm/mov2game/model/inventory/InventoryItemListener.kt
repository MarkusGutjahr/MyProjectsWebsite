package de.thm.mov2game.model.inventory

import de.thm.mov2game.model.items.Item

interface InventoryItemListener {
    fun onItemClick(item: Item, recyclerViewId: Int)
    fun onItemDoubleClicked(item: Item, recyclerViewId: Int)
    fun onItemMove(fromPosition: Int, toPosition: Int)
    fun onItemMoved(item: Item, fromPosition: Int, toPosition: Int)
    fun onItemReleased()
    fun onItemDismiss(position: Int)
    fun onItemsSwapped(fromPosition: Int, toPosition: Int)
}
