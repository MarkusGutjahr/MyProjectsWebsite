package de.thm.mov2game.view

import android.content.Context
import android.media.MediaPlayer
import android.os.Build
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import de.thm.mov2game.model.dungeon.CoordF
import de.thm.mov2game.model.entities.Entity
import de.thm.mov2game.R
import de.thm.mov2game.model.dungeon.Dungeon
import de.thm.mov2game.model.LevelController
import de.thm.mov2game.model.LevelModel
import de.thm.mov2game.model.mapObjects.Chest
import kotlin.random.Random

class LevelActivity : AppCompatActivity(), LevelController {

    private lateinit var canvas: GameCanvas
    private lateinit var lifeBarFragment: lifeBarFragment
    private lateinit var inventoryFragment: InventoryFragment
    lateinit var model: LevelModel

    // start sounds variables
    private lateinit var mediaPlayer: MediaPlayer
    private lateinit var walkingfx: MediaPlayer
    private lateinit var playerAttackfx: MediaPlayer
    private lateinit var dyingfx: MediaPlayer
    private lateinit var minidyingfx : MediaPlayer
    private lateinit var levelfx : MediaPlayer
    private lateinit var bobdyingfx : MediaPlayer

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val level = intent.getIntExtra("level", 1)
        val lives = intent.getIntExtra("lives", 3)
        val score = intent.getIntExtra("score", 0)
        val seed  = intent.getIntExtra("seed", Random.nextInt())

        model = LevelModel(this, level, lives, score, seed)
        canvas = GameCanvas(this, model)

        lifeBarFragment = lifeBarFragment(model)
        inventoryFragment = InventoryFragment(model)
        val transaction = supportFragmentManager.beginTransaction()
        transaction.add(android.R.id.content, lifeBarFragment) // for the life bar
        transaction.add(android.R.id.content, inventoryFragment)
        transaction.commit()

        initMediaPlayer()

        model.initGame()
        setContentView(canvas)
    }

    fun initMediaPlayer() {
        // Initialize MediaPlayer for background sound
        mediaPlayer = MediaPlayer.create(this, R.raw.ambience1)
        mediaPlayer.setLooping(true) // Set looping for continuous playback
        mediaPlayer.setVolume(0.2f, 0.2f) // reducing the volume to eliminate distortion/peaking

        // Initialize MediaPlayer for walkingfx
        walkingfx = MediaPlayer.create(this, R.raw.walkingfx)
        walkingfx.setLooping(false) // Set looping for continuous playback
        walkingfx.setVolume(0.5f, 0.5f) // reducing the volume to eliminate distortion/peaking

        // Initialize MediaPlayer
        playerAttackfx = MediaPlayer.create(this, R.raw.player_attackfx)
        playerAttackfx.setLooping(false) // Set looping for continuous playback
        playerAttackfx.setVolume(0.5f, 0.5f) // reducing the volume to eliminate distortion/peaking

        // Initialize MediaPlayer for walkingfx
        dyingfx = MediaPlayer.create(this, R.raw.dyingfx)
        dyingfx.setLooping(false) // Set looping for continuous playback
        dyingfx.setVolume(0.5f, 0.5f) // reducing the volume to eliminate distortion/peaking

        // Initialize MediaPlayer for walkingfx
        minidyingfx = MediaPlayer.create(this, R.raw.minidyingfx)
        minidyingfx.setLooping(false) // Set looping for continuous playback
        minidyingfx.setVolume(0.5f, 0.5f) // reducing the volume to eliminate distortion/peaking

        // Initialize MediaPlayer for levelfx
        levelfx = MediaPlayer.create(this, R.raw.levelefx) // dont use level but levele ( it is edited in fl studio)
        levelfx.setLooping(false) // Set looping for continuous playback
        levelfx.setVolume(0.5f, 0.5f) // reducing the volume to eliminate distortion/peaking

        // Initialize MediaPlayer for levelfx
        bobdyingfx = MediaPlayer.create(this, R.raw.bobdyingfx)
        bobdyingfx.setLooping(false) // Set looping for continuous playback
        bobdyingfx.setVolume(0.8f, 0.8f) // reducing the volume to eliminate distortion/peaking
    }

    override fun onResume() {
        super.onResume()
        model.updateFragments()
    }

    override fun  playwalkingfx(){
        if (!walkingfx.isPlaying) walkingfx.start()
    }

    override fun playplayerAttackfx() {
        playerAttackfx.start()
    }

    override fun playdyingfx() {
        dyingfx.start()
    }
    override fun playminidyingfx(){
        minidyingfx.start()
    }
    override fun stopwalkingfx() {
        walkingfx.pause()
    }

    override fun  playlevelfx(){
        if (!levelfx.isPlaying) levelfx.start()
    }

    override fun  playbobdyingfx(){
        if (!bobdyingfx.isPlaying) bobdyingfx.start()
    }

    override fun savePrefs(level: Int, lives: Int, score : Int, seed : Int) {
        val prefs = getSharedPreferences("prefs", Context.MODE_PRIVATE)
        val hscore = prefs.getInt("hscore", 0)

        val edit = prefs.edit()
        edit.putInt("level", level)
        edit.putInt("lives", lives)
        edit.putInt("score", score)
        edit.putInt("seed", seed)
        if (score > hscore) {
            edit.putInt("hscore", score)
            showInfoText("New Highscore: $score")
        }
        edit.apply()
    }
    override fun setScoreText(level: Int, score : Int) {
        lifeBarFragment.textScore.text = "Level $level Score $score"
    }
    override fun showInfoText(text: String) {
        lifeBarFragment.textInfo.text = text
        Handler(Looper.getMainLooper()).postDelayed({
            lifeBarFragment.textInfo.text = null
        }, 5000)
    }

    override fun updateHealthBar(health : Float, lives : Int) {
        lifeBarFragment.updateProgressBar(health)
        lifeBarFragment.setLives(lives)
    }
    override fun updateEnemyHealthBar(enemyHealth : Float) {
        lifeBarFragment.updateProgressBarE(enemyHealth)
    }


    override fun onDestroy() {
        mediaPlayer.release() // ambience sound released
        super.onDestroy()
        model.timer.running = false
    }

    override fun createCanvas(dungeon: Dungeon) {
        canvas.init(dungeon)
        if (!mediaPlayer.isPlaying) mediaPlayer.start()
    }

    override fun onPause() {
        super.onPause()
        mediaPlayer.pause()
    }

    override fun onResumeFragments() {
        super.onResumeFragments()
        mediaPlayer.start()
    }

    override fun updateEntities(entities: List<Entity>) {
        canvas.setEntities(entities)
    }

    override fun updateChests(chests: List<Chest>) {
        canvas.setChests(chests)
    }

    override fun renderLevelAt(pos: CoordF, width: Int, height: Int) {
        canvas.render(pos, width, height)
    }

    override fun update(frame: Int, updateRate: Float) {
        runOnUiThread { model.animator.update(frame, updateRate) }
    }

    fun getWindowWidth(): Int {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            return windowManager.currentWindowMetrics.bounds.width()
        }
        return windowManager.defaultDisplay.width
    }
}