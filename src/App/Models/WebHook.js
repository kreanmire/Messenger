'use strict';

const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({

    event:                      String,
    type:                       String,
    targetUrl:                  String,

}, { timestamps: true });

const WebHook = mongoose.model('WebHook', MessageSchema);

module.exports = WebHook;
