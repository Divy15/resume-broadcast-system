const express = require('express');
const router = express.Router();
const {celebrate, Segments} = require('celebrate');
const hrManagementController = require('../controller/hrManagement.js');
const paramValidation = require('../validation/hrManagement.js');
const upload = require('../middleware/upload');
const authCheck = require('../middleware/auth.js');

// Get Dashboard summary in HR Management page
router.route('/dashboard/summary')
.get(
    authCheck,
    hrManagementController.dashboardCount
);


// Store HR Information
router.route('/store/hr/info')
.post(
    authCheck,
    celebrate({
        [Segments.BODY] : paramValidation.storeHrInfo.body
    }),
    hrManagementController.storeHrInfo
);


// Get position list filtered or non filtered
router.route('/position/list')
.post(
    authCheck,
    celebrate({
        [Segments.BODY] : paramValidation.getPostionList.body
    }),
    hrManagementController.getPostionList
);


// Get HR information list filtered or non filtered 
router.route('/hr/information/list')
.post(
    authCheck,
    celebrate({
        [Segments.BODY] : paramValidation.getHRInfoList.body
    }),
    hrManagementController.getHRInfoList
);

// Get template list
router.route('/template/list')
.get(
    authCheck,
    hrManagementController.getTemplateList
);

// Get selected HR information list by hrIds
router.route('/selected/hr/information/list')
.post(
    authCheck,
    celebrate({
        [Segments.BODY] : paramValidation.getSelectedHRInfoList.body
    }),
    hrManagementController.getSelectedHRInfoList
);

// Store the user selected template 
router.route('/store/template/selection')
.post(
    authCheck,
    hrManagementController.storeTemplateSelection
)

// UPLOAD resumes
router.route('/upload-resume')
.post(
    authCheck,
    upload.single('resume'),
    hrManagementController.store_resume_s3
);

// email tracking open logs store
router.route('/track/open')
.post(
    hrManagementController.email_track_open_logs
);

// get user resume list
router.route('/resume/list')
.get(
    authCheck,
    hrManagementController.get_user_resume_list
);

module.exports = router;