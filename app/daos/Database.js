const Database = (function (database, info) {
	const module = {
		info: undefined,
		query: undefined
	};

	module.info = function () {
		return info;
	};

	module.query = function (queryString, params, callback) {
		const connection = database.createConnection(module.info());
		connection.query(queryString, params, callback);
		connection.on('error', function(error) {
			console.error('Database error: ', error);
		});
		connection.end();
	};

	return module;
});

module.exports = function(app) {
	const info = app.config.DatabaseInfo;
	console.info('Using database information:', info);
	return new Database(require('mysql'), info);
};