require('dotenv').config();
const logger = require('./logger');

const mysql = require('mysql2/promise');

let connection;

async function connect() {
    connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME
    });
    logger.info('Database connected successfully.');
    return connection;
}

module.exports = { connect };