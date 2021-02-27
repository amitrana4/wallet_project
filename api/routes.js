'use strict';

const controller = require('./controller');

module.exports = function(app) {
   app.route('/image/:file')
       .get(controller.convertFile);
   app.route('/image')
       .post(controller.saveFile);
};