const {Joi} = require('celebrate');

module.exports = {

    store_template_info: {
        body: Joi.object({
            name: Joi.string().required().messages({
                'string.empty': 'Template name is required.',
                'any.required': 'Template name is required.'
            }),
            subject: Joi.string().required().messages({
                'string.empty': 'Email subject is required.',
                'any.required': 'Email subject is required.'
            }),
            body: Joi.string().required().messages({
                'string.empty': 'Email body is required.',
                'any.required': 'Email body is required.'
            })
        })
    },

    get_filter_template_list: {
        body: Joi.object({
            template_name: Joi.string().required().messages({
                'string.empty': 'Template name is required to filter.',
                'any.required': 'Template name is required to filter.'
            })
        })
    },

    get_template_info: {
        body: Joi.object({
            templateid: Joi.number().required().messages({
                'number.base': 'Template ID must be a valid number.',
                'any.required': 'Template ID is required.'
            })
        })
    },

    delete_template: {
        body: Joi.object({
            templateid: Joi.number().required().messages({
                'number.base': 'Template ID must be a valid number.',
                'any.required': 'Template ID is required.'
            })
        })
    },

    update_template_info: {
        body: Joi.object({
            templateid: Joi.number().required().messages({
                'number.base': 'Template ID must be a valid number.',
                'any.required': 'Template ID is required.'
            }),
            template_subject : Joi.string().allow(null, '').required().messages({
                'any.required': 'Template subject is required.'
            }), 
            template_name : Joi.string().allow(null, '').required().messages({
                'any.required': 'Template name is required.'
            }), 
            template_body : Joi.string().allow(null, '').required().messages({
                'any.required': 'Template body is required.'
            })
        })
    }
}