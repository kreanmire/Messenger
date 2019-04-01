'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');
const bodyParser = require('body-parser');
const config = require('./Config');
const ResponseHandler = require('./ResponseHandler');
const expressValidator = require('./ExpressValidator').expressValidator;
const logger = require('./Logger');
const Routes = require('./Routes');
const XSSControl = require('./XSSControl');

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
        
        this.app.use(ResponseHandler.use); // global response handler

        //Connect routes to server
        await Routes.loadRoutes(this.app);

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
