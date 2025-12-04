// Mock order lines aligned with backend schema from retail-dataset
// Data extracted from retail-dataset/order_lines.csv
// Schema: order_line_id, order_id, product_id, quantity, unit_price

export const mockOrderLines = [
  {
    order_line_id: 1,
    order_id: "ORD00001",
    product_id: "PROD00050",
    quantity: 3,
    unit_price: 174.28
  },
  {
    order_line_id: 2,
    order_id: "ORD00001",
    product_id: "PROD00135",
    quantity: 2,
    unit_price: 75.97
  },
  {
    order_line_id: 3,
    order_id: "ORD00002",
    product_id: "PROD00145",
    quantity: 1,
    unit_price: 26.27
  },
  {
    order_line_id: 4,
    order_id: "ORD00002",
    product_id: "PROD00179",
    quantity: 1,
    unit_price: 141.8
  },
  {
    order_line_id: 5,
    order_id: "ORD00002",
    product_id: "PROD00077",
    quantity: 3,
    unit_price: 185.9
  },
  {
    order_line_id: 6,
    order_id: "ORD00002",
    product_id: "PROD00212",
    quantity: 1,
    unit_price: 192.79
  },
  {
    order_line_id: 7,
    order_id: "ORD00003",
    product_id: "PROD00104",
    quantity: 2,
    unit_price: 162.78
  },
  {
    order_line_id: 8,
    order_id: "ORD00004",
    product_id: "PROD00022",
    quantity: 2,
    unit_price: 106.81
  },
  {
    order_line_id: 9,
    order_id: "ORD00004",
    product_id: "PROD00217",
    quantity: 2,
    unit_price: 168.24
  },
  {
    order_line_id: 10,
    order_id: "ORD00005",
    product_id: "PROD00230",
    quantity: 3,
    unit_price: 22.01
  },
  {
    order_line_id: 11,
    order_id: "ORD00006",
    product_id: "PROD00122",
    quantity: 2,
    unit_price: 44.53
  },
  {
    order_line_id: 12,
    order_id: "ORD00006",
    product_id: "PROD00012",
    quantity: 1,
    unit_price: 40.9
  },
  {
    order_line_id: 13,
    order_id: "ORD00006",
    product_id: "PROD00176",
    quantity: 2,
    unit_price: 153.69
  },
  {
    order_line_id: 14,
    order_id: "ORD00006",
    product_id: "PROD00231",
    quantity: 3,
    unit_price: 87.58
  },
  {
    order_line_id: 15,
    order_id: "ORD00007",
    product_id: "PROD00001",
    quantity: 2,
    unit_price: 56.53
  }
];

// Helper function to get order lines by order ID
export function getOrderLinesByOrderId(orderId) {
  return mockOrderLines.filter(line => line.order_id === orderId);
}

// Helper function to get order line by ID
export function getOrderLineById(orderLineId) {
  return mockOrderLines.find(line => line.order_line_id === orderLineId);
}

// Helper function to calculate order line total
export function calculateOrderLineTotal(orderLine) {
  return orderLine.quantity * orderLine.unit_price;
}
