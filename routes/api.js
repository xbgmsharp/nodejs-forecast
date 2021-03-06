var express = require('express');
var router = express.Router();
var util = require('util');
var db = require('../libs/db');
var stats = require('../libs/dbstats');
var forecast = require('../libs/forecast');

/* GET data API */
router.get('/', function(req, res, next) {
	res.json({ 'error': 'Missing params' });
});

router.get('/:lat/:lon/:time/:unit?/:lang?', function(req, res, next) {

	if (!req.params.lat || !req.params.lon || !req.params.time)
	{
		res.json({ 'error': 'Missing params' });
	}

	/* TODO Check valid params, lenght, etc... */
        // Set unit and lang if not defined
        if (!req.params.unit)
           req.params.unit = 'auto';
        if (!req.params.lang)
           req.params.lang = 'en';

	/* Search in DB for result */
	db.db_search(req, res, function (req, res){
		console.log('DEBUG: Back from db_search');
		console.log('DEBUG: ' + JSON.stringify(res.data));

		//console.log(res.data[0].result);

		/* If "result" is not empty then return it */
		if (res.data[0] && res.data[0].result && res.data[0].result.length != 0) {
			//console.log('HIT: ' + JSON.stringify(res.data));
			stats.db_stats_update(req, 'HIT');
			res.append('Cache-Control', 'public, max-age=2592000000'); // 30 Days = 86400000*30
			res.append('X-Cache', 'HIT');
			res.json({ 'success': res.data});
		} else {

			/* else DarkSky API */
			forecast.api(req, res, function (req, res){
				console.log('DEBUG: Back from darksky.api');
				console.log('DEBUG: ' + util.inspect(res.data));

				/* If "result" is not empty then insert and return */
				if (res.data && res.data.daily) {

					/* Insert result in DB for cache */
					db.db_insert(req, res, function (req, res){
						console.log('DEBUG: Back from db_insert');
						//console.log('MISS: ' + JSON.stringify(res.data));
						stats.db_stats_update(req, 'MISS');

						res.append('Cache-Control', 'public, max-age=2592000000'); // 30 Days = 86400000*30
						res.append('X-Cache', 'MISS');
						res.json({ 'success': [res.data]});
					});

				} else {
					/* else send error */
					res.json({ 'error': 'no result' });
				} /* END no result from DarkSky API */

			}); /* END DarkSky API */

		} /* END no result from DB search */

	}); /* END DB search */

}); /* END Call to API */

module.exports = router;
