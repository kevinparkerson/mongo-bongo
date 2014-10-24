//Basic Dependencies
var _ = require('underscore');
var express = require('express');

//App Dependencies
var create = require('./create');

var router = express.Router();

//GET home page
router.get('/', function(req, res) {
	res.render('index', { title: 'Mongo Bongo' });
});


//GET create page
router.get('/createyoself', function(req, res) {
	res.render('create', { title: 'Create' });
});

//POST create
router.post('/docreate', function(req, res) {
	create(req.body, function(err, data){
		if(err){
			res.render('error', { layout: 'error', error: data });
		}else{
			res.render('create-success', _.extend({ title: 'Create Success' }, data));
		}
	});
});


module.exports = router;