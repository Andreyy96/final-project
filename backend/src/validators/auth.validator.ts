import Joi from "joi";

import { regexConstant } from "../constants/regex.constant";
import { IUser } from "../interfaces/user.interface";

export class AuthValidator {
  public static schemaForLogin: Joi.ObjectSchema<Partial<IUser>> = Joi.object({
    email: Joi.string()
      .regex(regexConstant.EMAIL)
      .lowercase()
      .trim()
      .required(),
    password: Joi.string().trim().required(),
  });

  public static schemaForSetPassword: Joi.ObjectSchema<{
    password: string;
    confirm_password: string;
  }> = Joi.object({
    password: Joi.string().regex(regexConstant.PASSWORD).trim().required(),
    confirm_password: Joi.string()
      .regex(regexConstant.PASSWORD)
      .trim()
      .required(),
  });

  public static recoveryPassword = Joi.object({
    email: Joi.string()
      .regex(regexConstant.EMAIL)
      .lowercase()
      .trim()
      .required(),
  });
}
