const passport = require('passport');

module.exports = app => {
	app.get(
		'/auth/google',
		passport.authenticate('google', {
			scope: ['profile', 'email']
		})
	);
	// 'google' is the internal identifier for using GoogleStrategy.
	// scope is access scope.
	app.get(
		'/auth/google/callback',
		passport.authenticate('google'),
		(req, res) => {
			res.redirect('/surveys');
		}
	);

	app.get('/api/logout', (req, res) => {
		req.logout();
		// res.send(req.user);
		// console.log('You are logged out');
		res.redirect('/');
	});

	app.get('/api/current_user', (req, res) => {
		res.send(req.user);

		// res.send(req.session);
		// { "passport": { "user": "5a8b54a226124b331c2a24fd" } }
	});
};
