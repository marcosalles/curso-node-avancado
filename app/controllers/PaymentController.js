const PaymentController = (function (app) {
	const routes = {
		list: '/payments',
		create: '/payments/create'
	};

	const paymentDao = app.daos.PaymentDao;

	app.get(routes.list, function (request, result, next) {
		paymentDao.all(function (error, payments) {
			result.send(routes.list + ' ' + payments);
		});
	});

	app.post(routes.create, function (request, result, next) {
		const payment = request.body;
		payment.status = 'ON_HOLD';
		paymentDao.save(payment, function (error) {
			if (error) console.log('error', error);
			result.send(payment);
		});
	});

	return routes;
});

module.exports = function (app) {
	return new PaymentController(app);
};