import { useState, useMemo } from 'react';
import { yearSummary, formatNumber, formatCurrency } from '../data/dashboardData';
import YearSelector from './YearSelector';

const colorMap = {
  blue: { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'text-blue-600', badge: 'bg-blue-100 text-blue-700' },
  emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', icon: 'text-emerald-600', badge: 'bg-emerald-100 text-emerald-700' },
  amber: { bg: 'bg-amber-50', border: 'border-amber-200', icon: 'text-amber-600', badge: 'bg-amber-100 text-amber-700' },
  violet: { bg: 'bg-violet-50', border: 'border-violet-200', icon: 'text-violet-600', badge: 'bg-violet-100 text-violet-700' },
};

export default function KpiCards() {
  const [year, setYear] = useState(2026);

  const cards = useMemo(() => {
    const s = yearSummary[year] || yearSummary[2026];
    return [
      {
        title: '총 이용수량',
        value: formatNumber(s.totalUsers),
        unit: '명',
        sub: `목표 ${formatNumber(s.targetUsers)}명`,
        rate: ((s.totalUsers / s.targetUsers) * 100).toFixed(1),
        trend: s.totalUsers > s.prevTotalUsers ? 'up' : 'down',
        color: 'blue',
      },
      {
        title: '총 결제금액',
        value: formatCurrency(s.totalRevenue),
        unit: '',
        sub: `목표 ${formatCurrency(s.targetRevenue)}`,
        rate: s.achievementRate.toFixed(1),
        trend: s.totalRevenue > s.prevTotalRevenue ? 'up' : 'down',
        color: 'emerald',
      },
      {
        title: '객단가',
        value: formatNumber(s.avgUnitPrice),
        unit: '원',
        sub: `전년 ${formatNumber(s.prevAvgUnitPrice)}원`,
        rate: ((s.avgUnitPrice / s.prevAvgUnitPrice) * 100).toFixed(1),
        trend: s.avgUnitPrice > s.prevAvgUnitPrice ? 'up' : 'down',
        color: 'amber',
      },
      {
        title: '전년 대비',
        value: ((s.totalRevenue / s.prevTotalRevenue) * 100).toFixed(1),
        unit: '%',
        sub: `전년 ${formatCurrency(s.prevTotalRevenue)}`,
        rate: null,
        trend: s.totalRevenue > s.prevTotalRevenue ? 'up' : 'down',
        color: 'violet',
      },
    ];
  }, [year]);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-slate-500">주요 지표</h3>
        <YearSelector value={year} onChange={setYear} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => {
          const c = colorMap[card.color];
          return (
            <div key={card.title} className={`${c.bg} ${c.border} border rounded-xl p-5 transition-shadow hover:shadow-md`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-slate-500">{card.title}</span>
                {card.rate !== null && (
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${c.badge}`}>
                    달성률 {card.rate}%
                  </span>
                )}
              </div>
              <div className="flex items-baseline gap-1">
                <span className={`text-2xl font-bold ${c.icon}`}>{card.value}</span>
                <span className="text-sm text-slate-500">{card.unit}</span>
              </div>
              <div className="flex items-center gap-1 mt-2">
                <span className={`text-xs ${card.trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>
                  {card.trend === 'up' ? '▲' : '▼'}
                </span>
                <span className="text-xs text-slate-400">{card.sub}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
