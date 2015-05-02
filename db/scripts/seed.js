'use strict';

var config = require('../../config'),
    async = require('async'),
    models = require('../').init(config),
    sets = require('./all_sets.json');

async.each(Object.keys(sets), function(set, cb) {
    async.each(sets[set], function(card, callback) {
        card.game_id = card.id;
        delete card.id;
        console.log('Adding: ' + JSON.stringify(card));
        if (!card.collectible) {
            callback()
        } else {
            models.Card.create(card, function(err) {
                if (err) {
                    console.error('Failed to add: ', card.name);
                    console.error(err, err.stack);
                    process.exit(1);
                } else {
                    console.log("Added: ", card.name);
                    callback();
                }
            });
        }
    }, function(err) {
        if (err) {
            console.error('Failed to process set: ' + set);
            process.exit(1);
        } else {
            console.log('Finished adding: ' + set);
            cb();
        }
    });

}, function(err) {
    if (err) {
        console.error('Failed to process sets');
        process.exit(1);
    } else {
        console.log('Done!!');
        process.exit(0);
    }
});
