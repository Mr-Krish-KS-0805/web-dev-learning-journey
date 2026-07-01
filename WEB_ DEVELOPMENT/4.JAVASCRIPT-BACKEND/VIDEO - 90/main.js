const express = require('express')
const app = express()
const port = 3000
const blog = require('./routes/blog')
const fs = require("fs")


app.use("/blog", blog)

//middleware 1 - logger for our application
app.use((req, res, next) => {
    console.log(req.headers)
    req.Krish = "I am Krish Kumar Shrivastav"
    fs.appendFileSync("Krish.txt", `${new Date(Date.now())} is a ${req.method}\n`)
    console.log(`${Date.now()} is a ${req.method}`)
    // res.send("Hacked by middleware 1 ")
    next()
})

// middleware 2
app.use((req, res, next) => {
    console.log('m2')
    req.Krish = "I am Shrivastav"
    next()
})


app.get('/', (req, res) => {

    res.send('Hello World!' + req.Krish)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${ port }`)
})
