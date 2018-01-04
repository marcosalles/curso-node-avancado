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

	return module;
});

module.exports = function (app) {
	return new BaseDao(app.daos.Database);
};