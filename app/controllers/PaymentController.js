const PaymentController = (function (app) {
	const routes = app.routes.PaymentRoutes;

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
		app[routes.list.method](
			routes.list.path,
			(request, result, next) => {
				paymentDao.all(function (error, payments) {
					result.json(payments);
				});
			});

		app[routes.show.method](
			routes.show.path,
			(request, result, next) => {
				const paymentId = request.params.id;
				paymentDao.load(paymentId, function (error, payments) {
					const payment = payments[0];
					result.json(payment);
				});
			});

		app[routes.save.method](
			routes.save.path,
			(request, result, next) => {
			const errors = validate(request);
			if (errors.length > 0) {
				return result.status(422).json(new ErrorMap(errors));
			}
			const payment = request.body;
			payment.status = 'ON_HOLD';
			paymentDao.save(payment, function (error, saved) {
				if (error) {
					return result.status(500).json(new ErrorMap(error));
				}
				payment.id = saved.insertId;
				result.location(routes.show.build(payment.id));
				result.status(201).json(payment);
			});
		});

		app[routes.update.method](
			routes.update.path,
			(request, result, next) => {

		});
	})();
	return routes;
});

module.exports = function (app) {
	return new PaymentController(app);
};