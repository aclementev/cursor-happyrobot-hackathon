# Ecommerce Sample Datasets

This directory contains sample datasets for an apparel ecommerce store demo.

## Generating the Data

To generate all CSV files, run:

```bash
python3 generate_data.py
```

Or use the shell script:

```bash
./run_generator.sh
```

## Generated Files

The script will create the following CSV files:

1. **products.csv** - Product catalog (250+ items)
2. **users.csv** - Customer data (250+ users)
3. **orders.csv** - Order records (300+ orders)
4. **order_lines.csv** - Order line items
5. **returns.csv** - Return records
6. **return_lines.csv** - Return line items
7. **discounts.csv** - Discount codes (25 codes)

## Data Consistency

All data is generated with referential integrity:
- All foreign keys reference existing records
- Order totals match sum of order lines
- Return amounts match returned order lines
- Product stock is realistic
- Return dates are after order dates

