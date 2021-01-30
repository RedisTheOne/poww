const express = require('express')
const router = express.Router()
const con = require('../database')

//LOGIN
router.post('/login', (req, res) => {
    if(req.body.username && req.body.password) {
        con.query(`SELECT * FROM Users WHERE username = '${req.body.username}' AND password = '${req.body.password}';`, (err, result, fields) => {
            if(result.length > 0) 
                res.json({
                    status: true,
                    msg: 'Logged in successfully'
                })
            else 
                res.json({
                    status: false,
                    msg: 'User is not valid'
                })
        })
    } else
        res.json({
            status: false,
            msg: 'Please fill required fields'
        })
})

//SIGNUP
router.post('/signup', (req, res) => {
    if(req.body.username && req.body.password && req.body.email) {
        con.query(`SELECT * FROM Users WHERE username = '${req.body.username}'`, (err, result, fields) => {
            if(result.length > 0)
                res.json({
                    status: false,
                    msg: 'Username already exists'
                })
            else {
                const sql = `INSERT INTO Users(username, email, password) 
                VALUES('${req.body.username}', '${req.body.email}', '${req.body.password}')`
                con.query(sql, (err, result) => {
                    res.json({
                        status: true,
                        msg: 'User created successfully'
                    })
                })
            }
        })
    } else
        res.json({
            status: false,
            msg: 'Please fill required fields'
        })
})

module.exports = router