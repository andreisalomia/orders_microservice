const orderService = require('../services/orderService');

async function createOrder(req, res) {
    try {
        const order = await orderService.createOrder(req.connection, req.body);
        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getOrders(req, res) {
    try {
        const orders = await orderService.getAllOrders(req.connection);
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getOrder(req, res) {
    try {
        const order = await orderService.getOrderById(req.connection, req.params.order_id);
        if (!order) return res.status(404).json({ error: 'Order not found' });
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function deleteOrder(req, res) {
    try {
        const deleted = await orderService.deleteOrder(req.connection, req.params.order_id);
        if (!deleted) return res.status(404).json({ error: 'Order not found' });
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { createOrder, getOrder, deleteOrder , getOrders };