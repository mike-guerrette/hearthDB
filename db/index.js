'use strict';

var orm = require('orm'),
    deasync = require('deasync');

var models;

module.exports.init = function(config) {
    if (models) {
        return models;
    }
    models = {};

    var pgOptions = {
        database: config.PG_DB,
        protocol: 'postgres',
        host: config.PG_HOST,
        port: config.PG_PORT,
        user: config.PG_USER,
        password: config.PG_PASS,
        query: {
            pool: true
        }
    };

    orm.connect(pgOptions, function(err, db) {
        if (err) {
            console.error('Failed to connect to Postgres DB');
            console.error(err, err.stack);
            return;
        }

        models.Card = db.define("cards", {
            name: String,
            cost: Number
        });

        db.sync(function(err) {
            if (err)  {
                console.error('Failed to sync db.', err);
            }
        })

    });

    while(!models.Card) {
        deasync.runLoopOnce();
    }

    return models;
};