import { useState, useMemo } from 'react';
import {
  getReservationsForMonth, getReservationsForDate, getDaySummary,
  GROUP_TYPE_COLORS, GROUP_TYPES,
} from '../data/calendarData';
import { formatNumber, formatCurrency } from '../data/dashboardData';
import OrderDetailPanel from './OrderDetailPanel';
import BookingRegister from './BookingRegister';

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

function getCalendarDays(year, month) {
  const firstDay = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const prevDays = new Date(year, month - 1, 0).getDate();
  const days = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({ day: prevDays - i, current: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    days.push({ day: d, current: true });
  }
  const remaining = 42 - days.length;
  for (let d = 1; d <= remaining; d++) {
    days.push({ day: d, current: false });
  }
  return days;
}

function DayCell({ day, year, month, isToday, onClick, filter }) {
  const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  const allSummary = getDaySummary(dateStr);
  const dayRes = getReservationsForDate(dateStr);
  const filtered = filter === '전체' ? dayRes : dayRes.filter(r => r.groupType === filter);

  if (!filtered.length) {
    return (
      <div className="min-h-28 p-1.5 border-b border-r border-slate-100 bg-white cursor-pointer hover:bg-slate-50" onClick={() => onClick(dateStr)}>
        <span className={`text-xs font-medium ${isToday ? 'bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center' : 'text-slate-400'}`}>
          {day}
        </span>
      </div>
    );
  }

  const count = filtered.length;
  const totalPeople = filtered.reduce((s, r) => s + r.totalPeople, 0);
  const intensity = Math.min(count / 5, 1);
  const bgOpacity = (intensity * 0.12).toFixed(2);

  // 유형별 분포
  const byType = {};
  filtered.forEach(r => {
    byType[r.groupType] = (byType[r.groupType] || 0) + r.totalPeople;
  });
  const segments = Object.entries(byType).map(([type, people]) => ({
    type,
    width: (people / totalPeople) * 100,
    color: GROUP_TYPE_COLORS[type],
  }));

  return (
    <div
      className="min-h-28 p-1.5 border-b border-r border-slate-100 cursor-pointer hover:bg-blue-50/50 transition-colors"
      style={{ background: `rgba(37, 99, 235, ${bgOpacity})` }}
      onClick={() => onClick(dateStr)}
    >
      <div className="flex items-center justify-between mb-1">
        <span className={`text-xs font-medium ${isToday ? 'bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center' : 'text-slate-600'}`}>
          {day}
        </span>
        <span className="text-[10px] font-semibold text-blue-600 bg-blue-100 rounded-full px-1.5">
          {count}건
        </span>
      </div>
      <div className="text-[10px] text-slate-500 mb-1">{formatNumber(totalPeople)}명</div>
      <div className="flex h-1.5 rounded-full overflow-hidden mb-1">
        {segments.map((seg, i) => (
          <div key={i} style={{ width: `${seg.width}%`, background: seg.color }} className="h-full" />
        ))}
      </div>
      <div className="space-y-0.5">
        {filtered.slice(0, 2).map(r => (
          <div key={r.id} className="text-[10px] truncate text-slate-600" title={r.groupName}>
            <span className="inline-block w-1.5 h-1.5 rounded-full mr-1 align-middle" style={{ background: r.groupTypeColor }} />
            {r.groupName}
          </div>
        ))}
        {filtered.length > 2 && (
          <div className="text-[10px] text-slate-400">+{filtered.length - 2}건</div>
        )}
      </div>
    </div>
  );
}

function ReservationListPanel({ dateStr, onClose, onSelect, filter }) {
  const all = getReservationsForDate(dateStr);
  const reservations = filter === '전체' ? all : all.filter(r => r.groupType === filter);
  if (!reservations.length) return null;

  const date = new Date(dateStr);
  const dateLabel = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 (${WEEKDAYS[date.getDay()]})`;
  const totalPeople = reservations.reduce((s, r) => s + r.totalPeople, 0);
  const totalAmount = reservations.reduce((s, r) => s + r.totalAmount, 0);

  return (
    <div className="fixed inset-0 z-40 flex justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative w-full max-w-md bg-white shadow-2xl h-full overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-slate-200 p-4 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-800">{dateLabel}</h3>
              <p className="text-sm text-slate-500">{reservations.length}건 · {formatNumber(totalPeople)}명 · {formatCurrency(totalAmount)}</p>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <div className="p-4 space-y-3">
          {reservations.map(r => (
            <button
              key={r.id}
              onClick={() => onSelect(r)}
              className="w-full text-left border border-slate-200 rounded-lg p-3 hover:shadow-sm hover:border-blue-300 transition-all"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: r.groupTypeColor }} />
                <span className="text-sm font-semibold text-slate-800 truncate">{r.groupName}</span>
                <span className="ml-auto text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0" style={{
                  background: r.statusColor + '20',
                  color: r.statusColor,
                }}>{r.status}</span>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-500">
                <div>유형: <span className="text-slate-700 font-medium">{r.groupType}</span></div>
                <div>지역: <span className="text-slate-700 font-medium">{r.region}</span></div>
                <div>인원: <span className="text-slate-700 font-medium">{formatNumber(r.totalPeople)}명</span></div>
                <div>시간: <span className="text-slate-700 font-medium">{r.useTime}</span></div>
                <div className="col-span-2">금액: <span className="text-blue-600 font-medium">{formatCurrency(r.totalAmount)}</span></div>
                {r.agencyName && (
                  <div className="col-span-2">여행사: <span className="text-slate-700 font-medium">{r.agencyName}</span></div>
                )}
                <div>담당: <span className="text-slate-700 font-medium">{r.parkManager}</span></div>
                <div>관리번호: <span className="text-slate-700 font-medium text-[10px]">{r.mgmtNo.slice(0, 8)}...</span></div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CalendarView() {
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(4);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [showBookingRegister, setShowBookingRegister] = useState(false);
  const [filterType, setFilterType] = useState('전체');

  const calendarDays = useMemo(() => getCalendarDays(year, month), [year, month]);
  const monthReservations = useMemo(() => {
    const all = getReservationsForMonth(year, month);
    return filterType === '전체' ? all : all.filter(r => r.groupType === filterType);
  }, [year, month, filterType]);
  const monthSummary = useMemo(() => {
    const totalPeople = monthReservations.reduce((s, r) => s + r.totalPeople, 0);
    const totalAmount = monthReservations.reduce((s, r) => s + r.totalAmount, 0);
    return { count: monthReservations.length, totalPeople, totalAmount };
  }, [monthReservations]);

  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() + 1 === month;

  const prevMonth = () => {
    if (month === 1) { setYear(y => y - 1); setMonth(12); }
    else setMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (month === 12) { setYear(y => y + 1); setMonth(1); }
    else setMonth(m => m + 1);
  };

  return (
    <div>
      {/* 상단 헤더 */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-slate-200 transition-colors text-slate-600">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
          </button>
          <h2 className="text-xl font-bold text-slate-800">{year}년 {month}월</h2>
          <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-slate-200 transition-colors text-slate-600">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>

        {/* 월 요약 */}
        <div className="flex items-center gap-4 text-sm">
          <span className="text-slate-500">예약 <strong className="text-blue-600">{monthSummary.count}</strong>건</span>
          <span className="text-slate-500">인원 <strong className="text-blue-600">{formatNumber(monthSummary.totalPeople)}</strong>명</span>
          <span className="text-slate-500">금액 <strong className="text-blue-600">{formatCurrency(monthSummary.totalAmount)}</strong></span>
        </div>

        {/* 우측 액션 */}
        <div className="flex items-center gap-2">
          <select
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
            className="text-sm border border-slate-300 rounded-lg px-3 py-1.5 text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="전체">전체 유형</option>
            {GROUP_TYPES.map(a => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
          <button
            onClick={() => setShowBookingRegister(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 4v16m8-8H4" />
            </svg>
            신규 예약
          </button>
        </div>
      </div>

      {/* 범례 */}
      <div className="flex items-center gap-3 mb-3 flex-wrap">
        {GROUP_TYPES.map(type => (
          <div key={type} className="flex items-center gap-1 text-xs text-slate-500">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ background: GROUP_TYPE_COLORS[type] }} />
            {type}
          </div>
        ))}
      </div>

      {/* 캘린더 그리드 */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="grid grid-cols-7 bg-slate-50 border-b border-slate-200">
          {WEEKDAYS.map((wd, i) => (
            <div key={wd} className={`text-center py-2 text-xs font-semibold ${
              i === 0 ? 'text-red-400' : i === 6 ? 'text-blue-400' : 'text-slate-500'
            }`}>{wd}</div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {calendarDays.map((d, i) => {
            if (!d.current) {
              return (
                <div key={`pad-${i}`} className="min-h-28 p-1.5 border-b border-r border-slate-100 bg-slate-50/50">
                  <span className="text-xs text-slate-300">{d.day}</span>
                </div>
              );
            }
            const isToday = isCurrentMonth && d.day === today.getDate();
            return (
              <DayCell
                key={`day-${d.day}`}
                day={d.day}
                year={year}
                month={month}
                isToday={isToday}
                onClick={setSelectedDate}
                filter={filterType}
              />
            );
          })}
        </div>
      </div>

      {/* 날짜별 예약 리스트 패널 */}
      {selectedDate && !selectedReservation && (
        <ReservationListPanel
          dateStr={selectedDate}
          filter={filterType}
          onClose={() => setSelectedDate(null)}
          onSelect={setSelectedReservation}
        />
      )}

      {/* 주문 상세 패널 */}
      {selectedReservation && (
        <OrderDetailPanel
          reservation={selectedReservation}
          onClose={() => setSelectedReservation(null)}
        />
      )}

      {/* 예약 등록 모달 */}
      <BookingRegister
        isOpen={showBookingRegister}
        onClose={() => setShowBookingRegister(false)}
        initialDate={selectedDate || `${year}-${String(month).padStart(2, '0')}-01`}
        onSave={(data) => {
          console.log('New booking:', data);
          setShowBookingRegister(false);
        }}
      />
    </div>
  );
}
