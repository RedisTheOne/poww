const mysql = require('mysql')

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "toor",
    database: "FirstDB"
})

module.exports = con