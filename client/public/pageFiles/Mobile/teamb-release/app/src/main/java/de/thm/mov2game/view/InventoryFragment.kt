package de.thm.mov2game.view

import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.ImageView
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.ItemTouchHelper
import androidx.recyclerview.widget.RecyclerView
import de.thm.mov2game.R
import de.thm.mov2game.model.LevelModel
import de.thm.mov2game.model.inventory.Inventory
import de.thm.mov2game.model.inventory.InventoryAdapter
import de.thm.mov2game.model.inventory.InventoryItemListener
import de.thm.mov2game.model.items.Item
import de.thm.mov2game.model.items.ItemType


class InventoryFragment(val levelModel: LevelModel) : Fragment(), InventoryItemListener {
    private var isFragmentsVisible = false

    private lateinit var recyclerView1: RecyclerView
    private lateinit var recyclerView2: RecyclerView
    private lateinit var adapter1: InventoryAdapter
    private lateinit var adapter2: InventoryAdapter
    private var lastClickTime: Long = 0
    private val doubleClickDelay: Long = 300 // Time in milliseconds for double click interval

    private val inventory: Inventory = levelModel.gameStateModel.playerInventory
    private var inventoryFiltered: List<Item> = inventory.filterNot { it.isActive }
    private var inventoryFilteredActive: List<Item> = inventory.filter { it.isActive }
    private val inventoryItems: Inventory = Inventory()
    private val inventoryItemsActive: Inventory = Inventory()

    private lateinit var trashCanIcon: ImageView
    private var isDeleteMode = false

    private lateinit var infoIcon: ImageView
    private lateinit var useButton: Button

    private lateinit var inventoryButton: ImageView

    private lateinit var itemInfo: TextView
    private lateinit var statsInfo: TextView
    private var showStats = false

    private var showText:String = ""
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        inventoryItems.addAll(inventoryFiltered)
        inventoryItemsActive.addAll(inventoryFilteredActive)

        val view = inflater.inflate(R.layout.fragment_inventory, container, false)

        recyclerView1 = view.findViewById(R.id.recyclerView1)
        recyclerView1.layoutManager = GridLayoutManager(requireContext(), 2)

        recyclerView2 = view.findViewById(R.id.recyclerView2)
        recyclerView2.layoutManager = GridLayoutManager(requireContext(), 4)

        trashCanIcon = view.findViewById(R.id.trashCanIcon)
        trashCanIcon.setOnClickListener {
            isDeleteMode = !isDeleteMode // Toggle delete mode
            //trashCanIcon.visibility = if (isDeleteMode) View.VISIBLE else View.INVISIBLE
        }

        infoIcon = view.findViewById(R.id.infoIcon)
        infoIcon.setOnClickListener {
            if(!showStats){
                val statsText = "${levelModel.gameStateModel.player.name} Stats: \n" +
                        "Health: ${levelModel.gameStateModel.player.health} (/${levelModel.gameStateModel.player.maxHealth}) \n" +
                        "Attack Damage: ${levelModel.gameStateModel.player.attackDamage} \n" +
                        "Armor: ${levelModel.gameStateModel.player.armor} \n" +
                        "Crit Chance: ${levelModel.gameStateModel.player.critChance * 100}% \n" +
                        "Crit Damage: ${levelModel.gameStateModel.player.critDamage * 100}%"

                showStats = true
                statsInfo.text = statsText
                removeText(statsInfo)
            } else {
                showStats = false
                statsInfo.text = null
            }

        }
        itemInfo = view.findViewById(R.id.itemViewInfo)
        statsInfo = view.findViewById(R.id.statsViewInfo)

        useButton = view.findViewById(R.id.useButton)

        adapter1 = InventoryAdapter(inventoryItemsActive, { item -> onItemClick(item, recyclerViewId = 1) }, this, trashCanIcon, recyclerView1, levelModel.gameStateModel)
        recyclerView1.adapter = adapter1

        adapter2 = InventoryAdapter(inventoryItems, { item -> onItemClick(item, recyclerViewId = 2) }, this, trashCanIcon, recyclerView2, levelModel.gameStateModel)
        recyclerView2.adapter = adapter2

        val callback1 = SimpleItemTouchHelperCallback(adapter1)
        val itemTouchHelper1 = ItemTouchHelper(callback1)
        itemTouchHelper1.attachToRecyclerView(recyclerView1)

        val callback2 = SimpleItemTouchHelperCallback(adapter2)
        val itemTouchHelper2 = ItemTouchHelper(callback2)
        itemTouchHelper2.attachToRecyclerView(recyclerView2)


        // Initially hide the inventory fragments
        recyclerView1.visibility = View.GONE
        recyclerView2.visibility = View.GONE

        // Create the button and add click listener
        inventoryButton = view.findViewById(R.id.inventoryButton)
       // fab.setImageResource(R.drawable.rpg_inventory_button_icon)
        inventoryButton.setOnClickListener {
            isFragmentsVisible = !isFragmentsVisible

            recyclerView1.visibility = if (isFragmentsVisible) View.VISIBLE else View.GONE
            recyclerView2.visibility = if (isFragmentsVisible) View.VISIBLE else View.GONE

            trashCanIcon.visibility = if (isFragmentsVisible) View.VISIBLE else View.GONE
            infoIcon.visibility = if (isFragmentsVisible) View.VISIBLE else View.GONE

            if(!isFragmentsVisible) {
                useButton.visibility = View.INVISIBLE
                itemInfo.text = null
                statsInfo.text = null
                isDeleteMode = false
            }
        }

        levelModel.gameStateModel.inventoryFragment = this

        return view
    }

    override fun onItemClick(item: Item, recyclerViewId: Int) {
        if (isDeleteMode) {
            levelModel.gameStateModel.playerInventory.remove(item)
            reloadInventoryItems()
        } else {
            val currentTime = System.currentTimeMillis()
            if (currentTime - lastClickTime < doubleClickDelay) {
                onItemDoubleClicked(item, recyclerViewId)
            } else {
                showText = "${item.name}\n${item.description}"
                itemInfo.text = showText
                removeText(itemInfo)

                // Reset the alpha values for all items
                for (i in 0 until levelModel.gameStateModel.playerInventory.size) {
                    levelModel.gameStateModel.playerInventory[i].isMarked = false
                }

                // Set the alpha value for the clicked item
                item.isMarked = true

                useButton.visibility = if (item.isMarked){
                    View.VISIBLE
                } else {
                    View.INVISIBLE
                }

                useButton.setOnClickListener {
                    onItemDoubleClicked(item, recyclerViewId)
                    useButton.visibility = View.INVISIBLE
                }

                // Notify the adapter to update the views
                adapter1.notifyDataSetChanged()
                adapter2.notifyDataSetChanged()
            }

            lastClickTime = currentTime
        }
    }





    override fun onItemDoubleClicked(item: Item, recyclerViewId: Int) {
        when (recyclerViewId) {
            1 -> {
                // Handle the click event for recyclerView1
                levelModel.gameStateModel.player.unequipItem(item)
                showText = "${item.name} unequipped."
                itemInfo.text = showText
                removeText(itemInfo)
            }
            2 -> {
                // Handle the click event for recyclerView2
                if (item.itemType == ItemType.POTION) {
                    levelModel.gameStateModel.player.useItem(item)
                    levelModel.gameStateModel.playerInventory.remove(item)
                    levelModel.gameStateModel.updateHealth()
                    showText = "${item.name} used."
                    itemInfo.text = showText
                    removeText(itemInfo)
                } else if (item.itemType == ItemType.WEAPON || item.itemType == ItemType.ARMOR) {
                    levelModel.gameStateModel.player.equipItem(item)
                    showText = "${item.name} equipped."
                    itemInfo.text = showText
                    removeText(itemInfo)
                }
            }
        }
        //trashCanIcon.visibility = View.INVISIBLE
        reloadInventoryItems()
    }

    override fun onItemMove(fromPosition: Int, toPosition: Int) {
        // Handle item move event
        // Update the positions of items in the inventory list
        //adapter2.notifyItemMoved(fromPosition, toPosition)
    }

    override fun onItemMoved(item: Item, fromPosition: Int, toPosition: Int) {
        /*
        inventoryItems.swapItems(fromPosition, toPosition)
        adapter2.notifyItemMoved(fromPosition, toPosition)
        // Pass the item to the listener
        adapter2.onItemMoved(item, fromPosition, toPosition)
         */
    }

    override fun onItemReleased() {
        /*
        // Handle item release event
        trashCanIcon.visibility = View.INVISIBLE

        val trashCanRect = Rect()
        trashCanIcon.getGlobalVisibleRect(trashCanRect)

        val itemView = recyclerView2.findViewHolderForAdapterPosition(0)?.itemView
        val itemRect = Rect()
        itemView?.getGlobalVisibleRect(itemRect)

        if (itemRect.intersect(trashCanRect)) {
            // Single item is released over the trash can icon, delete the item
            gameStateModel.playerInventory.remove(adapter2.heldItem)
            reloadInventoryItems()
        }
         */
        ////////////////////////////////////////////////////////////////////////
        /*
        // Check if there is a held item
        adapter2.heldItem?.let { heldItem ->
            val itemView = recyclerView2.findViewHolderForAdapterPosition(0)?.itemView
            val itemRect = Rect()
            itemView?.getGlobalVisibleRect(itemRect)

            if (itemRect.intersect(trashCanRect)) {
                // Single item is released over the trash can icon, delete the item
                gameStateModel.playerInventory.remove(heldItem)
                reloadInventoryItems()
            }
        }
         */
    }

    override fun onItemDismiss(position: Int) {
        /*
        val removedItem = inventoryItems.removeAt(position)
        gameStateModel.playerInventory.remove(removedItem)
        adapter2.notifyItemRemoved(position)
         */
    }

    override fun onItemsSwapped(fromPosition: Int, toPosition: Int) {
        TODO("Not yet implemented")
    }

    fun reloadInventoryItems() {
        inventoryFiltered = inventory.filterNot { it.isActive }
        inventoryFilteredActive = inventory.filter { it.isActive }
        inventoryItems.clear()
        inventoryItemsActive.clear()
        inventoryItems.addAll(inventoryFiltered)
        inventoryItemsActive.addAll(inventoryFilteredActive)
        adapter1.notifyDataSetChanged()
        adapter2.notifyDataSetChanged()
        // Notify specific ranges instead of notifyDataSetChanged
        adapter1.notifyItemRangeChanged(0, inventoryItemsActive.size)
        adapter2.notifyItemRangeChanged(0, inventoryItems.size)
    }

    fun removeText(remText: TextView){
        Handler(Looper.getMainLooper()).postDelayed({
            remText.text = null
        }, 5000)
    }
}
