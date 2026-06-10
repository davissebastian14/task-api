const { Pool } = require('pg');
require('dotenv').config();


const pool = new Pool({
    connectionString: process.env.DATABASE_URL || process.env.DATABASE_LOCAL_URL,
    ssl: process.env.DATABASE_URL ? {rejectUnauthorized: false} : false,
});   


module.exports = pool;