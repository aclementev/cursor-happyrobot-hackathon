const fs = require('fs');
const path = require('path');

// Path to CSV files
const csvDir = path.join(__dirname, '../../retail-dataset');
const outputDir = path.join(__dirname, '../src/data');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function parseCSV(content) {
  const lines = content.trim().split('\n');
  const headers = lines[0].split(',');
  
  return lines.slice(1).map(line => {
    const values = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim());
    
    const obj = {};
    headers.forEach((header, index) => {
      let value = values[index] || '';
      
      // Convert numeric fields
      if (['stock', 'price', 'total_amount', 'return_amount', 'discount_amount', 
           'quantity', 'unit_price', 'order_line_id', 'return_line_id'].includes(header)) {
        value = value === '' ? 0 : parseFloat(value);
      }
      
      // Handle null values
      if (value === '' && ['discount_id', 'repurchase_id'].includes(header)) {
        value = null;
      }
      
      obj[header] = value;
    });
    
    return obj;
  });
}

// Files to convert
const files = [
  'products.csv',
  'users.csv', 
  'orders.csv',
  'order_lines.csv'
];

files.forEach(filename => {
  const csvPath = path.join(csvDir, filename);
  const jsonPath = path.join(outputDir, filename.replace('.csv', '.json'));
  
  if (fs.existsSync(csvPath)) {
    const content = fs.readFileSync(csvPath, 'utf-8');
    const data = parseCSV(content);
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
    console.log(`Generated ${jsonPath} with ${data.length} records`);
  } else {
    console.log(`File not found: ${csvPath}`);
  }
});

console.log('Data generation complete!');

