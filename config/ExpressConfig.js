const ExpressConfig = (function () {
	const app = require('express')();

	const bodyParser = require('body-parser');
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended:true}));

	const validator = require('express-validator')();
	app.use(validator);

	const consign = require('consign')({
		cwd: 'app'
	});
	consign
		.include('daos/Database.js')
		.then('daos')
		.then('controllers')
		.into(app);

	return {
		app: app
	};
});

module.exports = function () {
	return new ExpressConfig();
};