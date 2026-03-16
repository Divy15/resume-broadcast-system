const { pgClient } = require('../db.js');
const bcrypt = require('bcrypt');
const config = require('config');
const saltRound = config.get("APP.BCRYPT.SALTROUND");
const jwt = require('jsonwebtoken');

async function store_signup_user_data( req, res, next ){
    const { name, email, password, confirmPassword, country, dob } = req.body;
    try {

        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "Passwords do not match"
            });
        };

        const formattedDob = dob.split('/').reverse().join('-');

        const hashPassword = await bcrypt.hash(password, saltRound);

        await pgClient('select * from store_signup_user_data($1, $2, $3, $4, $5)', [ name, email, hashPassword, country, formattedDob ]);

        return res.send({success : true, message: "User stored successfully."});
        
    } catch (error) {
        console.log("Error from signup page:", error);
        next(error);
    }
};

async function login_user_data( req, res, next ){
    const { email, password } = req.body;
    try {
        
        const response = await pgClient('select * from get_user_data_by_email($1)', [email]);

        // Check to get user Data 
        if(response.rows.length <= 0){
            throw new Error("Invalid user email and password.");
        };

        const userData = response.rows[0];

        // Check the Password 
        const isPasswordMatch = await bcrypt.compare(password, userData.password);

        if(!isPasswordMatch){
            throw new Error("Password is not match please re-entered email.")
        }

        const token = await create_jwt_token(userData);

        const data = {
        username : userData.username,
        id: userData.id
    };

        return res.send({success: true, token: token, data: data })

    } catch (error) {
        next(error);
    }
}

async function create_jwt_token(userData){
    const secreatKey = config.get("APP.JSWTSECRET.KEY");

    const data = {
        username : userData.username,
        id: userData.id
    };

    return jwt.sign(data, secreatKey,  {expiresIn: 3600});
};

module.exports = {
    store_signup_user_data,
    login_user_data
}