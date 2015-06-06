var express = require('express');
var router = express.Router();
var util = require('util');
var db = require('./db');
var forecast = require('./forecast');

/* GET data API */
router.get('/', function(req, res, next) {
	res.send({ 'error': 'Missing params' });
});

router.get('/:lat/:lon/:time', function(req, res, next) {
  
	if (!req.params.lat && !req.params.lon && !req.params.time)
	{
		res.send({ 'error': 'Missing params' });
	}

	/* TODO Check valid params, lenght, etc... */

	/* Search in DB for result */
	db.db_search(req, res, function (req, res){
		console.log('DEBUG: Back from db_search');		
		console.log('DEBUG: ' + JSON.stringify(res.data));

		//console.log(res.data[0].result);

		/* If "result" is not empty then return it */
		if (res.data[0] && res.data[0].result && res.data[0].result.length != 0) {
			res.send({ 'success': res.data});
		} else {

			/* else Forecast API */
			forecast.api(req, res, function (req, res){
				console.log('DEBUG: Back from forecast.api');
				console.log('DEBUG: ' + util.inspect(res.data));

				/* If "result" is not empty then insert and return */
				if (res.data && res.data.daily) {

					/* Insert result in DB for cache */
					db.db_insert(req, res, function (req, res){
						res.send({ 'success': res.data});
					});

				} else {
					/* else send error */
					res.send({ 'error': 'no result' });
				} /* END no result from Forecast API */

			}); /* END Forecast API */

		} /* END no result from DB search */

	}); /* END DB search */

}); /* END Call to API */

module.exports = router;