//Basic Dependencies
var mongoose = require('mongoose');

var bongoSchema = mongoose.Schema({
	color: String,
	dinosaurs: Boolean,
	name: String,
	number: Number
});

var Bongo = mongoose.model('Bongo', bongoSchema);

module.exports = Bongo;