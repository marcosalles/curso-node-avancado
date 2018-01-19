const PaymentStatus = (function(status) {
	this.status = status;
});

PaymentStatus.prototype.models = {
	CREATED: {
		allowed: ['PAID', 'CANCELLED'],
		name: 'CREATED'
	},
	CANCELLED: {
		allowed: [],
		name: 'CANCELLED'
	},
	PAID: {
		allowed: ['EXPIRED'],
		name: 'PAID'
	},
	REIMBURSED: {
		allowed: [],
		name: 'REIMBURSED'
	},
	EXPIRED: {
		allowed: [],
		name: 'EXPIRED'
	}
};
PaymentStatus.prototype.current = function () {
	return this.models[this.status];
};
PaymentStatus.prototype.name = function () {
	return this.current().name;
};
PaymentStatus.prototype.canChangeTo = function(status) {
	return this.current().allowed.includes(status);
};
PaymentStatus.prototype.changeTo = function(status) {
	let canChange = this.canChangeTo(status);
	if (canChange) {
		this.status = status;
	}
	return canChange;
};

module.exports = PaymentStatus;