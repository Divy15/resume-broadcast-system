const {pgClient} = require('../db');

async function hr_registration_bar_chart( req, res, next ){
    const {month, year, timezone} = req.body;
    const {id} = req.user;
    let formatedTimezone = (timezone === 'Asia/Calcutta') ? "Asia/Kolkata" : timezone;
    console.log(timezone, formatedTimezone, timezone === 'Asia/Calcutta');
    try {
        const response = await pgClient('select * from dashboard_get_hr_registrations_bar_chart_as_per_user($1, $2, $3, $4)', [id, month, year, formatedTimezone]);

        return res.send({success: true, data: response.rows});
    } catch (error) {
        next(error);
    }
}

async function company_registration_bar_chart( req, res, next ){
    const {month, year, timezone} = req.body;
    const {id} = req.user;
    let formatedTimezone = (timezone === 'Asia/Calcutta') ? "Asia/Kolkata" : timezone;
    console.log(timezone, formatedTimezone, timezone === 'Asia/Calcutta');


    try {
        const response = await pgClient('select * from dashboard_get_company_registrations_bar_chart($1, $2, $3, $4)', [id, month, year, formatedTimezone]);

        return res.send({success: true, data: response.rows});
    } catch (error) {
        next(error);
    }
}

async function dashboard_counts( req, res, next ){
    const {id} = req.user;
    try {
        const response = await pgClient('select * from dashboard_status_counter_card($1)', [id]);

        return res.send({success: true, data: response.rows});
    } catch (error) {
        next(error);
    }
}

module.exports = {
    hr_registration_bar_chart,
    company_registration_bar_chart,
    dashboard_counts,
}