const Moderators = require('../models/moderators.model.js'); // Імпорт моделі модераторів
const Clients = require('../models/clients.model.js');
const bcrypt = require('bcryptjs');
const generateToken = require("../utils/generateToken.js");
const { models } = require('mongoose');

const authUser = async (req, res) => {
	const { login, password, type } = req.body; // Отримуємо дані з тіла запиту
	let user

	try {
		if (type === "employee") {
			user = await Moderators.findOne({ login });
		} else {
			user = await Clients.findOne({ login });
		}

		if (!user) {
			return res.status(401).json({ status: false, message: 'Invalid login or password' });
		}

		// Перевірка пароля
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(401).json({ status: false, message: 'Invalid login or password' });
		}

		// Генерація токена
		const token = generateToken(user);
		res.status(200).json({ status: true, token });
	} catch (error) {
		res.status(500).json({ status: false, message: error.message });
	}
};

module.exports = { authUser }
