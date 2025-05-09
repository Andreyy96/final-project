import dotenv from "dotenv";

import { IConfig } from "./config.interface";

dotenv.config({ path: "./.env" });

const configs: IConfig = {
  APP_PORT: process.env.APP_PORT || 3000,
  APP_HOST: process.env.APP_HOST,
  FRONT_URL: process.env.FRONT_URL,

  MONGO_URI: process.env.MONGO_URI,

  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_ACCESS_EXPIRATION: process.env.JWT_ACCESS_EXPIRATION,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRATION: process.env.JWT_REFRESH_EXPIRATION,

  ACTION_RECOVERY_PASSWORD_SECRET: process.env.ACTION_RECOVERY_PASSWORD_SECRET,
  ACTION_RECOVERY_PASSWORD_EXPIRATION:
    process.env.ACTION_RECOVERY_PASSWORD_EXPIRATION,
  ACTION_ACTIVATE_SECRET: process.env.ACTION_ACTIVATE_SECRET,
  ACTION_ACTIVATE_EXPIRATION: process.env.ACTION_ACTIVATE_EXPIRATION,

  SMTP_EMAIL: process.env.SMTP_EMAIL,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,

  HASH_ROUNDS: process.env.HASH_ROUNDS,
};

export { configs };
