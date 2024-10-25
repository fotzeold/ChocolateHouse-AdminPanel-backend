const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
	name: { type: String, required: true },
	lastname: { type: String, required: true },
	phone: { type: String, required: true },
	login: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	delivery: {
		method: {
			type: String,
			enum: ['Nova Poshta', 'Ukrposhta'], // Доступні методи доставки
			default: '' // Можна залишити порожнім за замовчуванням
		},
		address: {
			type: String,
			required: function () {
				return this.delivery.method !== ''; // Адреса обов'язкова, якщо вибрано метод доставки
			}
		}
	},
	createAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Client', clientSchema);
