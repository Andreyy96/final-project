import Joi from "joi";
import {IUser} from "../interfaces/user.interface";
import {regexConstant} from "../constants/regex.constant";

export class AuthValidator {
        public static schemaForCreateUser: Joi.ObjectSchema<Partial<IUser>> =
        Joi.object({
            name: Joi.string().min(3).max(20).trim().required(),
            surname: Joi.string().min(3).max(20).trim().required(),
            email: Joi.string()
                .regex(regexConstant.EMAIL)
                .lowercase()
                .trim()
                .required(),
            password: Joi.string().trim().required(),

        });

    public static schemaForLogin: Joi.ObjectSchema<Partial<IUser>> =
        Joi.object({
            email: Joi.string()
                .regex(regexConstant.EMAIL)
                .lowercase()
                .trim()
                .required(),
            password: Joi.string().trim().required(),
        });
}