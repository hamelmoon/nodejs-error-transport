let developmentConfig = {
    protocol : 'UDP',
    domain : "TEST",
    protocolOptions : {
        host : "localhost",
        port: 9999,
        protocol: 'udp4',
        options: {}
    }
}

let productionConfig = {
    protocol : 'UDP',
    domain : "TEST",
    protocolOptions : {
        host : "localhost",
        port: 9999,
        protocol: 'udp4',
        options: {}
    }
}

if (process.env.NODE_ENV == "development")
    module.exports = developmentConfig;
else
    module.exports = productionConfig;