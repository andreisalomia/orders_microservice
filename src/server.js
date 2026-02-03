require('dotenv').config();
const express = require('express');
const db = require('./config/database');


const port = process.env.PORT;
const app = express();
app.use(express.json());

let connection;

app.get('/health', async (req, res) => {
    try {
        const [tables] = await connection.query(`SELECT TABLE_NAME FROM information_schema.tables WHERE table_schema = ? AND table_name = ?`,
            [process.env.DB_NAME, process.env.TABLE_NAME]);
        if (tables.length === 0) {
            return res.status(500).json({ status: 'unhealthy', error: `Table ${process.env.TABLE_NAME} does not exist` });
        }
        res.status(200).json({ status: 'healthy' });
    } catch (error) {
        res.status(500).json({ status: 'unhealthy', error: error.message });
    }
});

async function start() {
    connection = await db.connect();
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

start();