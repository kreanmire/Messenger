'use strict';

const rp = require('request-promise');
const events = require('events');
const events = {
    addedMessage: 'addedMessage',
    
};


class WebHooks {

    constructor (url) {

        this.emitter = new events.EventEmitter();

        this.hookUrl = url;
        this.requestType = 'GET';
    }

    async send (data) {

        const options = {
            uri: new URL(this.hookUrl).href,
            method: this.requestType,
            body: data,
            json: true // Automatically parses the JSON string in the response
        };

        const result = await rp(options);

        return result;
    }

}

module.exports = Hook;
