'use strict';

let config = require('../config/config.js');
let logger = require('error-transport/app')(config);

module.exports = function (app) {
    app.use(function (err, req, res, next) {
        res.json(err.message);
        err.req = req;
        logger.error(err.message, err);
    });
};