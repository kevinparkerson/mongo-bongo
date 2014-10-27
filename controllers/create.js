//Basic Dependencies
var mongoose = require('mongoose');

//App Dependencies
var Bongo = require('../models/bongo');

var dbUrl = process.env.MONGOHQ_URL || 'mongodb://localhost/bongos';	//How you handle Heroku mongo, apparently (not tested yet)

var create = function(body, callback){
	var db;

	//Connecting to our DB via mongoose
	mongoose.connect(dbUrl);

	//Handlers for error or connection success
	db = mongoose.connection;
	db.on('error', function(data){
		callback(true, data);
	});
	db.once('open', function(){
		var bongo = new Bongo({
			color: body.color,
			dinosaurs: (body.dinosaurs==='true') ? true : false,
			name: body.name,
			number: parseInt(body.number, 10)
		});
		bongo.save(function(err, bngo){
			//Closing the connection
			mongoose.connection.close();

			//Calling back to routes
			if(err){
				callback(true, err);
			}else{
				callback(null, {
					color: bngo.color,
					dinosaurs: bngo.dinosaurs,
					name: bngo.name,
					number: bngo.number
				});
			}
		});
	});
};

module.exports = create;