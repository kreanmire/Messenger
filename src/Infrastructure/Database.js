'use strict';

const logger = require('./Logger');
const config = require('./Config');
// const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');

const dbConfig = config.database.mongodb;

class Database {

    async getConnection() {

        // Connection URL
        const url = `mongodb://${dbConfig.username}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.dbname}`;

        await new Promise((resolve, reject) => {

            mongoose.set('useFindAndModify', false);
            mongoose.set('useCreateIndex', true);
            mongoose.set('useNewUrlParser', true);

            mongoose.connect(url, { useNewUrlParser: true });
            mongoose.connection.on('error', e => reject);
            mongoose.connection.on('connected', () => {

                logger.info('Database connected!');

                resolve();

            });
        });

        return this.connection;
    }

    async CloseConnect () {

    }

}

module.exports = new Database();
