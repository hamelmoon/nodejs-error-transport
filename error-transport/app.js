const { createLogger, format, transports } = require('winston');
let logger = null;

let errorTransport = function (options)
{
    let transportFactory = require('./transports/transportFactory.js');
    let tranport  = transportFactory(options.protocol.toUpperCase());

    const logger = createLogger({
        transports: [
            new(tranport)(options)
        ]
    });

    return logger;
}

module.exports = errorTransport;