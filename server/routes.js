'use strict';

module.exports = function(config, app, models) {
    var controllers = {
        cards: require('./controllers/cards')(models)
    };

    app.get('/card/:id', controllers.cards.getCard);

    app.get('*', function (req, res) {
        res.render('index');
    });

};