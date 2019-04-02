'use strict';

class WebHookDTO {

    constructor(hook) {

        const { targetUrl, event, _id, createdAt } = hook;

        return {
            id: _id,
            targetUrl,
            event,
            createdAt,
        };
    }

}

module.exports = WebHookDTO;
