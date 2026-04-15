import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import {
  partnerHotel, partnerRentcar, foreignVisitors, groupCommission,
  mealData, inspectionData, yearlyTrend,
  formatNumber, formatCurrency, formatCurrencyFull,
} from '../data/dashboardData';
import YearSelector from './YearSelector';

const TABS = ['채널별', '내/외국인', '부가매출', '연도별 추이'];

function ChannelTab({ year }) {
  const channels = [
    { name: '제휴호텔', count: partnerHotel.total.count, revenue: partnerHotel.total.revenue, unitPrice: partnerHotel.total.unitPrice },
    { name: '제휴렌터카', count: partnerRentcar.total.count, revenue: partnerRentcar.total.revenue, unitPrice: Math.round(partnerRentcar.total.revenue / partnerRentcar.total.count) },
  ];
  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {channels.map(ch => (
          <div key={ch.name} className="bg-slate-50 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-slate-600 mb-2">{ch.name}</h4>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-lg font-bold text-slate-800">{formatNumber(ch.count)}</div>
                <div className="text-xs text-slate-400">건수</div>
              </div>
              <div>
                <div className="text-lg font-bold text-blue-600">{formatCurrency(ch.revenue)}</div>
                <div className="text-xs text-slate-400">매출</div>
              </div>
              <div>
                <div className="text-lg font-bold text-amber-600">{formatNumber(ch.unitPrice)}</div>
                <div className="text-xs text-slate-400">객단가</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left py-2 px-3 text-slate-500 font-medium">월</th>
              <th className="text-right py-2 px-3 text-slate-500 font-medium">호텔 건수</th>
              <th className="text-right py-2 px-3 text-slate-500 font-medium">호텔 매출</th>
              <th className="text-right py-2 px-3 text-slate-500 font-medium">렌터카 건수</th>
              <th className="text-right py-2 px-3 text-slate-500 font-medium">렌터카 매출</th>
            </tr>
          </thead>
          <tbody>
            {partnerHotel.monthly.map((h, i) => {
              const r = partnerRentcar.monthly[i];
              return (
                <tr key={h.month} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-2 px-3 text-slate-700">{h.month}</td>
                  <td className="text-right py-2 px-3">{formatNumber(h.count)}</td>
                  <td className="text-right py-2 px-3 text-blue-600">{formatCurrency(h.revenue)}</td>
                  <td className="text-right py-2 px-3">{r ? formatNumber(r.count) : '-'}</td>
                  <td className="text-right py-2 px-3 text-blue-600">{r ? formatCurrency(r.revenue) : '-'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ForeignTab({ year }) {
  const curLabel = `${year} 이용수`;
  const data = foreignVisitors.monthly.map(d => ({
    name: d.month,
    [curLabel]: d.users2026,
    '목표': d.target,
  }));
  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{formatNumber(foreignVisitors.total2026.users)}</div>
          <div className="text-xs text-slate-500 mt-1">외국인 이용수량</div>
        </div>
        <div className="bg-emerald-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-emerald-600">{formatCurrency(foreignVisitors.total2026.revenue)}</div>
          <div className="text-xs text-slate-500 mt-1">외국인 결제금액</div>
        </div>
        <div className="bg-amber-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-amber-600">{formatNumber(foreignVisitors.total2026.unitPrice)}원</div>
          <div className="text-xs text-slate-500 mt-1">외국인 객단가</div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="name" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} width={45} />
          <Tooltip />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Bar dataKey={curLabel} fill="#2563eb" radius={[3, 3, 0, 0]} barSize={20} />
          <Bar dataKey="목표" fill="#d1d5db" radius={[3, 3, 0, 0]} barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function SubRevenueTab({ year }) {
  const commTotal = groupCommission.reduce((s, d) => s + d.amount, 0);
  const mealTotal2026 = mealData.reduce((s, d) => s + d.revenue2026, 0);
  const inspTotal2026 = inspectionData.reduce((s, d) => s + d.count2026, 0);
  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-violet-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-violet-600">{formatCurrency(commTotal)}</div>
          <div className="text-xs text-slate-500 mt-1">단체 수수료 합계</div>
        </div>
        <div className="bg-orange-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">{formatCurrency(mealTotal2026)}</div>
          <div className="text-xs text-slate-500 mt-1">학식(F&B) {year}</div>
        </div>
        <div className="bg-teal-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-teal-600">{formatNumber(inspTotal2026)}건</div>
          <div className="text-xs text-slate-500 mt-1">답사 {year}</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-semibold text-slate-600 mb-2">학식(F&B) 월별</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={mealData.map(d => ({ name: d.month, '2026': d.revenue2026, '2025': d.revenue2025 }))}>
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tickFormatter={v => formatCurrency(v)} tick={{ fontSize: 10 }} width={45} />
              <Tooltip formatter={v => formatCurrency(v)} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="2026" fill="#f97316" barSize={14} radius={[2, 2, 0, 0]} />
              <Bar dataKey="2025" fill="#d1d5db" barSize={14} radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-600 mb-2">답사 월별</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={inspectionData.map(d => ({ name: d.month, '2026': d.count2026, '2025': d.count2025, '2024': d.count2024 }))}>
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} width={30} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="2026" stroke="#2563eb" strokeWidth={2} dot={{ r: 2 }} />
              <Line type="monotone" dataKey="2025" stroke="#94a3b8" strokeWidth={1.5} dot={{ r: 2 }} />
              <Line type="monotone" dataKey="2024" stroke="#d1d5db" strokeWidth={1} dot={{ r: 1.5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function YearlyTab() {
  const data = yearlyTrend.map(d => ({
    name: d.year,
    이용수량: d.users,
    결제금액: d.revenue,
  }));
  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis yAxisId="left" tickFormatter={v => formatNumber(v)} tick={{ fontSize: 11 }} width={55} />
          <YAxis yAxisId="right" orientation="right" tickFormatter={v => formatCurrency(v)} tick={{ fontSize: 11 }} width={55} />
          <Tooltip formatter={(v, name) => name === '결제금액' ? formatCurrency(v) : formatNumber(v)} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Bar yAxisId="left" dataKey="이용수량" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={28} />
          <Bar yAxisId="right" dataKey="결제금액" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={28} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

const TAB_COMPONENTS = [ChannelTab, ForeignTab, SubRevenueTab, YearlyTab];

export default function DetailTabs() {
  const [active, setActive] = useState(0);
  const [year, setYear] = useState(2026);
  const ActiveComp = TAB_COMPONENTS[active];
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <div className="flex items-center justify-between mb-4 border-b border-slate-200">
        <div className="flex gap-1">
          {TABS.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActive(i)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                active === i
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        {active !== 3 && (
          <div className="pb-2">
            <YearSelector value={year} onChange={setYear} />
          </div>
        )}
      </div>
      <ActiveComp year={year} />
    </div>
  );
}
