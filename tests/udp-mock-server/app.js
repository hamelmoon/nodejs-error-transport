'use strict';

const dgram = require('dgram');

var server = dgram.createSocket('udp4');

server.on('error', (err) => {
    console.log(`udp server error:\n${err.stack}`);
    this.server.close();
});

server.on('message', (msg, rinfo) => {

    let json;
    try {

        json = JSON.parse(msg);
        console.log(`received Log: ${msg}`);
    } catch (e) {
        console.log(`failed to decode JSON: ${e}`);
        return;
    }
});

server.bind(9999);

