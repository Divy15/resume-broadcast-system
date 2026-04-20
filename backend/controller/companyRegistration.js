const { pgClient } = require('../db.js');

// Get Registered company count
async function get_registered_company_count( req, res, next ){
    const {id} = req.user;
    try {
        const response = await pgClient('select * from company_registration_get_company_count($1)', [id]);

        return res.send({ success: true, data: response.rows});
    } catch (error) {
        next(error);
    }
}

// Get filtered company list
async function get_filtered_company_list( req, res, next ){
    const {id} = req.user;
    const {name} = req.body;
    try {
        const response = await pgClient('select * from company_registration_get_filter_company_list($1, $2)', [name, id]);

        return res.send({ success: true, data: response.rows});
    } catch (error) {
        next(error);
    }
}

// Get company list
async function get_company_list( req, res, next ){
    const {id} = req.user;
    try {
        const response = await pgClient('select * from company_registration_get_company_list($1)', [id]);

        return res.send({ success: true, data: response.rows});
    } catch (error) {
        next(error);
    }
}

// Store Company data 
async function store_company_data( req, res, next ){
    const {id} = req.user;
    const {name, website, linkedIn} = req.body;
    try {
        const response = await pgClient('select * from company_registration_store_company_details($1, $2, $3, $4)', [id, name, website, linkedIn]);

        return res.send({ success: true, data: response.rows});
    } catch (error) {
        next(error);
    }
}

// Update company data
async function update_company_data( req, res, next ){
    const {id} = req.user;
    const {company_id, name, website, linkedIn} = req.body;
    try {
        const response = await pgClient('select * from company_registration_update_company_details($1, $2, $3, $4, $5)', [id, company_id, name, website, linkedIn]);

        return res.send({ success: true, data: response.rows});
    } catch (error) {
        next(error);
    }
}

// Get company data 
async function get_company_data( req, res, next ){
    const {id} = req.user;
    const {company_id} = req.body;
    try {
        const response = await pgClient('select * from company_registration_get_company_info($1, $2)', [id, company_id]);

        return res.send({ success: true, data: response.rows});
    } catch (error) {
        next(error);
    }
}

// Delete company data 
async function delete_company_data( req, res, next ){
    const {id} = req.user;
    const {company_id} = req.body;
    try {
        const response = await pgClient('select * from company_registration_delete_company_info($1, $2)', [id, company_id]);

        return res.send({ success: true, data: response.rows});
    } catch (error) {
        next(error);
    }
}

module.exports = {
    get_registered_company_count,
    get_filtered_company_list,
    get_company_list,
    store_company_data,
    update_company_data,
    get_company_data,
    delete_company_data
}