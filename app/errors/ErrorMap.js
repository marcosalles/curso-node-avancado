const ErrorMap = (function (errors) {
	var errorType = null;
	if (errors.sql !== undefined) {
		errorType = 'Sql';
	}
	if (errors.length > 0 && errors[0].location !== undefined) {
		errorType = 'Validation';
	}

	var errorMapFor = this['for' + errorType];
	if (errorMapFor === 'function') {
		return errorMapFor(errors);
	}
	return {
		errors: [
			{
				message: 'Invalid errors',
				content: errors.toString()
			}
		]
	};
});
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