'use strict';

const BotMessageService = require('../Services/BotMessageService');
const BotMessageDTO = require('../DTO/BotMessageDTO');

class BotController {

    async sendMessage(req, res) {

        try {

            let rawBotMessage = new BotMessageDTO(req.query);

            const result = await BotMessageService.sendMessage(rawBotMessage);

            const botMessageDTO = new BotMessageDTO(result);

            return res.successResponse(botMessageDTO);
        }
        catch (e) {
            return res.errorResponse(e);
        }

    }
}

module.exports = new BotController();
