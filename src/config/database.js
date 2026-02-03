require('dotenv').config();

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
    console.log("Connected to MySQL.");
    return connection;
}

module.exports = { connect };