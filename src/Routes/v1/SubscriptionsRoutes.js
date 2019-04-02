'use strict';

const WebHookController = require('../../App/Controllers/WebHookController');
const UtilMiddleware = require('../../App/Middlewares/UtilMiddleware');

module.exports = (app) => {

    app.route('/v1/subscriptions')
        .post(WebHookController.create)
        .get(UtilMiddleware.checkPagination, MessageController.list);

    app.route('/v1/subscriptions/:id')
        .delete(UtilMiddleware.checkParamId, WebHookController.remove)
        .get(UtilMiddleware.checkParamId, MessageController.get);

};
