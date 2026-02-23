const express = require('express');
const router = express.Router();
const {celebrate, Segments} = require('celebrate');
const hrManagementController = require('../controller/hrManagement.js');

router.route('/dashboard/summary')
.get(
    hrManagementController.dashboardCount
);

router.route('/store/hr/info')
.post(
    hrManagementController.storeHrInfo
);

module.exports = router;