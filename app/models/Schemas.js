const schemas = require('../DatabaseSchemas');
Object.keys(schemas).map(function (model) {
	Object.keys(schemas[model]).map(function (attribute) {
		schemas[model][attribute] = null;
	})
});

module.exports = schemas;