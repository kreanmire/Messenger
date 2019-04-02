'use strict';

const MiddlewareCheck = require('../../Infrastructure/MiddlewareCheck');
const config = require('../../Infrastructure/Config');
const token = config.bot.token;

class BotMiddleware extends MiddlewareCheck {

    checkToken(req, res, next) {
        req.checkParams('token', 'id can\'t be empty').notEmpty();
        req.checkParams('token', 'invalid token').equals(token);

        super.validateErrors(req, res, next);
    }

}

module.exports = new BotMiddleware();
