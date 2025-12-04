// Mock return lines aligned with backend schema from retail-dataset
// Data extracted from retail-dataset/return_lines.csv
// Schema: return_line_id, order_line_id

export const mockReturnLines = [
  {
    return_line_id: 1,
    order_line_id: 178
  },
  {
    return_line_id: 2,
    order_line_id: 87
  },
  {
    return_line_id: 3,
    order_line_id: 88
  },
  {
    return_line_id: 4,
    order_line_id: 335
  },
  {
    return_line_id: 5,
    order_line_id: 334
  },
  {
    return_line_id: 6,
    order_line_id: 333
  },
  {
    return_line_id: 7,
    order_line_id: 492
  },
  {
    return_line_id: 8,
    order_line_id: 494
  },
  {
    return_line_id: 9,
    order_line_id: 493
  },
  {
    return_line_id: 10,
    order_line_id: 112
  },
  {
    return_line_id: 11,
    order_line_id: 706
  },
  {
    return_line_id: 12,
    order_line_id: 619
  },
  {
    return_line_id: 13,
    order_line_id: 617
  },
  {
    return_line_id: 14,
    order_line_id: 618
  },
  {
    return_line_id: 15,
    order_line_id: 219
  }
];

// Helper function to get return lines by order line ID
export function getReturnLinesByOrderLineId(orderLineId) {
  return mockReturnLines.filter(line => line.order_line_id === orderLineId);
}

// Helper function to get return line by ID
export function getReturnLineById(returnLineId) {
  return mockReturnLines.find(line => line.return_line_id === returnLineId);
}

