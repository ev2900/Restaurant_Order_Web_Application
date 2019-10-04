var express = require('express')
var path = require('path');
var app = express()
var braintree = require('braintree');
var bodyParser = require('body-parser');

//
var parseUrlEnconded = bodyParser.urlencoded({
  extended: false
});

// brain tree
var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: '',
  publicKey: '',
  privateKey: ''
});


// serve static file
app.use(express.static(path.join(__dirname, 'views')));

// ejs set up
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/payment', function (request, response) {

  gateway.clientToken.generate({}, function (err, res) {
    response.render('payment', {
      clientToken: res.clientToken
    });
  });

});

app.post('/process', parseUrlEnconded, function (request, response) {

  var transaction = request.body;

  gateway.transaction.sale({
    amount: transaction.amount,
    paymentMethodNonce: transaction.payment_method_nonce
  }, function (err, result) {

    if (err) throw err;

    if (result.success) {

      console.log(result);

      response.sendFile('receipt.html', {
        root: './views'
      });
    } else {
      response.sendFile('error.html', {
        root: './public'
      });
    }
  });

});

// routes
app.get('/', function (req, res) {
  res.sendFile("views/index.html");
})

// open on port
app.listen(80,function(){
console.log("application is running ...")
})
