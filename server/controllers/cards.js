'use strict';

module.exports = function(models) {

    var controller = {};

    controller.getList = function(req, res) {
        models.Card.find({}, function(err, cards) {
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
                res.status(200).json({
                    code: 200,
                    message: "Successfully retrieved cards",
                    data: cards
                })
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