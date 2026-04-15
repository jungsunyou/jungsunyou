import { useState } from 'react';
import { partners, partnerStats } from '../data/reservationData';
import { StatsRow, StatCard, FilterBar, SearchBox, Select, Btn } from '../components/Badges';
import DetailPanel from '../components/DetailPanel';

export default function PartnerManagement() {
  const [detail, setDetail] = useState(null);

  return (
    <div>
      <StatsRow>
        <StatCard label="전체 거래처" value={partnerStats.total} />
        <StatCard label="여행사" value={partnerStats.agency} />
        <StatCard label="가이드" value={partnerStats.guide} />
        <StatCard label="이번 달 거래액" value={partnerStats.monthlyRevenue} />
      </StatsRow>

      <FilterBar>
        <SearchBox placeholder="거래처명, 담당자 검색" />
        <Select><option>전체 상태</option><option>활성</option><option>폐업</option></Select>
        <Select><option>전체 구분</option><option>제주</option><option>도외</option><option>해외</option></Select>
        <div className="ml-auto">
          <Btn variant="primary">+ 거래처 등록</Btn>
        </div>
      </FilterBar>

      <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
        {partners.map(p => (
          <div
            key={p.id}
            onClick={() => setDetail({ type: 'partner', data: p })}
            className="bg-white border border-slate-200 rounded-md p-3.5 cursor-pointer hover:border-blue-500 hover:shadow-sm transition-all"
          >
            <div className="flex items-center gap-2.5 mb-2.5">
              <div className={`w-9 h-9 rounded-md bg-gradient-to-br ${p.avatarBg} flex items-center justify-center text-white font-bold text-sm`}>
                {p.avatarText}
              </div>
              <div>
                <div className="text-[13px] font-semibold text-slate-800">{p.name}</div>
                <div className="text-[11px] text-slate-400">
                  {p.type} · <span className="text-green-600">{p.status}</span> · <span>{p.area}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-4 pt-2.5 border-t border-slate-100">
              <div>
                <div className="text-[10px] text-slate-400">{p.stats.label1}</div>
                <div className="text-[13px] font-semibold font-mono mt-0.5">{p.stats.val1}</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400">{p.stats.label2}</div>
                <div className="text-[13px] font-semibold font-mono mt-0.5">{p.stats.val2}</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400">{p.stats.label3}</div>
                <div className="text-[13px] font-semibold font-mono mt-0.5">{p.stats.val3}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <DetailPanel target={detail} onClose={() => setDetail(null)} />
    </div>
  );
}
