const PaymentDao = (function (baseDao) {
	const module = {
		all: undefined,
		load: undefined,
		save: undefined,
		remove: undefined
	};

	module.all = function (callback) {
		baseDao.query('select * from payment', callback);
	};

	module.load = function (id, callback) {
		baseDao.query('select * from payment where id = ?', [id], callback);
	};

	module.save = function (payment, callback) {
		if (payment.id) {
			baseDao.query('update payment set ?', payment, callback);
		} else {
			baseDao.query('insert into payment set ?', payment, callback);
		}
	};

	module.remove = function (id, callback) {
		baseDao.query('delete from payment where id = ?', [id], callback);
	};

	return module;
});

module.exports = function (app) {
	return new PaymentDao(app.daos.BaseDao);
};