'use strict';

const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({

    chat_id:                    String,
    text:                       String,
    parse_mode:                 String,
    disable_web_page_preview:   Boolean,
    disable_notification:       Boolean,
    reply_to_message_id:        Number,
    reply_markup:               String,

}, { timestamps: true });

const BotMessage = mongoose.model('BotMessage', MessageSchema);

module.exports = BotMessage;
