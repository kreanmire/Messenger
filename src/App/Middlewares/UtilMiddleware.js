'use strict';

const MiddlewareCheck = require('../../Infrastructure/MiddlewareCheck');

class UtilMiddleware extends MiddlewareCheck {

    checkPagination(req, res, next) {

        super.checkQueryPagin(req);
        super.validateErrors(req, res, next);
    }

    checkParamId(req, res, next) {

        req.checkParams('id', 'Parameter id must be string').isString();
        req.checkParams('id', 'Parameter id must be not empty').notEmpty();

        super.validateErrors(req, res, next);
    }

}

module.exports = new UtilMiddleware();
