//Basic Dependencies
var mongoose = require('mongoose');

//App Dependencies
var Bongo = require('./bongo');

var dbUrl = process.env.MONGOHQ_URL || 'mongodb://localhost/bongos';	//How you handle Heroku mongo, apparently (not tested yet)

var read = function(body, callback){
	var db;

	//Connecting to our DB via mongoose
	mongoose.connect(dbUrl);

	//Handlers for error or connection success
	db = mongoose.connection;
	db.on('error', function(data){
		callback(true, data);
	});
	db.once('open', function(){
		Bongo.findOne({ name: body.name }, function(err, bngo){
			//Closing the connection
			mongoose.connection.close();

			//Calling back to routes
			if(err){
				callback(true, bngo);
			}else{
				if(bngo===null){
					callback(null, {
						name: body.name,
						notfound: true
					});
				}else{
					callback(null, {
						found: true,
						color: bngo.color,
						dinosaurs: bngo.dinosaurs,
						name: bngo.name,
						number: bngo.number
					});
				}
			}
		});
	});
};

module.exports = read;