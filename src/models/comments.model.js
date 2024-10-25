const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
	clientId: { type: String, required: true },
	prodId: { type: String, required: true },
	rate: { type: Number, required: true },
	text: { type: String, required: true },
	createAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', commentSchema);