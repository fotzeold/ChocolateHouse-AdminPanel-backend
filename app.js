require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const moderatorsRouter = require("./src/routes/moderators.js")
const productsRouter = require("./src/routes/products.js")
const categoryRouter = require("./src/routes/category.js")
const cloudinaryRouter = require("./src/routes/cloudinary.js")
const verifyApiKey = require("./src/middlewares/verifyApiKey.js")
const app = express()

app.use(cors())
app.use(express.json())
app.use(verifyApiKey)

app.use("/admin", moderatorsRouter)
app.use("/products", productsRouter)
app.use("/categories", categoryRouter)
app.use("/cloudinary", cloudinaryRouter)

async function main() {
	await mongoose.connect(process.env.MONGO_DB)
}

main()
	.then(() => console.log("MongoDB connected!"))
	.catch((err) => console.log(err))

app.listen(process.env.PORT, () => console.log("Server was runned on port: " + process.env.PORT))
