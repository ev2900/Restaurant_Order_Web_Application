const express = require('express')
const app = express()
 
app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/api/test', function (req, res) {
  res.send('{"test":"successful"}')
})
 
app.listen(80)
console.log("application is running ...")