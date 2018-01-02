const app = require('./config/ExpressConfig')();

app.listen(3000, function () {
	console.log('Server started');
});