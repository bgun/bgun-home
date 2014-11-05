var express = require('express');
var server  = express();

server.set('port', (process.env.PORT || 5000))
server.use(express.static(__dirname + '/public'))

server.get('/', function(request, response) {
  response.send('bgun.me')
})

server.listen(server.get('port'), function() {
  console.log("bgun app is running at localhost:" + server.get('port'))
})
