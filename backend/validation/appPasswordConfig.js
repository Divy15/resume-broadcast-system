const {Joi} = require('celebrate');


module.exports = {
    store_app_password : {
        body : Joi.object({
            email: Joi.string().email().required().messages({
                'string.empty': 'Email is required.',
                'string.email': 'Please enter a valid email address.',
                'any.required': 'Email is required.'
            }),
            password: Joi.string().required().messages({
                'string.empty': 'App Password is required.',
                'any.required': 'App Password is required.'
            })
        })
    }
}