const PaymentStatus = require('./PaymentStatus');

const Payment = (function (data) {

});

Payment.prototype.changeStatusTo = function (status) {
	return this.status.changeTo(status);
};
PaymentStatus.prototype.json = function () {
	return {
		id: this.id,
		customerName: this.customerName,
		customerEmail: this.customerEmail,
		product: this.product,
		value: this.value,
		amount: this.amount,
		discount: this.discount,
		status: this.status.name()
	}
};

const schema = require('./Schemas').Payment;
Payment.prototype.schema = function () {
	return schema;
};

module.exports = Payment;