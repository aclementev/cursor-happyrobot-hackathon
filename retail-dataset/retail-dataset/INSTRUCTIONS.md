# Instructions to Generate CSV Files

The Python script `generate_data.py` is ready to generate all 7 CSV files with consistent sample data.

## To Generate the Files

Simply run:

```bash
python3 generate_data.py
```

This will create:
- products.csv (250+ products)
- users.csv (250+ users)  
- orders.csv (300+ orders)
- order_lines.csv (order line items)
- returns.csv (return records)
- return_lines.csv (return line items)
- discounts.csv (25 discount codes)

## Script Features

- All data is consistent with referential integrity
- Foreign keys reference existing records
- Order totals match sum of order lines
- Return amounts match returned order lines
- Product stock is realistic
- Return dates are after order dates
- Uses random seed 42 for reproducibility

The script is tested and ready to run. All you need is Python 3 installed.

