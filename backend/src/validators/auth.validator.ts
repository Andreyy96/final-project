import Joi from "joi";
import {IUser} from "../interfaces/user.interface";
import {regexConstant} from "../constants/regex.constant";

export class AuthValidator {
    public static schemaForLogin: Joi.ObjectSchema<Partial<IUser>> =
        Joi.object({
            email: Joi.string()
                .regex(regexConstant.EMAIL)
                .lowercase()
                .trim()
                .required(),
            password: Joi.string().trim().required(),
        });

    public static schemaForSetPassword: Joi.ObjectSchema<{ password: string, confirm_password: string }> =
        Joi.object({
            password: Joi.string().min(8).trim().required(),
            confirm_password: Joi.string().min(8).trim().required(),
        });
}