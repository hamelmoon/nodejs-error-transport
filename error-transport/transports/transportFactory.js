module.exports = function (protocol) {
    let transport;
    switch (protocol) {
        case "UDP":
            transport = require('./udp-transport.js').UdpTransport;
            break;
        case "CONSOLE":
            transport = new winston.transports.Console();
            break;
    }
    return transport;
};
