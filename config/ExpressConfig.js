const ExpressConfig = (function () {
	const module = {
		app: undefined
	};

	module.app = require('express')();

	const bodyParser = require('body-parser');
	module.app.use(bodyParser.json());

	const consign = require('consign')();
	consign
		.include('app/controllers')
		.into(module.app);

	return module;
});

module.exports = function () {
	return new ExpressConfig();
};