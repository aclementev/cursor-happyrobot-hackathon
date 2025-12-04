import {
  Product,
  User,
  Discount,
  Order,
  OrderLine,
  Return,
  ReturnLine,
  OrderWithDetails,
  OrderLineWithProduct,
  ReturnWithDetails,
  DashboardMetrics,
  ReturnMetrics,
} from './types';

// Import raw data
import productsData from '@/data/products.json';
import usersData from '@/data/users.json';
import ordersData from '@/data/orders.json';
import orderLinesData from '@/data/order_lines.json';
import returnsData from '@/data/returns.json';
import returnLinesData from '@/data/return_lines.json';
import discountsData from '@/data/discounts.json';

// Cast to typed arrays
export const products: Product[] = productsData as Product[];
export const users: User[] = usersData as User[];
export const orders: Order[] = ordersData as Order[];
export const orderLines: OrderLine[] = orderLinesData as OrderLine[];
export const returns: Return[] = returnsData as Return[];
export const returnLines: ReturnLine[] = returnLinesData as ReturnLine[];
export const discounts: Discount[] = discountsData as Discount[];

// Create lookup maps for fast access
const productMap = new Map(products.map(p => [p.product_id, p]));
const userMap = new Map(users.map(u => [u.user_id, u]));
const orderMap = new Map(orders.map(o => [o.order_id, o]));
const discountMap = new Map(discounts.map(d => [d.discount_id, d]));

// Group order lines by order_id
const orderLinesByOrderId = orderLines.reduce((acc, ol) => {
  if (!acc.has(ol.order_id)) {
    acc.set(ol.order_id, []);
  }
  acc.get(ol.order_id)!.push(ol);
  return acc;
}, new Map<string, OrderLine[]>());

// Create return by order_id lookup
const returnByOrderId = new Map(returns.map(r => [r.order_id, r]));

// Group return lines by return
const returnLinesByReturnId = returnLines.reduce((acc, rl) => {
  // Find which return this line belongs to by finding the order line's order
  const orderLine = orderLines.find(ol => ol.order_line_id === rl.order_line_id);
  if (orderLine) {
    const ret = returnByOrderId.get(orderLine.order_id);
    if (ret) {
      if (!acc.has(ret.return_id)) {
        acc.set(ret.return_id, []);
      }
      acc.get(ret.return_id)!.push(rl);
    }
  }
  return acc;
}, new Map<string, ReturnLine[]>());

// Helper functions
export function getProduct(productId: string): Product | null {
  return productMap.get(productId) ?? null;
}

export function getUser(userId: string): User | null {
  return userMap.get(userId) ?? null;
}

export function getOrder(orderId: string): Order | null {
  return orderMap.get(orderId) ?? null;
}

export function getDiscount(discountId: string | null): Discount | null {
  if (!discountId) return null;
  return discountMap.get(discountId) ?? null;
}

export function getOrderLines(orderId: string): OrderLine[] {
  return orderLinesByOrderId.get(orderId) ?? [];
}

export function getReturnForOrder(orderId: string): Return | null {
  return returnByOrderId.get(orderId) ?? null;
}

// Enriched data getters
export function getOrderWithDetails(orderId: string): OrderWithDetails | null {
  const order = getOrder(orderId);
  if (!order) return null;

  const orderLinesRaw = getOrderLines(orderId);
  const orderLinesWithProducts: OrderLineWithProduct[] = orderLinesRaw.map(ol => ({
    ...ol,
    product: getProduct(ol.product_id),
  }));

  return {
    ...order,
    user: getUser(order.user_id),
    order_lines: orderLinesWithProducts,
    discount: getDiscount(order.discount_id),
    return_info: getReturnForOrder(order.order_id),
  };
}

export function getAllOrdersWithDetails(): OrderWithDetails[] {
  return orders.map(order => getOrderWithDetails(order.order_id)!).filter(Boolean);
}

export function getReturnWithDetails(returnId: string): ReturnWithDetails | null {
  const ret = returns.find(r => r.return_id === returnId);
  if (!ret) return null;

  const order = getOrder(ret.order_id);
  const user = order ? getUser(order.user_id) : null;
  const repurchaseOrder = ret.repurchase_id ? getOrder(ret.repurchase_id) : null;
  const retLines = returnLinesByReturnId.get(ret.return_id) ?? [];

  return {
    ...ret,
    order,
    user,
    repurchase_order: repurchaseOrder,
    return_lines: retLines,
  };
}

export function getAllReturnsWithDetails(): ReturnWithDetails[] {
  return returns.map(r => getReturnWithDetails(r.return_id)!).filter(Boolean);
}

// Metrics calculations
export function getDashboardMetrics(): DashboardMetrics {
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.total_amount, 0);
  const totalUsers = users.length;
  const totalProducts = products.length;

  const ordersByStatus = {
    pending: orders.filter(o => o.status === 'pending').length,
    completed: orders.filter(o => o.status === 'completed').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
  };

  const totalReturns = returns.length;
  const returnRate = totalOrders > 0 ? (totalReturns / totalOrders) * 100 : 0;

  return {
    totalOrders,
    totalRevenue,
    totalUsers,
    totalProducts,
    ordersByStatus,
    totalReturns,
    returnRate,
  };
}

export function getReturnMetrics(): ReturnMetrics {
  const totalReturns = returns.length;
  const totalReturnedAmount = returns.reduce((sum, r) => sum + r.return_amount, 0);

  // Calculate repurchase amounts from linked repurchase orders
  const returnsWithRepurchase = returns.filter(r => r.repurchase_id);
  const totalRepurchaseAmount = returnsWithRepurchase.reduce((sum, r) => {
    const repurchaseOrder = getOrder(r.repurchase_id!);
    return sum + (repurchaseOrder?.total_amount ?? 0);
  }, 0);

  const retainedRevenueRatio = totalReturnedAmount > 0 
    ? totalRepurchaseAmount / totalReturnedAmount 
    : 0;

  const repurchaseConversionRate = totalReturns > 0 
    ? (returnsWithRepurchase.length / totalReturns) * 100 
    : 0;

  const byStatus = {
    pending: returns.filter(r => r.status === 'pending').length,
    approved: returns.filter(r => r.status === 'approved').length,
    refunded: returns.filter(r => r.status === 'refunded').length,
  };

  const byReason = returns.reduce((acc, r) => {
    const reason = r.reason || 'Unknown';
    acc[reason] = (acc[reason] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    totalReturns,
    totalReturnedAmount,
    totalRepurchaseAmount,
    retainedRevenueRatio,
    returnsWithRepurchase: returnsWithRepurchase.length,
    repurchaseConversionRate,
    byStatus,
    byReason,
  };
}

// Get recent orders
export function getRecentOrders(limit: number = 10): OrderWithDetails[] {
  return getAllOrdersWithDetails()
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, limit);
}

// Format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

// Format date
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

// Format date with time
export function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

