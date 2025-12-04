import { 
  ShoppingCart, 
  DollarSign, 
  Users, 
  Package, 
  RotateCcw,
  TrendingUp,
  Clock,
  CheckCircle2,
  Truck,
  XCircle
} from 'lucide-react';
import { MetricCard } from '@/components/MetricCard';
import { StatusBadge } from '@/components/StatusBadge';
import { 
  getDashboardMetrics, 
  getRecentOrders, 
  formatCurrency, 
  formatDate 
} from '@/lib/data';

export default function DashboardPage() {
  const metrics = getDashboardMetrics();
  const recentOrders = getRecentOrders(8);

  const statusData = [
    { status: 'completed', count: metrics.ordersByStatus.completed, icon: CheckCircle2, color: 'emerald' },
    { status: 'shipped', count: metrics.ordersByStatus.shipped, icon: Truck, color: 'blue' },
    { status: 'pending', count: metrics.ordersByStatus.pending, icon: Clock, color: 'amber' },
    { status: 'cancelled', count: metrics.ordersByStatus.cancelled, icon: XCircle, color: 'red' },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back! Here&apos;s an overview of your store.</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <MetricCard
          title="Total Orders"
          value={metrics.totalOrders.toLocaleString()}
          icon={ShoppingCart}
          color="blue"
        />
        <MetricCard
          title="Total Revenue"
          value={formatCurrency(metrics.totalRevenue)}
          icon={DollarSign}
          color="green"
        />
        <MetricCard
          title="Total Customers"
          value={metrics.totalUsers.toLocaleString()}
          icon={Users}
          color="purple"
        />
        <MetricCard
          title="Total Products"
          value={metrics.totalProducts.toLocaleString()}
          icon={Package}
          color="amber"
        />
      </div>

      {/* Second Row - Returns & Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Order Status Breakdown */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Order Status Breakdown</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {statusData.map((item) => {
              const Icon = item.icon;
              const percentage = ((item.count / metrics.totalOrders) * 100).toFixed(1);
              return (
                <div 
                  key={item.status} 
                  className="relative p-4 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden group hover:border-gray-200 transition-colors"
                >
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className={`w-4 h-4 text-${item.color}-500`} />
                      <span className="text-sm font-medium text-gray-600 capitalize">{item.status}</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{item.count}</p>
                    <p className="text-xs text-gray-400 mt-1">{percentage}% of total</p>
                  </div>
                  {/* Progress bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                    <div 
                      className={`h-full bg-${item.color}-500 transition-all`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Returns Summary */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Returns Summary</h3>
            <RotateCcw className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-3xl font-bold text-gray-900">{metrics.totalReturns}</p>
              <p className="text-sm text-gray-500">Total returns</p>
            </div>
            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Return Rate</span>
                <span className="text-sm font-semibold text-gray-900">
                  {metrics.returnRate.toFixed(1)}%
                </span>
              </div>
              <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-red-400 rounded-full transition-all"
                  style={{ width: `${Math.min(metrics.returnRate, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">Recent Orders</h3>
            <p className="text-sm text-gray-500 mt-0.5">Latest transactions from your store</p>
          </div>
          <a 
            href="/orders" 
            className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            View all
            <TrendingUp className="w-4 h-4" />
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentOrders.map((order) => (
                <tr key={order.order_id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm text-gray-900">{order.order_id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {order.user ? `${order.user.name} ${order.user.surname}` : 'Unknown'}
                      </p>
                      <p className="text-xs text-gray-500">{order.user?.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{order.order_lines.length} items</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm font-semibold text-gray-900">
                      {formatCurrency(order.total_amount)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm text-gray-500">{formatDate(order.created_at)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

