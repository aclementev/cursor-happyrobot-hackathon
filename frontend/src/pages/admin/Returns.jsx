import { useState, useMemo } from 'react';
import { 
  RotateCcw, 
  DollarSign, 
  TrendingUp, 
  Percent, 
  RefreshCw,
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { MetricCard } from '../../components/admin/MetricCard';
import { ReturnsTable } from '../../components/admin/ReturnsTable';
import { RetainedRevenueChart } from '../../components/admin/charts/RetainedRevenueChart';
import { 
  getAllReturnsWithDetails, 
  getReturnMetrics, 
  formatCurrency 
} from '../../lib/data';

export default function AdminReturns() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCharts, setShowCharts] = useState(true);

  const allReturns = useMemo(() => getAllReturnsWithDetails(), []);
  const metrics = useMemo(() => getReturnMetrics(), []);

  const filteredReturns = useMemo(() => {
    return allReturns
      .filter(ret => {
        // Search filter
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          const matchesReturnId = ret.return_id.toLowerCase().includes(query);
          const matchesOrderId = ret.order_id.toLowerCase().includes(query);
          const matchesCustomerName = ret.user 
            ? `${ret.user.name} ${ret.user.surname}`.toLowerCase().includes(query)
            : false;
          
          if (!matchesReturnId && !matchesOrderId && !matchesCustomerName) {
            return false;
          }
        }

        // Status filter
        if (statusFilter !== 'all' && ret.status !== statusFilter) {
          return false;
        }

        return true;
      })
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }, [allReturns, searchQuery, statusFilter]);

  // Calculate retained revenue percentage (capped at 100% for display)
  const retainedPercentage = Math.min(metrics.retainedRevenueRatio * 100, 100);
  const isPositiveRetention = metrics.retainedRevenueRatio > 0.5;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Returns & Analytics</h1>
          <p className="text-gray-500 mt-1">Track returns and monitor repurchase performance</p>
        </div>
        <button
          onClick={() => setShowCharts(!showCharts)}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <TrendingUp className="w-4 h-4" />
          {showCharts ? 'Hide Charts' : 'Show Charts'}
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <MetricCard
          title="Total Returns"
          value={metrics.totalReturns}
          icon={RotateCcw}
          color="red"
        />
        <MetricCard
          title="Total Returned Amount"
          value={formatCurrency(metrics.totalReturnedAmount)}
          subtitle="Lost revenue from returns"
          icon={DollarSign}
          color="red"
        />
        <MetricCard
          title="Repurchase Amount"
          value={formatCurrency(metrics.totalRepurchaseAmount)}
          subtitle={`From ${metrics.returnsWithRepurchase} repurchases`}
          icon={RefreshCw}
          color="green"
        />
        <MetricCard
          title="Conversion Rate"
          value={`${metrics.repurchaseConversionRate.toFixed(1)}%`}
          subtitle="Returns with repurchase"
          icon={Percent}
          color="purple"
        />
      </div>

      {/* Retained Revenue Highlight */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5" />
              <h3 className="font-semibold text-blue-100">Retained Revenue Ratio</h3>
            </div>
            <p className="text-4xl font-bold mb-2">
              {(metrics.retainedRevenueRatio * 100).toFixed(1)}%
            </p>
            <p className="text-blue-200 text-sm">
              Ratio of repurchase revenue to total returned amount
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="flex items-center gap-1 justify-center">
                <ArrowDownRight className="w-5 h-5 text-red-300" />
                <p className="text-2xl font-bold">{formatCurrency(metrics.totalReturnedAmount)}</p>
              </div>
              <p className="text-sm text-blue-200">Returned</p>
            </div>
            
            <div className="w-px h-12 bg-blue-500" />
            
            <div className="text-center">
              <div className="flex items-center gap-1 justify-center">
                <ArrowUpRight className="w-5 h-5 text-emerald-300" />
                <p className="text-2xl font-bold">{formatCurrency(metrics.totalRepurchaseAmount)}</p>
              </div>
              <p className="text-sm text-blue-200">Repurchased</p>
            </div>
          </div>

          <div className="lg:w-64">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-blue-200">Retention</span>
              <span className="text-sm font-semibold">{retainedPercentage.toFixed(0)}%</span>
            </div>
            <div className="h-3 bg-blue-500/50 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all ${
                  isPositiveRetention ? 'bg-emerald-400' : 'bg-amber-400'
                }`}
                style={{ width: `${retainedPercentage}%` }}
              />
            </div>
            <p className="text-xs text-blue-200 mt-2">
              {isPositiveRetention 
                ? '✓ Good retention - over 50% of returned value recovered'
                : '⚠ Low retention - consider improving return experience'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      {showCharts && (
        <RetainedRevenueChart metrics={metrics} />
      )}

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by return ID, order ID, or customer..."
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
              <option value="all">All Statuses ({metrics.totalReturns})</option>
              <option value="pending">Pending ({metrics.byStatus.pending})</option>
              <option value="approved">Approved ({metrics.byStatus.approved})</option>
              <option value="refunded">Refunded ({metrics.byStatus.refunded})</option>
            </select>
          </div>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="flex gap-1 p-1 bg-gray-100 rounded-lg w-fit">
        {[
          { key: 'all', label: 'All', count: metrics.totalReturns },
          { key: 'pending', label: 'Pending', count: metrics.byStatus.pending },
          { key: 'approved', label: 'Approved', count: metrics.byStatus.approved },
          { key: 'refunded', label: 'Refunded', count: metrics.byStatus.refunded },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setStatusFilter(tab.key)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
              statusFilter === tab.key
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
            <span className="ml-1.5 text-xs text-gray-400">{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Returns Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">Returns List</h3>
            <p className="text-sm text-gray-500 mt-0.5">
              {filteredReturns.length} returns found
            </p>
          </div>
        </div>
        {filteredReturns.length > 0 ? (
          <ReturnsTable returns={filteredReturns} />
        ) : (
          <div className="py-16 text-center">
            <RotateCcw className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No returns found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}

