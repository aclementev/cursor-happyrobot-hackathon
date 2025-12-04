// Mock returns aligned with backend schema from retail-dataset
// Data extracted from retail-dataset/returns.csv
// Schema: return_id, order_id, return_amount, status, reason, created_at
// Status: 'pending', 'approved', 'refunded'

export const mockReturns = [
  {
    return_id: "RET0001",
    order_id: "ORD00065",
    return_amount: 39.74,
    status: "approved",
    reason: "Quality issues",
    created_at: "2025-07-24 19:50:35"
  },
  {
    return_id: "RET0002",
    order_id: "ORD00029",
    return_amount: 723.7,
    status: "refunded",
    reason: "Defective item",
    created_at: "2025-06-21 19:50:35"
  },
  {
    return_id: "RET0003",
    order_id: "ORD00120",
    return_amount: 564.81,
    status: "pending",
    reason: "Wrong size",
    created_at: "2025-08-15 19:50:35"
  },
  {
    return_id: "RET0004",
    order_id: "ORD00172",
    return_amount: 402.5,
    status: "approved",
    reason: "Wrong size",
    created_at: "2025-05-22 19:50:35"
  },
  {
    return_id: "RET0005",
    order_id: "ORD00038",
    return_amount: 284.16,
    status: "pending",
    reason: "Changed mind",
    created_at: "2025-05-28 19:50:35"
  },
  {
    return_id: "RET0006",
    order_id: "ORD00237",
    return_amount: 52.71,
    status: "approved",
    reason: "Too large",
    created_at: "2025-03-13 19:50:35"
  },
  {
    return_id: "RET0007",
    order_id: "ORD00208",
    return_amount: 688.74,
    status: "pending",
    reason: "Not as described",
    created_at: "2025-11-12 19:50:35"
  },
  {
    return_id: "RET0008",
    order_id: "ORD00080",
    return_amount: 918.13,
    status: "pending",
    reason: "Not as described",
    created_at: "2025-03-30 19:50:35"
  },
  {
    return_id: "RET0009",
    order_id: "ORD00085",
    return_amount: 517.92,
    status: "pending",
    reason: "Arrived damaged",
    created_at: "2024-12-24 19:50:35"
  },
  {
    return_id: "RET0010",
    order_id: "ORD00108",
    return_amount: 672.25,
    status: "approved",
    reason: "Arrived damaged",
    created_at: "2025-06-09 19:50:35"
  }
];

// Helper function to get return by ID
export function getReturnById(returnId) {
  return mockReturns.find(ret => ret.return_id === returnId);
}

// Helper function to get returns by order ID
export function getReturnsByOrderId(orderId) {
  return mockReturns.filter(ret => ret.order_id === orderId);
}

// Helper function to get returns by status
export function getReturnsByStatus(status) {
  return mockReturns.filter(ret => ret.status === status);
}

// Helper function to format return amount
export function formatReturnAmount(amount) {
  return `$${amount.toFixed(2)}`;
}

