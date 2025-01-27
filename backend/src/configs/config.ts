import dotenv from "dotenv";

dotenv.config({path: "../.env"});

export const configs = {
    APP_PORT: process.env.APP_PORT || 3000,
    APP_HOST: process.env.APP_HOST,
    FRONT_URL: process.env.FRONT_URL,

    MONGO_URI: process.env.MONGO_URI,

    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_ACCESS_EXPIRATION: process.env.JWT_ACCESS_EXPIRATION,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    JWT_REFRESH_EXPIRATION: process.env.JWT_REFRESH_EXPIRATION,

    HASH_ROUNDS: process.env.HASH_ROUNDS,
}