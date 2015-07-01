var express = require('express');
var router = express.Router();
var util = require('util');
var db = require('../libs/db');
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
        // Override Default
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
			//console.log('SENDING: ' + JSON.stringify(res.data));
			res.json({ 'success': res.data});
		} else {

			/* else Forecast API */
			forecast.api(req, res, function (req, res){
				console.log('DEBUG: Back from forecast.api');
				console.log('DEBUG: ' + util.inspect(res.data));

				/* If "result" is not empty then insert and return */
				if (res.data && res.data.daily) {

					/* Insert result in DB for cache */
					db.db_insert(req, res, function (req, res){
						console.log('DEBUG: Back from db_insert');
						//console.log('SENDING: ' + JSON.stringify(res.data));

						res.json({ 'success': [res.data]});
					});

				} else {
					/* else send error */
					res.json({ 'error': 'no result' });
				} /* END no result from Forecast API */

			}); /* END Forecast API */

		} /* END no result from DB search */

	}); /* END DB search */

}); /* END Call to API */

module.exports = router;
