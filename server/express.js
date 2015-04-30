'use strict';

module.exports = function(config) {
	var express = require('express'),
		path = require('path'),
		assets = require('../client/assets.json'),
		routes = require('./routes');

	// App
	var app = express(),
		models = require('../db').init(config);

	app.set('port', (process.env.PORT || 8080));

	app.set('view engine', 'jade');

	app.set('views', path.join(__dirname, 'views'));

	app.use(express.static(path.resolve(__dirname, '../client')));

	app.locals.title = config.TITLE;
	app.locals.baseHref = config.BASE_HREF;
	app.locals.js = assets.js;
	app.locals.css = assets.css;

	routes(config, app, models);

	app.listen(app.get('port'), function() {
		console.log('Running on http://localhost:' + app.get('port'));
	});

	return app;
};
