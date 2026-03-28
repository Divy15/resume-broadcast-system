const {Joi} = require('celebrate');

module.exports = {

    hr_registration_bar_chart: {
        body: {
            month: Joi.string().required().messages({
                'string.empty': 'Month is required.',
                'any.required': 'Month is required.'
            }),
            year: Joi.number().required().messages({
                'number.base': 'Year must be a number.',
                'any.required': 'Year is required.'
            }),
            timezone: Joi.string().required().messages({
                'string.empty': 'Timezone is required.',
                'any.required': 'Timezone is required.'
            })
        }
    },

    company_registration_bar_chart: {
        body: {
            month: Joi.string().required().messages({
                'string.empty': 'Month is required.',
                'any.required': 'Month is required.'
            }),
            year: Joi.number().required().messages({
                'number.base': 'Year must be a number.',
                'any.required': 'Year is required.'
            }),
            timezone: Joi.string().required().messages({
                'string.empty': 'Timezone is required.',
                'any.required': 'Timezone is required.'
            })
        }
    },
}