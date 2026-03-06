const express = require('express');
const router = express.Router();
const hrManagementRoute = require('./hrManagement.js');
const emailJobRoute = require('./emailJobs.js');

router.use('/hr/management', hrManagementRoute);
router.use('/emailjob', emailJobRoute);

module.exports = router;