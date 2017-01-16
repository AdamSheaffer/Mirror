var compression = require('compression');
var express = require('express');
var app = express();
 
app.use(express.logger('dev'));
app.use(compression());
app.listen(process.env.PORT || 5000);