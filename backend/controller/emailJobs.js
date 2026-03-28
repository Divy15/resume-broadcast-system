const {pgClient} = require('../db');

async function get_job_list(req,res,next){
    const{id} = req.user
    try{
        const response = await pgClient('select * from email_jobs_get_jobs_list($1)', [id]);

        if(response.rows.length === 0){
            return res.status(204).send({ success: true, message: "No jobs found.", data: [] });
        }
        return res.send({success : true, message: "Jobs list fetched successfully.", data : response.rows});
    }
    catch(error){
        next(error);
    }
}

async function get_job_info(req, res, next){
    const {jobid} = req.body;
    try {
        const response = await pgClient('select * from email_campaign_get_hr_list($1)', [jobid]);

        return res.send({success : true, message: "Job info fetched successfully.", data : response.rows});
    } catch (error) {
        next(error);
    }
}

module.exports = {
    get_job_list,
    get_job_info
}