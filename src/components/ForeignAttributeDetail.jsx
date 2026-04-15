import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { foreignAttributeRevenue2025, foreignAttributeRevenue2025Total, foreignAttributeRevenue2024 } from '../data/regionalData';
import { formatCurrency, formatNumber } from '../data/dashboardData';

const ATTRS = ['학단', '기업연수', '공공기관', '개별여행사', '기타'];
const COLORS = ['#3b82f6', '#f97316', '#10b981', '#8b5cf6', '#6b7280'];

const pieData2025 = ATTRS.map((name, i) => ({
  name,
  value: foreignAttributeRevenue2025Total[name] || 0,
  color: COLORS[i],
})).filter(d => d.value > 0);

const total2025 = Object.values(foreignAttributeRevenue2025Total).reduce((s, v) => s + v, 0);

const stackedData = foreignAttributeRevenue2025.map(d => ({
  name: d.month,
  학단: d.학단,
  기업연수: d.기업연수,
  공공기관: d.공공기관,
  '개별+여행사': d.개별여행사,
  기타: d.기타,
}));

export default function ForeignAttributeDetail() {
  const [yearTab, setYearTab] = useState('2025');

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-slate-800">외국인 속성별 매출</h3>
          <p className="text-xs text-slate-400 mt-0.5">외국인 방문객의 속성별 매출 분석</p>
        </div>
        <div className="flex gap-1 bg-slate-100 rounded-lg p-0.5">
          {['2025', '2024'].map(y => (
            <button
              key={y}
              onClick={() => setYearTab(y)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                yearTab === y ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {y}년
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-5">
        {/* 속성별 합계 카드 */}
        {ATTRS.filter(a => (foreignAttributeRevenue2025Total[a] || 0) > 0).map((attr, i) => {
          const val = foreignAttributeRevenue2025Total[attr];
          const pct = ((val / total2025) * 100).toFixed(1);
          return (
            <div key={attr} className="flex items-center gap-3 bg-slate-50 rounded-lg p-3">
              <div className="w-1 h-10 rounded-full" style={{ background: COLORS[i] }} />
              <div>
                <div className="text-xs text-slate-500">{attr}</div>
                <div className="text-sm font-bold text-slate-800">{formatCurrency(val)}</div>
                <div className="text-[10px] text-slate-400">{pct}%</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-5 gap-4">
        {/* 도넛 차트 */}
        <div className="col-span-2">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={pieData2025}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                {pieData2025.map((d, i) => (
                  <Cell key={i} fill={d.color} />
                ))}
              </Pie>
              <Tooltip formatter={v => formatCurrency(v)} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 스택 바 차트 */}
        <div className="col-span-3">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={stackedData}>
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tickFormatter={v => formatCurrency(v)} tick={{ fontSize: 10 }} width={50} />
              <Tooltip formatter={v => formatCurrency(v)} />
              <Legend wrapperStyle={{ fontSize: 10 }} />
              <Bar dataKey="학단" stackId="a" fill={COLORS[0]} />
              <Bar dataKey="기업연수" stackId="a" fill={COLORS[1]} />
              <Bar dataKey="공공기관" stackId="a" fill={COLORS[2]} />
              <Bar dataKey="개별+여행사" stackId="a" fill={COLORS[3]} />
              <Bar dataKey="기타" stackId="a" fill={COLORS[4]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 상세 테이블 */}
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-slate-50">
              <th className="text-left py-2 px-2 font-medium text-slate-500">월</th>
              {ATTRS.map((a, i) => (
                <th key={a} className="text-right py-2 px-2 font-medium" style={{ color: COLORS[i] }}>{a}</th>
              ))}
              <th className="text-right py-2 px-2 font-medium text-slate-600">합계</th>
            </tr>
          </thead>
          <tbody>
            {foreignAttributeRevenue2025.map((d, idx) => {
              const rowTotal = d.학단 + d.기업연수 + d.공공기관 + d.개별여행사 + d.기타;
              return (
                <tr key={d.month} className="border-b border-slate-100 hover:bg-blue-50/30">
                  <td className="py-1.5 px-2 text-slate-600 font-medium">{d.month}</td>
                  <td className="text-right py-1.5 px-2">{d.학단 ? formatCurrency(d.학단) : '-'}</td>
                  <td className="text-right py-1.5 px-2">{d.기업연수 ? formatCurrency(d.기업연수) : '-'}</td>
                  <td className="text-right py-1.5 px-2">{d.공공기관 ? formatCurrency(d.공공기관) : '-'}</td>
                  <td className="text-right py-1.5 px-2">{d.개별여행사 ? formatCurrency(d.개별여행사) : '-'}</td>
                  <td className="text-right py-1.5 px-2">{d.기타 ? formatCurrency(d.기타) : '-'}</td>
                  <td className="text-right py-1.5 px-2 font-medium text-slate-700">{rowTotal ? formatCurrency(rowTotal) : '-'}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="bg-slate-50 font-semibold">
              <td className="py-2 px-2 text-slate-700">합계</td>
              {ATTRS.map(a => (
                <td key={a} className="text-right py-2 px-2 text-slate-700">{formatCurrency(foreignAttributeRevenue2025Total[a])}</td>
              ))}
              <td className="text-right py-2 px-2 text-blue-600">{formatCurrency(total2025)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
