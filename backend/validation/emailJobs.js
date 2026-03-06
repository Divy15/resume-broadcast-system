const {Joi} = require('celebrate');

module.exports = {

    get_job_info : {
        body : Joi.object({
            jobid: Joi.number().required()
        })
    }
}