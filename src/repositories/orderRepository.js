async function create(connection, orderData) {
    const [result] = await connection.query(
        'INSERT INTO orders (order_id, customer_email, total_amount, currency, created_at) VALUES (?, ?, ?, ?, ?)',
        [orderData.order_id, orderData.customer_email, orderData.total_amount, orderData.currency, orderData.created_at]
    );
    return result;
}

async function findAll(connection) {
    const [rows] = await connection.query('SELECT * FROM orders');
    return rows;
}

async function findById(connection, orderId) {
    const [rows] = await connection.query(
        'SELECT * FROM orders WHERE order_id = ?',
        [orderId]
    );
    return rows[0];
}

async function deleteById(connection, orderId) {
    const [result] = await connection.query(
        'DELETE FROM orders WHERE order_id = ?',
        [orderId]
    );
    return result;
}

module.exports = { create, findById, deleteById , findAll};