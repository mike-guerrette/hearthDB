'use strict';

module.exports = function(config, app, models) {
    var controllers = {
        cards: require('./controllers/cards')(models)
    };
    
    app.get('/api/cards', controllers.cards.getList);

    app.get('/api/cards/:id', controllers.cards.getCard);

    app.get('*', function (req, res) {
        res.render('index');
    });

};