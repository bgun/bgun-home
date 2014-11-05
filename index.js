var express = require('express');
var server  = express();
var port    = process.env.PORT || 5000;

server.get('/', function(req, res) {
  res.send("bgun.me");
});

console.log("Listening on port "+port);
server.listen(port);
