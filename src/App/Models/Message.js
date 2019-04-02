'use strict';

const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({

    text: String,

}, { timestamps: true });

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
