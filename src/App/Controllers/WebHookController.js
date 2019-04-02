'use strict';

const WebHookService = require('../Services/WebHookService');
const WebHookDTO = require('../DTO/WebHookDTO');

class WebHookController {

    async create(req, res) {

        try {

            const rawWebHook = new WebHookDTO(req.body);

            const webHook = await WebHookService.create(rawWebHook);

            const result = new WebHookDTO(webHook);

            return res.successResponse(result);
        }
        catch (e) {
            return res.errorResponse(e);
        }
    }

    async get(req, res) {

        try {

            const id  = req.params.id;

            const webHook = await WebHookService.get(id);

            const result = new WebHookDTO(webHook);

            return res.successResponse(result);
        }
        catch (e) {
            return res.errorResponse(e);
        }
    }

    async list(req, res) {

        let {limit, offset} = req.query;

        try {

            const webHooks = await WebHookService.list(limit, offset);

            const result = [];

            for (let webHook of webHooks) {
                result.push(new WebHookDTO(webHook));
            }

            return res.successResponse(result);
        }
        catch (e) {
            return res.errorResponse(e);
        }
    }

    async remove(req, res) {

        try {

            const id  = req.params.id;

            await WebHookService.remove(id);

            return res.successResponse();
        }
        catch (e) {
            return res.errorResponse(e);
        }
    }


}

module.exports = new WebHookController();
