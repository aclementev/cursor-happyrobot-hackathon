// Core entity types
export interface Product {
  product_id: string;
  name: string;
  category: string;
  description: string;
  size: string;
  color: string;
  stock: number;
  price: number;
  image_url: string;
}

export interface User {
  user_id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  created_at: string;
}

export interface Discount {
  discount_id: string;
  discount_code: string;
  discount_type: 'percentage' | 'fixed_amount';
  discount_amount: number;
  valid_until: string;
}

export interface Order {
  order_id: string;
  user_id: string;
  total_amount: number;
  discount_id: string | null;
  status: 'pending' | 'completed' | 'shipped' | 'cancelled';
  created_at: string;
}

export interface OrderLine {
  order_line_id: number;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
}

export interface Return {
  return_id: string;
  order_id: string;
  return_amount: number;
  status: 'pending' | 'approved' | 'refunded';
  reason: string;
  repurchase_id: string | null;
  created_at: string;
}

export interface ReturnLine {
  return_line_id: number;
  order_line_id: number;
}

// Enriched types with relationships
export interface OrderWithDetails extends Order {
  user: User | null;
  order_lines: OrderLineWithProduct[];
  discount: Discount | null;
  return_info: Return | null;
}

export interface OrderLineWithProduct extends OrderLine {
  product: Product | null;
}

export interface ReturnWithDetails extends Return {
  order: Order | null;
  user: User | null;
  repurchase_order: Order | null;
  return_lines: ReturnLine[];
}

// Metric types
export interface ReturnMetrics {
  totalReturns: number;
  totalReturnedAmount: number;
  totalRepurchaseAmount: number;
  retainedRevenueRatio: number;
  returnsWithRepurchase: number;
  repurchaseConversionRate: number;
  byStatus: {
    pending: number;
    approved: number;
    refunded: number;
  };
  byReason: Record<string, number>;
}

export interface DashboardMetrics {
  totalOrders: number;
  totalRevenue: number;
  totalUsers: number;
  totalProducts: number;
  ordersByStatus: {
    pending: number;
    completed: number;
    shipped: number;
    cancelled: number;
  };
  totalReturns: number;
  returnRate: number;
}

