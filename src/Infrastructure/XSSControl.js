'use strict';

const _ = require('underscore');
const xss = require('xss');

/**
 * Фильтрация введенных данных
 * @param req
 * @param res
 * @param next
 */
function XSSControl (req, res, next) {

    req.body = FilterChannel(req.body);
    req.params = FilterChannel(req.params);

    next();
}

function FilterChannel(channel) {
    let keys = _.keys(channel);

    _.each(keys, key => {
        channel[key] = xss(channel[key], {
            whiteList: [], // empty, means filter out all tags
            stripIgnoreTag: true, // filter out all HTML not in the whilelist
            stripIgnoreTagBody: ["script"],
        });
    });

    return channel;
}

module.exports = XSSControl;
