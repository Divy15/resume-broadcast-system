const express = require('express');
const router = express.Router();
const hrManagementRoute = require('./hrManagement.js');
const emailJobRoute = require('./emailJobs.js');
const authRoute = require('./auth.js');
const templateConfigRoute = require('./templateConfig.js');
const appPasswordConfigRoute = require('./appPasswordConfig.js');
const dashboardRoute = require('./dashboard.js');
const profileRoute = require('./profile.js');
const companyRegisterRoute = require('./companyRegistration.js');

router.use('/hr/management', hrManagementRoute);
router.use('/emailjob', emailJobRoute);
router.use('/auth', authRoute);
router.use('/template/config', templateConfigRoute);
router.use('/app/password', appPasswordConfigRoute);
router.use('/dashboard', dashboardRoute);
router.use('/profile', profileRoute);
router.use('/company/registration', companyRegisterRoute);

module.exports = router;