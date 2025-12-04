-- Ecommerce Apparel Store Database Schema
-- Generated for retail dataset demo
-- 
-- Database Compatibility Notes:
-- - ENUM types: MySQL/MariaDB syntax. For PostgreSQL, use VARCHAR with CHECK constraints
-- - || concatenation: PostgreSQL/SQLite syntax. For MySQL, use CONCAT()
-- - AUTO_INCREMENT: MySQL syntax. For PostgreSQL, use SERIAL or IDENTITY
-- - For SQLite, remove AUTO_INCREMENT and use INTEGER PRIMARY KEY

-- Products Table
CREATE TABLE products (
    product_id VARCHAR(20) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT,
    size VARCHAR(10) NOT NULL,
    color VARCHAR(50) NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    image_url VARCHAR(500),
    INDEX idx_category (category),
    INDEX idx_color (color),
    INDEX idx_price (price)
);

-- Users Table
CREATE TABLE users (
    user_id VARCHAR(20) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    surname VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20),
    created_at DATETIME NOT NULL,
    INDEX idx_email (email),
    INDEX idx_created_at (created_at)
);

-- Discounts Table
CREATE TABLE discounts (
    discount_id VARCHAR(20) PRIMARY KEY,
    discount_code VARCHAR(50) NOT NULL UNIQUE,
    discount_type ENUM('percentage', 'fixed_amount') NOT NULL,
    discount_amount DECIMAL(10, 2) NOT NULL CHECK (discount_amount >= 0),
    valid_until DATETIME NOT NULL,
    INDEX idx_discount_code (discount_code),
    INDEX idx_valid_until (valid_until)
);

-- Orders Table
CREATE TABLE orders (
    order_id VARCHAR(20) PRIMARY KEY,
    user_id VARCHAR(20) NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL CHECK (total_amount >= 0),
    discount_id VARCHAR(20),
    status ENUM('pending', 'completed', 'shipped', 'cancelled') NOT NULL DEFAULT 'pending',
    created_at DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE RESTRICT,
    FOREIGN KEY (discount_id) REFERENCES discounts(discount_id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at),
    INDEX idx_discount_id (discount_id)
);

-- Order Lines Table
CREATE TABLE order_lines (
    order_line_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    order_id VARCHAR(20) NOT NULL,
    product_id VARCHAR(20) NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10, 2) NOT NULL CHECK (unit_price >= 0),
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE RESTRICT,
    INDEX idx_order_id (order_id),
    INDEX idx_product_id (product_id)
);

-- Returns Table
CREATE TABLE returns (
    return_id VARCHAR(20) PRIMARY KEY,
    order_id VARCHAR(20) NOT NULL,
    return_amount DECIMAL(10, 2) NOT NULL CHECK (return_amount >= 0),
    status ENUM('pending', 'approved', 'refunded') NOT NULL DEFAULT 'pending',
    reason VARCHAR(255),
    created_at DATETIME NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE RESTRICT,
    INDEX idx_order_id (order_id),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
);

-- Return Lines Table
CREATE TABLE return_lines (
    return_line_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    order_line_id INTEGER NOT NULL,
    FOREIGN KEY (order_line_id) REFERENCES order_lines(order_line_id) ON DELETE RESTRICT,
    INDEX idx_order_line_id (order_line_id)
);

-- Outfits Table (for outfit recommendations)
CREATE TABLE outfits (
    outfit_id VARCHAR(20) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    upper_body_product_id VARCHAR(20) NOT NULL,
    lower_body_product_id VARCHAR(20) NOT NULL,
    accessory_product_id VARCHAR(20) NOT NULL,
    occasion VARCHAR(50),
    description TEXT,
    created_at DATETIME NOT NULL,
    FOREIGN KEY (upper_body_product_id) REFERENCES products(product_id) ON DELETE RESTRICT,
    FOREIGN KEY (lower_body_product_id) REFERENCES products(product_id) ON DELETE RESTRICT,
    FOREIGN KEY (accessory_product_id) REFERENCES products(product_id) ON DELETE RESTRICT,
    INDEX idx_occasion (occasion),
    INDEX idx_upper_body (upper_body_product_id),
    INDEX idx_lower_body (lower_body_product_id),
    INDEX idx_accessory (accessory_product_id),
    INDEX idx_created_at (created_at)
);

-- Additional Views for Common Queries

-- View: Order Summary with User Info
-- Note: Uses || for concatenation (PostgreSQL/SQLite). For MySQL use CONCAT(u.name, ' ', u.surname)
CREATE VIEW order_summary AS
SELECT 
    o.order_id,
    o.created_at,
    o.status,
    o.total_amount,
    u.name || ' ' || u.surname AS customer_name,
    u.email AS customer_email,
    d.discount_code,
    COUNT(ol.order_line_id) AS item_count
FROM orders o
JOIN users u ON o.user_id = u.user_id
LEFT JOIN discounts d ON o.discount_id = d.discount_id
LEFT JOIN order_lines ol ON o.order_id = ol.order_id
GROUP BY o.order_id, o.created_at, o.status, o.total_amount, u.name, u.surname, u.email, d.discount_code;

-- View: Product Sales Summary
CREATE VIEW product_sales_summary AS
SELECT 
    p.product_id,
    p.name,
    p.category,
    p.price,
    SUM(ol.quantity) AS total_quantity_sold,
    SUM(ol.quantity * ol.unit_price) AS total_revenue,
    COUNT(DISTINCT ol.order_id) AS order_count
FROM products p
LEFT JOIN order_lines ol ON p.product_id = ol.product_id
GROUP BY p.product_id, p.name, p.category, p.price;

-- View: Return Summary
CREATE VIEW return_summary AS
SELECT 
    r.return_id,
    r.order_id,
    r.return_amount,
    r.status,
    r.reason,
    r.created_at,
    o.user_id,
    COUNT(rl.return_line_id) AS items_returned
FROM returns r
JOIN orders o ON r.order_id = o.order_id
LEFT JOIN return_lines rl ON r.return_id = (
    SELECT return_id FROM returns WHERE order_id = r.order_id LIMIT 1
)
GROUP BY r.return_id, r.order_id, r.return_amount, r.status, r.reason, r.created_at, o.user_id;

-- View: Outfit Details with Product Info
CREATE VIEW outfit_details AS
SELECT 
    o.outfit_id,
    o.name AS outfit_name,
    o.occasion,
    o.description,
    o.created_at,
    pu.product_id AS upper_body_id,
    pu.name AS upper_body_name,
    pu.category AS upper_body_category,
    pu.color AS upper_body_color,
    pl.product_id AS lower_body_id,
    pl.name AS lower_body_name,
    pl.category AS lower_body_category,
    pl.color AS lower_body_color,
    pa.product_id AS accessory_id,
    pa.name AS accessory_name,
    pa.category AS accessory_category,
    pa.color AS accessory_color
FROM outfits o
JOIN products pu ON o.upper_body_product_id = pu.product_id
JOIN products pl ON o.lower_body_product_id = pl.product_id
JOIN products pa ON o.accessory_product_id = pa.product_id;

