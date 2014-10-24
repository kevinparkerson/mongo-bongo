//Basic Dependencies
var express = require('express');

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
	console.log(req.body);
	res.render('create-result', { title: 'Create Result' });
});

module.exports = router;