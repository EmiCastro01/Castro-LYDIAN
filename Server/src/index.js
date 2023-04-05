const express = require('express')
const path = require('path')
const app = express()
const PORT = 3000

app.use(express.static(__dirname + '/public'));
app.listen(PORT, () => {console.log('listening on port 3000')})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/home.html'))
})
app.get('/detail-product', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/detail-product.html'))
})
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/login.html'))
})
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/register.html'))
})
app.get('/cart', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/cart.html'))
})