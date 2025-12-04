const colorClasses = {
  blue: {
    bg: 'bg-blue-50',
    icon: 'text-blue-500',
    iconBg: 'bg-blue-100',
  },
  green: {
    bg: 'bg-emerald-50',
    icon: 'text-emerald-500',
    iconBg: 'bg-emerald-100',
  },
  amber: {
    bg: 'bg-amber-50',
    icon: 'text-amber-500',
    iconBg: 'bg-amber-100',
  },
  red: {
    bg: 'bg-red-50',
    icon: 'text-red-500',
    iconBg: 'bg-red-100',
  },
  purple: {
    bg: 'bg-purple-50',
    icon: 'text-purple-500',
    iconBg: 'bg-purple-100',
  },
};

export function MetricCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend,
  color = 'blue' 
}) {
  const colors = colorClasses[color];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900 tracking-tight">{value}</p>
          {subtitle && (
            <p className="text-sm text-gray-400 mt-1">{subtitle}</p>
          )}
          {trend && (
            <div className={`flex items-center gap-1 mt-2 text-sm ${
              trend.isPositive ? 'text-emerald-600' : 'text-red-600'
            }`}>
              <span>{trend.isPositive ? '↑' : '↓'}</span>
              <span>{Math.abs(trend.value)}%</span>
              <span className="text-gray-400 ml-1">vs last period</span>
            </div>
          )}
        </div>
        <div className={`${colors.iconBg} p-3 rounded-xl`}>
          <Icon className={`w-6 h-6 ${colors.icon}`} />
        </div>
      </div>
    </div>
  );
}

