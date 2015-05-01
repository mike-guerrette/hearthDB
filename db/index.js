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

    orm.connect(process.env.DATABASE_URL || pgOptions, function(err, db) {
        if (err) {
            console.error('Failed to connect to Postgres DB');
            console.error(err, err.stack);
            return;
        }

        models.Card = db.define('cards',    {
            id: {type: 'serial', key: true},
            game_id: {type: "text"},
            name: {type: "text"},
            type: {type: "text"},
            faction: {type: "text"},
            rarity: {type: "text"},
            cost: {type: "integer"},
            attack: {type: "integer"},
            health: {type: "integer"},
            text: {type: "text"},
            flavor: {type: "text"},
            artist: {type: "text"},
            collectible: {type: "boolean"},
            howToGetGold: {type: "text"},
            mechanics: {type: "object"}
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