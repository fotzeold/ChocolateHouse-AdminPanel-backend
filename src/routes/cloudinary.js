// const express = require('express');
// const crypto = require('crypto');
// const router = express.Router();

// router.get('/generate-signature', (req, res) => {
// 	const timestamp = Math.round((new Date()).getTime() / 1000);
// 	const params = `timestamp=${timestamp}`;
// 	const signature = crypto
// 		.createHash('sha256')
// 		.update(`${params}${process.env.CLOUDINARY_API_SECRET}`)
// 		.digest('hex');

// 	res.json({
// 		apiKey: process.env.CLOUDINARY_API_KEY,
// 		signature: signature,
// 		timestamp: timestamp
// 	});
// });

// module.exports = router;


const express = require('express');
const crypto = require('crypto');
const router = express.Router();

router.get('/generate-signature', (req, res) => {
	const timestamp = Math.round((new Date()).getTime() / 1000);
	const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;

	const params = `timestamp=${timestamp}&upload_preset=${uploadPreset}`;
	const signature = crypto
		.createHash('sha1')
		.update(`${params}${process.env.CLOUDINARY_API_SECRET}`)
		.digest('hex');

	res.json({
		apiKey: process.env.CLOUDINARY_API_KEY,
		signature: signature,
		timestamp: timestamp,
		uploadPreset: uploadPreset
	});
});

module.exports = router;