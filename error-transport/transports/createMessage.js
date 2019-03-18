let _ = require('underscore')
let os = require("os");
let message = {};

let levels = Object.keys({
    debug: 0,
    info: 1,
    notice: 2,
    warning: 3,
    error: 4,
    critical: 5,
    alert: 6,
    emergency: 7
});

message.createMessage = function (level, domain, msg, meta) {
    //TODO: dynamic configuration. logging level change
    if (levels.indexOf(level) >= levels.indexOf('warning')) {
        let description = {
            'domain': domain,
            'host': getHostname(),
            'message': msg,
            'timestamp': new Date(),
            'raw_url': '/',
            'user_agent': '',
            'module_id': '/',
            'ip_address': '',
            'error_info': err.code ? err.code : 'Exception',
            'err_date': new Date(),
            'err_msg': msg,
            'err_query': err.stack,
            'level': levels.indexOf(level)
        };

        if (err.req) {
            let req = err.req;
            description.raw_url = req.url;
            description.module_id = req.url;

            if (req.headers) {
                let headers = JSON.parse(JSON.stringify(req.headers));
                description.user_agent = headers['user-agent'];
                description.ip_address = headers['client-ip'];
            }
        }

        return description;
    }
    else{
        return null;
    }
}


module.exports = message;
