const {Joi} = require('celebrate');

module.exports = {

    store_template_info: {
        body: Joi.object({
            name: Joi.string().required(),
            subject: Joi.string().required(),
            body: Joi.string().required()
        })
    },

    get_filter_template_list: {
        body: Joi.object({
            template_name: Joi.string().required()
        })
    },

    get_template_info: {
        body: Joi.object({
            templateid: Joi.number().required()
        })
    },

    delete_template: {
        body: Joi.object({
            templateid: Joi.number().required()
        })
    },

    update_template_info: {
        body: Joi.object({
            templateid: Joi.number().required(),
            template_subject : Joi.string().allow(null, '').required(), 
            template_name : Joi.string().allow(null, '').required(), 
            template_body : Joi.string().allow(null, '').required()
        })
    }
}