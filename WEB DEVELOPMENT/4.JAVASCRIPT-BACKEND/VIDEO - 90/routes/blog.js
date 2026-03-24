const express = require('express')
const router = express.Router()
const fs = require("fs")

// Middleware that is specific to this router
router.use((req, res, next) => {
    fs.appendFileSync("Krish.txt", `${new Date(Date.now())} is a ${req.method}\n`)
    console.log('Day and Time: ', new Date().toString())
    next()
})


// define the home page route
router.get('/', (req, res) => {
    res.send('Birds home page')
})

// define the about route
router.get('/about', (req, res) => {
    res.send('About birds')
})

module.exports = router