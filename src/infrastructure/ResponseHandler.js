'use strict';

const moment = require('moment');
const codes = require('./response_codes');
const logger = require('./logger');
const _ = require('underscore');

const DEFAULT_ERROR_CODE = codes.SERVER_ERROR;

class ResponseHandler {

    sendResponse (message, errorCode, data) {

        let response = {
            date: moment().unix(),
            code: errorCode,
            message: message,
            response: data || {}
        };

        this.json(response);
    };

    successResponse (data) {

        return this.sendResponse(codes.SUCCESS_RESPONSE.MESSAGE, codes.SUCCESS_RESPONSE.CODE,
            data || {});
    };

    errorResponse (error, data) {

        let result = DEFAULT_ERROR_CODE;

        if (error instanceof Error){
            result = error;
        } else if (typeof (error) === 'object'){
            result = error;
        }

        if (!result.CODE && !result.code){
            result.CODE = DEFAULT_ERROR_CODE.CODE;
        }

        if (!result.MESSAGE && !result.message){
            result.MESSAGE = DEFAULT_ERROR_CODE.MESSAGE;
        }

        if (error.data && !data){
            data = error.data;
        }
        else if (error.data && data) {
            data = _.assign(error.data, data);
        }

        if (typeof (data) !== 'object'){
            data = {
                message: data
            };
        }

        logger.error(result);

        return this.sendResponse(result.MESSAGE || result.message, result.CODE || result.code, data);
    };

    handle (err, req, res, next) {

        if (err) {
            this.errorResponse(err);
        }
        else {
            const data = next();
            this.successResponse(data);
        };

    }

}

module.exports = new ResponseHandler();
