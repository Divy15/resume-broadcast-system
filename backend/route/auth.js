const express = require('express');
const router = express.Router();
const {celebrate, Segments} = require('celebrate');
const authContrl = require('../controller/auth');
const paramValication = require('../validation/auth');

router.route('/store/user/data')
.post(
    celebrate({[Segments.BODY]: paramValication.store_signup_user_data.body}),
    authContrl.store_signup_user_data
);

router.route('/login/user/data')
.post(
    celebrate({[Segments.BODY]: paramValication.login_user_data.body}),
    authContrl.login_user_data
);

module.exports = router;