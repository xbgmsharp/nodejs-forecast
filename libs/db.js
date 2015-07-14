/***
** DB functions
***/

/* Calculate value in range of 0.5 Degres
 * 1 Degres Latitude = 111 KM
 */
function Calc_Max_Min(value) {

	max = parseFloat(value)+0.5;
	min = parseFloat(value)-0.5;

	return [ parseFloat(min.toPrecision(3)), parseFloat(max.toPrecision(3)) ];
}

exports.db_search = function(req, res, callback) {

        var lat = req.params.lat,
            lon = req.params.lon,
            time = req.params.time,
            unit = req.params.unit,
            lang = req.params.lang,
            db = req.db;

	console.log('Searching in DB for: ' + JSON.stringify(req.params));

	/* Generate Query parameters */
	/* { lat : { $gte: 51.6 , $lte : 52.1 } , lon : { $gte: 51.6 , $lte : 52.1 } , time: { $in: [/^142083/] } } */
	var query = {};
	mylat = Calc_Max_Min(lat);
	query["lat"] = {$gte: mylat[0] , $lte: mylat[1] };
	mylon = Calc_Max_Min(lon);
	query["lon"] = {$gte: mylon[0] , $lte: mylon[1] };
	query["time"] = { $in: [ new RegExp("^" + time.substr(0,6)) ]}; // within the same hour range
	query["unit"] = unit;
	query["lang"] = lang;
	console.log('Search query:'+ JSON.stringify(query));

	/* Make Query to DB */
	var collection = db.get('weatherdata');
	collection.find(query, {limit:1}, function(err, data){
	//collection.find({"lat": lat, "lon": lon, "time": time, "unit": unit, "lang": lang}, {}, function(err, data){
	//collection.find(req.params, {}, function(err, data){
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
	collection.insert({"lat": parseFloat(lat), "lon": parseFloat(lon), "time": time, "unit": unit, "lang": lang, "result": result}, {safe:true}, function(err, data){
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
