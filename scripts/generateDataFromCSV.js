// Script to generate data files from CSV files in retail-dataset
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function parseCSV(csvContent) {
  const lines = csvContent.trim().split('\n');
  const headers = lines[0].split(',');
  
  return lines.slice(1).map(line => {
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
    fields.push(currentField);
    
    const obj = {};
    headers.forEach((header, index) => {
      let value = fields[index] || '';
      // Clean up the header and value - remove \r characters
      const cleanHeader = header.trim().replace(/\r/g, '');
      value = value.trim().replace(/\r/g, '');
      
      // Try to parse as number
      if (cleanHeader.includes('amount') || cleanHeader.includes('price') || cleanHeader === 'stock') {
        const num = parseFloat(value);
        if (!isNaN(num)) {
          obj[cleanHeader] = num;
        } else {
          obj[cleanHeader] = value;
        }
      } else if ((cleanHeader.includes('id') && cleanHeader.includes('line')) || cleanHeader === 'quantity') {
        const num = parseInt(value, 10);
        if (!isNaN(num)) {
          obj[cleanHeader] = num;
        } else {
          obj[cleanHeader] = value;
        }
      } else {
        obj[cleanHeader] = value;
      }
    });
    
    return obj;
  });
}

// Generate orders data
const ordersPath = path.join(__dirname, '../retail-dataset/orders.csv');
const ordersContent = fs.readFileSync(ordersPath, 'utf-8');
const orders = parseCSV(ordersContent);

const ordersOutput = `// Orders data from retail-dataset/orders.csv
export const orders = ${JSON.stringify(orders, null, 2)};
`;
fs.writeFileSync(path.join(__dirname, '../src/data/orders.js'), ordersOutput, 'utf-8');
console.log(`✅ Generated orders.js with ${orders.length} orders`);

// Generate order lines data
const orderLinesPath = path.join(__dirname, '../retail-dataset/order_lines.csv');
const orderLinesContent = fs.readFileSync(orderLinesPath, 'utf-8');
const orderLines = parseCSV(orderLinesContent);

const orderLinesOutput = `// Order lines data from retail-dataset/order_lines.csv
export const orderLines = ${JSON.stringify(orderLines, null, 2)};
`;
fs.writeFileSync(path.join(__dirname, '../src/data/orderLines.js'), orderLinesOutput, 'utf-8');
console.log(`✅ Generated orderLines.js with ${orderLines.length} order lines`);

// Generate returns data
const returnsPath = path.join(__dirname, '../retail-dataset/returns.csv');
const returnsContent = fs.readFileSync(returnsPath, 'utf-8');
const returns = parseCSV(returnsContent);

const returnsOutput = `// Returns data from retail-dataset/returns.csv
export const returns = ${JSON.stringify(returns, null, 2)};
`;
fs.writeFileSync(path.join(__dirname, '../src/data/returns.js'), returnsOutput, 'utf-8');
console.log(`✅ Generated returns.js with ${returns.length} returns`);

// Generate return lines data
const returnLinesPath = path.join(__dirname, '../retail-dataset/return_lines.csv');
const returnLinesContent = fs.readFileSync(returnLinesPath, 'utf-8');
const returnLines = parseCSV(returnLinesContent);

const returnLinesOutput = `// Return lines data from retail-dataset/return_lines.csv
export const returnLines = ${JSON.stringify(returnLines, null, 2)};
`;
fs.writeFileSync(path.join(__dirname, '../src/data/returnLines.js'), returnLinesOutput, 'utf-8');
console.log(`✅ Generated returnLines.js with ${returnLines.length} return lines`);

// Generate users data
const usersPath = path.join(__dirname, '../retail-dataset/users.csv');
const usersContent = fs.readFileSync(usersPath, 'utf-8');
const users = parseCSV(usersContent);

const usersOutput = `// Users data from retail-dataset/users.csv
export const users = ${JSON.stringify(users, null, 2)};
`;
fs.writeFileSync(path.join(__dirname, '../src/data/users.js'), usersOutput, 'utf-8');
console.log(`✅ Generated users.js with ${users.length} users`);

