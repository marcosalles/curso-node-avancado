const PaymentValidator = (function(payment) {
	this.payment = payment;
});

PaymentValidator.prototype.validate = function () {
	this.validateEmail(this.payment);
	this.validateName(this.payment);
	this.validateValue(this.payment);
};
PaymentValidator.prototype.validatePartial = function () {
	if (this.payment.body.customerEmail) {
		this.validateEmail(this.payment);
	}
	if (this.payment.body.customerName) {
		this.validateName(this.payment);
	}
	if (this.payment.body.value) {
		this.validateValue(this.payment);
	}
};
PaymentValidator.prototype.validateName = function() {
	this.payment.check('customerName', 'Customer name can\'t be empty').notEmpty();
};
PaymentValidator.prototype.validateEmail = function() {
	this.payment.check('customerEmail', 'Customer email can\'t be empty').notEmpty();
	this.payment.check('customerEmail', 'Customer email should be a valid email').isEmail();
};
PaymentValidator.prototype.validateValue = function() {
	this.payment.check('value', 'Payment must have a value').notEmpty();
	this.payment.check('value', 'Payment must be a decimal number').isDecimal();
};
PaymentValidator.prototype.hasErrors = function () {
	return this.payment.validationErrors().length > 0;
};
PaymentValidator.prototype.getErrors = function () {
	return this.payment.validationErrors();
};

module.exports = PaymentValidator;