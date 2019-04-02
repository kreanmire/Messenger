'use strict';

const MessageController = require('../../App/Controllers/MessageController');
const UtilMiddleware = require('../../App/Middlewares/UtilMiddleware');

module.exports = (app) => {

    app.route('/v1/messages')
        .post(MessageController.create)
        .get(UtilMiddleware.checkPagination, MessageController.list);

};
