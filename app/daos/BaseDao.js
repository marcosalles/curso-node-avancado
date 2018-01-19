const BaseDao = (function (database) {
	const module = {
		name: undefined,
		query: undefined
	};

	module.name = function () {
		return database.info().database;
	};

	module.query = function (query, params, callback) {
		database.query(query, params, callback);
	};

	module.findOne = function (query, params, callback) {
		database.query(query, params, function(error, results) {
			callback(error, results[0]);
		});
	};

	return module;
});

module.exports = function (app) {
	return new BaseDao(app.daos.Database);
};