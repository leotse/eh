////////////
// app.js //
////////////

// main entry, starts server

// libs
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

// init express
var app = express();
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon(path.join(__dirname, 'public/favicon.ico')));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

// routes
app.get('/', routes.index);
app.get('/search', routes.search);

// start server
http.createServer(app).listen(app.get('port'), function(){
	console.log('eh server listening on port ' + app.get('port'));
});