const {Joi} = require('celebrate');

module.exports = {

    update_profile_password_details: {
        body: Joi.object({
            newPassword: Joi.string().min(6).required().messages({
                'string.empty': 'New password is required.',
                'string.min': 'New password must be at least 6 characters.',
                'any.required': 'New password is required.'
            }),
            confirmPassword: Joi.string().required().messages({
                'string.empty': 'Confirm password is required.',
                'any.required': 'Confirm password is required.'
            })
        })
    },

    update_profile_details: {
        body: Joi.object({
            username: Joi.string().required().messages({
                'string.empty': 'Username is required.',
                'any.required': 'Username is required.'
            }),
            email: Joi.string().email().required().messages({
                'string.empty': 'Email is required.',
                'string.email': 'Please enter a valid email address.',
                'any.required': 'Email is required.'
            })
        })
    }
}