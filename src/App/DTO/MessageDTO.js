'use strict';

class MessageDTO {

    constructor(message) {

        const { text, _id } = message;

        return {
            id: _id,
            text,
        };
    }

}

module.exports = MessageDTO;
