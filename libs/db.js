/***
** DB functions
***/

exports.db_search = function(req, res, callback) {

        var lat = req.params.lat,
            lon = req.params.lon,
            time = req.params.time,
            unit = req.params.unit,
            lang = req.params.lang,
            db = req.db;

	console.log('Searching in DB for: ' + JSON.stringify(req.params));
	var collection = db.get('weatherdata');
	collection.find({"lat": lat, "lon": lon, "time": time, "unit": unit, "lang": lang}, {}, function(err, data){
		if (err) {
			//res.send({'error':'An error has occurred'});
			throw err;
		} else {
			console.log('DB Search: Success: ' + JSON.stringify(data));
			res.data = data;
			callback(req, res);
		}
	});
};

exports.db_insert = function(req, res, callback) {

        var lat = req.params.lat,
            lon = req.params.lon,
            time = req.params.time,
            unit = req.params.unit,
            lang = req.params.lang,
            db = req.db,
	    result = res.data;

	console.log('Adding in DB for: ' + JSON.stringify(req.params));
	var collection = db.get('weatherdata');
	collection.insert({"lat": lat, "lon": lon, "time": time, "unit": unit, "lang": lang, "result": result}, {safe:true}, function(err, data){
		if (err) {
			//res.send({'error':'An error has occurred'});
			throw err;
		} else {
			console.log('DB Insert: Success: ' + JSON.stringify(data));
			res.data = data;
			callback(req, res);
		}
	});
};
