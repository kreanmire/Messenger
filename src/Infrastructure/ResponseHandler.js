'use strict';

const moment = require('moment');
const codes = require('./ResponseCodes');
const logger = require('./Logger');
const _ = require('underscore');

const DEFAULT_ERROR_CODE = codes.SERVER_ERROR;

class ResponseHandler {

    use(req, res, next) {

        ResponseHandler.connect(res);
        next();
    }

    static connect(res) {

        res.successResponse = function (data) {

            this.sendResponse(codes.SUCCESS_RESPONSE.MESSAGE, codes.SUCCESS_RESPONSE.CODE,
                data || {});
        };

        res.errorResponse = function (error, data) {

            let result = DEFAULT_ERROR_CODE;

            if (error instanceof Error) {
                result = error;
            } else if (typeof (error) === 'object') {
                result = error;
            }

            if (!result.CODE && !result.code) {
                result.CODE = DEFAULT_ERROR_CODE.CODE;
            }

            if (!result.MESSAGE && !result.message) {
                result.MESSAGE = DEFAULT_ERROR_CODE.MESSAGE;
            }

            if (error.data && !data) {
                data = error.data;
            } else if (error.data && data) {
                data = _.assign(error.data, data);
            }

            if (typeof (data) !== 'object') {
                data = {
                    message: data
                };
            }

            logger.error(result);
            this.sendResponse(result.MESSAGE || result.message, result.CODE || result.code, data);
        };

        res.sendResponse = function (message, errorCode, data) {

            let response = {
                date: moment().unix(),
                code: errorCode,
                message: message,
                response: data || {}
            };

            this.json(response);
        };

    }

}

module.exports = new ResponseHandler();
