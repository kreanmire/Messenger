'use strict';

const DevelopController = require('../../app/controllers/DevelopController');

module.exports = (app) => {

    app.route('/v1/ping')
        .get(DevelopController.ping);

    app.route('/v1/version')
        .get(DevelopController.version);

};
