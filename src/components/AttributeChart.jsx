import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { revenueByAttribute, usersByAttribute, formatCurrency, formatNumber } from '../data/dashboardData';

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3 text-sm">
      <p className="font-semibold" style={{ color: d.payload.color }}>{d.name}</p>
      <p className="text-slate-600">매출: {formatCurrency(d.value)}</p>
    </div>
  );
};

const total = revenueByAttribute.reduce((s, d) => s + d.value, 0);

export default function AttributeChart() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <h3 className="text-base font-semibold text-slate-800 mb-4">속성별 매출 비중</h3>
      <div className="flex items-start gap-4">
        <div className="w-48 h-48 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={revenueByAttribute}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {revenueByAttribute.map((d, i) => (
                  <Cell key={i} fill={d.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 space-y-1.5 text-sm">
          {revenueByAttribute.map(d => {
            const pct = ((d.value / total) * 100).toFixed(1);
            const userItem = usersByAttribute.find(u => u.name === d.name);
            return (
              <div key={d.name} className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm flex-shrink-0" style={{ background: d.color }} />
                <span className="w-16 text-slate-700 font-medium">{d.name}</span>
                <div className="flex-1 bg-slate-100 rounded-full h-2">
                  <div className="h-2 rounded-full" style={{ width: `${pct}%`, background: d.color }} />
                </div>
                <span className="w-10 text-right text-slate-500">{pct}%</span>
                <span className="w-16 text-right text-slate-600 font-medium">{formatCurrency(d.value)}</span>
                <span className="w-14 text-right text-slate-400">{userItem ? formatNumber(userItem.value) + '명' : ''}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
