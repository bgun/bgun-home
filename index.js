var express = require('express');
var server  = express();
var port    = process.env.PORT || 5000;

server.get('/', function(req, res) {
  res.send("bgun.me");
});

server.listen(port);
