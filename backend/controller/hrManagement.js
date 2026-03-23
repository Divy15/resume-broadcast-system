const {pgClient} = require('../db');
const emailQueue = require('../queues/emailQueue');
const crypto = require('crypto');
const config = require("config");
const ALGORITHM = config.get("APP.CRYPTO.ALGO");
const KEY = config.get("APP.CRYPTO.KEY");
const IV_LENGTH = config.get("APP.CRYPTO.IV_LENGTH");

// get dashboard summary in hr managemenr page
async function dashboardCount(req,res,next){
    const {id} = req.user;
    try {
        
        const result = await pgClient('select * from hrmanagement_dashboard_summary($1)', [id]);

        return res.send({success: true, message: "Dashboard counts fetched successfully.", data: result.rows});
    } catch (error) {
        next(error);
    }
};

// store hr info
async function storeHrInfo(req,res,next){
    const {companyName, companyWebsite, hrName,  hrEmail, hrMobile, positionName} = req.body;
    const {id} = req.user;
    try {
        await pgClient('select * from hrmanagement_store_hr_info($1, $2, $3, $4, $5, $6, $7)', [id, companyName, companyWebsite, hrName, hrEmail, hrMobile, positionName]);

        return res.send({success : true, message: "HR information stored successfully."});
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

        return res.send({success : true, data : result.rows, message : `Found ${result.rows.length} positions.`});
    } catch (error) {
        next(error);
    }
};

// get hr list by filtered(filter by company name or hr name) or non filtered
async function getHRInfoList(req,res,next){
    const {searchTerm, filterName} = req.body;
    const {id} = req.user;
    try {
        const response = await pgClient('select * from hrmanagement_get_hr_info_list($1, $2, $3)', [id, searchTerm, filterName]);

        if(response.rows.length === 0){
            return res.status(204).send({success : true, message : 'No HR information found.'});
        };

        return res.send({success : true, data : response.rows, message : `Found ${response.rows.length} HR records.`});
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

        return res.send({success : true, data : response.rows, message : `Found ${response.rows.length} templates.`});
    } catch (error) {
        next(error);
    }
};

// get selected hr info list
async function getSelectedHRInfoList(req,res,next){
    const {hrIds} = req.body;
    const {id} = req.user;
    try {
        const response = await pgClient('select * from hrmanagement_get_selected_ht_info($1::jsonb, $2)', [JSON.stringify(hrIds), id]);

        if(response.rows.length === 0){
            return res.status(204).send({success : true, message : 'No HR information found.'});
        };

        return res.send({success : true, data : response.rows, message : `Found ${response.rows.length} selected HR records.`});
    } catch (error) {
        next(error);
    }
};

// Store template selection data 
// And return norification event
async function storeTemplateSelection(req,res,next){
    const { position, template, hrIds} = req.body;
    const {id} = req.user;
    const file = req.file;
    let userAppEmail = null;
    let userAppPass = null;
    try { 
        const filePath = `/uploads/${file.filename}`;

        // Before create user email job check his app email and password configuration
        const dbResponse = await pgClient('select * from hrmanagement_get_user_app_password_config($1)', [id]);
        const dbResponseData = dbResponse.rows[0];

        if(!dbResponseData?.app_email || !dbResponseData?.app_password || dbResponseData?.app_email=== "" || dbResponseData?.app_password=== ""){
            throw Error("User doesn't done email and password configuration.");
        };

        if(dbResponseData?.app_email!== "" || dbResponseData?.app_password!== "" ){  
            userAppEmail = dbResponseData?.app_email;
            userAppPass = await decryptPassword(dbResponseData?.app_password);
        };

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
          [id, position, template, filePath, hrIdsJson, totalCount]
        );

        await emailQueue.add('send-bulk-email', {
            app_email: userAppEmail,
            app_pass: userAppPass,
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

        return res.send({success : true, message: "Template selection stored successfully, emails queued.", data : response.rows});
    } catch (error) {
        next(error);
    }
};

// decrypt the app password
async function decryptPassword(encryptedPayload) {
    const [ivHex, authTagHex, encryptedText] = encryptedPayload.split(':');
    
    const decipher = crypto.createDecipheriv(
        ALGORITHM, 
        Buffer.from(KEY, 'hex'), 
        Buffer.from(ivHex, 'hex')
    );
    
    decipher.setAuthTag(Buffer.from(authTagHex, 'hex'));
    
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
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