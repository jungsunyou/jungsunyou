import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';
import { schoolRegional2025, schoolRegional2026, schoolRegionalComparison, MONTHS } from '../data/regionalData';
import { formatCurrency, formatNumber } from '../data/dashboardData';
import YearSelector from './YearSelector';

const REGIONS = schoolRegional2026.map(r => r.region);
const TOP_REGIONS_2026 = [...schoolRegional2026]
  .sort((a, b) => b.total - a.total)
  .slice(0, 12);

const comparisonData = TOP_REGIONS_2026.map(r26 => {
  const r25 = schoolRegional2025.find(r => r.region === r26.region);
  return {
    region: r26.region,
    '2026': r26.total,
    '2025': r25 ? r25.total : 0,
  };
});

function RegionDetail({ region }) {
  const r26 = schoolRegional2026.find(r => r.region === region);
  const r25 = schoolRegional2025.find(r => r.region === region);
  if (!r26) return null;

  const monthData = MONTHS.map((m, i) => ({
    name: m,
    '2026': r26.values[i] || 0,
    '2025': r25 ? (r25.values[i] || 0) : 0,
  }));

  return (
    <div className="mt-4">
      <h4 className="text-sm font-semibold text-slate-700 mb-2">{region} 월별 비교</h4>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={monthData}>
          <XAxis dataKey="name" tick={{ fontSize: 10 }} />
          <YAxis tickFormatter={v => formatCurrency(v)} tick={{ fontSize: 10 }} width={50} />
          <Tooltip formatter={v => formatCurrency(v)} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Bar dataKey="2026" fill="#2563eb" barSize={12} radius={[2, 2, 0, 0]} />
          <Bar dataKey="2025" fill="#d1d5db" barSize={12} radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function RegionalBreakdown() {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [year, setYear] = useState(2026);
  const prevYear = year - 1;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-base font-semibold text-slate-800">학단 매출 지역별 비교 ({year % 100} vs {prevYear % 100})</h3>
        <YearSelector value={year} onChange={setYear} />
      </div>
      <p className="text-xs text-slate-400 mb-4">지역 바를 클릭하면 월별 상세를 볼 수 있습니다</p>

      {/* 주요 지역 전년비 요약 */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        {schoolRegionalComparison.map(d => {
          const isTotal = d.region === '학단매출 합계';
          return (
            <div key={d.region} className={`rounded-lg p-3 ${isTotal ? 'bg-slate-800 text-white' : 'bg-slate-50'}`}>
              <div className={`text-xs font-medium mb-1 ${isTotal ? 'text-slate-300' : 'text-slate-500'}`}>{d.region}</div>
              <div className={`text-sm font-bold ${isTotal ? 'text-white' : 'text-slate-800'}`}>{formatCurrency(d.rev2026)}</div>
              <div className="flex items-center gap-1 mt-1">
                <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${
                  d.pct >= 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'
                }`}>
                  {d.pct >= 0 ? '+' : ''}{d.pct}%
                </span>
                <span className={`text-[10px] ${isTotal ? 'text-slate-400' : 'text-slate-400'}`}>
                  vs {formatCurrency(d.rev2025)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 지역별 비교 차트 */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={comparisonData} onClick={(e) => {
          if (e?.activeLabel) setSelectedRegion(e.activeLabel);
        }}>
          <XAxis dataKey="region" tick={{ fontSize: 11 }} />
          <YAxis tickFormatter={v => formatCurrency(v)} tick={{ fontSize: 10 }} width={55} />
          <Tooltip formatter={v => formatCurrency(v)} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Bar dataKey="2026" fill="#2563eb" barSize={16} radius={[3, 3, 0, 0]} cursor="pointer" />
          <Bar dataKey="2025" fill="#cbd5e1" barSize={16} radius={[3, 3, 0, 0]} cursor="pointer" />
        </BarChart>
      </ResponsiveContainer>

      {selectedRegion && <RegionDetail region={selectedRegion} />}
    </div>
  );
}
