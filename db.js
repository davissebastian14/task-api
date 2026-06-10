const { Pool } = require('pg');
require('dotenv').config();


const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgresql://postgres:W@tchDogs534@localhost:5432/taskdb',
    ssl: process.env.DATABASE_URL ? {rejectUnauthorized: false} : false,
});   


module.exports = pool;