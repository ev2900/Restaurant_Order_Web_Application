const express = require('express')
const app = express()

// View Engine + Url encoding
app.set("views", __dirname + "/views");
app.set('view engine', 'ejs');

// routes
app.get('/', function (req, res) {
  res.render("index.ejs");
})

app.get('/api/test', function (req, res) {
  res.send('{"test":"successful"}')
})

// open on port 80
app.listen(80)
console.log("application is running ...")