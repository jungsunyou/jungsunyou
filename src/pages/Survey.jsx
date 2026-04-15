import { useState } from 'react';
import { surveys, surveyStats } from '../data/reservationData';
import { StatsRow, StatCard, FilterBar, SearchBox, Select, DateInput, Btn, TableContainer, StatusBadge, Tag, RowAction } from '../components/Badges';
import DetailPanel from '../components/DetailPanel';

export default function Survey() {
  const [detail, setDetail] = useState(null);
  return (
    <div>
      <StatsRow>
        <StatCard label="전체 답사" value={surveyStats.total} />
        <StatCard label="이번 달 답사" value={surveyStats.thisMonth} />
        <StatCard label="접수 전환" value={surveyStats.converted} valueClass="text-green-600" />
        <StatCard label="예약 전환율" value={surveyStats.conversionRate} valueClass="text-blue-600" />
      </StatsRow>

      <FilterBar>
        <SearchBox placeholder="단체명, 담당자 검색" />
        <Select><option>전체 상태</option><option>접수</option><option>완료</option></Select>
        <Select><option>전체 구분</option><option>학단</option><option>기업</option><option>여행사</option></Select>
        <DateInput defaultValue="2026-01-01" />
        <span className="text-xs text-slate-400">~</span>
        <DateInput defaultValue="2026-01-31" />
        <div className="ml-auto"><Btn variant="primary">+ 답사 등록</Btn></div>
      </FilterBar>

      <TableContainer title="답사 내역" count="38건">
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              {['답사일','요일','예약주','상태','방문시','단체명·차수','같이 온 여행사','답사티켓','요청/방문자','파크 담당자','답사 진행','현장 예약','예약 단체','예약월','구분','지역','비고','액션'].map(h => (
                <th key={h} className="text-left px-1.5 py-2 text-[11px] font-medium text-slate-500">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {surveys.map(s => (
              <tr
                key={s.id}
                onClick={() => setDetail({ type: 'survey', data: s })}
                className="border-b border-slate-100 hover:bg-blue-50/30 cursor-pointer text-xs"
              >
                <td className="px-1.5 py-2 font-mono">{s.date}</td>
                <td className="px-1.5 py-2">{s.dow}</td>
                <td className="px-1.5 py-2 font-mono">{s.week}</td>
                <td className="px-1.5 py-2"><StatusBadge>{s.status}</StatusBadge></td>
                <td className="px-1.5 py-2 font-mono">{s.time}</td>
                <td className="px-1.5 py-2"><span className="text-blue-600 cursor-pointer">{s.groupName}</span></td>
                <td className="px-1.5 py-2">{s.coAgency}</td>
                <td className="px-1.5 py-2">
                  <span className="text-slate-600">{s.ticket}</span>
                  {s.ticketTag && <> <Tag color="blue">{s.ticketTag}</Tag></>}
                </td>
                <td className="px-1.5 py-2">{s.visitor}</td>
                <td className="px-1.5 py-2">{s.parkPic}</td>
                <td className="px-1.5 py-2">{s.onsite}</td>
                <td className="px-1.5 py-2 font-mono">{s.bookedMonth}</td>
                <td className="px-1.5 py-2">{s.groupType}</td>
                <td className="px-1.5 py-2 font-mono">{s.regionCode}</td>
                <td className="px-1.5 py-2"><Tag color={s.tagColor}>{s.tag}</Tag></td>
                <td className="px-1.5 py-2">{s.region}</td>
                <td className="px-1.5 py-2 text-slate-500 max-w-[180px] truncate">{s.note}</td>
                <td className="px-1.5 py-2">
                  <RowAction variant={s.action === '상세' ? 'primary' : 'success'}>{s.action}</RowAction>
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
