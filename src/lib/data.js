// Import raw data
import productsData from '../data/products.json';
import usersData from '../data/users.json';
import ordersData from '../data/orders.json';
import orderLinesData from '../data/order_lines.json';
import returnsData from '../data/returns.json';
import returnLinesData from '../data/return_lines.json';
import discountsData from '../data/discounts.json';

// Cast to typed arrays
export const products = productsData;
export const users = usersData;
export const orders = ordersData;
export const orderLines = orderLinesData;
export const returns = returnsData;
export const returnLines = returnLinesData;
export const discounts = discountsData;

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
  acc.get(ol.order_id).push(ol);
  return acc;
}, new Map());

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
      acc.get(ret.return_id).push(rl);
    }
  }
  return acc;
}, new Map());

// Helper functions
export function getProduct(productId) {
  return productMap.get(productId) ?? null;
}

export function getUser(userId) {
  return userMap.get(userId) ?? null;
}

export function getOrder(orderId) {
  return orderMap.get(orderId) ?? null;
}

export function getDiscount(discountId) {
  if (!discountId) return null;
  return discountMap.get(discountId) ?? null;
}

export function getOrderLines(orderId) {
  return orderLinesByOrderId.get(orderId) ?? [];
}

export function getReturnForOrder(orderId) {
  return returnByOrderId.get(orderId) ?? null;
}

// Enriched data getters
export function getOrderWithDetails(orderId) {
  const order = getOrder(orderId);
  if (!order) return null;

  const orderLinesRaw = getOrderLines(orderId);
  const orderLinesWithProducts = orderLinesRaw.map(ol => ({
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

export function getAllOrdersWithDetails() {
  return orders.map(order => getOrderWithDetails(order.order_id)).filter(Boolean);
}

export function getReturnWithDetails(returnId) {
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

export function getAllReturnsWithDetails() {
  return returns.map(r => getReturnWithDetails(r.return_id)).filter(Boolean);
}

// Metrics calculations
export function getDashboardMetrics() {
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

export function getReturnMetrics() {
  const totalReturns = returns.length;
  const totalReturnedAmount = returns.reduce((sum, r) => sum + r.return_amount, 0);

  // Calculate repurchase amounts from linked repurchase orders
  const returnsWithRepurchase = returns.filter(r => r.repurchase_id);
  const totalRepurchaseAmount = returnsWithRepurchase.reduce((sum, r) => {
    const repurchaseOrder = getOrder(r.repurchase_id);
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
  }, {});

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
export function getRecentOrders(limit = 10) {
  return getAllOrdersWithDetails()
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, limit);
}

// Format currency
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

// Format date
export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

// Format date with time
export function formatDateTime(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

