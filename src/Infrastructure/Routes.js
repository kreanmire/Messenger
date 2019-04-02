'use strict';

const bluebird = require('bluebird');
const fs = bluebird.promisifyAll(require('fs'));
const path = require('path');

const API_ROUTERS_PATH = path.join(__dirname, '../Routes');

class Routes {

    async loadRoutes (app) {

        let dirApis = await fs.readdirAsync(API_ROUTERS_PATH);

        for (let dirVersion of dirApis){
            await this.connectApi(path.join(API_ROUTERS_PATH, dirVersion), app);
        }

    }

    async connectApi(dirVersion, app){
        if (! (await fs.statAsync(dirVersion)).isDirectory()){
            return;
        }

        let dirFiles = await fs.readdirAsync(dirVersion);
        for (let fname of dirFiles) {
            if (fname !== 'index.js') {

                let routerPath = path.join(dirVersion, fname);
                let isFile = (await fs.statAsync(routerPath)).isFile();
                if (isFile) {

                    let router = require(`${dirVersion}/${fname}`);
                    router(app);
                }
            }
        }
    }

}

module.exports = new Routes();
