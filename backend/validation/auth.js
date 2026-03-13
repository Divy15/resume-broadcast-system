const {Joi} = require('celebrate');

module.exports = {

    store_signup_user_data: {
        body: Joi.object({
        name : Joi.string().required(), 
        email : Joi.string().email().required(), 
        password : Joi.string().required(), 
        confirmPassword : Joi.string().required(), 
        country : Joi.string().required(), 
        dob : Joi.string().required()
        })
    },

    login_user_data: {
        body: Joi.object({
            email: Joi.string().required(),
            password: Joi.string().required()
        })
    }
}