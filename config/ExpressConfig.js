const ExpressConfig = function () {
	const app = require('express')();
	const consign = require('consign');

	consign()
		.include('app/controllers')
		.into(app);

	return app;
};

module.exports = function () {
	return new ExpressConfig();
};