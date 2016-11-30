var express = require('express');
var router = express.Router();
var stats = require('../libs/dbstats');

/* GET home page. */
router.get('/', function(req, res, next) {
	stats.db_stats_get(req, res, function (req, res){
		res.render('stats', { title: 'Real Time Analytics', count: res.count, data: res.data});
	});
});

module.exports = router;
