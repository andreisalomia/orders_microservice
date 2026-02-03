CREATE TABLE IF NOT EXISTS orders (
    order_id VARCHAR(255) PRIMARY KEY,
    customer_email VARCHAR(255) NOT NULL,
    total_amount DECIMAL(10, 3) NOT NULL,
    currency VARCHAR(3) NOT NULL,
    created_at DATETIME NOT NULL
);