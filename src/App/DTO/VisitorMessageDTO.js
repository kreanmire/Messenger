'use strict';

class VisitorMessageDTO {

    constructor(message) {

        const { text, createdAt } = message;

        return {
            type: 'visitor-message',
            timestamp: createdAt,
            params: {
                text
            }
        };
    }

}

module.exports = VisitorMessageDTO;
