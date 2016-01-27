'use strict';

var _       = require('underscore');
var fs      = require('fs');
var express = require('express');
var server  = express();
var hbs = require('express-hbs');
var less = require('less');

var style = "";

less.render(fs.readFileSync('./style.less', 'utf-8')).then(function(output) {
  style = output.css;
});

server.set('port', (process.env.PORT || 5000))
server.use(express.static(__dirname + '/public'))

server.engine('hbs', hbs.express4({
  //partialsDir: __dirname + '/views/partials'
}));
server.set('views', __dirname + '/views');
server.set('view engine', 'hbs');

server.get('/', function(req, res) {
  res.render('home', {
    style: style,
    foo: 'bar'
  });
});

server.listen(server.get('port'), function() {
  console.log("bgun app is running at localhost:" + server.get('port'))
});
