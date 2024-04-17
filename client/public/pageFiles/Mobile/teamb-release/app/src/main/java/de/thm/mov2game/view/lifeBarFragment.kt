package de.thm.mov2game.view

import android.os.Bundle
import android.os.Handler
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ProgressBar
import android.media.MediaPlayer
import android.widget.ImageView

import android.widget.TextView
import android.widget.Toast
import de.thm.mov2game.R
import de.thm.mov2game.model.LevelModel

class lifeBarFragment(val levelModel : LevelModel) : Fragment() {
    lateinit var lifeProgressBar: ProgressBar //  declare the ProgressBar
    lateinit var lifeProgressBarE: ProgressBar // for the enemy
    lateinit var textScore: TextView
    lateinit var textInfo: TextView
    lateinit var  hearts: List<ImageView>


    private lateinit var specialAttackreadyfx: MediaPlayer
    private  var isfull = false
    private var charge = true // to charge the defend bar only when it  has finished discharging
    private val amorProtection = 100

    private lateinit var handler: Handler
    private lateinit var incrementRunnable: Runnable

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {

        // Initialize MediaPlayer for background sound
        specialAttackreadyfx = MediaPlayer.create(requireContext(), R.raw.special_attackreadyfx)
        specialAttackreadyfx.setVolume(0.5f, 0.5f) // reducing the volume to eliminate distortion/peaking

        // Inflate the layout for this fragment
        val view = inflater.inflate(R.layout.fragment_life_bar, container, false)
        lifeProgressBar = view.findViewById(R.id.lifeProgressBar)
        lifeProgressBarE = view.findViewById(R.id.lifeProgressBarEnemy)

        textScore = view.findViewById(R.id.textViewScore)
        textInfo = view.findViewById(R.id.textViewInfo)
        hearts = listOf(view.findViewById(R.id.heart0),view.findViewById(R.id.heart1), view.findViewById(R.id.heart2),view.findViewById(R.id.heart3),view.findViewById(R.id.heart4))
        val progressBarSpecial1: ProgressBar = view.findViewById(R.id.progressBarSpecial1)
        val progressBarSpecial2: ProgressBar = view.findViewById(R.id.progressBarSpecial2)

        updateProgressBar(1f)


        // Initialize the Handler and Runnable for the special bar
        handler = Handler()
        incrementRunnable = object : Runnable {
            override fun run() {

                // Increment the progressBarSpecial progress by  2 if it is not full (360)
                if(progressBarSpecial1.progress != 360) {
                    if ( (!isfull) && progressBarSpecial1.progress >= 358  ){ isfull = true} // so that the special attack sound just plays once when it is full
                    progressBarSpecial1.progress += 1
                }

                if(charge) {
                    if (progressBarSpecial2.progress != 360) {
                        if ((!isfull) && progressBarSpecial2.progress >= 358) {
                            isfull = true
                        }
                        progressBarSpecial2.progress += 1 // charges twice faster
                    }
                }

                if (!charge) {
                    if (progressBarSpecial2.progress != 0) {
                        progressBarSpecial2.progress -= 4

                    }
                    else {
                        levelModel.gameStateModel.specialDefendReset(amorProtection)
                        charge = true // so that i can start charging again
                    }

                }

                if( (progressBarSpecial2.progress >= 358 || progressBarSpecial1.progress >= 358 )  && isfull ) { // sound played when bar is full
                    specialAttackreadyfx.start()

                    isfull= false

                }

                // Schedule the next update
                handler.postDelayed(this, 100)
            }
        }
        // Start the timer
        handler.post(incrementRunnable)

        // Progressbar is set to zero when touched and will fill it self automatically in a given time up here

        progressBarSpecial2.setOnClickListener{
            if (progressBarSpecial2.progress ==360) { // deload only if the value is reached
                charge= false // when player clicked, it does not start charging imediatly
               // Toast.makeText(requireContext(), "shield activated", Toast.LENGTH_SHORT).show()
                levelModel.controller.showInfoText("Shield Activated")
                // amorProtection should accessible everywhere
                levelModel.gameStateModel.specialDefend(amorProtection)

                // todo make it increase damage tô the maximum wished, once, twice ? maybe do it with the variable that will comunicate,
                // todo the added power of player damage
            }
        }
        // Progressbar is set to zero when touched and will fill it self automatically in a given time up here
        progressBarSpecial1.setOnClickListener{
            if (progressBarSpecial1.progress ==360) {
                progressBarSpecial1.progress = 0
                //Toast.makeText(requireContext(), "Double punch loaded", Toast.LENGTH_SHORT).show()
                levelModel.controller.showInfoText("Double punch loaded")

                val doubleDamage = 30 // used to actualise in gamestate model
                //EventBus.getDefault().post(SpecialAttackEvent())
                levelModel.gameStateModel.specialAttack(doubleDamage)

                // todo manage this special power can for example take the damage and reduce the power of
                // todo the damages received

            }
        }

        return view
    }

    override fun onStart() {
        super.onStart()
        //EventBus.getDefault().register(this)
    }

    override fun onStop() {
        super.onStop()
        specialAttackreadyfx.release()
        //EventBus.getDefault().unregister(this)
    }

    override fun onDestroyView() {
        super.onDestroyView()

        // Remove the Runnable to prevent memory leaks
        handler.removeCallbacks(incrementRunnable)
    }

    fun setLives(lives : Int) {
        for (i in 0 until hearts.count()) {
            if (i < lives) hearts[i].visibility = View.VISIBLE
            else hearts[i].visibility = View.INVISIBLE
        }
    }

    fun updateProgressBar(health: Float) {
        lifeProgressBar.progress = (lifeProgressBar.max * health).toInt()

    }
    fun updateProgressBarE(enemyHealth : Float) {
        lifeProgressBarE.progress = (lifeProgressBarE.max * enemyHealth).toInt()
        if (lifeProgressBarE.progress <= 0) lifeProgressBarE.visibility = View.INVISIBLE
        else lifeProgressBarE.visibility = View.VISIBLE
    }
}