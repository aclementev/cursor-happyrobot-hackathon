// Script to generate mockProducts.js from products.csv
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const csvPath = path.join(__dirname, '../retail-dataset/products.csv');
const outputPath = path.join(__dirname, '../src/data/mockProducts.js');

// Read CSV file
const csvContent = fs.readFileSync(csvPath, 'utf-8');
const lines = csvContent.trim().split('\n');

// Skip header line
const dataLines = lines.slice(1);

// Parse CSV and create products array
const products = dataLines.map(line => {
  // Simple CSV parsing (handles quoted fields)
  const fields = [];
  let currentField = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      fields.push(currentField);
      currentField = '';
    } else {
      currentField += char;
    }
  }
  fields.push(currentField); // Add last field
  
  const [
    product_id,
    name,
    category,
    description,
    size,
    color,
    stock,
    price,
    image_url
  ] = fields;
  
  return {
    product_id: product_id.trim(),
    name: name.trim(),
    category: category.trim(),
    description: description.trim(),
    size: size.trim(),
    color: color.trim(),
    stock: parseInt(stock.trim(), 10),
    price: parseFloat(price.trim()),
    image_url: image_url.trim()
  };
});

// Generate JavaScript file content
const jsContent = `// Mock products aligned with backend schema from retail-dataset
// Data extracted from retail-dataset/products.csv
// Schema: product_id, name, category, description, size, color, stock, price, image_url
// Total products: ${products.length}

export const mockProducts = ${JSON.stringify(products, null, 2)};

// Helper function to format price as currency
export function formatPrice(price) {
  return \`$\${price.toFixed(2)}\`;
}

// Helper function to get products by category
export function getProductsByCategory(category) {
  return mockProducts.filter(product => product.category === category);
}

// Helper function to get product by ID
export function getProductById(productId) {
  return mockProducts.find(product => product.product_id === productId);
}
`;

// Write to file
fs.writeFileSync(outputPath, jsContent, 'utf-8');

console.log(`✅ Generated mockProducts.js with ${products.length} products`);
console.log(`   Output: ${outputPath}`);

