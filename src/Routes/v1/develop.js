'use strict';

const DevelopController = require('../../App/Controllers/DevelopController');

module.exports = (app) => {

    app.route('/v1/ping')
        .get(DevelopController.ping);

};
