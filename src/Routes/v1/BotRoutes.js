'use strict';

const BotController = require('../../App/Controllers/BotController');
const BotMiddleware = require('../../App/Middlewares/BotMiddleware');

module.exports = (app) => {

    app.route('/bot:token/sendMessage')
        .post(BotMiddleware.checkToken, BotController.sendMessage)
        .get(BotMiddleware.checkToken, BotController.sendMessage);

};
