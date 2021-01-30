const express = require('express')
const router = express.Router()
const con = require('../database')
const jwt = require('jsonwebtoken')
const jwtKey = require('../config').jwtKey

//GET USER INFORMATION
router.get('/', (req, res) => {
    if(req.headers['authorization']) {
        const token = req.headers['authorization'].split("Bearer ")[1]
        jwt.verify(token, jwtKey, async (err, decoded) => {
            if(err)
                res.json({
                    status: false,
                    msg: 'Token is not valid'
                })
            else {
                res.json({
                    status: true,
                    user: decoded.user
                })
            }
        })
    }
})

//LOGIN
router.post('/login', (req, res) => {
    if(req.body.username && req.body.password) {
        con.query(`SELECT * FROM Users WHERE username = '${req.body.username}' AND password = '${req.body.password}';`, (err, result, fields) => {
            if(result.length > 0) {
                jwt.sign({user: result[0]}, jwtKey, {expiresIn: '30d'}, (err, token) => {
                    res.json({
                        status: true,
                        msg: 'Logged in successfully',
                        jwt: token
                    })
                })
            }
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
                    con.query(`SELECT * FROM Users WHERE username = '${req.body.username}' AND password = '${req.body.password}'`, (err, result, fields) => {
                        jwt.sign({user: result[0]}, jwtKey, {expiresIn: '30d'}, (err, token) => {
                            res.json({
                                status: true,
                                msg: 'User created successfully',
                                jwt: token
                            })
                        })
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