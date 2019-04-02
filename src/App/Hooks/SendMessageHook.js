'use strict';

const Hook = require('./Hook');
const config = require('../../Infrastructure/Config');
const logger = require('../../Infrastructure/Logger');
const hookUrl = `${config.botApi.adress}/bot${config.botApi.token}/sendMessage`;
const BotMessageDTO = require('../../App/DTO/BotMessageDTO');

class SendMessageHook extends Hook {

    constructor() {
        super(hookUrl);
    }

    notify (message) {

        this.sendNotifyMessage(message);

    }

    async sendNotifyMessage(message) {

        let result = {};

        try{

            this.requestType = 'POST';

            const botMessage = new BotMessageDTO(message);

            result = await this.send(botMessage)
        }
        catch (e) {
            logger.error(
                `Send message hook Error. Message with id ${message._id} not send`, e
            )
        }

        return result;
    }

}

module.exports = new SendMessageHook();
