// validation file
const { Joi } = require('celebrate');

module.exports = {
    store_signup_user_data: {
        body: Joi.object({
            name: Joi.string()
                .required()
                .messages({
                    'string.base': 'Name must be a text value.',
                    'string.empty': 'Name is required.',
                    'any.required': 'Name is required.'
                }),

            email: Joi.string()
                .email()
                .required()
                .messages({
                    'string.base': 'Email must be a text value.',
                    'string.empty': 'Email is required.',
                    'string.email': 'Please enter a valid email address.',
                    'any.required': 'Email is required.'
                }),

            password: Joi.string()
                .min(6)
                .required()
                .messages({
                    'string.base': 'Password must be a text value.',
                    'string.empty': 'Password is required.',
                    'string.min': 'Password must be at least 6 characters.',
                    'any.required': 'Password is required.'
                }),

            confirmPassword: Joi.string()
                .required()
                .messages({
                    'string.empty': 'Confirm password is required.',
                    'any.required': 'Confirm password is required.'
                }),

            country: Joi.string()
                .required()
                .messages({
                    'string.empty': 'Country is required.',
                    'any.required': 'Country is required.'
                }),

            dob: Joi.string()
                .required()
                .messages({
                    'string.empty': 'Date of birth is required.',
                    'any.required': 'Date of birth is required.'
                }),
        })
    },

    login_user_data: {
        body: Joi.object({
            email: Joi.string()
                .email()
                .required()
                .messages({
                    'string.empty': 'Email is required.',
                    'string.email': 'Please enter a valid email address.',
                    'any.required': 'Email is required.'
                }),

            password: Joi.string()
                .required()
                .messages({
                    'string.empty': 'Password is required.',
                    'any.required': 'Password is required.'
                }),
        })
    }
};