const ErrorMap = (function (errors) {
	var errorType = null;
	if (errors.sql != null) {
		errorType = 'Sql';
	}
	if (errors.length > 0 && errors[0].location != null ) {
		errorType = 'Validation';
	}
	if (errors.customMessage != null) {
		errorType = 'Custom';
	}

	var errorMapFor = this['for' + errorType];
	if (typeof errorMapFor === 'function') {
		return errorMapFor(errors);
	}
	return {
		errors: [
			{
				message: 'Invalid errors',
				content: JSON.stringify(errors)
			}
		]
	};
});

ErrorMap.prototype.forCustom = function (error) {
	return {
		errors: [
			{
				message: error.customMessage,
				content: error.content
			}
		]
	}
};

ErrorMap.prototype.forSql = function (error) {
	return {
		errors: [
			{
				message: 'Persistence error',
				content: error.sqlMessage
			}
		]
	};
};

ErrorMap.prototype.forValidation = function (errors) {
	const mappedErrors = [];
	errors.forEach((error) => {
		mappedErrors.push({
			message: error.msg,
			content: error.param + '=' + error.value
		});
	});
	return {errors:mappedErrors};
};

module.exports = function () {
	return ErrorMap;
};