const express = require('express')
const blog = require('./routes/blog')
const shop = require('./routes/shop')


const app = express()
const port = 3000

app.use(express.static("public"))
app.use('/blog', blog)
app.use('/shop', shop)


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/', (req, res) => {
    console.log("hey its a post requset")
    res.send('Hello World! post')
})

app.put('/', (req, res) => {
    console.log("hey its a put requset")
    res.send('Hello World! put')
})

app.get('/index', (req, res) => {
    console.log("hey its index")
    res.sendFile('template/index.html', { root: __dirname })
})

app.get('/api', (req, res) => {
  res.json({a: 1, b: 2, c: 3, name: ["Krish", "harry"]})
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
