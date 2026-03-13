const express = require('express');
const router = express.Router();
const hrManagementRoute = require('./hrManagement.js');
const emailJobRoute = require('./emailJobs.js');
const authRoute = require('./auth.js');

router.use('/hr/management', hrManagementRoute);
router.use('/emailjob', emailJobRoute);
router.use('/auth', authRoute);

module.exports = router;