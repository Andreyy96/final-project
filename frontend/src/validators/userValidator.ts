import Joi from "joi";
import {regexConstant} from "../constants/regex.ts";

const userValidator = Joi.object({
    email: Joi.string().pattern(regexConstant.EMAIL).required().messages({
        'string.pattern.base':'invalid email',
        'string.empty': `"email" cannot be an empty field`,
        'any.required': `"email" is a required field`
    }),
    password: Joi.string().required().messages({
        'string.required':'password is required',
        'string.empty': `"password" cannot be an empty field`,
        'any.required': `"password" is a required field`
    }),
})

const createManagerValidator = Joi.object({
    name: Joi.string().min(3).max(20).trim().required().messages({
        'string.empty': `"name" cannot be an empty field`,
        'any.required': `"name" is a required field`
    }),
    surname: Joi.string().min(3).max(20).trim().required().messages({
        'string.empty': `"surname" cannot be an empty field`,
        'any.required': `"surname" is a required field`
    }),
    email: Joi.string().regex(regexConstant.EMAIL).required().messages({
        'string.pattern.base': 'invalid email',
        'string.empty': `"email" cannot be an empty field`,
        'any.required': `"email" is a required field`,
    }),
})

const schemaForSetPassword =  Joi.object({
        password: Joi.string().regex(regexConstant.PASSWORD).trim().required().messages({
            'string.pattern.base':'invalid password',
            'string.empty': `"email" cannot be an empty field`,
            'any.required': `"email" is a required field`
        }),
        confirm_password: Joi.string().valid(Joi.ref('password')).required().messages({
            'string.empty': `"email" cannot be an empty field`,
            'any.required': `"email" is a required field`,
            'any.ref': `"confirm_email" not equal "email"`
        }),
    });


export {
    userValidator,
    createManagerValidator,
    schemaForSetPassword
}