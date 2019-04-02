'use strict';

const MessageService = require('../Services/MessageService');
const MessageDTO = require('../DTO/MessageDTO');

class MessageController {

    async create(req, res) {

        const text = req.body.text;

        try {

            const message = await MessageService.create({text});

            const result = new MessageDTO(message);

            return res.successResponse(result);
        }
        catch (e) {
            return res.errorResponse(e);
        }
    }

    async list(req, res) {

        let {limit, offset} = req.query;

        try {

            const messages = await MessageService.list(limit, offset);

            const result = [];

            for (let message of messages) {
                result.push(new MessageDTO(message));
            }

            return res.successResponse(result);
        }
        catch (e) {
            return res.errorResponse(e);
        }
    }
}

module.exports = new MessageController();
