'use strict';

const PORT = 8092;

module.exports = {
    port: PORT,
    requestBody: {
        maxCountSymbolsInString: 50
    },
    security: {
        xAuthToken: 'Vp7DHRlgdxVs6jX727HureNN73ZmK1Ph',
        recoveryPasswordSecret: 'hNJcEmSScytAWRXIRIfR3YrPFCmzP0jw',
    },
    loggers: [
        {
            transport: 'Console',
            options: {
                level: 'debug',
                prettyPrint: false,
                showLevel: true,
                colorize: true,
                json: false,
                handleExceptions: true,
                humanReadableUnhandledException: true
            }
        }
    ],
    database: {
        mongodb: {
            host:           'localhost',
            port:           7172,
            dbname:         'messenger',
            password:       '88888888',
            username:       'mongouser'
        }
    },
    lists: {
        DEFAULT_SEARCH:     '',
        DEFAULT_LIMIT:      10,
        DEFAULT_OFFSET:     0,
    },
    dateFormat: 'YYYY/MM/DD',
};
