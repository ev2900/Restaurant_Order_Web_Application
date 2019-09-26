const express = require('express')
const path = require('path');
const app = express()

// serve static file
app.use(express.static(path.join(__dirname, 'views')));

// routes
app.get('/', function (req, res) {
  res.sendfile("views/index.html");
})

// open on port
app.listen(80)
console.log("application is running ...")