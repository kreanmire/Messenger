'use strict';

const MiddlewareCheck = require('../../Infrastructure/MiddlewareCheck');

class ListMiddleware extends MiddlewareCheck {

    checkPagination(req, res, next) {

        super.checkQueryPagin(req);
        super.validateErrors(req, res, next);
    }

}

module.exports = new ListMiddleware();
