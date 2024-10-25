const verifyApiKey = (req, res, next) => {
	const apiKey = req.headers['api-key'];
	if (!apiKey || apiKey !== process.env.API_KEY) return res.status(403).json({ status: false, message: 'В доступі відмовлено' });
	next();
};

module.exports = verifyApiKey;