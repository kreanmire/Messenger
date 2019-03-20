'use strict';

const PATH_TO_CONFIG = `${__dirname}/config`;

class Configuration {

    constructor(node_env, path) {

        const env = (node_env) ? node_env : 'local';
        this.defaultConfigPath = `${PATH_TO_CONFIG}/config.${env}.js`;
        this.configPath = (path && path.length > 0) ? path : this.defaultConfigPath;
        this.configuration = require(this.configPath);
        this.configuration.env = env;
        this.configuration.initData = require('./config/init_data');
        this.configuration.googleSheetParserConfig = require('./config/googleSheetsParserConfig');
    }

    getConfig() {

        return this.configuration;
    }
}

let configure = new Configuration(process.env.NODE_ENV, process.env.CONFIG_PATH);

module.exports = configure.getConfig();

