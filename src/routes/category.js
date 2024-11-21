const express = require('express');
const Category = require('../models/category.models.js');
const router = express.Router();
const { verifyToken } = require('../middlewares/verifToken.js')

router.get('/', async (req, res) => {
	try {
		const categories = await Category.find();
		res.status(200).json({ status: true, result: categories });
	} catch (error) {
		res.status(500).json({ message: error.message, status: false });
	}
});

router.get('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const categories = await Category.findById(id);
		res.status(200).json({ status: true, result: categories });
	} catch (error) {
		res.status(500).json({ message: error.message, status: false });
	}
});

router.post('/', verifyToken, async (req, res) => {
	try {
		const { name, info } = req.body;
		const newCategory = new Category({ name, info });
		await newCategory.save()
		res.status(201).json({ status: true, result: newCategory });
	} catch (error) {
		res.status(500).json({ message: error.message, status: false });
	}
});

router.delete('/:id', verifyToken, async (req, res) => {
	try {
		const { id } = req.params;
		const deletedCategory = await Category.findByIdAndDelete(id);
		if (!deletedCategory) {
			return res.status(404).json({ status: false, message: 'Такої категорії не існує' });
		}
		res.status(200).json({ status: true, message: 'Категорія успішно видалена' });
	} catch (error) {
		res.status(500).json({ message: error.message, status: false });
	}
});

router.put('/:id', verifyToken, async (req, res) => {
	try {
		const { id } = req.params;
		const { name, info } = req.body;
		const updatedCategory = await Category.findByIdAndUpdate(id, { name, info }, { new: true });
		if (!updatedCategory) return res.status(404).json({ status: false, message: 'Такої категорії не існує' });
		res.status(200).json({ status: true, result: updatedCategory });
	} catch (error) {
		res.status(500).json({ message: error.message, status: false });
	}
});

module.exports = router;