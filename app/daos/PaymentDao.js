const PaymentDao = (function (baseDao) {
	function all(callback) {
		baseDao.query('select * from payment', callback);
	}

	function load(id, callback) {
		baseDao.query('select * from payment where id = ?', [id], callback);
	}

	function save(payment, callback) {
		if (payment.id) {
			baseDao.query('update payment set ?', payment, callback);
		} else {
			baseDao.query('insert into payment set ?', payment, callback);
		}
	}

	function remove(id, callback) {
		baseDao.query('delete from payment where id = ?', [id], callback);
	}

	return {
		all: all,
		load: load,
		save: save,
		remove: remove
	};
});

module.exports = function (app) {
	return new PaymentDao(app.daos.BaseDao);
};