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

	/* Generate Query parameters */
	/* { lat : { $in: [ /^53./, /^\+53./ ] } , lon : { $in: [ /^9./, /^\+9./ ] } , time: { $in: [/^142083/] } } */
	var query = {};
	if (lat[0] == "-") // latitude matching with 1 degre range
	{
		query["lat"] = { $in: [ new RegExp("^\\" + lat.substr(0, lat.indexOf('.')+1)) ]};
	} else if (lat[0] == "+")
	{
		query["lat"] = { $in: [ new RegExp("^\\" + lat.substr(0, lat.indexOf('.')+1)) , new RegExp("^" + lat.match(/\d+/)[0] +".") ]};
	} else {
		query["lat"] = { $in: [ new RegExp("^" + lat.substr(0, lat.indexOf('.')+1)) , new RegExp("^\\+" + lat.match(/\d+/)[0] +".") ]};
	}
	if (lon[0] == "-") // longitude matching with 1 degre range
	{
		query["lon"] = { $in: [ new RegExp("^\\" + lon.substr(0, lon.indexOf('.')+1)) ]};
	} else if (lon[0] == "+")
	{
		query["lon"] = { $in: [ new RegExp("^\\" + lon.substr(0, lon.indexOf('.')+1)) , new RegExp("^" + lon.match(/\d+/)[0] +".") ]};
	} else {
		query["lon"] = { $in: [ new RegExp("^" + lon.substr(0, lon.indexOf('.')+1)) , new RegExp("^\\+" + lon.match(/\d+/)[0] +".") ]};
	}
	query["time"] = { $in: [ new RegExp("^" + time.substr(0,6)) ]}; // within the same hour range
	query["unit"] = unit;
	query["lang"] = lang;
	console.log('Search query:'+ JSON.stringify(query));
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
