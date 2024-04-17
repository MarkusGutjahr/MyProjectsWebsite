package de.thm.mov2game.view

import android.content.Context
import android.content.Intent
import android.media.MediaPlayer
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import de.thm.mov2game.R
import android.widget.TextView
import kotlin.random.Random

class MainActivity : AppCompatActivity() {
    var level = 1
    var lives = 3
    var score = 0
    var highscore = 0
    var seed = 0
   lateinit private var mediaPlayer: MediaPlayer
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        mediaPlayer = MediaPlayer.create(this, R.raw.homesound)
        mediaPlayer.setLooping(true) // Set looping for continuous playback
        mediaPlayer.setVolume(0.08f, 0.08f) // reducing the volume to eliminate distortion/peaking
        mediaPlayer.start()

        val buttonContinue = findViewById<Button>(R.id.buttonContinue)
        buttonContinue.setOnClickListener{
            val intent = Intent(this, LevelActivity::class.java)
            intent.putExtra("level", level)
            intent.putExtra("lives", lives)
            intent.putExtra("score", score)
            intent.putExtra("seed", seed)
            startActivity(intent)
        }
        val buttonNewGame = findViewById<Button>(R.id.buttonNewGame)
        buttonNewGame.setOnClickListener{
            startActivity(Intent(this, LevelActivity::class.java))
        }
        val buttonCheat = findViewById<Button>(R.id.buttonCheats)
        buttonCheat.setOnClickListener{
            startActivity(Intent(this, CheatActivity::class.java))
        }
    }

    override fun onStop() {
        super.onStop()
        mediaPlayer.pause()
    }

    override fun onDestroy() {
        super.onDestroy()
        mediaPlayer.release() // avoid leakage
    }

    override fun onResume() {
        mediaPlayer.start()
        super.onResume()
        val prefs = getSharedPreferences("prefs", Context.MODE_PRIVATE)
        level = prefs.getInt("level", 1)
        lives = prefs.getInt("lives", 3)
        score = prefs.getInt("score", 0)
        highscore = prefs.getInt("hscore", 0)
        seed = prefs.getInt("seed", Random.nextInt())

        val text = findViewById<TextView>(R.id.levelTextView)
        text.text = "Level $level\nScore: $score \nHighscore: $highscore"
    }
}