export const mockProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: "$79.99",
    image: "https://via.placeholder.com/300x300?text=Wireless+Headphones",
    description: "Premium noise-cancelling headphones"
  },
  {
    id: 2,
    name: "Smart Watch",
    price: "$199.99",
    image: "https://via.placeholder.com/300x300?text=Smart+Watch",
    description: "Fitness tracking and notifications"
  },
  {
    id: 3,
    name: "Laptop Stand",
    price: "$49.99",
    image: "https://via.placeholder.com/300x300?text=Laptop+Stand",
    description: "Ergonomic adjustable stand"
  },
  {
    id: 4,
    name: "Mechanical Keyboard",
    price: "$129.99",
    image: "https://via.placeholder.com/300x300?text=Mechanical+Keyboard",
    description: "RGB backlit gaming keyboard"
  },
  {
    id: 5,
    name: "USB-C Hub",
    price: "$39.99",
    image: "https://via.placeholder.com/300x300?text=USB-C+Hub",
    description: "Multi-port adapter"
  },
  {
    id: 6,
    name: "Wireless Mouse",
    price: "$29.99",
    image: "https://via.placeholder.com/300x300?text=Wireless+Mouse",
    description: "Ergonomic wireless mouse"
  }
]

// Helper function to format price as currency
export function formatPrice(price) {
  // Handle both number and string inputs
  if (typeof price === 'string') {
    // If already formatted as currency, return as is
    if (price.startsWith('$')) {
      return price;
    }
    // Otherwise, parse and format
    const numPrice = parseFloat(price);
    if (isNaN(numPrice)) {
      return price; // Return original if not a valid number
    }
    return `$${numPrice.toFixed(2)}`;
  }
  // Handle number input
  if (typeof price === 'number') {
    return `$${price.toFixed(2)}`;
  }
  // Fallback for other types
  return String(price);
}

