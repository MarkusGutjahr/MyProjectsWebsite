package de.thm.mov2game.view

import android.content.res.TypedArray
import android.graphics.Canvas
import android.graphics.Color
import android.graphics.Paint
import android.graphics.PaintFlagsDrawFilter
import android.graphics.Rect
import android.graphics.drawable.Drawable
import android.view.MotionEvent
import android.view.View
import de.thm.mov2game.R
import de.thm.mov2game.model.dungeon.Coord
import de.thm.mov2game.model.dungeon.CoordF
import de.thm.mov2game.model.entities.Entity
import de.thm.mov2game.model.dungeon.Dungeon
import de.thm.mov2game.model.LevelModel
import de.thm.mov2game.model.dungeon.TileData
import de.thm.mov2game.model.mapObjects.Chest
import de.thm.mov2game.model.mapObjects.MapObject


class GameCanvas(private val context : LevelActivity, val model: LevelModel) : View(context) {

    private lateinit var tiles : Array<TileData>
    private var entities = listOf<Entity>()
    private var mapObjects = listOf<MapObject>()

    private var center : CoordF = CoordF()

    private val environmentSprites = arrayOf(
        loadSprites(R.array.floor_drawable),
        loadSprites(R.array.wall_drawable),
        loadSprite(R.drawable.wall_outer_mid_left),
        loadSprite(R.drawable.wall_outer_mid_right),
        loadSprite(R.drawable.wall_top_mid),
        loadSprite(R.drawable.wall_outer_top_left),
        loadSprite(R.drawable.wall_outer_top_right),
        loadSprite(R.drawable.wall_outer_front_left),
        loadSprite(R.drawable.wall_outer_front_right),
        loadSprite(R.drawable.edge_down),
        loadSprites(R.array.entrance_drawable),
        loadSprite(R.drawable.wall_left),
        loadSprite(R.drawable.wall_right),
        loadSprite(R.drawable.wall_top_left),
        loadSprite(R.drawable.wall_top_right),
    )
    private val entitySprites = arrayOf(
        loadSprites(R.array.knight_drawable),
        loadSprites(R.array.skelet_drawable),
        loadSprites(R.array.masked_orc_drawable),
        loadSprites(R.array.chort_drawable),
        loadSprites(R.array.big_demon_drawable),
        loadSprites(R.array.big_zombie_drawable),
        loadSprites(R.array.goblin_drawable),
        loadSprites(R.array.ice_zombie_drawable),
        loadSprites(R.array.lizard_f_drawable),
        loadSprites(R.array.lizard_m_drawable),
        loadSprites(R.array.muddy_drawable),
        loadSprites(R.array.necromancer_drawable),
        loadSprites(R.array.ogre_drawable),
        loadSprites(R.array.orc_shaman_drawable),
        loadSprites(R.array.orc_warrior_drawable),
        loadSprites(R.array.pumpkin_dude_drawable),
        loadSprites(R.array.swampy_drawable),
        loadSprites(R.array.wogol_drawable),
        loadSprites(R.array.zombie_drawable)
    )
    private val mapObjectSprites = arrayOf(
        loadSprites(R.array.chest_random_drawable),
        loadSprites(R.array.chest_weapon_drawable),
        loadSprites(R.array.chest_armor_drawable),
        loadSprites(R.array.chest_potion_drawable)
    )
    private var ePosCorr = 0.25f

    private var dungeonWidth = 0
    private var tileWidth = 0
    private var position = CoordF()

    private var canvasWidth = 0
    private var canvasHeight = 0

    private fun loadSprite(id : Int) : Array<Drawable>{
        return arrayOf(context.resources.getDrawable(id, null))
    }
    private fun loadSprites(id : Int) : Array<Drawable>{
        val drawableArrayRes: TypedArray = context.resources.obtainTypedArray(id)
        val sprites = Array<Drawable>(drawableArrayRes.length()){ drawableArrayRes.getDrawable(it)!!}
        drawableArrayRes.recycle() // Don't forget to recycle the TypedArray
        return sprites
    }

    override fun onDraw(canvas : Canvas) {
        super.onDraw(canvas)
        canvas.drawFilter = PaintFlagsDrawFilter(Paint.ANTI_ALIAS_FLAG or Paint.FILTER_BITMAP_FLAG or Paint.DITHER_FLAG, 0)

        var tile : TileData
        var rect : Rect
        var sprite : Drawable
        val paint = Paint()

        val rangePaint = Paint()
        rangePaint.color = Color.WHITE
        rangePaint.alpha = 42

        val highlightPaint = Paint()
        highlightPaint.color = Color.BLUE
        highlightPaint.style = Paint.Style.STROKE
        highlightPaint.strokeWidth = 4f

        //Culling preparation
        var x1 = position.x.toInt() -1
        var y1 = position.y.toInt() -1
        var x2 = position.x.toInt() + canvasWidth +1
        var y2 = position.y.toInt() + canvasHeight +1

        val bounds = Rect(toCanvasSpaceX(x1.toFloat()), toCanvasSpaceY(y1.toFloat()),toCanvasSpaceX(x2.toFloat()), toCanvasSpaceY(y2.toFloat()))

        x1 = if (x1 < 0) 0 else x1
        y1 = if (y1 < 0) 0 else y1
        x2 = if (x2 >= dungeonWidth) dungeonWidth - 1 else x2
        y2 = if (y2 >= tiles.size / dungeonWidth) tiles.size / dungeonWidth - 1 else y2

        //Background
        canvas.drawRect(bounds, Paint())

        //Tiles
        for (i in x1 until x2) {
            for (j in y1 until y2) {
                tile = tiles[j * dungeonWidth + i]

                if (tile.spriteID.toInt() != -1) {
                    //Layer 1
                    rect = getRect(i.toFloat(),j.toFloat())
                    sprite = environmentSprites[tile.spriteID.toInt()][tile.spriteVariant.toInt()]
                    sprite.bounds = rect
                    sprite.draw(canvas)

                    //Layer 2
                    if (tile.secundarySpriteID.toInt() != -1) {
                        sprite = environmentSprites[tile.secundarySpriteID.toInt()][0]
                        sprite.bounds = rect
                        sprite.draw(canvas)
                    }
                }
            }
        }
        //Range
        if (model.gameStateModel.playerTurn) {
            for (e in model.gameStateModel.pathData) {
                canvas.drawRect(getRect(e.coord.x.toFloat(), e.coord.y.toFloat()), rangePaint)
            }
        }
        //Entity
        for (e in entities) {
           if (e.realPosition.x >= x1 && e.realPosition.x < x2 && e.realPosition.y >= y1 && e.realPosition.y < y2) {
               e.active = true
               sprite = entitySprites[e.spriteID][e.animationState]
               sprite.bounds = getRect(e.realPosition.x,e.realPosition.y - ePosCorr)
               sprite.draw(canvas)

               //Healthbar
               paint.color = Color.LTGRAY
               canvas.drawRect(Rect(toCanvasSpaceX(e.realPosition.x +0.1f), toCanvasSpaceY(e.realPosition.y -0.2f), toCanvasSpaceX(e.realPosition.x +0.9f), toCanvasSpaceY(e.realPosition.y -0.1f)), paint)
               paint.color = if (e.name == "Bob") Color.BLUE else Color.RED
               canvas.drawRect(Rect(toCanvasSpaceX(e.realPosition.x +0.1f), toCanvasSpaceY(e.realPosition.y -0.2f), toCanvasSpaceX(e.realPosition.x + 0.1f + e.health.toFloat() / e.maxHealth.toFloat() * 0.8f + 0.05f), toCanvasSpaceY(e.realPosition.y -0.1f)), paint)

               //Selection
               if (model.gameStateModel.playerTurn && model.gameStateModel.playerAttackCheck(e)) {
                   canvas.drawRect(getRect(e.realPosition.x, e.realPosition.y), highlightPaint)
               }
           }
           else e.active = false
        }

        //Chests
        for (e in mapObjects) {
            if (e.realPosition.x >= x1 && e.realPosition.x < x2 && e.realPosition.y >= y1 && e.realPosition.y < y2) {
                e.active = true
                sprite = mapObjectSprites[e.spriteID][e.animationState]
                sprite.bounds = getRect(e.realPosition.x,e.realPosition.y - ePosCorr)
                sprite.draw(canvas)
            }
            else e.active = false
        }
    }

    private fun toCanvasSpaceX(x : Float) : Int {
        return ((x - position.x) * tileWidth.toFloat()).toInt()
    }
    private fun toCanvasSpaceY(y : Float) : Int {
        return ((y - position.y) * tileWidth.toFloat()).toInt()
    }
    private fun getRect(x : Float, y : Float) : Rect {
        return Rect(toCanvasSpaceX(x), toCanvasSpaceY(y), toCanvasSpaceX(x + 1f), toCanvasSpaceY(y + 1f))
    }

    fun init(dungeon : Dungeon) {
        tiles = dungeon.tiles
        dungeonWidth = dungeon.size.x
    }

    fun render(pos : CoordF, width : Int, height : Int) {
        canvasWidth = width
        canvasHeight = height
        center = pos
        position = CoordF (pos.x - width / 2, pos.y - height / 2)
        tileWidth = (context.getWindowWidth() / canvasWidth)

        invalidate()
    }

    fun setEntities(entities: List<Entity>) {
        this.entities = entities
    }

    fun setChests(chests: List<Chest>) {
        this.mapObjects = chests
    }
    private fun selectTile(x : Float, y : Float) : Coord {
        return Coord((x / tileWidth + position.x).toInt(), (y / tileWidth + position.y).toInt())
    }

    override fun onTouchEvent(event: MotionEvent?): Boolean {

        if(event?.action == MotionEvent.ACTION_DOWN){
            model.gameStateModel.handleTouchEvent(selectTile(event.x, event.y))
            invalidate()
        }
        else if(event?.action == MotionEvent.ACTION_UP){
            model.gameStateModel.handleReleaseEvent(selectTile(event.x, event.y))
            invalidate()
        }
        return true
    }
}