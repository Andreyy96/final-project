import Joi from "joi";

const userValidator = Joi.object({
    email: Joi.string().pattern(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/).required().messages({
        'string.pattern.base':'invalid email',
    }),
    password: Joi.string().required().messages({
        'string.required':'password is required',
    }),
})

export {
    userValidator
}