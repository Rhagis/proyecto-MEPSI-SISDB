const pg = require('pg');
require('dotenv').config();

const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    pool.query('SELECT 1 + 1', (err, res) => {
      if (err) {
        console.error('Error executing query:', err);
      } else {
        console.log('Database connected successfully, result of 1 + 1:', res.rows[0]);
      }
    });
  }
});

module.exports = pool;
