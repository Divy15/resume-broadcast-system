const express = require('express');
const router = express.Router();
const {celebrate, Segments} = require('celebrate');
const authCheck = require('../middleware/auth.js');
const companyRegisterCtrl = require('../controller/companyRegistration.js');
const paramValidation = require('../validation/companyRegistration.js');

// Get Registered company count
router.route('/company/count')
.get(
    authCheck,
    companyRegisterCtrl.get_registered_company_count
);

// Get filtered company list
router.route('/filtered/company/list')
.post(
    authCheck,
    celebrate({[Segments.BODY]: paramValidation.get_filtered_company_list.body}),
    companyRegisterCtrl.get_filtered_company_list
);

// Get company list
router.route('/company/list')
.get(
    authCheck,
    companyRegisterCtrl.get_company_list
);

// Store Company data 
router.route('/store/company/data')
.post(
    authCheck,
    celebrate({[Segments.BODY]: paramValidation.store_company_data.body}),
    companyRegisterCtrl.store_company_data
);

// Update company data
router.route('/update/company/data')
.post(
    authCheck,
    celebrate({[Segments.BODY]: paramValidation.update_company_data.body}),
    companyRegisterCtrl.update_company_data
);

// Get company data 
router.route('/company/data')
.post(
    authCheck,
    celebrate({[Segments.BODY]: paramValidation.get_company_data.body}),
    companyRegisterCtrl.get_company_data
);

// Delete company data 
router.route('/delete/company/data')
.post(
    authCheck,
    celebrate({[Segments.BODY]: paramValidation.delete_company_data.body}),
    companyRegisterCtrl.delete_company_data
);

module.exports = router;