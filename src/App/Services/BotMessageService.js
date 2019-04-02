'use strict';

const BotMessage = require('../Models/BotMessage');

class BotMessageService{

    async sendMessage(message) {

        const result = await BotMessage.create(message);

        return result;
    }

}

module.exports = new BotMessageService();
