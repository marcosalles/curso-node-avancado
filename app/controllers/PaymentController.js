const PaymentController = (function (app) {
	const routes = {
		list: '/payments',
		create: '/payments/create'
	};

	const paymentDao = app.daos.PaymentDao;
	const ErrorMap = app.errors.ErrorMap;

	function validate(payment) {
		payment.check('customerEmail', 'Customer email can\'t be empty').notEmpty();
		payment.check('customerEmail', 'Customer email should be a valid email').isEmail();

		payment.check('customerName', 'Customer name can\'t be empty').notEmpty();

		payment.check('value', 'Payment must have a value').notEmpty();
		payment.check('value', 'Payment must be a decimal number').isDecimal();

		return payment.validationErrors();
	}

	(function setupRoutes() {
		app.get(
			routes.list,
			(request, result, next) => {
			paymentDao.all(function (error, payments) {
				result.send(routes.list + ' ' + payments);
			});
		});

		app.post(routes.create, (request, result, next) => {
			const errors = validate(request);
			if (errors.length > 0) {
				return result.status(422).json(new ErrorMap(errors));
			}
			const payment = request.body;
			payment.status = 'ON_HOLD';
			paymentDao.save(payment, function (error, saved) {
				if (error) console.log('error', error);
				payment.id = saved.insertId;
				result.send(payment);
			});
		});

	})();
	return routes;
});

module.exports = function (app) {
	return new PaymentController(app);
};