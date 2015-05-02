'use strict';

var config = require('../../config'),
    async = require('async'),
    models = require('../').init(config);

var $results = {};

end(null, Object.keys(models.Card.properties));

function end(err, results) {
    if (err) {
        console.error('Failed to process sets');
        process.exit(1);
    } else {
        console.log('Results: ', results);
        console.log('Done!!');
        process.exit(0);
    }
}
