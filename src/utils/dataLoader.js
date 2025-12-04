// Data loader utility to load data from generated JS files
import { mockProducts } from '../data/mockProducts';
import { orders } from '../data/orders';
import { orderLines } from '../data/orderLines';
import { returns } from '../data/returns';
import { returnLines } from '../data/returnLines';
import { users } from '../data/users';

// Current user - USER00178 with multiple orders
export const currentUser = {
  user_id: "USER00178",
  name: "Christopher",
  surname: "Lewis",
  email: "christopher.lewis@yahoo.com",
  phone: "+18068617466",
  created_at: "2024-06-30 19:50:35"
};

// Load products
export function loadProducts() {
  return mockProducts;
}

// Load orders for current user
export function loadUserOrders(userId) {
  return orders.filter(order => order.user_id === userId);
}

// Load all order lines
export function loadOrderLines() {
  return orderLines;
}

// Load returns for user's orders
export function loadUserReturns(userOrders) {
  const orderIds = userOrders.map(o => o.order_id);
  return returns.filter(ret => orderIds.includes(ret.order_id));
}

// Load all return lines
export function loadReturnLines() {
  return returnLines;
}

// Get product by ID
export function getProductById(productId) {
  return mockProducts.find(p => p.product_id === productId);
}

// Get order lines for an order
export function getOrderLinesForOrder(orderId) {
  return orderLines.filter(ol => ol.order_id === orderId);
}

// Get return lines for a return
export function getReturnLinesForReturn(returnId) {
  const returnLineIds = returnLines
    .filter(rl => {
      // We need to find return lines that belong to this return
      // Return lines reference order_line_id, so we need to check which return they belong to
      // This is a simplified version - in real app, return_lines would have return_id
      return true; // For now, return all
    });
  return returnLineIds;
}

