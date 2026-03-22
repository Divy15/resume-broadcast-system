const {Joi} = require('celebrate');


module.exports = {
    store_app_password : {
        body : Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        })
    }
}