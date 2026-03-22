const { pgClient } = require("../db");
const crypto = require("crypto");
const config = require("config");
const ALGORITHM = config.get("APP.CRYPTO.ALGO");
const KEY = config.get("APP.CRYPTO.KEY");
const IV_LENGTH = config.get("APP.CRYPTO.IV_LENGTH");

// Store the gmail application email and it's configuration password
async function store_app_password(req, res, next) {
  const { email, password } = req.body;
  const { id } = req.user;
  try {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(KEY, 'hex'), iv);

    let encrypted = cipher.update(password, "utf8", "hex");
    encrypted += cipher.final("hex");

    const authTag = cipher.getAuthTag().toString("hex");

    const encryptPass = `${iv.toString('hex')}:${authTag}:${encrypted}`

    await pgClient(
      "select * from app_pass_config_store_user_application_password($1, $2, $3)",
      [id, email, encryptPass],
    );

    return res.send({ success: true, message: "Configuration is stored." });
  } catch (error) {
    next(error);
  }
}

// Get app email config 
async function get_app_config( req, res, next){
    const { id } = req.user;
    try {
        const response = await pgClient('select * from app_pass_config_get_app_password_config($1)', [id]);

        return res.send({success: true, data: response.rows});
    } catch (error) {
        next(error);
    }
}

module.exports = {
  store_app_password,
  get_app_config,
};
