//Basic Dependencies
var _ = require('underscore');
var express = require('express');

//App Dependencies
var create = require('./create');
var read = require('./read');

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


//GET read page
router.get('/readyoself', function(req, res) {
	res.render('read', { title: 'Read' });
});

//POST read
router.post('/doread', function(req, res) {
	read(req.body, function(err, data){
		if(err){
			res.render('error', { layout: 'error', error: data });
		}else{
			res.render('read-result', _.extend({ title: 'Read Result' }, data));
		}
	});
});


module.exports = router;