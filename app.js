'use strict';

//Core Modules
var fs = require('fs');
var http = require('http');
var https = require('https');

//Basic Dependencies
var bodyParser = require('body-parser');
var express = require('express');
var expressHanlebars = require( 'express-handlebars' );
var helpers = require('./lib/hbs-helpers');

//App Dependencies
var routes = require('./routes');

//Creating express application & setting port
var app = express();
app.set('port', process.env.PORT || 3000);

//Configuring view engine
app.engine('hbs', expressHanlebars({
	defaultLayout: 'main',
	extname: '.hbs',
	helpers: helpers
	//partialsDir: __dirname +'/views/partials'
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

//Configuring body parser
app.use(bodyParser.json());	//to support JSON-encoded bodies
app.use(bodyParser.urlencoded());	//to support URL-encoded bodies

//Serving static content
app.use(express.static(__dirname +'/public'));
app.use('/bower_components', express.static(__dirname+'/bower_components'));

//Use routes
app.use('/', routes);

//Start server
var server = app.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + server.address().port);
});
