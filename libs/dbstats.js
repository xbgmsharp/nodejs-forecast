/***
** DB Stats functions
** http://www.tutorialspoint.com/mongodb/mongodb_autoincrement_sequence.htm
***/

exports.db_stats_init = function(db) {

	console.log('Init DB Counters');
	/* Init DB Counters */
	var collection = db.get('counters');
	collection.drop();
	collection.insert({ status:"HIT", value:0, date:Date()});
	collection.insert({ status:"MISS", value:0, date:Date()});
};

exports.db_stats_update = function(req, cachestatus) {

	var db = req.db;
	console.log('Update DB Counters for: ' + cachestatus);
	/* Update DB Counters */
	var collection = db.get('counters');
	collection.findAndModify({"query":{ status:cachestatus }, "update": {$inc:{value:1}}, "new":true });
};

exports.db_stats_get = function(req, res, callback) {

        var db = req.db;
        console.log('Fetch DB Counters');
        var collection = db.get('weatherdata');
	collection.count({}, function (error, count) {
 		//console.log(error, count);
		res.count = count;
		var collection = db.get('counters');
		collection.find({}, {}, function(err, data){
        	        if (err) {
                	        //res.send({'error':'An error has occurred'});
	                        throw err;
	       	         } else {
	                        console.log('DB Counters: Success: ' + JSON.stringify(data));
        	                res.data = data;
	                        callback(req, res);
	                }
        	});
	});
};
