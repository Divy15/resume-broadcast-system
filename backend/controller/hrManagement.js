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
};

// get postion list filtered or not filtered
async function getPostionList(req, res, next){
    const {positionName} = req.body;
    try {
        const result = await pgClient('select * from hrmanagement_get_position_list($1)', [positionName]);

        if(result.rows.length === 0){
            return res.status(204).send({success : true, message: 'No postion found.'})
        }

        return res.send({success : true, data : result.rows, messsage : `Found position list which length ${result.rows.length}`});
    } catch (error) {
        next(error);
    }
};

// get hr list by filtered(filter by company name or hr name) or non filtered
async function getHRInfoList(req,res,next){
    const {searchTerm, filterName} = req.body;
    try {
        const response = await pgClient('select * from hrmanagement_get_hr_info_list($1, $2)', [searchTerm, filterName]);

        if(response.rows.length === 0){
            return res.status(204).send({success : true, message : 'No HR information found.'});
        };

        return res.send({success : true, data : response.rows, message : `HR information found which length ${response.rows.length} `});
    } catch (error) {
        next(error);
    }
}

module.exports = {
    dashboardCount,
    storeHrInfo,
    getPostionList,
    getHRInfoList
};