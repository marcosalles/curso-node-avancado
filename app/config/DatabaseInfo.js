const DatabaseInfo = (function() {
	const env = process.env.NODE_ENV || 'development';
	console.info('Using environment', env.toUpperCase());

	if (env == 'production') {
		const dbUrl = process.env.CLEARDB_DATABASE_URL;
		let infoBreakdown = dbUrl.match(/mysql:\/\/([\w-]+):([\w-]+)@([\w.-]+)\/([\w-]+)/);

		return {
			user: infoBreakdown[1],
			password: infoBreakdown[2],
			host: infoBreakdown[3],
			database: infoBreakdown[4]
		};
	}
	return {
		user: 'root',
		password: '',
		host: '0.0.0.0',
		database: ['nodeadvanced', '_', env].join('')
	};
});

module.exports = function() {
	return new DatabaseInfo();
};