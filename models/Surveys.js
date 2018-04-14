const mongoose = require('mongoose');
const {Schema} = mongoose;
const recipientSchema = require('./Recepient');
const surveysSchema = new Schema({
	title: String,
	subject: String,
	body: String,
	recipients: [recipientSchema],
	yes: {
		type: Number,
		default: 0
	},
	no: {
		type: Number,
		default: 0
	},
	_user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	dateSent: Date,
	lastResponded: Date,
	fromField: String,
	sent: Boolean,
	dateCreated: Date
});
mongoose.model('surveys', surveysSchema);
