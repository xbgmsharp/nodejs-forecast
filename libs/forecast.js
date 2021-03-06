var util = require('util');

/****
** Forecast function
***/
var Forecast = require('./forecast.io');
var options = {
  APIKey: process.env.FORECAST_API_KEY,
  exclude: 'currently,minutely,hourly,alerts',
  units: 'auto',
  lang: 'en'
},
forecast = new Forecast(options);

exports.api = function(req, res, callback) {

        var lat = req.params.lat,
            lon = req.params.lon,
            time = req.params.time;

        // Override Default
        if (req.params.unit)
           options.unit = req.params.unit;
        if (req.params.lang)
           options.lang = req.params.lang;

	console.log('Calling DarkSky API for: ' + JSON.stringify(req.params));
	forecast.getAtTime(lat, lon, time, options, function (err, result, data) {
		if (err) {
			//res.send({'error':'An error has occurred'});
			throw err;
		} else {
			//console.log('DEBUG : Forecast data: ' + util.inspect(data));
			console.log('Forecast API: Success: data: ' + util.inspect(data));
                        res.data = data;
                        callback(req, res);
		}
	});
};
