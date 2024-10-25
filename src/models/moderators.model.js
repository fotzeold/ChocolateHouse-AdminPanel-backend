const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const moderatorSchema = new Schema({
	name: { type: String, required: true },
	lastname: { type: String, required: true },
	phone: { type: String, required: true },
	login: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	role: { type: String, required: true },
	createAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Moderator', moderatorSchema);