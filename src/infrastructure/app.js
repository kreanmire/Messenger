'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');
const bodyParser = require('body-parser');
const config = require('./config');
const ResponseHandler = require('./ResponseHandler');
const expressValidator = require('./lib/express_validator').expressValidator;
const logger = require('./logger');
const routers = require('./routers');
const XSSControl = require('./middlewares/XSSControl');

class ApiServer {

    constructor() {
        this.app = express();
        this.server = {};
    }

    async initApp() {

        this.app.use(cors({
            'origin': '*',
            'methods': 'GET,PUT,POST,DELETE',
            'preflightContinue': false
        }));

        this.app.use(morgan('short'));

        this.app.use(compression({
            level: 9
        }));
        this.app.use(XSSControl); //only before body parser!!
        
        this.app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
        
        this.app.use(bodyParser.json({limit: '50mb'}));
        
        this.app.use(expressValidator);
        
        this.app.use(ResponseHandler.handle); // global response handler

        //Connect routers to server
        routers(this.app);

        this.app.set('port', process.env.PORT || config.port);

        return this.app;
    }

    async run() {

        let port = process.env.PORT || config.port;

        await this.initApp();

        this.server = this.app.listen(port);

        if (!this.server.address()) {
            throw new Error(`Cannot run server. Port ${port}`);
        }
        return this.server;
    }

    async shutDown() {

        if (this.server) {
            logger.debug('Close connection to server...');
            await this.server.close();
        }
    }
}

module.exports = new ApiServer();
