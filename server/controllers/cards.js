'use strict';

module.exports = function(models) {

    var controller = {};

    controller.getCard = function(req, res) {
        var id = req.params.id;
        models.Card.get(id, function(err, card) {
            if (err) {
                console.error(err, err.stack);
                res.json(500, {
                    code: 500,
                    message: 'Failed to get card',
                    error: err
                })
            } else if (!card) {
                res.json(400, {
                    code: 400,
                    message: 'No card found'
                })
            } else {
                res.json(200, {
                    code: 200,
                    message: "Successfully retrieved card",
                    data: card
                })
            }
        });
    };

    return controller;
};