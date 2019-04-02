'use strict';

const Message = require('../Models/Message');
const config = require('../../Infrastructure/Config');
const SendMessageHook = require('../Hooks/SendMessageHook');

const { DEFAULT_LIMIT, DEFAULT_OFFSET } = config.lists;


class MessageService {

    async create(message) {

        const result = await Message.create(message);

        SendMessageHook.notify(result._doc);

        return result;
    }

    async list(limit = DEFAULT_LIMIT, offset = DEFAULT_OFFSET) {

        const messages = await Message.find().skip(offset).limit(limit);

        return messages;
    }

}

module.exports = new MessageService();
