const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
	name: {
		type: String,
		required: true
	},
	info: {
		type: String,
		required: false,
		default: ""
	}
});

module.exports = mongoose.model('Category', categorySchema);