'use strict';

const Message = require('../Models/Message');
const config = require('../../Infrastructure/Config');

const { DEFAULT_LIMIT, DEFAULT_OFFSET } = config.lists;


class MessageService {

    async create(messsage) {

        const result = await Message.create(messsage);

        return result;
    }

    async list(limit = DEFAULT_LIMIT, offset = DEFAULT_OFFSET) {

        const messages = await Message.find().skip(offset).limit(limit);

        return messages;
    }

}

module.exports = new MessageService();
