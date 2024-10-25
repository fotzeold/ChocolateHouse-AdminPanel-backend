const jwt = require('jsonwebtoken');

const generateToken = (user) => {
	let data = { id: user._id }
	if (user.role) { data.role = user.role }
	return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '24h' });
};

module.exports = generateToken
