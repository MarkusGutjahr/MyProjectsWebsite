package de.thm.mov2game.model.inventory

import android.graphics.Color
import android.graphics.Paint
import android.graphics.Rect
import android.graphics.drawable.ShapeDrawable
import android.graphics.drawable.shapes.RectShape
import android.icu.text.Transliterator.Position
import android.view.LayoutInflater
import android.view.MotionEvent
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import androidx.recyclerview.widget.RecyclerView
import de.thm.mov2game.R
import de.thm.mov2game.model.GameStateModel
import de.thm.mov2game.model.items.Item

class InventoryAdapter(
    private val items: Inventory,
    private val clickListener: (Item) -> Unit,
    private val itemMoveListener: InventoryItemListener,
    private val trashCanIcon: ImageView,
    private val recyclerView: RecyclerView,
    val gameStateModel: GameStateModel
) : RecyclerView.Adapter<InventoryAdapter.ViewHolder>(), InventoryItemListener {
    var heldItem: Item? = null
        get() = field



    class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val imageView: ImageView = itemView.findViewById(R.id.itemImage)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.item_inventory, parent, false)
        val context = parent.context
        val inflater = LayoutInflater.from(context)
        //val itemView = inflater.inflate(R.layout.item_inventory, parent, false)
        return ViewHolder(view)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val item = items[position]
        item.imageResource?.let { holder.imageView.setImageResource(it) }
        /*
        holder.itemView.setOnTouchListener { _, event ->
            if (event.action == MotionEvent.ACTION_DOWN) {
                // Item is being held, show the trash can icon
                trashCanIcon.visibility = View.VISIBLE
                heldItem = item
            }
            false
        }
         */

        // Apply alpha to simulate marking
        holder.itemView.alpha = if (item.isMarked) 0.5f else 1.0f

        holder.itemView.setOnClickListener {
            item.let { clickedItem -> clickListener(clickedItem) }
        }
    }



    override fun getItemCount(): Int {
        return items.size
    }

    /*
    override fun onItemMove(fromPosition: Int, toPosition: Int): Boolean {
        if (fromPosition in 0 until items.size && toPosition in 0 until items.size) {
            items.swapItems(fromPosition, toPosition)
            notifyItemMoved(fromPosition, toPosition)
            itemMoveListener.onItemMoved(items[toPosition])
            return true
        }
        return false
    }
     */

    override fun onItemMove(fromPosition: Int, toPosition: Int) {
        if (fromPosition in 0 until items.size && toPosition in 0 until items.size) {
            items.swapItems(fromPosition, toPosition)
            notifyItemMoved(fromPosition, toPosition)
            val movedItem = items[toPosition]
            itemMoveListener.onItemMoved(movedItem, fromPosition, toPosition)
        }
    }
    override fun onItemDismiss(position: Int) {
        /*
        val removedItem = items.removeAt(position)

        // Remove the item from the player's inventory using gameStateModel
        gameStateModel.playerInventory.remove(removedItem)

        // Notify the RecyclerView about the item removal
        notifyItemRemoved(position)
         */
    }

    override fun onItemClick(item: Item, recyclerViewId: Int) {
        TODO("Not yet implemented")
    }

    override fun onItemDoubleClicked(item: Item, recyclerViewId: Int) {
        TODO("Not yet implemented")
    }

    override fun onItemMoved(item: Item, fromPosition: Int, toPosition: Int) {
        TODO("Not yet implemented")
    }

    override fun onItemReleased() {
        /*
        trashCanIcon.visibility = View.INVISIBLE

        val trashCanRect = Rect()
        trashCanIcon.getGlobalVisibleRect(trashCanRect)

        val itemView = recyclerView.findViewHolderForAdapterPosition(0)?.itemView
        val itemRect = Rect()
        itemView?.getGlobalVisibleRect(itemRect)

        if (itemRect.intersect(trashCanRect)) {
            // Single item is released over the trash can icon, notify the listener
            itemMoveListener.onItemReleased()
        }
         */
    }

    override fun onItemsSwapped(fromPosition: Int, toPosition: Int) {
        val fromItem = items[fromPosition]
        val toItem = items[toPosition]
        items[fromPosition] = toItem
        items[toPosition] = fromItem
        notifyItemMoved(fromPosition, toPosition)
    }

    fun getItemAtPosition(position: Int): Item? {
        return if (position in 0 until items.size) {
            items[position]
        } else {
            null
        }
    }

    fun addItemAtPosition(position: Int, item: Item) {
        items.add(position, item)
        notifyItemInserted(position)
    }

    fun setAlphaForItem(item: Item, alpha: Float) {
        val position = gameStateModel.playerInventory.indexOf(item)
        if (position != -1) {
            gameStateModel.playerInventory[position].alpha = alpha
            notifyItemChanged(position)
        }
    }
}
