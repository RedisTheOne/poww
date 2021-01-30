package com.example.poww

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.LinearLayout

class MainActivity : AppCompatActivity() {
    private val LOGIN_ACTIVITY_CODE: Int = 1
    private lateinit var logInLinearLayout: LinearLayout

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        logInLinearLayout = findViewById(R.id.login_in_linear_layout)
        logInLinearLayout.setOnClickListener{
            val intent: Intent = Intent(this, LoginActivity::class.java)
            startActivityForResult(intent, LOGIN_ACTIVITY_CODE)
        }
        supportActionBar?.hide()
    }
}