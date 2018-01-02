const PaymentController = function (app) {

	app.get('/payments', function (req, res) {
		res.send('200 OK');
	});
};

module.exports = function (app) {
	return new PaymentController(app);
};