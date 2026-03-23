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

        return res.status(201).json({ 
            success: true, 
            message: "Account created successfully." 
        });
        
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
        if (response.rows.length <= 0) {
            return res.status(404).json({
                success: false,
                message: 'No account found with this email address.'
            });
        }

        const userData = response.rows[0];

        // Check the Password 
        const isPasswordMatch = await bcrypt.compare(password, userData.password);

        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: 'Incorrect password. Please try again.'
            });
        }

        const token = await create_jwt_token(userData);

        const data = {
        username : userData.username,
        id: userData.id
    };

        return res.send({success: true, message: "Login successful.", token: token, data: data })

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

async function auth_user_fronted_redirection(req, res, next){
    try {
        const {id} = req.user;

        const response = await pgClient("select * from get_user_fronted_redirection($1)", [id]);
        console.log(response.rows);

        return res.send({success: true, message: "Redirection details fetched successfully.", data: response.rows});
    } catch (error) {
        next(error);
    }
}

module.exports = {
    store_signup_user_data,
    login_user_data,
    auth_user_fronted_redirection
}