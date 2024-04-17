package de.thm.mov2game.view

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import androidx.appcompat.app.AppCompatActivity
import de.thm.mov2game.R

class CheatActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_cheat)

        val editTextName: EditText = findViewById(R.id.editTextName)

        val buttonStart: Button = findViewById(R.id.buttonStart)
        buttonStart.setOnClickListener {
            val code = editTextName.text.toString() // Get the text entered in the EditText
            if (code.matches(Regex("^\\d+(;\\d+)?(;\\d+)?\$"))) {//Regex von ChatGPT
                val split = code.split(";")
                val intent = Intent(this, LevelActivity::class.java)
                if (split.count() > 0) intent.putExtra("level", split[0].toInt()) // Pass the name as an extra to the next activity
                if (split.count() > 1) intent.putExtra("lives", split[1].toInt())
                if (split.count() > 2) intent.putExtra("score", split[2].toInt())
                startActivity(intent)
            }
        }
    }
}