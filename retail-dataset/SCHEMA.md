# Database Schema Documentation

## Overview

This document describes the database schema for the apparel ecommerce store demo. The schema consists of 7 tables with proper relationships and constraints.

## Tables

### 1. products

Stores product catalog information.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| product_id | VARCHAR(20) | PRIMARY KEY | Unique product identifier (e.g., PROD00001) |
| name | VARCHAR(255) | NOT NULL | Product name |
| category | VARCHAR(100) | NOT NULL | Product category (T-Shirts, Jeans, Dresses, etc.) |
| description | TEXT | | Product description |
| size | VARCHAR(10) | NOT NULL | Product size (XS, S, M, L, XL, XXL) |
| color | VARCHAR(50) | NOT NULL | Product color |
| stock | INTEGER | NOT NULL, DEFAULT 0 | Available stock quantity |
| price | DECIMAL(10,2) | NOT NULL, CHECK >= 0 | Product price |
| image_url | VARCHAR(500) | | URL to product image (Unsplash) |

**Indexes:**
- `idx_category` on `category`
- `idx_color` on `color`
- `idx_price` on `price`

---

### 2. users

Stores customer information.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| user_id | VARCHAR(20) | PRIMARY KEY | Unique user identifier (e.g., USER00001) |
| name | VARCHAR(100) | NOT NULL | User's first name |
| surname | VARCHAR(100) | NOT NULL | User's last name |
| email | VARCHAR(255) | NOT NULL, UNIQUE | User's email address |
| phone | VARCHAR(20) | | User's phone number |
| created_at | DATETIME | NOT NULL | Account creation timestamp |

**Indexes:**
- `idx_email` on `email`
- `idx_created_at` on `created_at`

---

### 3. discounts

Stores discount/promotion codes.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| discount_id | VARCHAR(20) | PRIMARY KEY | Unique discount identifier (e.g., DISC001) |
| discount_code | VARCHAR(50) | NOT NULL, UNIQUE | Discount code (e.g., SAVE10, WELCOME20) |
| discount_type | ENUM | NOT NULL | Type: 'percentage' or 'fixed_amount' |
| discount_amount | DECIMAL(10,2) | NOT NULL, CHECK >= 0 | Discount value (percentage or fixed amount) |
| valid_until | DATETIME | NOT NULL | Expiration date/time |

**Indexes:**
- `idx_discount_code` on `discount_code`
- `idx_valid_until` on `valid_until`

---

### 4. orders

Stores order information.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| order_id | VARCHAR(20) | PRIMARY KEY | Unique order identifier (e.g., ORD00001) |
| user_id | VARCHAR(20) | NOT NULL, FK → users | Customer who placed the order |
| total_amount | DECIMAL(10,2) | NOT NULL, CHECK >= 0 | Total order amount (after discounts) |
| discount_id | VARCHAR(20) | FK → discounts | Applied discount (nullable) |
| status | ENUM | NOT NULL, DEFAULT 'pending' | Order status: 'pending', 'completed', 'shipped', 'cancelled' |
| created_at | DATETIME | NOT NULL | Order creation timestamp |

**Foreign Keys:**
- `user_id` references `users(user_id)` ON DELETE RESTRICT
- `discount_id` references `discounts(discount_id)` ON DELETE SET NULL

**Indexes:**
- `idx_user_id` on `user_id`
- `idx_status` on `status`
- `idx_created_at` on `created_at`
- `idx_discount_id` on `discount_id`

---

### 5. order_lines

Stores individual line items within orders.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| order_line_id | INTEGER | PRIMARY KEY, AUTO_INCREMENT | Unique line item identifier |
| order_id | VARCHAR(20) | NOT NULL, FK → orders | Parent order |
| product_id | VARCHAR(20) | NOT NULL, FK → products | Product ordered |
| quantity | INTEGER | NOT NULL, CHECK > 0 | Quantity ordered |
| unit_price | DECIMAL(10,2) | NOT NULL, CHECK >= 0 | Price per unit at time of order |

**Foreign Keys:**
- `order_id` references `orders(order_id)` ON DELETE CASCADE
- `product_id` references `products(product_id)` ON DELETE RESTRICT

**Indexes:**
- `idx_order_id` on `order_id`
- `idx_product_id` on `product_id`

---

### 6. returns

Stores return/refund information.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| return_id | VARCHAR(20) | PRIMARY KEY | Unique return identifier (e.g., RET0001) |
| order_id | VARCHAR(20) | NOT NULL, FK → orders | Order being returned |
| return_amount | DECIMAL(10,2) | NOT NULL, CHECK >= 0 | Total refund amount |
| status | ENUM | NOT NULL, DEFAULT 'pending' | Return status: 'pending', 'approved', 'refunded' |
| reason | VARCHAR(255) | | Reason for return |
| created_at | DATETIME | NOT NULL | Return creation timestamp |

**Foreign Keys:**
- `order_id` references `orders(order_id)` ON DELETE RESTRICT

**Indexes:**
- `idx_order_id` on `order_id`
- `idx_status` on `status`
- `idx_created_at` on `created_at`

---

### 7. return_lines

Stores individual line items being returned.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| return_line_id | INTEGER | PRIMARY KEY, AUTO_INCREMENT | Unique return line identifier |
| order_line_id | INTEGER | NOT NULL, FK → order_lines | Order line item being returned |

**Foreign Keys:**
- `order_line_id` references `order_lines(order_line_id)` ON DELETE RESTRICT

**Indexes:**
- `idx_order_line_id` on `order_line_id`

---

## Relationships

```
users (1) ────< (many) orders
orders (1) ────< (many) order_lines
order_lines (1) ────< (many) return_lines
orders (1) ────< (many) returns
products (1) ────< (many) order_lines
discounts (1) ────< (many) orders (optional)
```

## Data Integrity Rules

1. **Referential Integrity**: All foreign keys reference existing records
2. **Order Totals**: `orders.total_amount` should equal the sum of `order_lines.quantity * order_lines.unit_price` minus any discount
3. **Return Amounts**: `returns.return_amount` should equal the sum of returned `order_lines.unit_price * order_lines.quantity`
4. **Return Dates**: `returns.created_at` must be after the corresponding `orders.created_at`
5. **Stock Management**: `products.stock` should reflect available inventory (considering orders)
6. **Discount Application**: 
   - If `discount_type = 'percentage'`, `discount_amount` is a percentage (e.g., 25 = 25%)
   - If `discount_type = 'fixed_amount'`, `discount_amount` is a fixed dollar amount

## Sample Queries

### Get order details with customer info
```sql
SELECT o.order_id, o.total_amount, o.status, 
       u.name || ' ' || u.surname AS customer_name,
       COUNT(ol.order_line_id) AS item_count
FROM orders o
JOIN users u ON o.user_id = u.user_id
LEFT JOIN order_lines ol ON o.order_id = ol.order_id
GROUP BY o.order_id, o.total_amount, o.status, u.name, u.surname;
```

### Get product sales summary
```sql
SELECT p.product_id, p.name, p.category,
       SUM(ol.quantity) AS total_sold,
       SUM(ol.quantity * ol.unit_price) AS revenue
FROM products p
JOIN order_lines ol ON p.product_id = ol.product_id
GROUP BY p.product_id, p.name, p.category;
```

### Get return details
```sql
SELECT r.return_id, r.order_id, r.return_amount, r.reason,
       o.user_id, COUNT(rl.return_line_id) AS items_returned
FROM returns r
JOIN orders o ON r.order_id = o.order_id
LEFT JOIN return_lines rl ON r.return_id = (
    SELECT return_id FROM returns WHERE order_id = r.order_id LIMIT 1
)
GROUP BY r.return_id, r.order_id, r.return_amount, r.reason, o.user_id;
```

---

### 8. outfits

Stores suggested full outfit combinations for recommendations.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| outfit_id | VARCHAR(20) | PRIMARY KEY | Unique outfit identifier (e.g., OUTFIT0001) |
| name | VARCHAR(255) | NOT NULL | Outfit name/description |
| upper_body_product_id | VARCHAR(20) | NOT NULL, FK → products | Upper body product (T-Shirts, Sweaters, Hoodies, Jackets, Blazers) |
| lower_body_product_id | VARCHAR(20) | NOT NULL, FK → products | Lower body product (Jeans, Pants, Shorts, Skirts) |
| accessory_product_id | VARCHAR(20) | NOT NULL, FK → products | Accessory product (Accessories, Shoes) |
| occasion | VARCHAR(50) | | Occasion type (casual, business casual, formal, sporty, etc.) |
| description | TEXT | | Outfit description |
| created_at | DATETIME | NOT NULL | Outfit creation timestamp |

**Foreign Keys:**
- `upper_body_product_id` references `products(product_id)` ON DELETE RESTRICT
- `lower_body_product_id` references `products(product_id)` ON DELETE RESTRICT
- `accessory_product_id` references `products(product_id)` ON DELETE RESTRICT

**Indexes:**
- `idx_occasion` on `occasion`
- `idx_upper_body` on `upper_body_product_id`
- `idx_lower_body` on `lower_body_product_id`
- `idx_accessory` on `accessory_product_id`
- `idx_created_at` on `created_at`

---

## Updated Relationships

```
users (1) ────< (many) orders
orders (1) ────< (many) order_lines
order_lines (1) ────< (many) return_lines
orders (1) ────< (many) returns
products (1) ────< (many) order_lines
products (1) ────< (many) outfits (upper_body)
products (1) ────< (many) outfits (lower_body)
products (1) ────< (many) outfits (accessory)
discounts (1) ────< (many) orders (optional)
```

## Additional Sample Queries

### Get outfit recommendations by occasion
```sql
SELECT o.outfit_id, o.name, o.occasion,
       pu.name AS upper_body,
       pl.name AS lower_body,
       pa.name AS accessory
FROM outfits o
JOIN products pu ON o.upper_body_product_id = pu.product_id
JOIN products pl ON o.lower_body_product_id = pl.product_id
JOIN products pa ON o.accessory_product_id = pa.product_id
WHERE o.occasion = 'casual'
ORDER BY o.created_at DESC;
```

### Get complete outfit details
```sql
SELECT * FROM outfit_details
WHERE occasion = 'business casual'
ORDER BY created_at DESC;
```

