//Basic Dependencies
var _ = require('underscore');
var express = require('express');

//App Dependencies
var create = require('./create');
var del = require('./delete');
var read = require('./read');
var update = require('./update');

var router = express.Router();

//NOTE: poor use of express' action verbs here, might want to change that later on

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


//GET update page
router.get('/updateyoself', function(req, res) {
	res.render('update', { title: 'Update' });
});

//POST upfetch
router.post('/doupfetch', function(req, res) {
	update.doupfetch(req.body, function(err, data){
		if(err){
			res.render('error', { layout: 'error', error: data });
		}else{
			res.render('update-pt2', _.extend({ title: 'Update' }, data));
		}
	});
});

//POST update
router.post('/doupdate', function(req, res) {
	update.doupdate(req.body, function(err, data){
		if(err){
			res.render('error', { layout: 'error', error: data });
		}else{
			res.render('update-success', _.extend({ title: 'Update Success' }, data));
		}
	});
});


//GET delete page
router.get('/deleteyoself', function(req, res) {
	res.render('delete', { title: 'Delete' });
});

//POST delete
router.post('/dodelete', function(req, res) {
	del(req.body, function(err, data){
		if(err){
			res.render('error', { layout: 'error', error: data });
		}else{
			res.render('delete-success', _.extend({ title: 'Update' }, data));
		}
	});
});


module.exports = router;