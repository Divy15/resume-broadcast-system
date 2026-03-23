const {Joi} = require('celebrate');

module.exports = {

    get_job_info : {
        body : Joi.object({
            jobid: Joi.number().required().messages({
                'number.base': 'Job ID must be a number.',
                'any.required': 'Job ID is required.'
            })
        })
    }
}