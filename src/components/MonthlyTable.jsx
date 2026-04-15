import { useState, useMemo } from 'react';
import { monthlyPerformance, yearSummary, formatNumber } from '../data/dashboardData';
import YearSelector from './YearSelector';

function fmtRevenue(num) {
  if (!num) return '-';
  return num.toLocaleString('ko-KR');
}

export default function MonthlyTable() {
  const [year, setYear] = useState(2026);
  const data = monthlyPerformance[year] || monthlyPerformance[2026];
  const summary = yearSummary[year] || yearSummary[2026];
  const prevYear = year - 1;

  const totals = useMemo(() => {
    return data.reduce((acc, d) => ({
      users: acc.users + d.users,
      revenue: acc.revenue + d.revenue,
      targetUsers: acc.targetUsers + d.targetUsers,
      targetRevenue: acc.targetRevenue + d.targetRevenue,
      prevUsers: acc.prevUsers + d.prevUsers,
      prevRevenue: acc.prevRevenue + d.prevRevenue,
    }), { users: 0, revenue: 0, targetUsers: 0, targetRevenue: 0, prevUsers: 0, prevRevenue: 0 });
  }, [data]);

  const achRate = (rev, target) => target > 0 ? ((rev / target) * 100).toFixed(2) : '0.00';
  const yoyRate = (rev, prev) => prev > 0 ? ((rev / prev) * 100).toFixed(2) : '0.00';

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-3">
          <h3 className="text-base font-semibold text-slate-800">월별 상세 실적</h3>
          <YearSelector value={year} onChange={setYear} />
        </div>
        <span className="text-xs text-slate-400">*{year}_상반기+[제휴]호텔,렌터카 포함</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-700 text-white">
              <th className="text-center py-2.5 px-2 font-medium text-xs rounded-tl-lg whitespace-nowrap">이용월</th>
              <th className="text-right py-2.5 px-2 font-medium text-xs whitespace-nowrap">{year}<br/>이용수량</th>
              <th className="text-right py-2.5 px-2 font-medium text-xs whitespace-nowrap">{year}<br/>결제(예정)금액</th>
              <th className="text-right py-2.5 px-2 font-medium text-xs whitespace-nowrap">목표인원</th>
              <th className="text-right py-2.5 px-2 font-medium text-xs whitespace-nowrap">목표금액</th>
              <th className="text-center py-2.5 px-2 font-medium text-xs whitespace-nowrap">목표대비</th>
              <th className="text-right py-2.5 px-2 font-medium text-xs whitespace-nowrap">{prevYear}<br/>이용수량</th>
              <th className="text-right py-2.5 px-2 font-medium text-xs whitespace-nowrap">{prevYear}<br/>결제금액</th>
              <th className="text-center py-2.5 px-2 font-medium text-xs rounded-tr-lg whitespace-nowrap">{year % 100}년/{prevYear % 100}년</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => {
              const ach = achRate(d.revenue, d.targetRevenue);
              const yoy = yoyRate(d.revenue, d.prevRevenue);
              const achNum = parseFloat(ach);
              const yoyNum = parseFloat(yoy);
              return (
                <tr key={d.month} className="border-b border-slate-100 hover:bg-blue-50/30 transition-colors">
                  <td className="py-2.5 px-2 font-semibold text-center text-slate-700">{d.month}</td>
                  <td className="text-right py-2.5 px-2 text-slate-700">{formatNumber(d.users)}</td>
                  <td className="text-right py-2.5 px-2 font-medium text-slate-800">{fmtRevenue(d.revenue)}</td>
                  <td className="text-right py-2.5 px-2 text-slate-500">{formatNumber(d.targetUsers)}</td>
                  <td className="text-right py-2.5 px-2 text-slate-500">{fmtRevenue(d.targetRevenue)}</td>
                  <td className="text-center py-2.5 px-2">
                    <span className={`text-xs font-bold ${
                      achNum >= 80 ? 'text-blue-600' : achNum > 0 ? 'text-red-500' : 'text-slate-300'
                    }`}>
                      {achNum > 0 ? `${ach}%` : '0.00%'}
                    </span>
                  </td>
                  <td className="text-right py-2.5 px-2 text-slate-500">{formatNumber(d.prevUsers)}</td>
                  <td className="text-right py-2.5 px-2 text-slate-500">{fmtRevenue(d.prevRevenue)}</td>
                  <td className="text-center py-2.5 px-2">
                    <span className={`text-xs font-bold ${
                      yoyNum >= 100 ? 'text-red-600' : yoyNum > 0 ? 'text-red-500' : 'text-slate-300'
                    }`}>
                      {yoyNum > 0 ? `${yoy}%` : '0.00%'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="bg-slate-100 font-bold border-t-2 border-slate-300">
              <td className="py-3 px-2 text-center text-slate-700"></td>
              <td className="text-right py-3 px-2 text-slate-800">{formatNumber(totals.users)}</td>
              <td className="text-right py-3 px-2 text-slate-800">{fmtRevenue(totals.revenue)}</td>
              <td className="text-right py-3 px-2 text-slate-600">{formatNumber(totals.targetUsers)}</td>
              <td className="text-right py-3 px-2 text-slate-600">{fmtRevenue(totals.targetRevenue)}</td>
              <td className="text-center py-3 px-2">
                <span className={`text-xs font-bold ${parseFloat(achRate(totals.revenue, totals.targetRevenue)) >= 80 ? 'text-blue-600' : 'text-red-600'}`}>
                  {achRate(totals.revenue, totals.targetRevenue)}%
                </span>
              </td>
              <td className="text-right py-3 px-2 text-slate-600">{formatNumber(totals.prevUsers)}</td>
              <td className="text-right py-3 px-2 text-slate-600">{fmtRevenue(totals.prevRevenue)}</td>
              <td className="text-center py-3 px-2">
                <span className={`text-xs font-bold ${parseFloat(yoyRate(totals.revenue, totals.prevRevenue)) >= 100 ? 'text-red-600' : 'text-red-500'}`}>
                  {yoyRate(totals.revenue, totals.prevRevenue)}%
                </span>
              </td>
            </tr>
            <tr className="bg-slate-50">
              <td colSpan={2} className="text-center py-2 px-2 text-xs text-slate-500 font-medium">{formatNumber(summary.avgUnitPrice)}</td>
              <td colSpan={3} className="text-center py-2 px-2 text-xs text-slate-500 font-medium">{formatNumber(Math.round(totals.targetRevenue / totals.targetUsers))}</td>
              <td colSpan={4} className="text-center py-2 px-2 text-xs text-slate-500 font-medium">{formatNumber(summary.prevAvgUnitPrice)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
