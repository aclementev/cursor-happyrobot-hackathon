'use client';

import { ArrowRight, User } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { ReturnWithDetails } from '@/lib/types';
import { formatCurrency, formatDate } from '@/lib/data';

interface ReturnsTableProps {
  returns: ReturnWithDetails[];
}

export function ReturnsTable({ returns }: ReturnsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Return ID
            </th>
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
              Reason
            </th>
            <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Return Amount
            </th>
            <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Repurchase
            </th>
            <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Date
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {returns.map((ret) => (
            <tr key={ret.return_id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4">
                <span className="font-mono text-sm font-medium text-gray-900">{ret.return_id}</span>
              </td>
              <td className="px-6 py-4">
                <a 
                  href={`/orders?search=${ret.order_id}`}
                  className="font-mono text-sm text-blue-600 hover:text-blue-700 hover:underline"
                >
                  {ret.order_id}
                </a>
              </td>
              <td className="px-6 py-4">
                {ret.user ? (
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <User className="w-4 h-4 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {ret.user.name} {ret.user.surname}
                      </p>
                      <p className="text-xs text-gray-500 truncate max-w-[150px]">{ret.user.email}</p>
                    </div>
                  </div>
                ) : (
                  <span className="text-sm text-gray-400">Unknown</span>
                )}
              </td>
              <td className="px-6 py-4">
                <StatusBadge status={ret.status} variant="return" />
              </td>
              <td className="px-6 py-4">
                <span className="text-sm text-gray-600">{ret.reason || '-'}</span>
              </td>
              <td className="px-6 py-4 text-right">
                <span className="text-sm font-semibold text-red-600">
                  {formatCurrency(ret.return_amount)}
                </span>
              </td>
              <td className="px-6 py-4">
                {ret.repurchase_id ? (
                  <div className="flex items-center justify-center gap-2">
                    <ArrowRight className="w-4 h-4 text-emerald-500" />
                    <a 
                      href={`/orders?search=${ret.repurchase_id}`}
                      className="inline-flex items-center px-2 py-1 rounded bg-emerald-50 text-emerald-700 text-xs font-medium hover:bg-emerald-100"
                    >
                      {ret.repurchase_id}
                    </a>
                    {ret.repurchase_order && (
                      <span className="text-xs text-emerald-600 font-medium">
                        {formatCurrency(ret.repurchase_order.total_amount)}
                      </span>
                    )}
                  </div>
                ) : (
                  <span className="text-sm text-gray-400 text-center block">-</span>
                )}
              </td>
              <td className="px-6 py-4 text-right">
                <span className="text-sm text-gray-500">{formatDate(ret.created_at)}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

