const keys = require('../config/keys');
const stripe = require('stripe')(keys.stipeSecretKey);
const requireLogin = require('../middlewares/requireLogin');
const logger = require('../services/logger');
module.exports = (app) => {
	app.post('/api/stripe', requireLogin, async (req, res) => {

		const charge = await stripe.charges.create({
			amount: 500, currency: "usd", source: req.body.id, // obtained with Stripe.js
			description: "Charge for andrew.white@example.com"
		});
		req.user.credits += 5;
		logger.info(`user with id ${req.user.id} added 5 credits. Total creadits: ${req.user.credits}`);
		const user = await req.user.save();
		res.send(user);
	});

};
