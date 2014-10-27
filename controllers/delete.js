//Basic Dependencies
var mongoose = require('mongoose');

//App Dependencies
var Bongo = require('../models/bongo');

var dbUrl = process.env.MONGOHQ_URL || 'mongodb://localhost/bongos';	//How you handle Heroku mongo, apparently (not tested yet)

var del = function(body, callback){
	var db;

	//Connecting to our DB via mongoose
	mongoose.connect(dbUrl);

	//Handlers for error or connection success
	db = mongoose.connection;
	db.on('error', function(data){
		callback(true, data);
	});
	db.once('open', function(){
		Bongo.remove({ name: body.name }, function(err){
			//Closing the connection
			mongoose.connection.close();

			//Calling back to routes
			if(err){
				callback(true, err);
			}else{
				callback(null, {
					name: body.name
				});
			}
		});
	});
};

module.exports = del;