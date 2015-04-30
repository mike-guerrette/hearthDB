'use strict';

var config = require('../../config'),
    models = require('../').init(config);

models.Card.create([
    {
        name: 'Test Card One',
        cost: 4
    },
    {
        name: 'Test Card Two',
        cost: 4
    }
], function(err, cards) {
    if (err) {
        console.error('Failed to add cards.');
        console.error(err, err.stack);
    } else {
        console.log('Added cards: ', cards);
    }
});