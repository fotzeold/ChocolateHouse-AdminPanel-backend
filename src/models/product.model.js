const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
	imgs: { type: [String], required: true },
	name: { type: String, required: true },
	price: { type: Number, required: true },
	discount: { type: Number, default: 0 },
	info: { type: String, required: true },
	category: { type: String, required: true },
	createAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);