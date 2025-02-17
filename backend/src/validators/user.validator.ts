import Joi from "joi";
import {IDTOUser} from "../interfaces/user.interface";
import {regexConstant} from "../constants/regex.constant";

export class UserValidator {
    public static schemaForCreateUser: Joi.ObjectSchema<IDTOUser> =
        Joi.object({
            name: Joi.string().min(3).max(20).trim().required(),
            surname: Joi.string().min(3).max(20).trim().required(),
            email: Joi.string()
                .regex(regexConstant.EMAIL)
                .lowercase()
                .trim()
                .required(),
        });


}