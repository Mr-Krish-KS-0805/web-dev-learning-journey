const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    let siteName = "Adidas"
    let searchText = "Search now"
    let arr = ["Hey",54,76]
  res.render("index", {siteName: siteName, searchText: searchText, arr})
})

app.get('/blog/:slug', (req, res) => {
    let blogTitle = "Adidas is good" 
    let blogcontent = "its good  now"
  res.render("views/blogpost.html", {blogTitle: blogTitle, blogcontent: blogcontent})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})