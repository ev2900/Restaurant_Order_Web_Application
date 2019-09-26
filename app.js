const express = require('express')
const path = require('path');
const app = express()

// 
app.use(express.static(path.join(__dirname, 'views')));

// routes
app.get('/', function (req, res) {
  res.sendfile("views/index.html");
})

app.get('/cart', function (req, res) {
  res.sendfile("views/cart.html");
})

// open on port 80
app.listen(8080)
console.log("application is running ...")