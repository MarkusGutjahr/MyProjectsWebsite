package de.thm.mov2game.view

import android.view.View
import androidx.recyclerview.widget.ItemTouchHelper
import androidx.recyclerview.widget.RecyclerView
import de.thm.mov2game.model.inventory.InventoryAdapter
import de.thm.mov2game.model.inventory.InventoryItemListener

class SimpleItemTouchHelperCallback(private val mAdapter: InventoryItemListener) :
    ItemTouchHelper.Callback() {

    override fun isLongPressDragEnabled(): Boolean {
        return true
    }

    override fun isItemViewSwipeEnabled(): Boolean {
        return false
    }

    override fun getMovementFlags(
        recyclerView: RecyclerView,
        viewHolder: RecyclerView.ViewHolder
    ): Int {
        val dragFlags = ItemTouchHelper.UP or ItemTouchHelper.DOWN or ItemTouchHelper.LEFT or ItemTouchHelper.RIGHT
        //val swipeFlags = ItemTouchHelper.START or ItemTouchHelper.END
        return makeMovementFlags(dragFlags, 0)
    }

    override fun onMove(
        recyclerView: RecyclerView,
        viewHolder: RecyclerView.ViewHolder,
        target: RecyclerView.ViewHolder
    ): Boolean {
        /*
        // Ensure that the dragged item is still within the RecyclerView bounds
        if (target.adapterPosition == RecyclerView.NO_POSITION) {
            // Handle when the item is moved outside the RecyclerView bounds
            val targetRecyclerView = target.itemView.parent as? RecyclerView
            if (targetRecyclerView != null) {
                // Transfer the item to the target RecyclerView
                val position = viewHolder.adapterPosition
                mAdapter.onItemMove(viewHolder.adapterPosition, target.adapterPosition)
                transferItemToTarget(targetRecyclerView, position)
                return true
            }

            // The target is not a valid RecyclerView, disallow the move
            return false
        }

        // Call onItemMove before transferring the item
        mAdapter.onItemMove(viewHolder.adapterPosition, target.adapterPosition)

        return true
         */
        mAdapter.onItemMove(viewHolder.adapterPosition, target.adapterPosition)
        return true
    }


    private fun transferItemToTarget(targetRecyclerView: RecyclerView, position: Int) {
        // Get the item from the source RecyclerView's adapter
        val sourceAdapter = mAdapter as? InventoryAdapter
        val item = sourceAdapter?.getItemAtPosition(position)

        // Ensure that the item and target adapter are not null
        if (item != null && targetRecyclerView.adapter != null) {
            // Notify the source RecyclerView's adapter of the item removal
            sourceAdapter.onItemDismiss(position)

            // Add the item to the target RecyclerView's adapter
            val targetAdapter = targetRecyclerView.adapter as? InventoryAdapter
            targetAdapter?.addItemAtPosition(0, item)

            // Handle any additional logic for the transfer
            // Example: targetAdapter?.notifyDataSetChanged()
        }
    }



    override fun onSwiped(viewHolder: RecyclerView.ViewHolder, direction: Int) {
        //mAdapter.onItemDismiss(viewHolder.adapterPosition)
    }

    override fun clearView(
        recyclerView: RecyclerView,
        viewHolder: RecyclerView.ViewHolder
    ) {
        super.clearView(recyclerView, viewHolder)
        viewHolder.itemView.elevation = 0f
        viewHolder.itemView.visibility = View.VISIBLE // Ensure visibility is set to VISIBLE
        mAdapter.onItemReleased()
    }
    override fun onSelectedChanged(
        viewHolder: RecyclerView.ViewHolder?,
        actionState: Int
    ) {
        if (actionState != ItemTouchHelper.ACTION_STATE_IDLE) {
            viewHolder?.itemView?.elevation = 10f // Set elevation to bring the item to the front during dragging
            viewHolder?.itemView?.visibility = View.VISIBLE // Make sure the dragged item is visible
        }
        super.onSelectedChanged(viewHolder, actionState)
    }
}