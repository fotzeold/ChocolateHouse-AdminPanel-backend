const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
	const token = req.headers['authorization']?.split(' ')[1]; // Отримуємо токен з заголовка

	if (!token) return res.status(403).json({ status: false, message: 'В доступі відмовлено' });

	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) return res.status(401).json({ status: false, message: 'В доступі відмовлено' })

		req.userId = decoded.id;
		if (decoded.role) req.userRole = decoded.role
		next();
	});
};

// Експортуємо всі мідлвейри
module.exports = { verifyToken };