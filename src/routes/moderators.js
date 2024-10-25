const express = require('express');
const Moderators = require('../models/moderators.model.js');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { authUser } = require('../services/authUser.js')
const { verifyToken } = require('../middlewares/verifToken.js')

// Отримання всіх модераторів
router.get('/', async (req, res) => {
	try {
		const moderators = await Moderators.find();
		res.status(200).json({ status: true, result: moderators });
	} catch (error) {
		res.status(500).json({ message: error.message, status: false });
	}
});

// POST маршрут для создания нового модератора
router.post('/', verifyToken, async (req, res) => {
	try {
		const { password } = req.body;


		// Хешируем пароль перед сохранением
		const salt = await bcrypt.genSalt(10); // Генерация соли
		const hashedPassword = await bcrypt.hash(password, salt); // Хеширование пароля

		// Создаем нового модератора с хешированным паролем
		const newModerator = new Moderators({ ...req.body, password: hashedPassword });
		console.log(newModerator)

		await newModerator.save(); // Сохраняем нового модератора в базе данных
		res.status(200).json({ status: true, result: newModerator });
	} catch (error) {
		res.status(500).json({ message: error.message, status: false });
	}
});

// Отримання модератора за ID
router.get('/:id', async (req, res) => {
	try {
		const moderator = await Moderators.findById(req.params.id);
		if (!moderator) {
			return res.status(404).json({ message: 'Moderator not found' });
		}
		res.status(200).json({ status: true, result: moderator });
	} catch (error) {
		res.status(500).json({ message: error.message, status: false });
	}
});

// Оновлення модератора
router.put('/:id', async (req, res) => {
	try {
		const updatedModerator = await Moderators.findByIdAndUpdate(req.params.id, req.body, { new: true });
		if (!updatedModerator) {
			return res.status(404).json({ message: 'Moderator not found' });
		}
		res.status(200).json({ status: true, result: updatedModerator });
	} catch (error) {
		res.status(500).json({ message: error.message, status: false });
	}
});

// Видалення модератора
router.delete('/:id', async (req, res) => {
	try {
		const deletedModerator = await Moderators.findByIdAndDelete(req.params.id);
		if (!deletedModerator) {
			return res.status(404).json({ message: 'Moderator not found' });
		}
		res.status(204).send({ status: true }); // Успішне видалення без контенту
	} catch (error) {
		res.status(500).json({ status: false, message: error.message });
	}
});

router.post('/login', authUser);

router.post('/verif', verifyToken, async (req, res) => {
	try {
		const id = req.userId
		const moderator = await Moderators.findById(id);

		if (!moderator) {
			return res.status(404).json({ message: 'Moderator not found' });
		}
		res.status(200).json({ status: true, result: moderator });
	} catch (error) {
		res.status(500).json({ message: error.message, status: false });
	}
})

module.exports = router;