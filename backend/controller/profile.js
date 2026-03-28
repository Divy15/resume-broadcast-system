const {pgClient} = require('../db');
const bcrypt = require('bcrypt');
const config = require('config');
const saltRound = config.get("APP.BCRYPT.SALTROUND");

async function get_profile_details( req, res, next ){
    const {id} = req.user;
    try {
        const response = await pgClient('select * from profile_get_user_details($1)', [id]);

        return res.send({success: true, data: response.rows});
    } catch (error) {
        next(error);
    }
}

async function update_profile_details( req, res, next ){
    const {username, email} = req.body;
    const {id} = req.user;
    try {
        await pgClient('select * from profile_update_user_details($1, $2, $3)', [id, username, email]);

        return res.send({success: true});
    } catch (error) {
        next(error);
    }
}

async function update_profile_password_details( req, res, next ){
    const{newPassword, confirmPassword} = req.body;
    const {id} = req.user;
    try {

        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                message: "Passwords do not match"
            });
        };

        const hashPassword = await bcrypt.hash(newPassword, saltRound);

        const response = await pgClient('select * from profile_update_password($1, $2)', [id, hashPassword]);

        return res.send({success: true, data: response.rows});
    } catch (error) {
        next(error);
    }
}

module.exports = {
    get_profile_details,
    update_profile_details,
    update_profile_password_details
}