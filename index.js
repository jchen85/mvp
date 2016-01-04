var express = require('express');
var app = express();

require('./server/routes.js')(app, express);

app.use(express.static(__dirname + '/client'));

app.listen(8000);