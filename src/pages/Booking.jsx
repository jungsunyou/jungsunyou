import { useState } from 'react';
import { bookings, bookingStats } from '../data/reservationData';
import { StatsRow, StatCard, FilterBar, SearchBox, Select, DateInput, Btn, TableContainer, StatusBadge, Tag, RowAction } from '../components/Badges';
import BookingRegister from '../components/BookingRegister';
import DetailPanel from '../components/DetailPanel';

export default function Booking() {
  const [showRegister, setShowRegister] = useState(false);
  const [detail, setDetail] = useState(null);

  return (
    <div>
      <StatsRow>
        <StatCard label="오늘 방문" value={bookingStats.todayVisit} />
        <StatCard label="이번 주 예약" value={bookingStats.weekBookings} />
        <StatCard label="견적 진행" value={bookingStats.quotes} valueClass="text-violet-600" />
        <StatCard label="이번 달 예상 매출" value={bookingStats.monthRevenue} valueClass="text-green-600" />
      </StatsRow>

      <FilterBar>
        <SearchBox placeholder="예약번호, 단체명 검색" />
        <Select><option>진행여부</option><option>견적</option><option>접수</option><option>오전마감</option><option>오후마감</option><option>취소</option></Select>
        <Select><option>구분</option><option>학단</option><option>기업연수</option><option>공공기관</option><option>여행사PKG</option></Select>
        <Select><option>지역</option><option>서울</option><option>경기</option><option>제주</option><option>국외</option></Select>
        <DateInput defaultValue="2026-01-01" />
        <span className="text-xs text-slate-400">~</span>
        <DateInput defaultValue="2026-01-31" />
        <div className="ml-auto flex gap-2">
          <Btn variant="secondary">엑셀</Btn>
          <Btn variant="primary" onClick={() => setShowRegister(true)}>+ 신규 예약</Btn>
        </div>
      </FilterBar>

      <TableContainer title="예약 내역" count="178건">
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              {['관리번호','이용일','이용시간','상태','단체명','여행사','예약자','연락처','담당자','이용티켓','수량','예상결제액','추가금액','결제방식','구분','전송','비고','액션'].map(h => (
                <th key={h} className="text-left px-1.5 py-2 text-[11px] font-medium text-slate-500">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bookings.map(b => (
              <tr
                key={b.id}
                onClick={() => !b.cancelled && setDetail({ type: 'booking', data: b })}
                className={`border-b border-slate-100 text-xs ${b.cancelled ? 'bg-red-50 text-slate-400' : 'hover:bg-blue-50/30 cursor-pointer'}`}
              >
                <td className="px-1.5 py-2"><span className="text-blue-600 cursor-pointer">{b.mgmtNo}</span></td>
                <td className="px-1.5 py-2 font-mono">{b.useDate}</td>
                <td className="px-1.5 py-2 font-mono">{b.useTime}</td>
                <td className="px-1.5 py-2"><StatusBadge variant={b.statusColor}>{b.status}</StatusBadge></td>
                <td className={`px-1.5 py-2 ${b.cancelled ? '' : 'text-blue-600 cursor-pointer'}`}>{b.groupName}</td>
                <td className="px-1.5 py-2">{b.agencyTag ? <Tag color={b.agencyTag}>{b.agency}</Tag> : b.agency}</td>
                <td className="px-1.5 py-2">{b.booker}</td>
                <td className="px-1.5 py-2 font-mono">{b.phone}</td>
                <td className="px-1.5 py-2">{b.pic}</td>
                <td className="px-1.5 py-2">{b.ticket}</td>
                <td className="px-1.5 py-2 font-mono text-center">{b.qty}</td>
                <td className={`px-1.5 py-2 font-mono text-right font-medium ${b.cancelled ? 'line-through' : ''}`}>{b.payAmount}</td>
                <td className="px-1.5 py-2 font-mono text-right text-violet-600">{b.extraAmount}</td>
                <td className="px-1.5 py-2">{b.payColor ? <Tag color={b.payColor}>{b.payMethod}</Tag> : b.payMethod}</td>
                <td className="px-1.5 py-2">{b.groupColor ? <Tag color={b.groupColor}>{b.groupType}</Tag> : b.groupType}</td>
                <td className={`px-1.5 py-2 ${b.sent === '완료' ? 'text-green-600' : b.sent === '미전송' ? 'text-red-500' : ''}`}>{b.sent}</td>
                <td className="px-1.5 py-2 text-slate-500">{b.note}</td>
                <td className="px-1.5 py-2">
                  {b.action && <RowAction variant={b.action === '확정' ? 'success' : 'primary'}>{b.action}</RowAction>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableContainer>

      <BookingRegister
        isOpen={showRegister}
        onClose={() => setShowRegister(false)}
        onSave={() => setShowRegister(false)}
      />

      <DetailPanel target={detail} onClose={() => setDetail(null)} />
    </div>
  );
}
