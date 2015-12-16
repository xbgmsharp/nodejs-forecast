var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'nodejs-forecast', desc: 'A NodeJs Proxy for Forecast.io', url: 'https://github.com/xbgmsharp/nodejs-forecast' });
});

module.exports = router;
