const express = require('express');
const router = express.Router();
const {celebrate, Segments} = require('celebrate');
const authCheck = require('../middleware/auth.js');
const appPasswordCtrl = require('../controller/appPasswordConfig.js');
const paramValidation = require('../validation/appPasswordConfig.js');

router.route('/store/app/password/config')
.post(
    authCheck,
    celebrate({[Segments.BODY]: paramValidation.store_app_password.body}),
    appPasswordCtrl.store_app_password
);

router.route('/get/app/config')
.get(
    authCheck,
    appPasswordCtrl.get_app_config
);

module.exports = router;