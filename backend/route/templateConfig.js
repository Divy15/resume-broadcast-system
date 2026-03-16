const express = require('express');
const router = express.Router();
const {celebrate, Segments} = require('celebrate');
const authCheck = require('../middleware/auth.js');
const templateConfigController = require('../controller/templateConfig.js');
const paramValidation = require('../validation/templateConfig.js');

router.route('/store/template')
.post(
    authCheck,
    celebrate({[Segments.BODY]: paramValidation.store_template_info.body}),
    templateConfigController.store_template_info
);

router.route('/filtered/list')
.post(
    authCheck,
    celebrate({[Segments.BODY]: paramValidation.get_filter_template_list.body}),
    templateConfigController.get_filter_template_list
);

router.route('/list')
.get(
    authCheck,
    templateConfigController.get_template_list
);

router.route('/template/info')
.post(
    authCheck,
    celebrate({[Segments.BODY]: paramValidation.get_template_info.body}),
    templateConfigController.get_template_info
);

router.route('/delete/template')
.post(
    authCheck,
    celebrate({[Segments.BODY]: paramValidation.delete_template.body}),
    templateConfigController.delete_template
);

router.route('/update/template/info')
.post(
    authCheck,
    celebrate({[Segments.BODY]: paramValidation.update_template_info.body}),
    templateConfigController.update_template_info
)

module.exports = router;