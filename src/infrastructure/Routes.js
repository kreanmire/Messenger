'use strict';

const fs = require('fs').promise;
const path = require('path');

const API_ROUTERS_PATH = './routes';

class Routes {

    async loadRoutes (app) {

        let dirApis = await fs.readdir(API_ROUTERS_PATH);

        for (let dirVersion of dirApis){
            connectApi(path.join(API_ROUTERS_PATH, dirVersion), app);
        }

    }

    async connectApi(dirVersion, app){
        if (! (await fs.stat(dirVersion)).isDirectory()){
            return;
        }

        let dirFiles = await fs.readdir(dirVersion);
        for (let fname of dirFiles) {
            if (fname !== 'index.js') {

                let routerPath = path.join(dirVersion, fname);
                let isFile = (await fs.stat(routerPath)).isFile();
                if (isFile) {

                    let router = require(`./${dirVersion}/${fname}`);
                    router(app);
                }
            }
        }
    }

}

module.exports = new Routes();
