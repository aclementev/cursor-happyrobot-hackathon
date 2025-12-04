import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  currentUser,
  loadUserOrders,
  loadOrderLines,
  loadUserReturns,
  loadReturnLines,
  getProductById,
  getOrderLinesForOrder,
} from "../utils/dataLoader";
import { formatPrice } from "../data/mockProducts";

function Products() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [returns, setReturns] = useState([]);
  const [orderLines, setOrderLines] = useState([]);
  const [returnLines, setReturnLines] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [expandedReturn, setExpandedReturn] = useState(null);

  useEffect(() => {
    // Load user from localStorage or use currentUser
    const storedUser = localStorage.getItem("currentUser");
    const userData = storedUser ? JSON.parse(storedUser) : currentUser;
    setUser(userData);

    // Load user's orders
    const userOrders = loadUserOrders(userData.user_id);
    setOrders(userOrders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));

    // Load order lines
    const allOrderLines = loadOrderLines();
    setOrderLines(allOrderLines);

    // Load returns for user's orders
    const userReturns = loadUserReturns(userOrders);
    setReturns(userReturns.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));

    // Load return lines
    const allReturnLines = loadReturnLines();
    setReturnLines(allReturnLines);
  }, []);

  function getOrderItems(orderId) {
    return orderLines.filter((ol) => ol.order_id === orderId);
  }

  function getReturnItems(returnId) {
    // Return lines reference order_line_id
    // We need to find which order_lines were returned for this return
    const returnData = returns.find((r) => r.return_id === returnId);
    if (!returnData) return [];

    // Get all order lines for the returned order
    const orderItems = getOrderItems(returnData.order_id);
    
    // Find return_lines that reference order_lines from this order
    // Since return_lines only has order_line_id (no return_id), we can't perfectly match
    // For demo purposes, we'll show all items from the returned order
    // In a real app, return_lines would have return_id to link them properly
    const returnedOrderLineIds = new Set(returnLines.map(rl => rl.order_line_id));
    
    // Filter order items that have been returned (if their order_line_id is in return_lines)
    const returnedItems = orderItems.filter(item => 
      returnedOrderLineIds.has(item.order_line_id)
    );
    
    // If no specific items found, show all items from the order (for demo)
    return returnedItems.length > 0 ? returnedItems : orderItems;
  }

  function toggleOrder(orderId) {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
    setExpandedReturn(null);
  }

  function toggleReturn(returnId) {
    setExpandedReturn(expandedReturn === returnId ? null : returnId);
    setExpandedOrder(null);
  }

  function getStatusColor(status) {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      completed: "bg-green-100 text-green-800",
      shipped: "bg-blue-100 text-blue-800",
      cancelled: "bg-red-100 text-red-800",
      approved: "bg-green-100 text-green-800",
      refunded: "bg-purple-100 text-purple-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  }

  const totalSpent = orders.reduce((sum, order) => sum + (order.total_amount || 0), 0);
  const totalReturned = returns.reduce((sum, ret) => sum + (ret.return_amount || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Info Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {user?.name} {user?.surname}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-gray-900">{user?.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="text-gray-900">{user?.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Member Since</p>
              <p className="text-gray-900">
                {user?.created_at
                  ? new Date(user.created_at).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">User ID</p>
              <p className="text-gray-900 font-mono text-sm">{user?.user_id}</p>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Total Orders
            </h3>
            <p className="text-3xl font-bold text-indigo-600">{orders.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Total Spent
            </h3>
            <p className="text-3xl font-bold text-green-600">
              {formatPrice(totalSpent)}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Total Returns
            </h3>
            <p className="text-3xl font-bold text-orange-600">
              {formatPrice(totalReturned)}
            </p>
          </div>
        </div>

        {/* Orders Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Order History ({orders.length})
          </h2>
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
                No orders found
              </div>
            ) : (
              orders.map((order) => {
                const items = getOrderItems(order.order_id);
                const isExpanded = expandedOrder === order.order_id;

                return (
                  <div
                    key={order.order_id}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <div
                      className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => toggleOrder(order.order_id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {order.order_id}
                            </h3>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                order.status
                              )}`}
                            >
                              {order.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">
                            {new Date(order.created_at).toLocaleString()}
                          </p>
                          <p className="text-lg font-bold text-indigo-600 mt-2">
                            {formatPrice(order.total_amount)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">
                            {items.length} item{items.length !== 1 ? "s" : ""}
                          </p>
                          <button className="text-indigo-600 hover:text-indigo-800 mt-2">
                            {isExpanded ? "Hide" : "View"} Details
                          </button>
                        </div>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="border-t border-gray-200 p-6 bg-gray-50">
                        <h4 className="font-semibold text-gray-900 mb-4">
                          Order Items
                        </h4>
                        <div className="space-y-3">
                          {items.map((item) => {
                            const product = getProductById(item.product_id);
                            return (
                              <div
                                key={item.order_line_id}
                                className="bg-white rounded-lg p-4 flex items-center gap-4"
                              >
                                {product?.image_url && (
                                  <img
                                    src={product.image_url}
                                    alt={product?.name}
                                    className="w-16 h-16 object-cover rounded"
                                    onError={(e) => {
                                      e.target.src =
                                        "https://via.placeholder.com/64x64?text=Product";
                                    }}
                                  />
                                )}
                                <div className="flex-1">
                                  <p className="font-medium text-gray-900">
                                    {product?.name || item.product_id}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    {product?.category} • Size: {product?.size} • Color:{" "}
                                    {product?.color}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    Quantity: {item.quantity} ×{" "}
                                    {formatPrice(item.unit_price)}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="font-semibold text-gray-900">
                                    {formatPrice(item.quantity * item.unit_price)}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Returns Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Returns ({returns.length})
          </h2>
          <div className="space-y-4">
            {returns.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
                No returns found
              </div>
            ) : (
              returns.map((returnItem) => {
                const items = getReturnItems(returnItem.return_id);
                const isExpanded = expandedReturn === returnItem.return_id;
                const order = orders.find((o) => o.order_id === returnItem.order_id);

                return (
                  <div
                    key={returnItem.return_id}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <div
                      className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => toggleReturn(returnItem.return_id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {returnItem.return_id}
                            </h3>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                returnItem.status
                              )}`}
                            >
                              {returnItem.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">
                            Order: {returnItem.order_id} •{" "}
                            {new Date(returnItem.created_at).toLocaleString()}
                          </p>
                          {returnItem.reason && (
                            <p className="text-sm text-gray-600 mt-1">
                              Reason: {returnItem.reason}
                            </p>
                          )}
                          <p className="text-lg font-bold text-orange-600 mt-2">
                            {formatPrice(returnItem.return_amount)}
                          </p>
                        </div>
                        <div className="text-right">
                          <button className="text-indigo-600 hover:text-indigo-800">
                            {isExpanded ? "Hide" : "View"} Details
                          </button>
                        </div>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="border-t border-gray-200 p-6 bg-gray-50">
                        <h4 className="font-semibold text-gray-900 mb-4">
                          Returned Items
                        </h4>
                        <div className="space-y-3">
                          {items.length > 0 ? (
                            items.map((item) => {
                              const product = getProductById(item.product_id);
                              return (
                                <div
                                  key={item.order_line_id}
                                  className="bg-white rounded-lg p-4 flex items-center gap-4"
                                >
                                  {product?.image_url && (
                                    <img
                                      src={product.image_url}
                                      alt={product?.name}
                                      className="w-16 h-16 object-cover rounded"
                                      onError={(e) => {
                                        e.target.src =
                                          "https://via.placeholder.com/64x64?text=Product";
                                      }}
                                    />
                                  )}
                                  <div className="flex-1">
                                    <p className="font-medium text-gray-900">
                                      {product?.name || item.product_id}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                      {product?.category} • Size: {product?.size} • Color:{" "}
                                      {product?.color}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                      Quantity: {item.quantity} ×{" "}
                                      {formatPrice(item.unit_price)}
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-semibold text-gray-900">
                                      {formatPrice(item.quantity * item.unit_price)}
                                    </p>
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <p className="text-gray-500 text-sm">
                              Return details for order {returnItem.order_id}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;

