#!/usr/bin/env python3
"""
Generate outfits dataset for outfit recommendations.
Creates outfits.csv with combinations of upper body, lower body, and accessories.
"""

import csv
import random
from datetime import datetime
from typing import List, Dict

# Configuration
NUM_OUTFITS = 100

# Outfit occasions
OCCASIONS = [
    "casual", "business casual", "formal", "sporty", "weekend", 
    "date night", "work", "travel", "party", "everyday"
]

# Color combinations that work well together
COLOR_COMBINATIONS = [
    ("Black", "Black", "Black"),  # Monochrome
    ("White", "Navy", "Brown"),     # Classic
    ("Navy", "Khaki", "Brown"),     # Preppy
    ("Gray", "Black", "Black"),     # Modern
    ("White", "Blue", "White"),     # Fresh
    ("Black", "Gray", "Black"),     # Urban
    ("Navy", "Navy", "Brown"),      # Professional
    ("Beige", "Brown", "Brown"),    # Earth tones
    ("White", "White", "Black"),     # Clean
    ("Red", "Blue", "Black"),       # Bold
    ("Pink", "Gray", "White"),       # Soft
    ("Green", "Khaki", "Brown"),    # Natural
]

def generate_outfit_id(index: int) -> str:
    """Generate an outfit ID."""
    return f"OUTFIT{index:04d}"

def load_products() -> Dict[str, List[Dict]]:
    """Load products from CSV and group by category."""
    products_by_category = {
        "upper_body": [],  # T-Shirts, Sweaters, Hoodies, Jackets, Blazers
        "lower_body": [],  # Jeans, Pants, Shorts, Skirts
        "accessories": []  # Accessories, Shoes
    }
    
    upper_body_categories = ["T-Shirts", "Sweaters", "Hoodies", "Jackets", "Blazers"]
    lower_body_categories = ["Jeans", "Pants", "Shorts", "Skirts"]
    accessory_categories = ["Accessories", "Shoes"]
    
    with open("products.csv", "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            category = row["category"]
            if category in upper_body_categories:
                products_by_category["upper_body"].append(row)
            elif category in lower_body_categories:
                products_by_category["lower_body"].append(row)
            elif category in accessory_categories:
                products_by_category["accessories"].append(row)
    
    return products_by_category

def generate_outfit_name(upper_product: Dict, lower_product: Dict, accessory_product: Dict) -> str:
    """Generate a descriptive outfit name."""
    upper_name = upper_product["name"].split()[-1] if " " in upper_product["name"] else upper_product["name"]
    lower_name = lower_product["name"].split()[-1] if " " in lower_product["name"] else lower_product["name"]
    
    occasion = random.choice(OCCASIONS)
    return f"{occasion.title()} {upper_name} & {lower_name} Outfit"

def generate_outfit_description(upper_product: Dict, lower_product: Dict, accessory_product: Dict, occasion: str) -> str:
    """Generate an outfit description."""
    upper_color = upper_product["color"]
    lower_color = lower_product["color"]
    accessory_name = accessory_product["name"]
    
    descriptions = [
        f"A stylish {occasion} outfit featuring a {upper_color.lower()} {upper_product['category'].lower()} paired with {lower_color.lower()} {lower_product['category'].lower()}, completed with {accessory_name.lower()}.",
        f"Perfect for {occasion} occasions, this ensemble combines a {upper_color.lower()} {upper_product['category'].lower()} with {lower_color.lower()} {lower_product['category'].lower()} and {accessory_name.lower()}.",
        f"An elegant {occasion} look with a {upper_color.lower()} {upper_product['category'].lower()}, {lower_color.lower()} {lower_product['category'].lower()}, and {accessory_name.lower()} for a complete outfit.",
    ]
    
    return random.choice(descriptions)

def generate_outfits() -> List[Dict]:
    """Generate outfits data."""
    products_by_category = load_products()
    
    if not products_by_category["upper_body"] or not products_by_category["lower_body"] or not products_by_category["accessories"]:
        raise ValueError("Not enough products in required categories. Please ensure products.csv has items in T-Shirts/Sweaters/Hoodies/Jackets/Blazers, Jeans/Pants/Shorts/Skirts, and Accessories/Shoes categories.")
    
    outfits = []
    
    for i in range(1, NUM_OUTFITS + 1):
        # Choose products
        upper_product = random.choice(products_by_category["upper_body"])
        lower_product = random.choice(products_by_category["lower_body"])
        accessory_product = random.choice(products_by_category["accessories"])
        
        # Sometimes use color combinations, sometimes random
        if random.random() < 0.4:  # 40% use color combinations
            color_combo = random.choice(COLOR_COMBINATIONS)
            # Try to find products matching the color combo
            upper_matching = [p for p in products_by_category["upper_body"] if p["color"] == color_combo[0]]
            lower_matching = [p for p in products_by_category["lower_body"] if p["color"] == color_combo[1]]
            accessory_matching = [p for p in products_by_category["accessories"] if p["color"] == color_combo[2]]
            
            if upper_matching and lower_matching and accessory_matching:
                upper_product = random.choice(upper_matching)
                lower_product = random.choice(lower_matching)
                accessory_product = random.choice(accessory_matching)
        
        occasion = random.choice(OCCASIONS)
        name = generate_outfit_name(upper_product, lower_product, accessory_product)
        description = generate_outfit_description(upper_product, lower_product, accessory_product, occasion)
        
        created_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        
        outfits.append({
            "outfit_id": generate_outfit_id(i),
            "name": name,
            "upper_body_product_id": upper_product["product_id"],
            "lower_body_product_id": lower_product["product_id"],
            "accessory_product_id": accessory_product["product_id"],
            "occasion": occasion,
            "description": description,
            "created_at": created_at
        })
    
    return outfits

def main():
    """Main function to generate outfits dataset."""
    print("Generating outfits dataset...")
    print("=" * 50)
    
    outfits = generate_outfits()
    
    with open("outfits.csv", "w", newline="", encoding="utf-8") as csvfile:
        fieldnames = ["outfit_id", "name", "upper_body_product_id", "lower_body_product_id", 
                     "accessory_product_id", "occasion", "description", "created_at"]
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(outfits)
    
    print(f"Created outfits.csv with {len(outfits)} records")
    print("\nOutfit generation complete!")

if __name__ == "__main__":
    random.seed(42)  # For reproducibility
    main()

