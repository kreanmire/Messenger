'use strict';

const App = require('./infrastructure/App');
const logger = require('./infrastructure/Logger');

class Server {

    async run () {

        try {
            const app =  await App.run();

            logger.info(`Listening server on port ${app.address().port}`);
        }
        catch (e) {
            logger.error(e);
            process.exit(1);
        }

    }

    async cleanExit () {

        try {
            await App.shutDown();

            logger.info('Api server shutdown complete. Exiting');
            process.exit(0);
        }
        catch (e) {
            logger.error(e);
            process.exit(1);
        }

    }

}

const server = new Server();

server.run()
    .catch( e => {
        logger.error(e);
        process.exit(1);
    });


process
    .on('SIGTERM', async () => {
        logger.info('SIGTERM received, shutting down API server');
        await server.cleanExit();
    })
    .on('SIGINT', async () => {
        logger.info('SIGINT received, shutting down API server');
        await server.cleanExit();
    })
    .on('SIGTSTP', async () => {
        logger.info('SIGTSTP received, shutting down API server');
        await  server.cleanExit();
    });
