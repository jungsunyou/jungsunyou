import { useState, useMemo } from 'react';
import { XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Line, ComposedChart, Bar } from 'recharts';
import { monthlyPerformance, formatCurrency, formatNumber } from '../data/dashboardData';
import YearSelector from './YearSelector';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3 text-sm">
      <p className="font-semibold text-slate-700 mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }} className="flex justify-between gap-4">
          <span>{p.name}</span>
          <span className="font-medium">{formatCurrency(p.value)}</span>
        </p>
      ))}
    </div>
  );
};

const formatYAxis = (val) => {
  if (val >= 100000000) return `${(val / 100000000).toFixed(0)}억`;
  if (val >= 10000000) return `${(val / 10000000).toFixed(0)}천만`;
  return formatNumber(val);
};

export default function MonthlyChart() {
  const [year, setYear] = useState(2026);
  const prevYear = year - 1;
  const curLabel = `${year} 실적`;
  const prevLabel = `${prevYear} 실적`;

  const chartData = useMemo(() => {
    const data = monthlyPerformance[year] || monthlyPerformance[2026];
    return data.map(d => ({
      name: d.month,
      [curLabel]: d.revenue,
      [prevLabel]: d.prevRevenue,
      '목표금액': d.targetRevenue,
    }));
  }, [year, curLabel, prevLabel]);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-slate-800">월별 실적 vs 목표 (결제금액)</h3>
        <YearSelector value={year} onChange={setYear} />
      </div>
      <ResponsiveContainer width="100%" height={340}>
        <ComposedChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tickFormatter={formatYAxis} tick={{ fontSize: 11 }} width={55} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Bar dataKey={curLabel} fill="#2563eb" radius={[4, 4, 0, 0]} barSize={24} />
          <Bar dataKey={prevLabel} fill="#94a3b8" radius={[4, 4, 0, 0]} barSize={24} />
          <Line type="monotone" dataKey="목표금액" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
