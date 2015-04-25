'use strict';

module.exports = function() {
	var express = require('express'),
		path = require('path');

	// App
	var app = express();

	app.set('port', (process.env.PORT || 8080));

	app.set('view engine', 'jade');

	app.set(express.static('public'));

	app.set('views', path.join(__dirname, 'views'));

	app.get('/', function (req, res) {
	  res.render('index');
	});

	app.listen(app.get('port'), function() {
		console.log('Running on http://localhost:' + app.get('port'));
	});

	return app;
};

