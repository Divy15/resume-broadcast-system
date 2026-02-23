const pg = require('pg');
const config = require('config');

const pool = new pg.Pool({
    host: config.get('APP.DB.HOST'),
    port: config.get('APP.DB.PORT'),
    database: config.get('APP.DB.DATABASE'),
    user: config.get('APP.DB.USER'),
    password: config.get('APP.DB.PASSWORD'),
    idleTimeoutMillis: 3000,
    connectionTimeoutMillis: 5000
});

module.exports = {
    pgClient : async function(text, value){
        const connection = await pool.connect();
        try {
            return connection.query(text, value);
        } catch (error) {
            throw error;
        } finally{
            connection.release();
        }
    }
}