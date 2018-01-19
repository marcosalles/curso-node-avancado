const PaymentStatus = require('../models/PaymentStatus');

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
				paymentDao.load(paymentId, function (error, payment) {
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
			if (payment.id) {
				return result.status(405).json(new ErrorMap({
					customMessage: 'Payment already exists, to update use ' + routes.update.method.toUpperCase() + ': ' + routes.update.build(payment.id),
					content: 'payment.id='+payment.id
				}));
			}
			payment.status = new PaymentStatus('CREATED').name();

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
				const errors = validate(request);
				if (errors.length > 0) {
					return result.status(422).json(new ErrorMap(errors));
				}
				const paymentId = request.params.id;
				paymentDao.exists(paymentId, function(error, payments) {
					if (payments.length == 0) {
						return result.status(405).json(new ErrorMap({
							customMessage: 'Payment does not exist, to create use ' + routes.save.method.toUpperCase() + ': ' + routes.save.path,
							content: routes.save.method.toUpperCase() + ':' + routes.save.build(paymentId)
						}));
					}

					const payment = request.body;
					payment.id = paymentId;
					paymentDao.save(payment, function (error, saved) {
						if (error) {
							return result.status(500).json(new ErrorMap(error));
						}
						result.location(routes.show.build(payment.id));
						result.status(200).json(payment);
					});
				});
		});

		app[routes.remove.method](
			routes.remove.path,
			(request, result, next) => {
				const paymentId = request.params.id;
				paymentDao.exists(paymentId, function(error, payments) {
					if (payments.length == 0) {
						return result.status(405).json(new ErrorMap({
							customMessage: 'Payment does not exist, to create use ' + routes.save.method.toUpperCase() + ': ' + routes.save.path,
							content: routes.remove.method.toUpperCase() + ':' + routes.remove.build(paymentId)
						}));
					}

					const payment = {
						id: paymentId,
						status: 'CANCELLED'
					};
					paymentDao.save(payment, function (error, saved) {
						if (error) {
							return result.status(500).json(new ErrorMap(error));
						}

						result.status(204).json(payment);
					});
				});
			});
	})();
	return routes;
});

module.exports = function (app) {
	return new PaymentController(app);
};