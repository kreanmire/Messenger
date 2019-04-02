'use strict';

const MessageController = require('../../App/Controllers/MessageController');
const MiddlewareCheck = require('../../Infrastructure/MiddlewareCheck');

module.exports = (app) => {

    app.route('/v1/messages')
        .post(MessageController.create)
        .get(MiddlewareCheck.checkQueryPagin, MessageController.list);

};
