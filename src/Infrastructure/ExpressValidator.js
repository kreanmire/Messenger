'use strict';

const expressValidator = require('express-validator');
const EmailValidator = require('email-validator');
const config = require('./Config');
const _ = require('underscore');

const COUNT_CHARACTERS_IN_STRING = config.requestBody.maxCountSymbolsInString;

class ValidatorService {

    static isEmail(value) {
        return EmailValidator.validate(value);
    }

    static notBigString(value) {
        return (value) ? value.length < COUNT_CHARACTERS_IN_STRING : true;
    }

    static isString(value) {
        return (value) ? typeof (value) === 'string' : false;
    }

    static isPassword(value) {
        return (value) ? /^[a-zA-Z0-9]{6,40}$/.test(value) : false;
    }

    static isPositiveInt(value) {
        return (value) ? value && parseInt(value) == value && parseInt(value) > 0 : false;
    }

    static isPositiveIntOrNil(value) {
        return (value) ? value && !Number.isNaN(parseInt(value)) && parseInt(value) >= 0 : false;
    }

    static isObject(value) {
        if (!value) return false;
        return _.isObject(value);
    }

    static isArrayOfId(value) {
        if (!value) return false;
        if (!_.isArray(value)) return false;

        for (let id of value) {
            if (parseInt(id) != id) {
                return false;
            }
        }
        return true;
    }

    static isArray(value) {
        if (!value) return false;
        return _.isArray(value);
    }

    static isMinutes(value) {
        return (value || value === 0) && parseInt(value) == value && value >= 0 && value < 60;
    }

    static isDate(value) {
        return (value && /[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])/.test(value));
    }

    static isBase64OrUrl(value) {
        if (!value) {
            return false;
        }

        // eslint-disable-next-line
        let base = value.replace(/^.*base64,/g, '');

        let shortForFourth = base.length && base.length % 4 == 0;

        // eslint-disable-next-line
        let isBase64 = /[A-Z0-9+\/=]/i.test(base);

        let result = (shortForFourth && isBase64 || ValidatorService.isUrl(value));
        return result;
    }

    static isUrl(value) {
        if (!value) return false;
        // eslint-disable-next-line
        return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(value);
    }


    static isDecision(value) {
        return (value) ? constants.allApprovalDecisions.indexOf(value) !== -1 : false;
    }

    static isSortFields(value) {
        return (value) ? constants.sortingFields.indexOf(value) !== -1 : false;
    }

    static isSortType(value) {
        return (value) ? constants.sortingTypes.indexOf(value) !== -1 : false;
    }
}

exports.Validator = ValidatorService;
exports.expressValidator = expressValidator({
    customValidators: {
        isEmail: ValidatorService.isEmail,
        notBigString: ValidatorService.notBigString,
        isString: ValidatorService.isString,
        isPassword: ValidatorService.isPassword,
        isPositiveInt: ValidatorService.isPositiveInt,
        isPositiveIntOrNil: ValidatorService.isPositiveIntOrNil,
        isArrayOfId: ValidatorService.isArrayOfId,
        isArray: ValidatorService.isArray,
        isObject: ValidatorService.isObject,
        isMinutes: ValidatorService.isMinutes,
        isDate: ValidatorService.isDate,
        isBase64OrUrl: ValidatorService.isBase64OrUrl,
        isDecision: ValidatorService.isDecision,
        isSortFields: ValidatorService.isSortFields,
        isSortType: ValidatorService.isSortType
    }
});
