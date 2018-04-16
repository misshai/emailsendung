const passport = require('passport');
const logger = require('../services/logger');
module.exports = (app) => {
	app.get('/auth/google', passport.authenticate('google', {
		scope: ['profile', 'email']
	}));
	app.get('/auth/google/kate', passport.authenticate('google'), (req, res) => {
		logger.info(
			`user with id ${ (req.user)
			? req.user.id
			: null} logged in`);
		res.redirect('/surveys');
	});
	app.get('/api/user', (req, res) => {
		logger.info(
			`user with id ${ (req.user)
			? req.user.id
			: null} got info`);
		res.send(req.user);
	});
	app.get('/api/logout', (req, res) => {
		logger.info(`user with id ${req.user._id} logged out`);
		req.logout();
		res.redirect('/');
	});

}
