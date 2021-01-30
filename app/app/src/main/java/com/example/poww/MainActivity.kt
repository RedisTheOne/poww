package com.example.poww

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.LinearLayout

class MainActivity : AppCompatActivity() {
    private lateinit var logInLinearLayout: LinearLayout
    private lateinit var signUpLinearLayout: LinearLayout

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        logInLinearLayout = findViewById(R.id.login_in_linear_layout)
        signUpLinearLayout = findViewById(R.id.signup_linear_layout)

        logInLinearLayout.setOnClickListener{
            val intent: Intent = Intent(this, LoginActivity::class.java)
            startActivity(intent)
        }

        signUpLinearLayout.setOnClickListener{
            val intent: Intent = Intent(this, SignUpActivity::class.java)
            startActivity(intent)
        }

        supportActionBar?.hide()
    }
}