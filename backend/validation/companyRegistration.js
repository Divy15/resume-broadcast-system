const { Joi } = require('celebrate');

module.exports = {
    get_filtered_company_list: {
        body: Joi.object({
            name: Joi.string().required().messages({
                'string.base': 'Company name must be in string.',
                'any.required': 'Company name is required.'
            })
        })
    },

    store_company_data: {
        body: Joi.object({
            name: Joi.string().required().messages({
                'string.base': 'Company name must be in string.',
                'any.required': 'Company name is required.'
            }),
            // Use .string().uri() instead of .url()
            website: Joi.string().uri().required().messages({
                'string.uri': 'Company website link must be a valid URL.',
                'any.required': 'Company website is required.'
            }),
            linkedIn: Joi.string().uri().allow(null, '').messages({
                'string.uri': 'LinkedIn link must be a valid URL.',
            }),
        })
    },

    update_company_data: {
        body: Joi.object({
            company_id: Joi.number().required().messages({
                'number.base': 'Company id must be number.',
                'any.required': 'Company id is required.'
            }),
            name: Joi.string().required().messages({
                'string.base': 'Company name must be in string.',
                'any.required': 'Company name is required.'
            }),
            website: Joi.string().uri().required().messages({
                'string.uri': 'Company website link must be a valid URL.',
                'any.required': 'Company website is required.'
            }),
            linkedIn: Joi.string().uri().allow(null, '').messages({
                'string.uri': 'LinkedIn link must be a valid URL.',
            }),
        })
    },

    get_company_data: {
        body: Joi.object({
            company_id: Joi.number().required().messages({
                'number.base': 'Company id must be number.',
                'any.required': 'Company id is required.'
            })
        })
    },

    delete_company_data: {
        body: Joi.object({
            company_id: Joi.number().required().messages({
                'number.base': 'Company id must be number.',
                'any.required': 'Company id is required.'
            })
        })
    }
};