'use strict';

var _ = require('lodash'),
    orm = require('orm');

module.exports = function(models) {

    var controller = {};

    controller.getList = function(req, res) {
        var query;
        if (req.query.query) {
            query = "name ~* '" + req.query.query + "'";
        }
        var response = {};

        var limit = parseInt(req.query.limit);
        var page = parseInt(req.query.page);

        models.Card.find().where(query).count(function(err, count) {
            if (err) {
                console.error(err, err.stack);
                res.status(500).json({
                    code: 500,
                    message: 'Failed to get count.',
                    error: err
                })
            } else {
                response.count = count;
                models.Card.find()
                    .limit(limit)
                    .offset((page-1)*limit)
                    .order(req.query.order)
                    .where(query)
                    .run(function(err, cards) {
                        if (err) {
                            console.error(err, err.stack);
                            res.status(500).json({
                                code: 500,
                                message: 'Failed to get cards',
                                error: err
                            })
                        } else if (!cards) {
                            res.status(400).json({
                                code: 400,
                                message: 'No cards found'
                            })
                        } else {
                            //TODO: filter in query
                            response.cards = _.map(cards, function(card) {
                                return _.pick(card, req.query.fields);
                            });
                            res.status(200).json({
                                code: 200,
                                message: "Successfully retrieved cards",
                                data: response
                            })
                        }
                    });
            }
        });
    };

    controller.getCard = function(req, res) {
        var id = req.params.id;
        models.Card.get(id, function(err, card) {
            if (err) {
                console.error(err, err.stack);
                res.status(500).json({
                    code: 500,
                    message: 'Failed to get card',
                    error: err
                })
            } else if (!card) {
                res.status(400).json({
                    code: 400,
                    message: 'No card found'
                })
            } else {
                res.status(200).json({
                    code: 200,
                    message: "Successfully retrieved card",
                    data: card
                })
            }
        });
    };

    return controller;
};