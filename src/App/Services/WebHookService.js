'use strict';

const WebHook = require('../Models/WebHook');
const config = require('../../Infrastructure/Config');
const SendMessageHook = require('../Hooks/SendMessageHook');
const logger = require('../../Infrastructure/Logger');

const { DEFAULT_LIMIT, DEFAULT_OFFSET } = config.lists;


class WebHookService {

    async create(hook) {

        const {targetUrl, event, type} = hook;

        const result = await WebHook.create({targetUrl, event, type});

        logger.info(`Created hook`, hook);

        return result;
    }

    async get(id) {

        const hook = await WebHook.findById(id);

        return hook;
    }

    async remove(id ) {

        const result = WebHook.remove({ _id: id });

        logger.info(`Created hook`, hook);


        return result;
    }

    async list(limit = DEFAULT_LIMIT, offset = DEFAULT_OFFSET) {

        const hooks = await Message.WebHook().skip(offset).limit(limit);

        return hooks;
    }

    async listByEvent(event, limit = DEFAULT_LIMIT, offset = DEFAULT_OFFSET) {

        const hooks = await Message.find({event}).skip(offset).limit(limit);

        return hooks;
    }
}

module.exports = new WebHookService();
