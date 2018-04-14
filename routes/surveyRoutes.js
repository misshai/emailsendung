const mongoose = require('mongoose');
const _ = require('lodash');
const {Path} = require('path-parser');
const {URL} = require('url');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailtemplates/surveyTemplate');
const Survey = mongoose.model('surveys');

module.exports = (app) => {

	app.delete('/api/surveys', requireLogin, async function(req, res) {
		console.log(req.query.surveyId)
		const result = await Survey.findByIdAndRemove(req.query.surveyId);
		res.status(200).send(req.query.surveyId);
	});

	app.get('/api/surveys', requireLogin, async (req, res) => {
		console.log('hgfhgfjhkhkate123123123123');
		let surveys = await Survey.find({_user: req.user.id}).select({recipients: false});
		res.send(surveys);
	});

	app.get('/api/surveys/:surveyId/:choice', (req, res) => {
		res.send('Thanks for voting!');
	});

	app.post('/api/surveys/:surveyId', requireLogin, async (req, res) => {
		const {
			title,
			subject,
			body,
			recipients,
			fromField,
			sent,
			surveyId
		} = req.body;
		let dateSent = undefined;
		try {
			if (sent) {
				dateSent = Date.now();
				const mailer = new Mailer({
					subject,
					recipients: recipients.split(',').map(email => ({email: email.trim()})),
					fromField
				}, surveyTemplate({body, id: surveyId}));
				await mailer.send();
			}
			console.log(surveyId)
			await Survey.updateOne({
				_id: surveyId
			}, {
				title,
				subject,
				body,
				sent,
				recipients: recipients.split(',').map(email => ({email: email.trim()})),
				dateSent,
				fromField

			}).exec();

			res.send(req.user);
		} catch (err) {
			console.log(err)
			res.status(422).send(err);
		}
	});
	app.post('/api/surveys/webhooks', (req, res) => {
		console.log('hgfhgfjhkhkate123123123123webhook');
		const p = new Path('/api/surveys/:surveyId/:choice');

		_.chain(req.body).map(({email, url}) => {
			const match = p.test(new URL(url).pathname);
			if (match) {
				return {email, surveyId: match.surveyId, choice: match.choice};
			}
		}).compact().uniqBy('email', 'surveyId').each(({surveyId, email, choice}) => {
			Survey.updateOne({
				_id: surveyId,
				recipients: {
					$elemMatch: {
						email: email,
						responded: false
					}
				}
			}, {
				$inc: {
					[choice]: 1
				},
				$set: {
					'recipients.$.responded': true
				},
				lastResponded: new Date()
			}).exec();
		}).value();

		res.send({});
	});

	app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
		const {
			title,
			subject,
			body,
			recipients,
			fromField,
			sent,
			surveyId
		} = req.body;

		const survey = new Survey({
			title,
			subject,
			body,
			sent,
			recipients: recipients.split(',').map(email => ({email: email.trim()})),
			_user: req.user.id,
			dateCreated: Date.now(),

			fromField
		});

		// Great place to send an email!

		try {
			if (sent) {
				survey.dateSent = Date.now();
				const mailer = new Mailer({
					subject,
					recipients: recipients.split(',').map(email => ({email: email.trim()})),
					fromField
				}, surveyTemplate(survey));
				await mailer.send();
			}
			await survey.save();
			req.user.credits -= 1;
			const user = await req.user.save();

			res.send(user);
		} catch (err) {
			console.log(err)
			res.status(422).send(err);
		}
	});

}
