'use strict';

const controller = require('./controller');

module.exports = function(app) {
    app.route('/setup')
       .post(controller.setup);
    app.route('/transact/:id')
        .post(controller.transact);
    app.route('/transaction')
        .get(controller.transactions);
    app.route('/wallet/:id')
        .get(controller.wallet);
};