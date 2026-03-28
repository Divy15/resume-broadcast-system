const express = require('express');
const router = express.Router();
const {celebrate, Segments} = require('celebrate');
const authCheck = require('../middleware/auth.js');
const dashboardCtrl = require('../controller/dashboard.js');
const paramValidation = require('../validation/dashboard.js');

router.route('/hr/registration/bar/chart')
.post(
    authCheck,
    celebrate({[Segments.BODY]: paramValidation.hr_registration_bar_chart.body}),
    dashboardCtrl.hr_registration_bar_chart
);

router.route('/company/registration/bar/chart')
.post(
    authCheck,
    celebrate({[Segments.BODY]: paramValidation.company_registration_bar_chart.body}),
    dashboardCtrl.company_registration_bar_chart
);

router.route('/total/counts')
.get(
    authCheck,
    dashboardCtrl.dashboard_counts
);

module.exports = router;