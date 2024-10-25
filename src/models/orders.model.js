const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
	clientId: { type: String, default: null }, // Номер клієнта, якщо клієнт авторизований
	products: { type: [String], required: true }, // Масив продуктів
	totalPrice: { type: Number, required: true }, // Загальна сума замовлення
	status: { type: String, required: true }, // Статус замовлення (наприклад: "нове", "в обробці", "відправлено")

	receiver: {
		name: { type: String, required: true }, // Ім'я отримувача
		lastname: { type: String, required: true }, // Прізвище отримувача
		phone: { type: String, required: true }, // Номер телефону отримувача
		email: { type: String }, // Email отримувача (якщо відомо)
		delivery: {
			method: {
				type: String,
				enum: ['Nova Poshta', 'Ukrposhta'], // Доступні методи доставки
				default: 'Nova Poshta' // Можна залишити порожнім за замовчуванням
			},
			address: {
				type: String,
				required: function () {
					return this.receiver.delivery.method !== ''; // Адреса обов'язкова, якщо вибрано метод доставки
				}
			}
		},
		trackingNumber: { type: String } // Трек-номер для відстеження доставки
	},

	createAt: { type: Date, default: Date.now }, // Дата створення замовлення

	actions: [
		{
			eventType: { type: String }, // Тип події (створення, оформлення, відправлення тощо)
			eventDate: { type: Date, default: Date.now } // Дата події
		}
	],

	payments: { type: String, required: true }, // Тип оплати (наложка або платіжка)
	paymentsStatus: { type: Boolean, required: true } // Чи оплачено (true = оплачено, false = не оплачено)
});

module.exports = mongoose.model('Order', orderSchema);
