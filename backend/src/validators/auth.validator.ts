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
    password: Joi.string()
      .regex(regexConstant.PASSWORD)
      .trim()
      .required()
      .messages({
        "string.pattern.base": "invalid password",
        "string.empty": `"password" cannot be an empty field`,
        "any.required": `"password" is a required field`,
      }),
    confirm_password: Joi.string()
      .regex(regexConstant.PASSWORD)
      .trim()
      .required()
      .messages({
        "string.empty": `"email" cannot be an empty field`,
        "any.required": `"confirm_password" is a required field`,
        "any.only": `"confirm_password" not equal "email"`,
      }),
  });
}
