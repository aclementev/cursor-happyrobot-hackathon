'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, ShoppingCart } from 'lucide-react';
import { OrdersTable } from '@/components/OrdersTable';
import { getAllOrdersWithDetails } from '@/lib/data';

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [hasReturnFilter, setHasReturnFilter] = useState<string>('all');

  const allOrders = useMemo(() => getAllOrdersWithDetails(), []);

  const filteredOrders = useMemo(() => {
    return allOrders
      .filter(order => {
        // Search filter
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          const matchesOrderId = order.order_id.toLowerCase().includes(query);
          const matchesCustomerName = order.user 
            ? `${order.user.name} ${order.user.surname}`.toLowerCase().includes(query)
            : false;
          const matchesEmail = order.user?.email.toLowerCase().includes(query);
          
          if (!matchesOrderId && !matchesCustomerName && !matchesEmail) {
            return false;
          }
        }

        // Status filter
        if (statusFilter !== 'all' && order.status !== statusFilter) {
          return false;
        }

        // Return filter
        if (hasReturnFilter === 'returned' && !order.return_info) {
          return false;
        }
        if (hasReturnFilter === 'not_returned' && order.return_info) {
          return false;
        }

        return true;
      })
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }, [allOrders, searchQuery, statusFilter, hasReturnFilter]);

  const statusCounts = useMemo(() => ({
    all: allOrders.length,
    pending: allOrders.filter(o => o.status === 'pending').length,
    completed: allOrders.filter(o => o.status === 'completed').length,
    shipped: allOrders.filter(o => o.status === 'shipped').length,
    cancelled: allOrders.filter(o => o.status === 'cancelled').length,
  }), [allOrders]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-500 mt-1">Manage and track all customer orders</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg">
          <ShoppingCart className="w-5 h-5 text-blue-500" />
          <span className="text-sm font-semibold text-blue-700">{filteredOrders.length} orders</span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by order ID, customer name, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="all">All Statuses ({statusCounts.all})</option>
              <option value="pending">Pending ({statusCounts.pending})</option>
              <option value="completed">Completed ({statusCounts.completed})</option>
              <option value="shipped">Shipped ({statusCounts.shipped})</option>
              <option value="cancelled">Cancelled ({statusCounts.cancelled})</option>
            </select>
          </div>

          {/* Return Filter */}
          <div>
            <select
              value={hasReturnFilter}
              onChange={(e) => setHasReturnFilter(e.target.value)}
              className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="all">All Orders</option>
              <option value="returned">With Returns</option>
              <option value="not_returned">Without Returns</option>
            </select>
          </div>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="flex gap-1 p-1 bg-gray-100 rounded-lg w-fit">
        {['all', 'pending', 'completed', 'shipped', 'cancelled'].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
              statusFilter === status
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
            <span className="ml-1.5 text-xs text-gray-400">
              {statusCounts[status as keyof typeof statusCounts]}
            </span>
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {filteredOrders.length > 0 ? (
          <OrdersTable orders={filteredOrders} />
        ) : (
          <div className="py-16 text-center">
            <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No orders found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}

