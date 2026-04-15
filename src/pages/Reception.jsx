import { useState } from 'react';
import { receptions, receptionStats } from '../data/reservationData';
import { StatsRow, StatCard, FilterBar, SearchBox, Select, DateInput, Btn, TableContainer, StatusBadge, Tag, RowAction } from '../components/Badges';
import DetailPanel from '../components/DetailPanel';

export default function Reception() {
  const [detail, setDetail] = useState(null);
  return (
    <div>
      <StatsRow>
        <StatCard label="오늘 접수" value={receptionStats.today} />
        <StatCard label="처리 대기" value={receptionStats.pending} valueClass="text-yellow-600" />
        <StatCard label="예약 전환" value={receptionStats.converted} valueClass="text-green-600" />
        <StatCard label="이번 주 접수" value={receptionStats.weekly} />
      </StatsRow>

      <FilterBar>
        <SearchBox placeholder="단체명, 담당자 검색" />
        <Select><option>전체 상태</option><option>처리대기</option><option>처리완료</option></Select>
        <DateInput defaultValue="2026-01-01" />
        <span className="text-xs text-slate-400">~</span>
        <DateInput defaultValue="2026-01-31" />
        <div className="ml-auto"><Btn variant="primary">+ 신규 접수</Btn></div>
      </FilterBar>

      <TableContainer title="접수 내역" count="52건">
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              {['관리번호','이용예정일','단체명','구분','담당자','연락처','문의내용','접수자','확인담당자','처리일자','처리상태','상태','비고','액션'].map(h => (
                <th key={h} className="text-left px-1.5 py-2 text-[11px] font-medium text-slate-500">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {receptions.map(r => (
              <tr
                key={r.id}
                onClick={() => setDetail({ type: 'reception', data: r })}
                className="border-b border-slate-100 hover:bg-blue-50/30 cursor-pointer text-xs"
              >
                <td className="px-1.5 py-2"><span className="text-blue-600 cursor-pointer">{r.mgmtNo}</span></td>
                <td className="px-1.5 py-2 font-mono">{r.useDate}</td>
                <td className="px-1.5 py-2"><span className="text-blue-600 cursor-pointer">{r.groupName}</span></td>
                <td className="px-1.5 py-2"><Tag color={r.typeColor}>{r.typeTag}</Tag></td>
                <td className="px-1.5 py-2">{r.pic}</td>
                <td className="px-1.5 py-2 font-mono">{r.phone}</td>
                <td className="px-1.5 py-2 max-w-[180px] truncate">{r.inquiry}</td>
                <td className="px-1.5 py-2">{r.receiver}</td>
                <td className="px-1.5 py-2">{r.confirmer}</td>
                <td className="px-1.5 py-2 font-mono">{r.processDate}</td>
                <td className="px-1.5 py-2"><Tag color={r.processColor}>{r.processStatus}</Tag></td>
                <td className="px-1.5 py-2"><StatusBadge variant={r.statusColor}>{r.status}</StatusBadge></td>
                <td className="px-1.5 py-2 text-slate-500">{r.note}</td>
                <td className="px-1.5 py-2">
                  <RowAction variant={r.action === '상세' ? 'primary' : 'success'}>{r.action}</RowAction>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableContainer>

      <DetailPanel target={detail} onClose={() => setDetail(null)} />
    </div>
  );
}
