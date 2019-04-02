'use strict';

const BotMessage = require('../Models/BotMessage');
const logger = require('../../Infrastructure/Logger');

class BotMessageService{

    async sendMessage(message) {

        const result = await BotMessage.create(message);

        logger.info(`Bot method sendMessage`, message);

        return result;
    }

}

module.exports = new BotMessageService();
