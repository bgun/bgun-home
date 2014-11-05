var express = require('express');
var server  = express();
var port    = process.env.PORT || 5000;

server.get('/', function(req, res) {
  res.send("bgun.me");
});
// wildcard catching all non-matched requests
server.get('*', function(req, res) {
  res.send(404, "<h1>四零四</h1>");
});

console.log("Listening on port "+port);
server.listen(port);
