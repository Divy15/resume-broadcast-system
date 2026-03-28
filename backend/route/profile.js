const express = require('express');
const router = express.Router();
const {celebrate, Segments} = require('celebrate');
const authCheck = require('../middleware/auth.js');
const profileCtrl = require('../controller/profile.js');
const paramValidation = require('../validation/profile.js');

router.route('/get/profile/details')
.get(
    authCheck,
    profileCtrl.get_profile_details
);

router.route('/update/profile/details')
.post(
    authCheck,
    celebrate({[Segments.BODY]: paramValidation.update_profile_details.body}),
    profileCtrl.update_profile_details
);

router.route('/update/profile/password')
.post(
    authCheck,
    celebrate({[Segments.BODY]: paramValidation.update_profile_password_details.body}),
    profileCtrl.update_profile_password_details
);

module.exports = router;