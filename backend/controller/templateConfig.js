const { pgClient } = require('../db.js');

async function store_template_info( req, res, next ){
    const { name, subject, body } = req.body;
    const { id } = req.user;

    try {
        await pgClient('select * from template_config_store_template($1, $2, $3, $4)', [ id, name, subject, body ]);

        return res.send({ success: true, message: "Template info stored successfully."});
    } catch (error) {
        next(error);
    }
};

async function get_filter_template_list( req, res, next){
    const { template_name } = req.body;
    const { id } = req.user;

    try {
        const response = await pgClient('select * from template_master_get_template_filter_list($1, $2)', [id, template_name]);

        return res.send({success: true, message: "Filtered template list fetched successfully.", data: response.rows});
    } catch (error) {
        next(error);
    }
};

async function get_template_list( req, res, next){
    const { id } = req.user;

    try {
        const response = await pgClient('select * from template_master_get_template_list($1)', [id]);

        return res.send({success: true, message: "Template list fetched successfully.", data: response.rows});
    } catch (error) {
        next(error);
    }
}

async function get_template_info(req , res, next){
    const { templateid } = req.body;

    try {
        const response = await pgClient('select * from template_config_get_template_info($1)', [templateid]);

        return res.send({success: true, message: "Template info fetched successfully.", data: response.rows});
    } catch (error) {
        next(error);
    }
}

async function delete_template(req, res,next){
    const { templateid } = req.body;

    try {
        await pgClient('select * from template_config_delete_template($1)', [templateid]);

        return res.send({success: true, message: "Template deleted successfully."});
    } catch (error) {
        next(error);
    }
};

async function update_template_info(req, res, next){
    const {templateid, template_subject, template_name, template_body} = req.body;

    try {
        await pgClient('select * from template_config_update_template_info($1, $2, $3, $4)', [templateid, template_subject, template_name, template_body]);

        return res.send({success: true, message: "Template info updated successfully."});
    } catch (error) {
        next(error);
    }
}

module.exports = {
    store_template_info,
    get_filter_template_list,
    get_template_list,
    get_template_info, 
    delete_template,
    update_template_info
}