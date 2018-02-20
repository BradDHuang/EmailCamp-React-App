if (process.env.NODE_ENV === 'production') {
	// env. var.
	module.exports = require('./prod');
} else {
	// we are in development
	module.exports = require('./dev');
}
