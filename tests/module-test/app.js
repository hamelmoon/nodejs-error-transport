let express = require('express');
let bodyParser = require('body-parser');

app = express();
require('./error-handler')(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', express.Router());

app.get('/errortest', function log(req, res, next) {
    throw new Error('An error occurred');
});

app.listen(3000, function () {
    console.log('Express server listening on 3000');
});
