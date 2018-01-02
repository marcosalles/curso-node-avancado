const ExpressConfig = function () {
	const express = require('express');

	const app = express();

	return app;
};

module.exports = function () {
	return new ExpressConfig();
};