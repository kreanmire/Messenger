'use strict';

const _ = require('underscore');
const winston = require('winston');
const config = require('./config');
const path = require('path');

class Logger {

    constructor() {
        this.wlogger = this.initWLogger();
    }

    initWLogger() {

        let wlogger = new (winston.Logger)({ exitOnError: false });
        let label = `${process.pid} ${path.relative('..', require.main.filename)}`;
        if (config.loggers && config.loggers.length > 0) {
            _.each(config.loggers, (logger) => {
                let options = _.extend(logger.options, { label: label });
                wlogger.add(winston.transports[ logger.transport ], options);
            });
        }
        wlogger.log('info', 'Success init logger');

        return wlogger;
    }

    debug(msg, meta) {

        if (meta) {
            this.wlogger.log('debug', msg, meta);
        } else {
            this.wlogger.log('debug', msg);
        }
    }

    info(msg, meta) {

        if (meta) {
            this.wlogger.log('info', msg, meta);
        } else {
            this.wlogger.log('info', msg);
        }
    }

    error(msg, meta) {

        if (meta) {
            this.wlogger.log('error', msg, meta);
        } else {
            this.wlogger.log('error', msg);
        }
    }
}

module.exports = new Logger();
