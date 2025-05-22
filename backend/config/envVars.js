const dotenv = require("dotenv");

dotenv.config();

exports.ENV_VARS = {
	MONGO_URL: process.env.MONGO_URL,
	PORT: process.env.PORT || 5000,
	JWT_SECRET: process.env.JWT_SECRET,
	NODE_ENV: process.env.NODE_ENV,
	RAPIDAPI_KEY: process.env.RAPIDAPI_KEY,
	PEXEL_API_KEY: process.env.PEXEL_API_KEY,
};