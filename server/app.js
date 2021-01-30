const express = require('express')
const app = express()
const PORT = process.env.PORT || 5001
const con = require('./database')

//DATABASE
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to MySQL.")
})

//MIDDLEWARES
app.use(express.json())

//ROUTES
app.use('/users', require('./routes/users'))

app.listen(PORT, () => console.log(`Server started at port: ${PORT}`))