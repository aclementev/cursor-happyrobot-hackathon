// Mock orders aligned with backend schema from retail-dataset
// Data extracted from retail-dataset/orders.csv
// Schema: order_id, user_id, total_amount, discount_id, status, created_at
// Status: 'pending', 'completed', 'shipped', 'cancelled'

export const mockOrders = [
  {
    order_id: "ORD00001",
    user_id: "USER00236",
    total_amount: 674.78,
    discount_id: null,
    status: "pending",
    created_at: "2025-01-22 19:50:35"
  },
  {
    order_id: "ORD00002",
    user_id: "USER00069",
    total_amount: 887.92,
    discount_id: "DISC013",
    status: "shipped",
    created_at: "2025-06-25 19:50:35"
  },
  {
    order_id: "ORD00003",
    user_id: "USER00220",
    total_amount: 325.56,
    discount_id: null,
    status: "completed",
    created_at: "2025-11-01 19:50:35"
  },
  {
    order_id: "ORD00004",
    user_id: "USER00122",
    total_amount: 550.1,
    discount_id: null,
    status: "shipped",
    created_at: "2025-01-01 19:50:35"
  },
  {
    order_id: "ORD00005",
    user_id: "USER00085",
    total_amount: 66.03,
    discount_id: null,
    status: "pending",
    created_at: "2025-09-19 19:50:35"
  },
  {
    order_id: "ORD00006",
    user_id: "USER00059",
    total_amount: 778.89,
    discount_id: null,
    status: "completed",
    created_at: "2025-03-22 19:50:35"
  },
  {
    order_id: "ORD00007",
    user_id: "USER00238",
    total_amount: 620.79,
    discount_id: "DISC007",
    status: "completed",
    created_at: "2025-05-14 19:50:35"
  },
  {
    order_id: "ORD00008",
    user_id: "USER00218",
    total_amount: 1897.11,
    discount_id: null,
    status: "cancelled",
    created_at: "2025-06-21 19:50:35"
  },
  {
    order_id: "ORD00009",
    user_id: "USER00014",
    total_amount: 138.33,
    discount_id: null,
    status: "shipped",
    created_at: "2025-01-23 19:50:35"
  },
  {
    order_id: "ORD00010",
    user_id: "USER00001",
    total_amount: 245.30,
    discount_id: "DISC001",
    status: "completed",
    created_at: "2025-02-15 14:20:00"
  }
];

// Helper function to get order by ID
export function getOrderById(orderId) {
  return mockOrders.find(order => order.order_id === orderId);
}

// Helper function to get orders by user ID
export function getOrdersByUserId(userId) {
  return mockOrders.filter(order => order.user_id === userId);
}

// Helper function to get orders by status
export function getOrdersByStatus(status) {
  return mockOrders.filter(order => order.status === status);
}

// Helper function to format order amount
export function formatOrderAmount(amount) {
  return `$${amount.toFixed(2)}`;
}
