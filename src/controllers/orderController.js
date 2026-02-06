const orderService = require('../services/orderService');
const { validateOrder } = require('../utils/orderValidation');
const logger = require('../config/logger');

function checkSamePayload(new_order, existing_order) {
    return new_order.customer_email === existing_order.customer_email &&
        parseFloat(new_order.total_amount) === parseFloat(existing_order.total_amount) &&
        new_order.currency === existing_order.currency &&
        new Date(new_order.created_at).toISOString() === new Date(existing_order.created_at).toISOString();
}


async function createOrder(req, res) {
    try {
        const { value, error } = validateOrder(req.body);

        if (error) {
            logger.error(`Validation error: ${error.details}`);
            return res.status(400).json({ error: error.details });
        }

        const order = await orderService.getOrderById(req.connection, value.order_id);

        if (order) {
            if (checkSamePayload(value, order)) {
                return res.status(200).send();
            } else {
                logger.warn(`Conflict error: Order ID ${value.order_id} already exists with different payload`);
                return res.status(409).json({ error: 'Order with this ID already exists with different payload' });
            }
        }

        logger.info(`Creating order with ID: ${value.order_id}`);
        const new_order = await orderService.createOrder(req.connection, value);
        res.status(201).json(new_order);
    } catch (err) {
        logger.error(`Internal server error: ${err.message}`);
        res.status(500).json({ error: err.message });
    }
}

async function getOrders(req, res) {
    try {
        const orders = await orderService.getAllOrders(req.connection);
        logger.info(`Retrieved ${orders.length} orders`);
        res.status(200).json(orders);
    } catch (err) {
        logger.error(`Internal server error: ${err.message}`);
        res.status(500).json({ error: err.message });
    }
}

async function getOrder(req, res) {
    try {
        const order = await orderService.getOrderById(req.connection, req.params.order_id);
        if (!order) { 
            logger.warn(`Order ID ${req.params.order_id} not found`);
            return res.status(404).json({ error: 'Order not found' }); 
        }
        logger.info(`Retrieved order with ID: ${req.params.order_id}`);
        res.status(200).json(order);
    } catch (err) {
        logger.error(`Internal server error: ${err.message}`);
        res.status(500).json({ error: err.message });
    }
}

async function deleteOrder(req, res) {
    try {
        const deleted = await orderService.deleteOrder(req.connection, req.params.order_id);
        if (deleted.affectedRows === 0) {
            logger.warn(`Order ID ${req.params.order_id} not found for deletion`);
            return res.status(404).json({ error: 'Order not found' });
        }
        logger.info(`Deleted order with ID: ${req.params.order_id}`);
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (err) {
        logger.error(`Internal server error: ${err.message}`);
        res.status(500).json({ error: err.message });
    }
}

module.exports = { createOrder, getOrder, deleteOrder, getOrders };