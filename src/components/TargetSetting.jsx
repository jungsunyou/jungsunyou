import { useState, useCallback } from 'react';
import { monthlyPerformance2026, formatNumber, formatCurrency } from '../data/dashboardData';

const MONTHS = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

const defaultTargets = monthlyPerformance2026.map(d => ({
  month: d.month,
  targetUsers: d.targetUsers,
  targetRevenue: d.targetRevenue,
  currentUsers: d.users,
  currentRevenue: d.revenue,
}));

export default function TargetSetting({ isOpen, onClose, onSave }) {
  const [targets, setTargets] = useState(defaultTargets);
  const [editingCell, setEditingCell] = useState(null);
  const [autoCalcMode, setAutoCalcMode] = useState('manual'); // manual, yoy, even
  const [yoyRate, setYoyRate] = useState(110);
  const [totalTarget, setTotalTarget] = useState(6330440000);
  const [hasChanges, setHasChanges] = useState(false);

  const updateTarget = useCallback((idx, field, value) => {
    setTargets(prev => {
      const next = [...prev];
      next[idx] = { ...next[idx], [field]: parseInt(value) || 0 };
      return next;
    });
    setHasChanges(true);
  }, []);

  const applyAutoCalc = useCallback(() => {
    if (autoCalcMode === 'yoy') {
      // 전년 대비 비율 적용
      const rate = yoyRate / 100;
      setTargets(prev => prev.map(t => ({
        ...t,
        targetUsers: Math.round((monthlyPerformance2026.find(d => d.month === t.month)?.prevUsers || 0) * rate),
        targetRevenue: Math.round((monthlyPerformance2026.find(d => d.month === t.month)?.prevRevenue || 0) * rate),
      })));
    } else if (autoCalcMode === 'even') {
      // 균등 배분
      const monthlyRevenue = Math.round(totalTarget / 12);
      const prevTotal = monthlyPerformance2026.reduce((s, d) => s + d.prevRevenue, 0);
      setTargets(prev => prev.map(t => {
        const prevRev = monthlyPerformance2026.find(d => d.month === t.month)?.prevRevenue || 0;
        const weight = prevTotal > 0 ? prevRev / prevTotal : 1 / 12;
        return {
          ...t,
          targetRevenue: Math.round(totalTarget * weight),
          targetUsers: Math.round((totalTarget * weight) / 33000),
        };
      }));
    }
    setHasChanges(true);
  }, [autoCalcMode, yoyRate, totalTarget]);

  const totalTargetUsers = targets.reduce((s, t) => s + t.targetUsers, 0);
  const totalTargetRevenue = targets.reduce((s, t) => s + t.targetRevenue, 0);
  const totalCurrentUsers = targets.reduce((s, t) => s + t.currentUsers, 0);
  const totalCurrentRevenue = targets.reduce((s, t) => s + t.currentRevenue, 0);
  const overallRate = totalTargetRevenue > 0 ? ((totalCurrentRevenue / totalTargetRevenue) * 100).toFixed(1) : 0;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
        {/* 헤더 */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <div>
            <h2 className="text-lg font-bold text-slate-800">목표 설정</h2>
            <p className="text-xs text-slate-400 mt-0.5">2026년 월별 목표 인원 및 금액을 설정합니다</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 자동 계산 옵션 */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-slate-600">자동 계산:</span>
            <div className="flex gap-2">
              {[
                { id: 'manual', label: '수동 입력' },
                { id: 'yoy', label: '전년비 적용' },
                { id: 'even', label: '가중 배분' },
              ].map(mode => (
                <button
                  key={mode.id}
                  onClick={() => setAutoCalcMode(mode.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    autoCalcMode === mode.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-slate-500 border border-slate-300 hover:border-blue-300'
                  }`}
                >
                  {mode.label}
                </button>
              ))}
            </div>

            {autoCalcMode === 'yoy' && (
              <div className="flex items-center gap-2 ml-2">
                <label className="text-xs text-slate-500">전년비</label>
                <input
                  type="number"
                  value={yoyRate}
                  onChange={e => setYoyRate(parseInt(e.target.value) || 100)}
                  className="w-16 px-2 py-1 text-sm border border-slate-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <span className="text-xs text-slate-400">%</span>
              </div>
            )}

            {autoCalcMode === 'even' && (
              <div className="flex items-center gap-2 ml-2">
                <label className="text-xs text-slate-500">연간 목표</label>
                <input
                  type="text"
                  value={formatNumber(totalTarget)}
                  onChange={e => setTotalTarget(parseInt(e.target.value.replace(/,/g, '')) || 0)}
                  className="w-32 px-2 py-1 text-sm border border-slate-300 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <span className="text-xs text-slate-400">원</span>
              </div>
            )}

            {autoCalcMode !== 'manual' && (
              <button
                onClick={applyAutoCalc}
                className="ml-2 px-3 py-1.5 text-xs font-medium bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
              >
                적용
              </button>
            )}
          </div>
        </div>

        {/* 요약 카드 */}
        <div className="px-6 py-3 grid grid-cols-4 gap-3">
          <div className="bg-blue-50 rounded-lg p-3 text-center">
            <div className="text-xs text-slate-500">목표 인원</div>
            <div className="text-lg font-bold text-blue-600">{formatNumber(totalTargetUsers)}명</div>
          </div>
          <div className="bg-emerald-50 rounded-lg p-3 text-center">
            <div className="text-xs text-slate-500">목표 금액</div>
            <div className="text-lg font-bold text-emerald-600">{formatCurrency(totalTargetRevenue)}</div>
          </div>
          <div className="bg-amber-50 rounded-lg p-3 text-center">
            <div className="text-xs text-slate-500">현재 실적</div>
            <div className="text-lg font-bold text-amber-600">{formatCurrency(totalCurrentRevenue)}</div>
          </div>
          <div className="bg-violet-50 rounded-lg p-3 text-center">
            <div className="text-xs text-slate-500">달성률</div>
            <div className={`text-lg font-bold ${parseFloat(overallRate) >= 50 ? 'text-emerald-600' : 'text-red-500'}`}>
              {overallRate}%
            </div>
          </div>
        </div>

        {/* 테이블 */}
        <div className="flex-1 overflow-y-auto px-6 pb-2">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-white">
              <tr className="border-b-2 border-slate-200">
                <th className="text-left py-2 px-2 font-semibold text-slate-600 w-16">월</th>
                <th className="text-right py-2 px-2 font-semibold text-slate-600">목표 인원</th>
                <th className="text-right py-2 px-2 font-semibold text-slate-600">목표 금액</th>
                <th className="text-right py-2 px-2 font-semibold text-slate-500 w-20">현재 인원</th>
                <th className="text-right py-2 px-2 font-semibold text-slate-500 w-24">현재 금액</th>
                <th className="text-right py-2 px-2 font-semibold text-slate-500 w-20">달성률</th>
                <th className="text-center py-2 px-2 font-semibold text-slate-500 w-20">진행바</th>
              </tr>
            </thead>
            <tbody>
              {targets.map((t, i) => {
                const achRate = t.targetRevenue > 0 ? ((t.currentRevenue / t.targetRevenue) * 100) : 0;
                const barWidth = Math.min(achRate, 100);
                return (
                  <tr key={t.month} className="border-b border-slate-100 hover:bg-blue-50/30 transition-colors">
                    <td className="py-2 px-2 font-medium text-slate-700">{t.month}</td>
                    <td className="py-1 px-2">
                      <input
                        type="text"
                        value={editingCell === `${i}-users` ? t.targetUsers : formatNumber(t.targetUsers)}
                        onFocus={() => setEditingCell(`${i}-users`)}
                        onBlur={() => setEditingCell(null)}
                        onChange={e => updateTarget(i, 'targetUsers', e.target.value.replace(/,/g, ''))}
                        className="w-full text-right py-1 px-2 border border-transparent hover:border-slate-300 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 rounded text-sm outline-none transition-colors"
                      />
                    </td>
                    <td className="py-1 px-2">
                      <input
                        type="text"
                        value={editingCell === `${i}-revenue` ? t.targetRevenue : formatNumber(t.targetRevenue)}
                        onFocus={() => setEditingCell(`${i}-revenue`)}
                        onBlur={() => setEditingCell(null)}
                        onChange={e => updateTarget(i, 'targetRevenue', e.target.value.replace(/,/g, ''))}
                        className="w-full text-right py-1 px-2 border border-transparent hover:border-slate-300 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 rounded text-sm outline-none transition-colors"
                      />
                    </td>
                    <td className="text-right py-2 px-2 text-slate-400">{formatNumber(t.currentUsers)}</td>
                    <td className="text-right py-2 px-2 text-slate-400">{formatCurrency(t.currentRevenue)}</td>
                    <td className="text-right py-2 px-2">
                      <span className={`text-xs font-semibold ${achRate >= 80 ? 'text-emerald-600' : achRate > 0 ? 'text-amber-500' : 'text-slate-300'}`}>
                        {achRate.toFixed(1)}%
                      </span>
                    </td>
                    <td className="py-2 px-2">
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${achRate >= 80 ? 'bg-emerald-500' : achRate > 0 ? 'bg-amber-400' : 'bg-slate-200'}`}
                          style={{ width: `${barWidth}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* 푸터 */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-slate-50">
          <div className="text-xs text-slate-400">
            {hasChanges && <span className="text-amber-500 font-medium">변경사항이 있습니다</span>}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => { setTargets(defaultTargets); setHasChanges(false); }}
              className="px-4 py-2 text-sm font-medium text-slate-500 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            >
              초기화
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-500 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            >
              취소
            </button>
            <button
              onClick={() => {
                onSave?.(targets);
                setHasChanges(false);
                onClose();
              }}
              className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
