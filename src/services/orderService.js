const orderRepository = require('../repositories/orderRepository');

async function createOrder(connection, orderData) {
    await orderRepository.create(connection, orderData);
    return orderData;
}

async function getAllOrders(connection) {
    const [rows] = await orderRepository.findAll(connection);
    return rows;
}

async function getOrderById(connection, orderId) {
    const order = await orderRepository.findById(connection, orderId);
    return order;
}

async function deleteOrder(connection, orderId) {
    const result = await orderRepository.deleteById(connection, orderId);
    return result;
}

module.exports = { createOrder, getAllOrders, getOrderById, deleteOrder };