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
    lists: {
        DEFAULT_SEARCH:     '',
        DEFAULT_LIMIT:      20,
        DEFAULT_OFFSET:     0,
    },
    dateFormat: 'YYYY/MM/DD',
};
