const {pgClient} = require('../db');

async function get_job_list(req,res,next){
    try{
        const response = await pgClient('select * from email_jobs_get_jobs_list()', []);

        if(response.rows.length === 0){
            return res.status(204)
        }
        return res.send({success : true, data : response.rows});
    }
    catch(error){
        next(error);
    }
}

async function get_job_info(req, res, next){
    const {jobid} = req.body;
    try {
        const response = await pgClient('select * from email_campaign_get_hr_list($1)', [jobid]);

        return res.send({success : true, data : response.rows});
    } catch (error) {
        next(error);
    }
}

module.exports = {
    get_job_list,
    get_job_info
}