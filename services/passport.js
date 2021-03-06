const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
	// user: model instance.
	done(null, user.id); // mongo generated this id.
	//  "_id": { "$oid": "5a8b54a226124b331c2a24fd" }
}); // done is a callback.
// null means no err.

// deserializeUser used to turn user.id into a user.
passport.deserializeUser((id, done) => {
	// user.id
	User.findById(id) // User: model class.
		.then(user => {
			// user: model instance.
			done(null, user);
		});
});

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback',
			proxy: true
			// true means proxy is trusted, eg. http:// is ok.
			// Browser -> Heroku Proxy -> Our Server @Heroku
			// Proxy act as the "Load Balancer"
		},
		async (accessToken, refreshToken, profile, done) => {
			// Promise is used below.
			const existingUser = await User.findOne({ googleId: profile.id });
			if (existingUser) {
				return done(null, existingUser);
				// null means no err.
			}
			const user = await new User({ googleId: profile.id }).save();
			done(null, user);
			// save to DB.
			// console.log('at', accessToken);
			// console.log('rt', refreshToken);
			// console.log('pf', profile);
		} // this is the callback func.
	)
);
