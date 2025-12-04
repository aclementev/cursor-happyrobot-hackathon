#!/usr/bin/env python3
"""
Generate sample datasets for an apparel ecommerce store demo.
Creates 7 CSV files with consistent, realistic data.
"""

import csv
import random
from datetime import datetime, timedelta
from typing import List, Dict, Tuple
import uuid

# Configuration
NUM_PRODUCTS = 250
NUM_USERS = 250
NUM_ORDERS = 300
NUM_DISCOUNTS = 25
RETURN_RATE = 0.12  # 12% of completed orders have returns

# Product categories and data
CATEGORIES = [
    "T-Shirts", "Jeans", "Dresses", "Jackets", "Shoes", "Accessories",
    "Sweaters", "Shorts", "Skirts", "Pants", "Hoodies", "Blazers"
]

SIZES = ["XS", "S", "M", "L", "XL", "XXL"]

COLORS = [
    "Black", "White", "Navy", "Gray", "Red", "Blue", "Green", "Brown",
    "Beige", "Pink", "Yellow", "Purple", "Orange", "Khaki", "Maroon"
]

PRODUCT_NAMES = {
    "T-Shirts": ["Classic Tee", "V-Neck T-Shirt", "Polo Shirt", "Graphic Tee", "Long Sleeve Tee"],
    "Jeans": ["Slim Fit Jeans", "Straight Leg Jeans", "Skinny Jeans", "Bootcut Jeans", "Relaxed Fit"],
    "Dresses": ["Summer Dress", "Maxi Dress", "Casual Dress", "Formal Dress", "Midi Dress"],
    "Jackets": ["Denim Jacket", "Leather Jacket", "Bomber Jacket", "Windbreaker", "Blazer"],
    "Shoes": ["Sneakers", "Boots", "Loafers", "Sandals", "Heels"],
    "Accessories": ["Belt", "Hat", "Scarf", "Watch", "Sunglasses"],
    "Sweaters": ["Pullover Sweater", "Cardigan", "Turtleneck", "V-Neck Sweater", "Hoodie"],
    "Shorts": ["Cargo Shorts", "Chino Shorts", "Athletic Shorts", "Denim Shorts"],
    "Skirts": ["A-Line Skirt", "Pencil Skirt", "Pleated Skirt", "Mini Skirt"],
    "Pants": ["Chinos", "Cargo Pants", "Dress Pants", "Joggers"],
    "Hoodies": ["Pullover Hoodie", "Zip-Up Hoodie", "Graphic Hoodie"],
    "Blazers": ["Single Breasted Blazer", "Double Breasted Blazer", "Casual Blazer"]
}

ORDER_STATUSES = ["pending", "completed", "shipped", "cancelled"]
RETURN_STATUSES = ["pending", "approved", "refunded"]
RETURN_REASONS = [
    "Wrong size", "Defective item", "Not as described", "Changed mind",
    "Quality issues", "Arrived damaged", "Too small", "Too large"
]

DISCOUNT_TYPES = ["percentage", "fixed_amount"]


def generate_product_id(index: int) -> str:
    """Generate a product ID."""
    return f"PROD{index:05d}"


def generate_user_id(index: int) -> str:
    """Generate a user ID."""
    return f"USER{index:05d}"


def generate_order_id(index: int) -> str:
    """Generate an order ID."""
    return f"ORD{index:05d}"


def generate_discount_id(index: int) -> str:
    """Generate a discount ID."""
    return f"DISC{index:03d}"


def generate_return_id(index: int) -> str:
    """Generate a return ID."""
    return f"RET{index:04d}"


def random_date(start_date: datetime, end_date: datetime) -> str:
    """Generate a random date between start and end dates."""
    time_between = end_date - start_date
    days_between = time_between.days
    random_days = random.randrange(days_between)
    random_date = start_date + timedelta(days=random_days)
    return random_date.strftime("%Y-%m-%d %H:%M:%S")


def generate_products() -> List[Dict]:
    """Generate products data."""
    products = []
    product_id_counter = 1
    
    for category in CATEGORIES:
        names = PRODUCT_NAMES.get(category, ["Generic Item"])
        num_items = NUM_PRODUCTS // len(CATEGORIES) + random.randint(0, 5)
        
        for _ in range(num_items):
            if product_id_counter > NUM_PRODUCTS:
                break
                
            name = random.choice(names)
            size = random.choice(SIZES)
            color = random.choice(COLORS)
            stock = random.randint(0, 100)
            price = round(random.uniform(10.0, 200.0), 2)
            
            # Generate description
            description = f"High-quality {color.lower()} {name.lower()} in size {size}. Perfect for everyday wear."
            
            # Generate Unsplash image URL
            image_id = random.randint(1, 1000)
            image_url = f"https://images.unsplash.com/photo-{1500000000000 + image_id}?w=800&h=800&fit=crop"
            
            products.append({
                "product_id": generate_product_id(product_id_counter),
                "name": f"{color} {name}",
                "category": category,
                "description": description,
                "size": size,
                "color": color,
                "stock": stock,
                "price": price,
                "image_url": image_url
            })
            product_id_counter += 1
    
    return products


def generate_users() -> List[Dict]:
    """Generate users data."""
    first_names = [
        "James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda",
        "William", "Elizabeth", "David", "Barbara", "Richard", "Susan", "Joseph", "Jessica",
        "Thomas", "Sarah", "Charles", "Karen", "Christopher", "Nancy", "Daniel", "Lisa",
        "Matthew", "Betty", "Anthony", "Margaret", "Mark", "Sandra", "Donald", "Ashley",
        "Steven", "Kimberly", "Paul", "Emily", "Andrew", "Donna", "Joshua", "Michelle",
        "Kenneth", "Carol", "Kevin", "Amanda", "Brian", "Dorothy", "George", "Melissa",
        "Edward", "Deborah", "Ronald", "Stephanie", "Timothy", "Rebecca", "Jason", "Sharon"
    ]
    
    last_names = [
        "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis",
        "Rodriguez", "Martinez", "Hernandez", "Lopez", "Wilson", "Anderson", "Thomas", "Taylor",
        "Moore", "Jackson", "Martin", "Lee", "Thompson", "White", "Harris", "Sanchez",
        "Clark", "Ramirez", "Lewis", "Robinson", "Walker", "Young", "Allen", "King",
        "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores", "Green", "Adams",
        "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell", "Carter", "Roberts"
    ]
    
    users = []
    start_date = datetime.now() - timedelta(days=730)  # 2 years ago
    end_date = datetime.now()
    
    for i in range(1, NUM_USERS + 1):
        name = random.choice(first_names)
        surname = random.choice(last_names)
        email = f"{name.lower()}.{surname.lower()}@{random.choice(['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'])}"
        phone = f"+1{random.randint(2000000000, 9999999999)}"
        created_at = random_date(start_date, end_date)
        
        users.append({
            "user_id": generate_user_id(i),
            "name": name,
            "surname": surname,
            "email": email,
            "phone": phone,
            "created_at": created_at
        })
    
    return users


def generate_discounts() -> List[Dict]:
    """Generate discounts data."""
    discounts = []
    discount_codes = [
        "SAVE10", "WELCOME20", "SUMMER25", "FALL15", "WINTER30",
        "SPRING20", "NEWUSER", "LOYALTY15", "FLASH50", "CLEARANCE40",
        "BIRTHDAY10", "VIP25", "EARLYBIRD", "BLACKFRIDAY", "CYBERMONDAY",
        "STUDENT15", "MILITARY20", "FIRSTORDER", "BULK25", "REFERRAL30",
        "HOLIDAY20", "ENDSEASON", "NEWYEAR", "VALENTINE", "EASTER15"
    ]
    
    start_date = datetime.now() - timedelta(days=180)
    end_date = datetime.now() + timedelta(days=180)
    
    for i in range(1, NUM_DISCOUNTS + 1):
        discount_type = random.choice(DISCOUNT_TYPES)
        
        if discount_type == "percentage":
            discount_amount = random.choice([10, 15, 20, 25, 30, 40, 50])
        else:
            discount_amount = round(random.uniform(5.0, 50.0), 2)
        
        # Some discounts are expired, some are active
        if random.random() < 0.3:  # 30% expired
            valid_until = random_date(start_date, datetime.now() - timedelta(days=1))
        else:
            valid_until = random_date(datetime.now(), end_date)
        
        discount_code = discount_codes[i - 1] if i <= len(discount_codes) else f"CODE{i:03d}"
        
        discounts.append({
            "discount_id": generate_discount_id(i),
            "discount_code": discount_code,
            "discount_type": discount_type,
            "discount_amount": discount_amount,
            "valid_until": valid_until
        })
    
    return discounts


def generate_orders_and_order_lines(users: List[Dict], discounts: List[Dict], products: List[Dict]) -> Tuple[List[Dict], List[Dict]]:
    """Generate orders and order_lines data."""
    orders = []
    order_lines = []
    
    # Create a product lookup by ID
    product_lookup = {p["product_id"]: p for p in products}
    
    start_date = datetime.now() - timedelta(days=365)  # Orders from last year
    end_date = datetime.now()
    
    order_line_id_counter = 1
    
    for i in range(1, NUM_ORDERS + 1):
        user_id = random.choice(users)["user_id"]
        created_at = random_date(start_date, end_date)
        
        # 30% of orders have discounts
        discount_id = None
        if random.random() < 0.3:
            discount = random.choice(discounts)
            discount_id = discount["discount_id"]
        
        # Generate 1-5 items per order
        num_items = random.randint(1, 5)
        order_total = 0.0
        
        for _ in range(num_items):
            product = random.choice(products)
            quantity = random.randint(1, min(3, product["stock"])) if product["stock"] > 0 else 1
            unit_price = product["price"]
            line_total = unit_price * quantity
            
            order_lines.append({
                "order_line_id": order_line_id_counter,
                "order_id": generate_order_id(i),
                "product_id": product["product_id"],
                "quantity": quantity,
                "unit_price": unit_price
            })
            
            order_total += line_total
            order_line_id_counter += 1
        
        # Apply discount if exists
        if discount_id:
            discount = next(d for d in discounts if d["discount_id"] == discount_id)
            if discount["discount_type"] == "percentage":
                order_total = order_total * (1 - discount["discount_amount"] / 100)
            else:
                order_total = max(0, order_total - discount["discount_amount"])
        
        order_total = round(order_total, 2)
        
        # Status distribution: 60% completed, 20% shipped, 15% pending, 5% cancelled
        rand = random.random()
        if rand < 0.60:
            status = "completed"
        elif rand < 0.80:
            status = "shipped"
        elif rand < 0.95:
            status = "pending"
        else:
            status = "cancelled"
        
        orders.append({
            "order_id": generate_order_id(i),
            "user_id": user_id,
            "total_amount": order_total,
            "discount_id": discount_id if discount_id else "",
            "status": status,
            "created_at": created_at
        })
    
    return orders, order_lines


def generate_returns_and_return_lines(orders: List[Dict], order_lines: List[Dict]) -> Tuple[List[Dict], List[Dict]]:
    """Generate returns and return_lines data."""
    returns = []
    return_lines = []
    
    # Filter completed orders only
    completed_orders = [o for o in orders if o["status"] == "completed"]
    num_returns = int(len(completed_orders) * RETURN_RATE)
    
    orders_with_returns = random.sample(completed_orders, num_returns)
    
    # Get list of order_ids for potential repurchases (orders not being returned)
    returned_order_ids = {o["order_id"] for o in orders_with_returns}
    potential_repurchases = [o["order_id"] for o in orders if o["order_id"] not in returned_order_ids]
    
    return_id_counter = 1
    repurchase_index = 0
    
    for order in orders_with_returns:
        order_id = order["order_id"]
        
        # Get order lines for this order
        order_lines_for_order = [ol for ol in order_lines if ol["order_id"] == order_id]
        
        # Return 1 to all items from the order
        num_items_to_return = random.randint(1, len(order_lines_for_order))
        items_to_return = random.sample(order_lines_for_order, num_items_to_return)
        
        # Calculate return amount
        return_amount = sum(ol["unit_price"] * ol["quantity"] for ol in items_to_return)
        return_amount = round(return_amount, 2)
        
        # Return date must be after order date
        order_date = datetime.strptime(order["created_at"], "%Y-%m-%d %H:%M:%S")
        return_date = order_date + timedelta(days=random.randint(1, 30))
        return_date_str = return_date.strftime("%Y-%m-%d %H:%M:%S")
        
        # Status distribution: 40% pending, 40% approved, 20% refunded
        rand = random.random()
        if rand < 0.4:
            status = "pending"
        elif rand < 0.8:
            status = "approved"
        else:
            status = "refunded"
        
        reason = random.choice(RETURN_REASONS)
        
        # Repurchase: 35% of approved/refunded returns with size-related reasons result in repurchase
        repurchase_id = ""
        if status in ["approved", "refunded"] and reason in ["Wrong size", "Too small", "Too large"]:
            if random.random() < 0.35 and repurchase_index < len(potential_repurchases):
                repurchase_id = potential_repurchases[repurchase_index]
                repurchase_index += 1
        
        returns.append({
            "return_id": generate_return_id(return_id_counter),
            "order_id": order_id,
            "return_amount": return_amount,
            "status": status,
            "reason": reason,
            "repurchase_id": repurchase_id,
            "created_at": return_date_str
        })
        
        # Create return lines
        for order_line in items_to_return:
            return_lines.append({
                "return_line_id": len(return_lines) + 1,
                "order_line_id": order_line["order_line_id"]
            })
        
        return_id_counter += 1
    
    return returns, return_lines


def write_csv(filename: str, data: List[Dict], fieldnames: List[str]):
    """Write data to CSV file."""
    with open(filename, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(data)
    print(f"Created {filename} with {len(data)} records")


def main():
    """Main function to generate all datasets."""
    print("Generating ecommerce sample datasets...")
    print("=" * 50)
    
    # Generate base data
    print("\n1. Generating products...")
    products = generate_products()
    write_csv("products.csv", products, 
              ["product_id", "name", "category", "description", "size", "color", "stock", "price", "image_url"])
    
    print("\n2. Generating users...")
    users = generate_users()
    write_csv("users.csv", users,
              ["user_id", "name", "surname", "email", "phone", "created_at"])
    
    print("\n3. Generating discounts...")
    discounts = generate_discounts()
    write_csv("discounts.csv", discounts,
              ["discount_id", "discount_code", "discount_type", "discount_amount", "valid_until"])
    
    print("\n4. Generating orders and order lines...")
    orders, order_lines = generate_orders_and_order_lines(users, discounts, products)
    write_csv("orders.csv", orders,
              ["order_id", "user_id", "total_amount", "discount_id", "status", "created_at"])
    write_csv("order_lines.csv", order_lines,
              ["order_line_id", "order_id", "product_id", "quantity", "unit_price"])
    
    print("\n5. Generating returns and return lines...")
    returns, return_lines = generate_returns_and_return_lines(orders, order_lines)
    write_csv("returns.csv", returns,
              ["return_id", "order_id", "return_amount", "status", "reason", "repurchase_id", "created_at"])
    write_csv("return_lines.csv", return_lines,
              ["return_line_id", "order_line_id"])
    
    print("\n" + "=" * 50)
    print("Dataset generation complete!")
    print(f"\nSummary:")
    print(f"  - Products: {len(products)}")
    print(f"  - Users: {len(users)}")
    print(f"  - Discounts: {len(discounts)}")
    print(f"  - Orders: {len(orders)}")
    print(f"  - Order Lines: {len(order_lines)}")
    print(f"  - Returns: {len(returns)}")
    print(f"  - Return Lines: {len(return_lines)}")


if __name__ == "__main__":
    random.seed(42)  # For reproducibility
    main()

