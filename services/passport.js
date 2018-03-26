const passport = require('passport');
const mongoose = require('mongoose');
const googlesStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys.js');
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then((user) => {
		done(null, user);
	});
});

passport.use(new googlesStrategy({
	clientID: keys.googleClientID,
	clientSecret: keys.googleSecret,
	callbackURL: '/auth/google/kate',
	proxy: true
}, async (accessToken, refreshToken, profile, done) => {
	const foundUser = await User.findOne({googleId: profile.id});
	if (foundUser) {
		return done(null, foundUser);
	}
	const user = await new User({googleId: profile.id}).save();
	done(null, user);

}));
