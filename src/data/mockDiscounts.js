// Mock discounts aligned with backend schema from retail-dataset
// Data extracted from retail-dataset/discounts.csv
// Schema: discount_id, discount_code, discount_type, discount_amount, valid_until
// discount_type: 'percentage' or 'fixed_amount'

export const mockDiscounts = [
  {
    discount_id: "DISC001",
    discount_code: "SAVE10",
    discount_type: "percentage",
    discount_amount: 25,
    valid_until: "2025-08-31 19:50:35"
  },
  {
    discount_id: "DISC002",
    discount_code: "WELCOME20",
    discount_type: "fixed_amount",
    discount_amount: 48.07,
    valid_until: "2025-07-25 19:50:35"
  },
  {
    discount_id: "DISC003",
    discount_code: "SUMMER25",
    discount_type: "percentage",
    discount_amount: 40,
    valid_until: "2026-04-05 19:50:35"
  },
  {
    discount_id: "DISC004",
    discount_code: "FALL15",
    discount_type: "percentage",
    discount_amount: 40,
    valid_until: "2026-01-25 19:50:35"
  },
  {
    discount_id: "DISC005",
    discount_code: "WINTER30",
    discount_type: "fixed_amount",
    discount_amount: 46.18,
    valid_until: "2026-02-14 19:50:35"
  },
  {
    discount_id: "DISC006",
    discount_code: "SPRING20",
    discount_type: "fixed_amount",
    discount_amount: 25.98,
    valid_until: "2026-02-20 19:50:35"
  },
  {
    discount_id: "DISC007",
    discount_code: "NEWUSER",
    discount_type: "fixed_amount",
    discount_amount: 21.18,
    valid_until: "2026-04-02 19:50:35"
  },
  {
    discount_id: "DISC008",
    discount_code: "LOYALTY15",
    discount_type: "percentage",
    discount_amount: 50,
    valid_until: "2026-04-03 19:50:35"
  },
  {
    discount_id: "DISC009",
    discount_code: "FLASH50",
    discount_type: "fixed_amount",
    discount_amount: 46.14,
    valid_until: "2026-03-19 19:50:35"
  },
  {
    discount_id: "DISC010",
    discount_code: "CLEARANCE40",
    discount_type: "percentage",
    discount_amount: 30,
    valid_until: "2026-01-10 19:50:35"
  },
  {
    discount_id: "DISC013",
    discount_code: "EARLYBIRD",
    discount_type: "fixed_amount",
    discount_amount: 30.64,
    valid_until: "2025-10-25 19:50:35"
  }
];

// Helper function to get discount by code
export function getDiscountByCode(discountCode) {
  return mockDiscounts.find(discount => discount.discount_code === discountCode);
}

// Helper function to get discount by ID
export function getDiscountById(discountId) {
  return mockDiscounts.find(discount => discount.discount_id === discountId);
}

// Helper function to check if discount is valid
export function isDiscountValid(discount) {
  if (!discount) return false;
  const validUntil = new Date(discount.valid_until);
  const now = new Date();
  return now < validUntil;
}

// Helper function to calculate discount amount
export function calculateDiscountAmount(subtotal, discount) {
  if (!discount || !isDiscountValid(discount)) {
    return 0;
  }

  if (discount.discount_type === "percentage") {
    return (subtotal * discount.discount_amount) / 100;
  } else {
    // fixed_amount
    return Math.min(discount.discount_amount, subtotal);
  }
}
