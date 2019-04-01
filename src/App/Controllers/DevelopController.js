'use strict';

class DevelopController {

    async ping(req, res) {

        try {
            return res.successResponse({ pong: process.uptime() });
        }
        catch (e) {
            return res.errorResponse(e);
        }
    }

}

module.exports = new DevelopController();
