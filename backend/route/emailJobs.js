const express = require('express');
const router = express.Router();
const {celebrate, Segments} = require('celebrate');
const authCheck = require('../middleware/auth.js');
const emailJobContrl = require('../controller/emailJobs');
const paramValication = require('../validation/emailJobs');

router.route('/job/list')
.get(
    authCheck,
    emailJobContrl.get_job_list
);

router.route('/job/info')
.post(
    authCheck,
    celebrate({[Segments.BODY]: paramValication.get_job_info.body}),
    emailJobContrl.get_job_info
);


module.exports = router;