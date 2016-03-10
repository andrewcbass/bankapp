'use strict';

const PORT = process.env.PORT || 12345;

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var http = require('http');
var path = require('path');

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get('/', function(req, res) {
  var indexPath = path.join(__dirname, 'index.html');
  res.sendFile(indexPath);
});

app.use('/debits', require('./routes/debits'));

var server = http.createServer(app);

server.listen(PORT, function() {
  console.log(`The casino of life is open on port ${PORT}`);
})
