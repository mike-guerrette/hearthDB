var express = require('express');

// Constants
var PORT = 8080;

// App
var app = express();

app.set('port', (process.env.PORT || 8080))
app.get('/', function (req, res) {
  res.send('Hello world!!! Woo!');
});

app.listen(app.get('port'), function() {
	console.log('Running on http://localhost:' + app.get('port'));
});

