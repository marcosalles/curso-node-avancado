const PaymentController = (function (app) {
	const routes = {
		list: '/payments',
		create: '/payments/create'
	};

	app.get(routes.list, function (req, res) {
		res.send(routes.list + ' 200 OK');
	});

	app.post(routes.create, function (req, res) {
		let payment = req.body;
		console.log('payment', payment);
		res.send(routes.create + ' 200 OK');
	});

	return routes;
});

module.exports = function (app) {
	return new PaymentController(app);
};