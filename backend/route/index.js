const express = require('express');
const router = express.Router();
const hrManagementRoute = require('./hrManagement.js');

router.use('/hr/management', hrManagementRoute);

module.exports = router;