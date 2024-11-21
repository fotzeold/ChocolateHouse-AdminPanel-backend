const express = require('express');
const Products = require('../models/product.model.js');
const router = express.Router();
const { verifyToken } = require('../middlewares/verifToken.js')

router.get('/', async (req, res) => {
	try {
		const products = await Products.find();
		res.status(200).json({ status: true, result: products });
	} catch (error) {
		res.status(500).json({ message: error.message, status: false });
	}
});

router.get('/:id', async (req, res) => {
	const id = req.params.id
	try {
		const product = await Products.findById(id);
		res.status(200).json({ status: true, result: product });
	} catch (error) {
		res.status(500).json({ message: error.message, status: false });
	}
});

module.exports = router;