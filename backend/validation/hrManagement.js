const {Joi} = require('celebrate');

module.exports = {

    getSelectedHRInfoList : {
        body : Joi.object({
            hrIds : Joi.array().items(Joi.number()).required().messages({
                'any.required' : 'hrIds is required',
                'array.base' : 'hrIds must be an array of integers',
                'array.items' : 'Each hrId must be an integer'
            })
        })
    },

    storeHrInfo: {
        body: Joi.object({
            hrName: Joi.string().required().messages({
                'any.required': 'hrName is required',
                'string.base': 'hrName must be a string'
            }),
            companyName: Joi.string().required().messages({
                'any.required': 'companyName is required',
                'string.base': 'companyName must be a string'
            }),
            hrEmail: Joi.string().email().required().messages({
                'any.required': 'hrEmail is required',
                'string.email': 'hrEmail must be a valid email address'
            }),
            positionName: Joi.string().required().messages({
                'any.required': 'positionName is required',
                'string.base': 'positionName must be a string'
            }),
            companyWebsite: Joi.string().allow(null, '').required().messages({
                'any.required': 'companyWebsite is required',
                'string.uri': 'companyWebsite must be a valid URL'
            }),
            hrMobile: Joi.string().min(10).max(10).regex(/^[0-9]+$/).required().allow(null, '').messages({
                'any.required': 'hrMobile is required',
                'string.base': 'hrMobile must be a string',
                'string.pattern.base': 'hrMobile must be a valid phone number'
            }),
            hrLinkedInProfile: Joi.string().allow(null, '').required().messages({
                'any.required': 'HR LinkedIn profile like is required',
                'string.uri': 'HR LinkedIn profile like must be a valid URL'
            }),
        })
    },

    getPostionList: {
        body: Joi.object({
            positionName: Joi.string().optional().messages({
                'string.base': 'positionName must be a string'
            })
        })
    },

    getHRInfoList: {
        body: Joi.object({
            searchTerm: Joi.string().allow(null, '').required().messages({
                'string.base': 'searchTerm must be a string'
            }),
            filterName: Joi.string().valid('all_records', 'hr_asc', 'hr_desc', 'not_applied_yet', '').required().messages({
                'string.base': 'filterName must be a string',
                'any.only': 'filterName must be either all_records, hr_asc, hr_desc or not_applied_yet'
            })
        })
    },

    get_hr_details: {
        body: Joi.object({
            id: Joi.number().required().messages({
                'number.base': "HR id must be number",
                "any.required": "HR id is required for get details."
            })
        })
    },

    delete_hr_details: {
        body: Joi.object({
            id: Joi.number().required().messages({
                'number.base': "HR id must be number",
                "any.required": "HR id is required for get details."
            })
        })
    },

    update_hr_details: {
    body: Joi.object({
        id: Joi.string().required().messages({
            'string.base': 'HR ID should be a type of text',
            'string.empty': 'HR ID cannot be an empty field',
            'any.required': 'HR ID is a required field'
        }),
        company_name: Joi.string().required().messages({
            'any.required': 'companyName is required',
            'string.base': 'companyName must be a string'
        }),
        hr_name: Joi.string().required().messages({
            'any.required': 'hrName is required',
            'string.base': 'hrName must be a string'
        }),
        email: Joi.string().email().required().messages({
            'any.required': 'hrEmail is required',
            'string.email': 'hrEmail must be a valid email address'
        }),
        mobileno: Joi.string().min(10).max(10).regex(/^[0-9]+$/).allow(null, '').required().messages({
            'any.required': 'hrMobile is required',
            'string.base': 'hrMobile must be a string',
            'string.pattern.base': 'hrMobile must be a valid phone number'
        }),
        company_website: Joi.string().allow(null, '').required().messages({
            'any.required': 'companyWebsite is required',
            'string.uri': 'companyWebsite must be a valid URL'
        }),
        hr_linkedin_profile_link: Joi.string().allow(null, '').required().messages({
            'any.required': 'HR LinkedIn profile link is required'
        })
    })
    },
}