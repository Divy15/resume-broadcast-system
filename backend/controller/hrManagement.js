const {pgClient} = require('../db');
const emailQueue = require('../queues/emailQueue');

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
        console.error('Error storing HR information:', error);
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
};

// get template list
async function getTemplateList(req,res,next){
    const {id} = req.user;
    try {
        const response = await pgClient('select * from hrmanagement_get_template_list($1)', [id]);

        if(response.rows.length === 0){
            return res.status(204).send({success : true, message : 'No template found.'});
        };

        return res.send({success : true, data : response.rows, message : `Template list found which length ${response.rows.length} `});
    } catch (error) {
        next(error);
    }
};

// get selected hr info list
async function getSelectedHRInfoList(req,res,next){
    const {hrIds} = req.body;
    try {
        const response = await pgClient('select * from hrmanagement_get_selected_ht_info($1::jsonb)', [JSON.stringify(hrIds)]);

        if(response.rows.length === 0){
            return res.status(204).send({success : true, message : 'No HR information found.'});
        };

        return res.send({success : true, data : response.rows, message : `HR information found which length ${response.rows.length} `});
    } catch (error) {
        next(error);
    }
};

// Store template selection data 
// And return norification event
async function storeTemplateSelection(req,res,next){
    const { position, template, hrIds} = req.body;
    const file = req.file;
    try { 
        const filePath = `/uploads/${file.filename}`;

        // ✅ Convert comma string to array of numbers
        const hrIdsArray = hrIds.split(",").map(id => ({hr_id: Number(id.trim()),status: "pending"}));

        // ✅ Convert to JSON (Postgres jsonb compatible)
        const hrIdsJson = JSON.stringify(hrIdsArray);

        // ✅ Calculate total count
        const totalCount = hrIdsArray.length;

        const response = await pgClient(
          `SELECT * FROM hrmanagement_store_bulk_template_info(
              $1,$2,$3,$4,$5::jsonb,$6
          )`,
          [1, position, template, filePath, hrIdsJson, totalCount]
        );

        await emailQueue.add('send-bulk-email', {
            campaignId: response.rows[0].campaign_id,
            hrIds: hrIdsArray,
            templateId: template,
            resumePath: filePath,
            position: position,
            notificationId : response.rows[0].notification_id
        },{
          attempts: 3,      // retry 3 times
          backoff: {
            type: 'exponential',
            delay: 5000,        // 5 sec
          },
        });

        return res.send({success : true, data : response.rows});
    } catch (error) {
        next(error);
    }
}

module.exports = {
    dashboardCount,
    storeHrInfo,
    getPostionList,
    getHRInfoList,
    getTemplateList,
    getSelectedHRInfoList,
    storeTemplateSelection
};