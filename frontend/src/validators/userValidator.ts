import Joi from "joi";

const userValidator = Joi.object({
    email: Joi.string().pattern(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/).required().messages({
        'string.pattern.base':'invalid email',
        'string.base':'email'
    }),
    password: Joi.string().min(5).required().messages({
        'string.min':'min 5 letters',
        'string.required':'password is required',
    }),
})

export {
    userValidator
}