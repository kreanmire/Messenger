'use strict';

const codes = require('./ResponseCodes');
const { DEFAULT_LIMIT, DEFAULT_OFFSET } = require('./Config').lists;

class MiddlewareCheck {

    async validateErrors(req, res, next, additionVerification) {

        const result = await req.getValidationResult();

        if (!result.isEmpty()) {
            return res.errorResponse(codes.INVALID_INPUT_DATA, result.array());
        } else {

            if (additionVerification) {
                additionVerification(req, res, next);
            } else {
                next();
            }
        }
    }

    async checkQueryPagin(req) {

        if (req.query.limit) {
            req.checkQuery('limit', 'Parameter limit must be valid positive Integer or  0').isPositiveIntOrNil();

            req.query.limit = Number(req.query.limit);

        } else {
            req.query.limit = DEFAULT_LIMIT;
        }

        if (req.query.offset) {
            req.checkQuery('offset', 'Parameter offset must be valid positive Integer or  0').isPositiveIntOrNil();

            req.query.offset = Number(req.query.offset);

        } else {
            req.query.offset = DEFAULT_OFFSET;
        }

    }
}

module.exports = MiddlewareCheck;
