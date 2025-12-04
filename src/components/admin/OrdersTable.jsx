import { useState } from 'react';
import { ChevronDown, ChevronRight, RotateCcw, Package, Mail, Phone } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { formatCurrency, formatDate } from '../../lib/data';

function OrderRow({ order }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      {/* Main Row */}
      <tr 
        className={`hover:bg-gray-50 transition-colors cursor-pointer ${isExpanded ? 'bg-blue-50/50' : ''}`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <td className="px-6 py-4">
          <button className="p-1 hover:bg-gray-100 rounded transition-colors">
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-400" />
            )}
          </button>
        </td>
        <td className="px-6 py-4">
          <span className="font-mono text-sm font-medium text-gray-900">{order.order_id}</span>
        </td>
        <td className="px-6 py-4">
          <div>
            <p className="text-sm font-medium text-gray-900">
              {order.user ? `${order.user.name} ${order.user.surname}` : 'Unknown'}
            </p>
            <p className="text-xs text-gray-500 truncate max-w-[200px]">{order.user?.email}</p>
          </div>
        </td>
        <td className="px-6 py-4">
          <StatusBadge status={order.status} />
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">{order.order_lines.length}</span>
            {order.return_info && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-600">
                <RotateCcw className="w-3 h-3" />
                Returned
              </span>
            )}
          </div>
        </td>
        <td className="px-6 py-4">
          {order.discount && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-50 text-purple-600">
              {order.discount.discount_code}
            </span>
          )}
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

      {/* Expanded Content */}
      {isExpanded && (
        <tr>
          <td colSpan={8} className="px-6 py-0 bg-gray-50/80">
            <div className="py-4 space-y-4">
              {/* Customer Details */}
              {order.user && (
                <div className="flex items-start gap-6 p-4 bg-white rounded-lg border border-gray-200">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                    <span className="text-sm font-semibold text-blue-600">
                      {order.user.name.charAt(0)}{order.user.surname.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Customer</p>
                      <p className="text-sm font-medium text-gray-900">{order.user.name} {order.user.surname}</p>
                      <p className="text-xs text-gray-500">ID: {order.user.user_id}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Contact</p>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Mail className="w-3.5 h-3.5" />
                        <span className="truncate">{order.user.email}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-600 mt-0.5">
                        <Phone className="w-3.5 h-3.5" />
                        <span>{order.user.phone}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Customer Since</p>
                      <p className="text-sm text-gray-600">{formatDate(order.user.created_at)}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Return Information */}
              {order.return_info && (
                <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                  <div className="flex items-center gap-2 mb-3">
                    <RotateCcw className="w-4 h-4 text-red-500" />
                    <span className="text-sm font-semibold text-red-700">Return Information</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-xs text-red-500 mb-0.5">Return ID</p>
                      <p className="font-mono font-medium text-red-800">{order.return_info.return_id}</p>
                    </div>
                    <div>
                      <p className="text-xs text-red-500 mb-0.5">Status</p>
                      <StatusBadge status={order.return_info.status} variant="return" />
                    </div>
                    <div>
                      <p className="text-xs text-red-500 mb-0.5">Refund Amount</p>
                      <p className="font-semibold text-red-800">{formatCurrency(order.return_info.return_amount)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-red-500 mb-0.5">Reason</p>
                      <p className="text-red-700">{order.return_info.reason || 'Not specified'}</p>
                    </div>
                  </div>
                  {order.return_info.repurchase_id && (
                    <div className="mt-3 pt-3 border-t border-red-200">
                      <p className="text-xs text-red-500 mb-0.5">Repurchase Order</p>
                      <span className="inline-flex items-center px-2 py-1 rounded bg-emerald-100 text-emerald-700 text-xs font-medium">
                        {order.return_info.repurchase_id}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Order Lines */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-semibold text-gray-700">Order Items</span>
                    <span className="text-xs text-gray-400">({order.order_lines.length} items)</span>
                  </div>
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="text-xs text-gray-500 uppercase tracking-wider">
                      <th className="px-4 py-2 text-left font-medium">Product</th>
                      <th className="px-4 py-2 text-left font-medium">Category</th>
                      <th className="px-4 py-2 text-left font-medium">Size</th>
                      <th className="px-4 py-2 text-left font-medium">Color</th>
                      <th className="px-4 py-2 text-center font-medium">Qty</th>
                      <th className="px-4 py-2 text-right font-medium">Unit Price</th>
                      <th className="px-4 py-2 text-right font-medium">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {order.order_lines.map((line) => (
                      <tr key={line.order_line_id} className="text-sm">
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-medium text-gray-900">{line.product?.name || 'Unknown Product'}</p>
                            <p className="text-xs text-gray-400 font-mono">{line.product_id}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-600">{line.product?.category || '-'}</td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center px-2 py-0.5 rounded bg-gray-100 text-gray-600 text-xs font-medium">
                            {line.product?.size || '-'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-600">{line.product?.color || '-'}</td>
                        <td className="px-4 py-3 text-center text-gray-900 font-medium">{line.quantity}</td>
                        <td className="px-4 py-3 text-right text-gray-600">{formatCurrency(line.unit_price)}</td>
                        <td className="px-4 py-3 text-right font-semibold text-gray-900">
                          {formatCurrency(line.quantity * line.unit_price)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-gray-50 border-t-2 border-gray-200">
                      <td colSpan={5} className="px-4 py-3"></td>
                      <td className="px-4 py-3 text-right text-sm font-medium text-gray-600">
                        {order.discount && (
                          <div className="mb-1">
                            <span className="text-purple-600">Discount ({order.discount.discount_code})</span>
                          </div>
                        )}
                        Order Total
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="text-lg font-bold text-gray-900">
                          {formatCurrency(order.total_amount)}
                        </span>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export function OrdersTable({ orders }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="px-6 py-3 w-12"></th>
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
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Discount
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
          {orders.map((order) => (
            <OrderRow key={order.order_id} order={order} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

