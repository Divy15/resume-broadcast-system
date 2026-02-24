const express = require('express');
const router = express.Router();
const {celebrate, Segments} = require('celebrate');
const hrManagementController = require('../controller/hrManagement.js');


// Get Dashboard summary in HR Management page
router.route('/dashboard/summary')
.get(
    hrManagementController.dashboardCount
);


// Store HR Information
router.route('/store/hr/info')
.post(
    hrManagementController.storeHrInfo
);


// Get position list filtered or non filtered
router.route('/position/list')
.post(
    hrManagementController.getPostionList
);


// Get HR information list filtered or non filtered 
router.route('/hr/information/list')
.post(
    hrManagementController.getHRInfoList
);

module.exports = router;