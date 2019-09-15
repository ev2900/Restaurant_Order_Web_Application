const express = require('express')
const app = express()

// routes
app.get('/', function (req, res) {
  res.sendfile("views/index.html");
})

app.get('/api/test', function (req, res) {
  res.send('{"test":"successful"}')
})

// open on port 80
app.listen(8080)
console.log("application is running ...")