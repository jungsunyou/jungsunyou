// 우측 슬라이드 상세 패널 — 거래처/답사/접수/예약 공용
// index.html의 showPartnerDetail / showSurveyDetail / showReceptionDetail / showBookingDetail 로직 포팅

const PARTNER_EXTRA = {
  '투어비스': {
    contacts: [
      { name: '한소희', phone: '010-5528-3371', email: 'tour@tourvis.com' },
      { name: '김민수', phone: '010-3322-1144', email: 'kim@tourvis.com' },
    ],
    address: '제주시 연동 1234-5', bizNo: '123-45-67890',
    files: ['사업자등록증.pdf', '명함.jpg', '통장사본.pdf'],
    history: [
      { date: '2026-01-08 14:32', user: '김태윤', action: '수수료율 변경: 10.0% → 8.5%' },
      { date: '2026-01-03 09:15', user: '박서연', action: '담당자 변경: 김민수 → 한소희' },
      { date: '2025-12-20 11:00', user: '김태윤', action: '거래처 등록' },
    ],
  },
  '제주여행사': {
    contacts: [{ name: '송지원', phone: '010-4421-7782', email: 'jejutour@jeju.com' }],
    address: '제주시 노형동 456', bizNo: '456-78-90123',
    files: ['사업자등록증.pdf'],
    history: [{ date: '2025-11-15 10:00', user: '박서연', action: '거래처 등록' }],
  },
  '박준혁': {
    contacts: [{ name: '박준혁', phone: '010-9912-4453', email: 'park@guide.com' }],
    address: '-', bizNo: '-',
    files: ['명함.jpg'],
    history: [
      { date: '2026-01-05 16:20', user: '김태윤', action: '수수료율 변경: 15.0% → 12.0%' },
      { date: '2025-10-01 09:00', user: '김태윤', action: '거래처 등록' },
    ],
  },
  '스마일투어': {
    contacts: [{ name: '김철수', phone: '010-1234-5678', email: 'smile@smiletour.com' }],
    address: '서울시 강남구 테헤란로 123', bizNo: '789-01-23456',
    files: ['사업자등록증.pdf', '통장사본.pdf'],
    history: [{ date: '2025-09-10 14:00', user: '박서연', action: '거래처 등록' }],
  },
  '최수연': {
    contacts: [{ name: '최수연', phone: '010-8834-2256', email: 'choi@guide.com' }],
    address: '-', bizNo: '-', files: [],
    history: [{ date: '2025-08-20 11:30', user: '김태윤', action: '거래처 등록' }],
  },
};

function Section({ title, children }) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 mb-3">
      <div className="text-xs font-semibold text-slate-500 mb-3 pb-2 border-b border-slate-100 uppercase tracking-wider">{title}</div>
      {children}
    </div>
  );
}

function Row({ label, value, valueClass = '' }) {
  return (
    <div className="flex justify-between items-center py-1.5">
      <span className="text-[11px] text-slate-400">{label}</span>
      <span className={`text-xs text-slate-700 ${valueClass}`}>{value || '-'}</span>
    </div>
  );
}

function PartnerDetail({ data }) {
  const extra = PARTNER_EXTRA[data.name] || { contacts: [], address: '-', bizNo: '-', files: [], history: [] };
  const statusColor = data.status === '활성' ? 'text-green-600 font-semibold' : 'text-red-500 font-semibold';
  return (
    <>
      <Section title="기본 정보">
        <Row label="유형" value={data.type} />
        <Row label="구분" value={data.regionType} />
        <Row label="상태" value={data.status} valueClass={statusColor} />
        <Row label="지역" value={data.area} />
        <Row label="대표자" value={data.ceo} />
        <Row label="주소" value={extra.address} />
        <Row label="수수료" value={data.stats.val3} valueClass="text-green-600 font-semibold" />
      </Section>
      <Section title="담당자 정보">
        {extra.contacts.length ? extra.contacts.map((c, i) => (
          <div key={i} className={`py-2 ${i > 0 ? 'border-t border-slate-100' : ''}`}>
            <div className="text-xs font-medium text-slate-700">{c.name}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">{c.phone} · {c.email}</div>
          </div>
        )) : <div className="text-[11px] text-slate-400 py-2">담당자 정보 없음</div>}
      </Section>
      <Section title="사업자 정보">
        <Row label="사업자번호" value={extra.bizNo} />
      </Section>
      <Section title="첨부파일">
        {extra.files.length ? extra.files.map((f, i) => (
          <div key={i} className="flex items-center gap-1.5 py-1.5 border-b border-slate-100 last:border-0">
            <span className="text-blue-500 text-[11px]">📎</span>
            <span className="text-[11px] flex-1 text-slate-700">{f}</span>
            <button className="text-[10px] text-blue-500">다운로드</button>
          </div>
        )) : <div className="text-[11px] text-slate-400 py-2">첨부된 파일 없음</div>}
      </Section>
      <Section title="수정 이력">
        {extra.history.map((h, i) => (
          <div key={i} className="py-2 border-b border-slate-100 last:border-0">
            <div className="flex justify-between mb-0.5">
              <span className="text-[10px] text-slate-400">{h.date}</span>
              <span className="text-[10px] text-blue-500">{h.user}</span>
            </div>
            <div className="text-[11px] text-slate-700">{h.action}</div>
          </div>
        ))}
      </Section>
    </>
  );
}

function SurveyDetail({ data: s }) {
  return (
    <>
      <Section title="답사 정보">
        <Row label="답사번호" value={s.id} />
        <Row label="답사일" value={`2026-${s.date} ${s.time}`} />
        <Row label="상태" value={s.status} />
      </Section>
      <Section title="단체 정보">
        <Row label="단체명" value={s.groupName} valueClass="font-semibold text-blue-600" />
        <Row label="같이 온 여행사" value={s.coAgency} />
        <Row label="구분" value={s.tag} />
        <Row label="지역" value={s.region} />
      </Section>
      <Section title="방문자 정보">
        <Row label="방문자" value={s.visitor} />
        <Row label="담당자" value={s.parkPic} />
        <Row label="답사 진행" value={s.onsite === 'O' ? '진행함' : '미진행'} />
      </Section>
      <Section title="비고">
        <p className="text-xs text-slate-600 leading-relaxed">{s.note}</p>
      </Section>
    </>
  );
}

function ReceptionDetail({ data: r }) {
  return (
    <>
      <Section title="접수 정보">
        <Row label="관리번호" value={r.mgmtNo} valueClass="font-semibold text-blue-600" />
        <Row label="접수번호" value={r.id} />
        <Row label="이용예정일" value={r.useDate} />
        <Row label="단체명" value={r.groupName} valueClass="font-semibold" />
        <Row label="구분" value={r.typeTag} />
      </Section>
      <Section title="담당자 정보">
        <Row label="담당자" value={r.pic} />
        <Row label="연락처" value={r.phone} />
        <Row label="접수자" value={r.receiver} />
        <Row label="확인담당자" value={r.confirmer} />
      </Section>
      <Section title="처리 정보">
        <Row label="처리일자" value={r.processDate} />
        <Row label="처리상태" value={r.processStatus} />
        <Row label="상태" value={r.status} />
      </Section>
      <Section title="문의 내용">
        <p className="text-xs text-slate-600 leading-relaxed">{r.inquiry}</p>
      </Section>
    </>
  );
}

function BookingDetail({ data: b }) {
  return (
    <>
      <Section title="예약 정보">
        <Row label="관리번호" value={b.mgmtNo} valueClass="font-semibold text-blue-600" />
        <Row label="예약번호" value={b.id} valueClass="font-mono text-[10px]" />
        <Row label="이용일시" value={`2026-${b.useDate} ${b.useTime}`} />
        <Row label="진행상태" value={b.status} />
      </Section>
      <Section title="단체 정보">
        <Row label="단체명" value={b.groupName} valueClass="font-semibold" />
        <Row label="여행사" value={b.agency} />
        <Row label="예약자" value={`${b.booker} / ${b.phone}`} />
        <Row label="담당자" value={b.pic} />
        <Row label="구분" value={b.groupType} />
      </Section>
      <Section title="이용 정보">
        <Row label="이용티켓" value={b.ticket} />
        <Row label="수량" value={`${b.qty}명`} />
        <Row label="예상 결제액" value={b.payAmount} valueClass="font-semibold" />
        <Row label="추가 금액" value={b.extraAmount} valueClass="text-violet-600" />
        <Row label="결제방식" value={b.payMethod} />
      </Section>
      <Section title="전송 상태">
        <Row label="문자 발송" value={b.sent} />
      </Section>
    </>
  );
}

const RENDERERS = {
  partner: PartnerDetail,
  survey: SurveyDetail,
  reception: ReceptionDetail,
  booking: BookingDetail,
};

const TITLES = {
  partner: (d) => d.name,
  survey: (d) => `답사 상세 — ${d.id}`,
  reception: (d) => `접수 상세 — ${d.id}`,
  booking: (d) => `예약 상세 — ${d.id}`,
};

const ACTIONS = {
  partner: [{ label: '수정', variant: 'secondary' }, { label: '삭제', variant: 'danger' }],
  survey: [{ label: '접수전환', variant: 'success' }, { label: '수정', variant: 'secondary' }],
  reception: [{ label: '예약전환', variant: 'success' }, { label: '수정', variant: 'secondary' }],
  booking: [{ label: '주문생성', variant: 'primary' }, { label: '수정', variant: 'secondary' }],
};

export default function DetailPanel({ target, onClose }) {
  if (!target) return null;
  const Renderer = RENDERERS[target.type];
  if (!Renderer) return null;

  const btnStyles = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    secondary: 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50',
    success: 'bg-green-500 hover:bg-green-600 text-white',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      <div className="relative w-full max-w-md bg-slate-50 shadow-2xl h-full overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-slate-200 px-5 py-3.5 flex items-center justify-between z-10">
          <h3 className="text-sm font-semibold text-slate-800">{TITLES[target.type](target.data)}</h3>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-100">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" />
              <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="p-4">
          <Renderer data={target.data} />
          <div className="flex gap-2 mt-4">
            {ACTIONS[target.type].map((a, i) => (
              <button key={i}
                className={`flex-1 px-3 py-2 rounded-md text-xs font-medium transition-colors ${btnStyles[a.variant]}`}>
                {a.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
