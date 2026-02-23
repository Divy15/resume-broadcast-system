const {pgClient} = require('../db');


// get dashboard summary in hr managemenr page
async function dashboardCount(req,res,next){
    try {
        
        const result = await pgClient('select * from hrmanagement_dashboard_summary()', []);

        return res.send({success: true, data: result.rows});
    } catch (error) {
        next(error);
    }
};

// store hr info
async function storeHrInfo(req,res,next){
    const {companyName, companyWebsite, hrName,  hrEmail, hrMobile, positionName} = req.body;
    try {
        await pgClient('select * from hrmanagement_store_hr_info($1, $2, $3, $4, $5, $6)', [companyName, companyWebsite, hrName, hrEmail, hrMobile, positionName]);

        return res.send({success : true});
    } catch (error) {
        next(error);
    }
}

module.exports = {
    dashboardCount,
    storeHrInfo
};