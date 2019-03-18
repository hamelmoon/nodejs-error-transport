const util = require('util'),
    dgram = require('dgram'),
    messageFactory = require('./createMessage.js');

const TransportStream = require('winston-transport');


const levels = Object.keys({
    debug: 0,
    info: 1,
    notice: 2,
    warning: 3,
    error: 4,
    critical: 5,
    alert: 6,
    emergency: 7
});

const UdpTransport = exports.UdpTransport = function (options) {
    TransportStream.call(this, options);


    options = options || {};
    this.domain = options.domain;
    this.host = options.protocolOptions.host;
    this.port = options.protocolOptions.port;
    this.protocol = options.protocolOptions.protocol || 'udp4';
    this.client = dgram.createSocket(this.protocol);
};

util.inherits(UdpTransport, TransportStream);

UdpTransport.prototype.connect = function (protocol) {
};

UdpTransport.prototype.log = function (level, message, meta, callback) {

    let caller = this;
    let log = messageFactory.createMessage(level, this.domain, message, meta);

    callback = (callback || function () {});
    
    this.send(JSON.stringify(log), function (err) {
        if (err){
            console.log(err);
        }
        caller.emit('logged', true);
        callback(null, true);
    });
};

UdpTransport.prototype.send = function (msg, callback) {
    let buffer = new Buffer(msg);
    this.client.send(buffer, 0, buffer.length, this.port, this.host, callback);
};