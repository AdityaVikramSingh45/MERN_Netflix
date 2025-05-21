import dotenv from "dotenv";

dotenv.config();

export const ENV_VARS = {
	MONGO_URI: process.env.MONGO_URL,
	PORT: process.env.PORT || 5000,
	JWT_SECRET: process.env.JWT_SECRET,
	NODE_ENV: process.env.NODE_ENV,
	RAPIDAPI_KEY: process.env.RAPIDAPI_KEY,
	RAPIDAPI_KEY: process.env.RAPIDAPI_KEY,
	PEXEL_API_KEY: process.env.PEXEL_API_KEY,
};