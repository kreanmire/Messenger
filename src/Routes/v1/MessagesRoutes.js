'use strict';

const MessageController = require('../../App/Controllers/MessageController');
const ListMiddleware = require('../../App/Middlewares/ListMiddleware');

module.exports = (app) => {

    app.route('/v1/messages')
        .post(MessageController.create)
        .get(ListMiddleware.checkPagination, MessageController.list);

};
