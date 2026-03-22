const express = require('express');
const router = express.Router();
const hrManagementRoute = require('./hrManagement.js');
const emailJobRoute = require('./emailJobs.js');
const authRoute = require('./auth.js');
const templateConfigRoute = require('./templateConfig.js');
const appPasswordConfigRoute = require('./appPasswordConfig.js');

router.use('/hr/management', hrManagementRoute);
router.use('/emailjob', emailJobRoute);
router.use('/auth', authRoute);
router.use('/template/config', templateConfigRoute);
router.use('/app/password', appPasswordConfigRoute);

module.exports = router;