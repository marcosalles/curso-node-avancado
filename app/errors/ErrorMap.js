const ErrorMap = (function (errors) {
	const mappedErrors = [];
	errors.forEach((error) => {
		mappedErrors.push({
			message: error.msg,
			content: error.param + '=' + error.value
		});
	});
	return {errors:mappedErrors};
});
module.exports = function () {
	return ErrorMap;
};