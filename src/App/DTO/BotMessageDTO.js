'use strict';

class BotMessageDTO {

    constructor(message) {

        const {
            chat_id,
            text,
            parse_mode,
            disable_web_page_preview,
            disable_notification,
            reply_to_message_id,
            reply_markup,

        } = message;

        return {
            chat_id,
            text,
            parse_mode,
            disable_web_page_preview,
            disable_notification,
            reply_to_message_id,
            reply_markup,
        };
    }

}

module.exports = BotMessageDTO;
