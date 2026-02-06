require('dotenv').config();
const express = require('express');
const db = require('./config/database');
const orderRoutes = require('./routes/orderRoutes');
const rateLimit = require('express-rate-limit');
const logger = require('./config/logger');

const RATE_LIMIT_WINDOW_MINUTES = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 100;

const limiter = rateLimit({
    windowMs: RATE_LIMIT_WINDOW_MINUTES,
    max: RATE_LIMIT_MAX_REQUESTS,
    message: "You've made too many API requests"
});

const port = process.env.PORT;
const app = express();
app.use(express.json());

let connection;

app.use(limiter);

app.use((req, res, next) => {
    req.connection = connection;
    next();
});

app.use('/orders', orderRoutes);

app.get('/health', async (req, res) => {
    try {
        const [tables] = await connection.query(`SELECT TABLE_NAME FROM information_schema.tables WHERE table_schema = ? AND table_name = ?`,
            [process.env.DB_NAME, process.env.TABLE_NAME]);
        if (tables.length === 0) {
            logger.error(`Health check failed: Table ${process.env.TABLE_NAME} does not exist`);
            return res.status(500).json({ status: 'unhealthy', error: `Table ${process.env.TABLE_NAME} does not exist` });
        }

        await connection.query(`SELECT 1 FROM ${process.env.TABLE_NAME} LIMIT 1`);

        res.status(200).json({ status: 'healthy' });
    } catch (error) {
        logger.error(`Health check failed: ${error.message}`);
        res.status(500).json({ status: 'unhealthy', error: error.message });
    }
});

async function start() {
    connection = await db.connect();
    app.listen(port, () => {
        logger.info(`Server running on port ${port}`);
    });
}

start();