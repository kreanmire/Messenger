'use strict';

const path = require('path');

class Configuration {

    constructor(node_env, configPath) {

        const env = (node_env) ? node_env : 'local';

        this.defaultConfigPath = path.normalize(`${__dirname}/../config/config.${env}.js`);

        this.configPath = (configPath && configPath.length > 0) ?  path.normalize(configPath) : this.defaultConfigPath;
        this.configuration = require(this.configPath);
        this.configuration.env = env;
    }

    getConfig() {
        return this.configuration;
    }
}

const configure = new Configuration(process.env.NODE_ENV, process.env.CONFIG_PATH);

module.exports = configure.getConfig();

