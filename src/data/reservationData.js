// 981 PARK 단체 예약 관리 — Partners / Surveys / Receptions / Bookings / Orders

// 거래처 유형 / 구분 / 지역 옵션
export const PARTNER_TYPES = ['개별모임', '제휴', '기타', '여행사', '여행사PKG', '가이드'];
export const PARTNER_CATEGORIES = ['도내', '도외', '인바운드', '해외'];
export const PARTNER_REGIONS = [
  '제주', '서울', '경기', '인천', '강원', '충북', '충남', '대전', '세종',
  '전북', '전남', '광주', '경북', '경남', '대구', '울산', '부산', '해외',
];

// 아바타 그라디언트 팔레트 (순환 사용)
const AVATAR_BGS = [
  'from-blue-500 to-purple-500',
  'from-green-500 to-cyan-500',
  'from-orange-500 to-yellow-500',
  'from-red-500 to-violet-500',
  'from-cyan-500 to-green-500',
  'from-emerald-500 to-blue-500',
  'from-violet-500 to-pink-500',
  'from-teal-500 to-blue-500',
  'from-amber-500 to-red-500',
  'from-sky-500 to-indigo-500',
];

function mkPartner(i, o) {
  return {
    id: `P${String(i).padStart(3, '0')}`,
    avatarBg: AVATAR_BGS[i % AVATAR_BGS.length],
    avatarText: o.name.slice(0, 1),
    status: '활성',
    regDate: '2026-03-31 00:54',
    regUser: '좌환철',
    ...o,
  };
}

// 30+ 거래처 샘플 — 다양한 유형 / 구분 / 지역 커버
export const partners = [
  mkPartner(1,  { name: '제주브로',            type: '여행사',    category: '도내',    area: '제주', ceo: '박동국', staffName: '민유',       staffPhone: '010-9957-6885', staffEmail: 'minyu@jejubro.com',    address: '제주시 도령로 128, 301호(연동, 삼무파크빌)', commType: 'percent', commValue: '20.0', bizNo: '6858703060', monthlyCount: 18, monthlyRevenue: 34200000 }),
  mkPartner(2,  { name: '유신여행사',          type: '여행사',    category: '도내',    area: '제주', ceo: '유재석', staffName: '강대리',     staffPhone: '010-2211-3344', staffEmail: 'yushin@travel.com',    address: '제주시 노형동 456', commType: 'percent', commValue: '20.0', bizNo: '1234567890', monthlyCount: 14, monthlyRevenue: 28900000 }),
  mkPartner(3,  { name: 'GO KOREA (고우코리아)', type: '여행사PKG', category: '인바운드', area: '서울', ceo: 'David Kim', staffName: 'Jenny',    staffPhone: '010-5522-8899', staffEmail: 'jenny@gokorea.com',    address: '서울시 강남구 역삼동 123', commType: 'percent', commValue: '18.0', bizNo: '5432167890', monthlyCount: 9, monthlyRevenue: 17300000 }),
  mkPartner(4,  { name: '성위관광',            type: '여행사',    category: '도외',    area: '부산', ceo: '성영수', staffName: '김지원',     staffPhone: '010-7744-2211', staffEmail: 'seongwi@tour.com',     address: '부산시 해운대구 좌동 789', commType: 'percent', commValue: '15.0', bizNo: '7788990011', monthlyCount: 11, monthlyRevenue: 19800000 }),
  mkPartner(5,  { name: '트랜스코리아투어',    type: '여행사PKG', category: '인바운드', area: '서울', ceo: '이도현', staffName: 'Sarah',      staffPhone: '010-3344-5566', staffEmail: 'sarah@transkorea.kr',  address: '서울시 종로구 세종대로 100', commType: 'percent', commValue: '17.0', bizNo: '2233445566', monthlyCount: 7, monthlyRevenue: 12500000 }),
  mkPartner(6,  { name: '뉴에버코리아여행사',  type: '여행사',    category: '도외',    area: '인천', ceo: '박에버', staffName: '송유진',     staffPhone: '010-8822-1133', staffEmail: 'newever@korea.kr',     address: '인천시 연수구 송도동 22', commType: 'percent', commValue: '16.0', bizNo: '9988776655', monthlyCount: 12, monthlyRevenue: 22100000 }),
  mkPartner(7,  { name: '나무여행사',          type: '여행사',    category: '도내',    area: '제주', ceo: '이나무', staffName: '최은지',     staffPhone: '010-4455-6677', staffEmail: 'namu@jejutour.kr',     address: '제주시 애월읍 하귀1리 55', commType: 'percent', commValue: '12.0', bizNo: '4455667788', monthlyCount: 6, monthlyRevenue: 9800000 }),
  mkPartner(8,  { name: '스카이투어서비스',    type: '여행사',    category: '도외',    area: '경기', ceo: '김하늘', staffName: '정민철',     staffPhone: '010-6677-8899', staffEmail: 'sky@tourservice.kr',   address: '경기도 성남시 분당구 판교로 300', commType: 'percent', commValue: '14.0', bizNo: '6677889900', monthlyCount: 10, monthlyRevenue: 18500000 }),
  mkPartner(9,  { name: '화인관광',            type: '여행사PKG', category: '인바운드', area: '서울', ceo: '장화인', staffName: 'Amy',        staffPhone: '010-1122-3344', staffEmail: 'amy@hwain.travel',     address: '서울시 마포구 월드컵북로 4', commType: 'percent', commValue: '16.0', bizNo: '1122334455', monthlyCount: 8, monthlyRevenue: 14700000 }),
  mkPartner(10, { name: '엠블루투어 코리아',   type: '여행사PKG', category: '해외',    area: '해외', ceo: 'Mike Johnson', staffName: 'Lily', staffPhone: '010-9988-7766', staffEmail: 'lily@mblue.co',        address: 'Singapore Marina Bay 10', commType: 'percent', commValue: '20.0', bizNo: '-',       monthlyCount: 5, monthlyRevenue: 9800000 }),
  mkPartner(11, { name: '빅투어즈',            type: '여행사',    category: '도외',    area: '서울', ceo: '정대표', staffName: '이주영',     staffPhone: '010-3322-1199', staffEmail: 'big@bigtours.kr',      address: '서울시 강남구 테헤란로 522', commType: 'percent', commValue: '15.0', bizNo: '3322110099', monthlyCount: 13, monthlyRevenue: 24300000 }),
  mkPartner(12, { name: '호호코리아 (구.한보국제여행사)', type: '여행사', category: '도외', area: '서울', ceo: '한보국', staffName: '김영희', staffPhone: '010-5566-7788', staffEmail: 'hoho@korea.kr', address: '서울시 중구 을지로 100', commType: 'percent', commValue: '18.0', bizNo: '5566778899', monthlyCount: 4, monthlyRevenue: 6700000 }),
  mkPartner(13, { name: '량우국제여행사',      type: '여행사PKG', category: '인바운드', area: '서울', ceo: '량우진', staffName: 'Nancy',      staffPhone: '010-2233-4455', staffEmail: 'nancy@liangyu.cn',     address: '서울시 용산구 이태원로 200', commType: 'percent', commValue: '20.0', bizNo: '2233445500', monthlyCount: 3, monthlyRevenue: 5400000 }),
  mkPartner(14, { name: 'Kims M&T (킴스엠앤티)', type: '여행사PKG', category: '인바운드', area: '서울', ceo: 'Kim Tae', staffName: 'Tom',    staffPhone: '010-8877-6655', staffEmail: 'tom@kimsmt.co.kr',     address: '서울시 서초구 서초대로 77', commType: 'percent', commValue: '18.0', bizNo: '8877665500', monthlyCount: 6, monthlyRevenue: 11200000 }),
  mkPartner(15, { name: '화방관광',            type: '여행사',    category: '도외',    area: '대전', ceo: '방화중', staffName: '윤소라',     staffPhone: '010-4433-2211', staffEmail: 'hwabang@tour.kr',      address: '대전시 유성구 대학로 99', commType: 'percent', commValue: '13.0', bizNo: '4433221100', monthlyCount: 5, monthlyRevenue: 8600000 }),
  mkPartner(16, { name: '씨엔제이여행사',      type: '여행사',    category: '도내',    area: '제주', ceo: '조씨엔', staffName: '한가람',     staffPhone: '010-7788-9900', staffEmail: 'cnj@jejutour.co.kr',   address: '제주시 이도1동 123', commType: 'percent', commValue: '15.0', bizNo: '7788990022', monthlyCount: 9, monthlyRevenue: 15300000 }),
  mkPartner(17, { name: '더놀자투어',          type: '여행사',    category: '도외',    area: '경기', ceo: '놀자형', staffName: '박유찬',     staffPhone: '010-6655-4433', staffEmail: 'play@nolza.co.kr',     address: '경기도 수원시 영통구 광교로 22', commType: 'percent', commValue: '12.0', bizNo: '6655443322', monthlyCount: 7, monthlyRevenue: 11800000 }),
  mkPartner(18, { name: '성광항공여행사',      type: '여행사',    category: '도외',    area: '부산', ceo: '성광선', staffName: '배수진',     staffPhone: '010-5544-3322', staffEmail: 'sky@sgair.kr',         address: '부산시 중구 중앙대로 55', commType: 'percent', commValue: '14.0', bizNo: '5544332211', monthlyCount: 8, monthlyRevenue: 14200000 }),
  mkPartner(19, { name: '뉴양명여행사 보보고여행', type: '여행사PKG', category: '인바운드', area: '서울', ceo: '양명재', staffName: '조지영', staffPhone: '010-9911-2233', staffEmail: 'boboko@newyang.kr', address: '서울시 종로구 관철동 7', commType: 'percent', commValue: '19.0', bizNo: '9911223344', monthlyCount: 4, monthlyRevenue: 7500000 }),
  mkPartner(20, { name: '마이스월드',          type: '여행사PKG', category: '해외',    area: '해외', ceo: 'James Park', staffName: 'Olivia', staffPhone: '010-3344-7788', staffEmail: 'olivia@miceworld.com', address: 'Bangkok, Sukhumvit 21', commType: 'percent', commValue: '22.0', bizNo: '-',       monthlyCount: 3, monthlyRevenue: 6100000 }),
  mkPartner(21, { name: '박준혁',              type: '가이드',    category: '도내',    area: '제주', ceo: '-',      staffName: '박준혁',     staffPhone: '010-9912-4453', staffEmail: 'park@guide.com',       address: '-', commType: 'percent', commValue: '12.0', bizNo: '-',       monthlyCount: 22, monthlyRevenue: 0 }),
  mkPartner(22, { name: '최수연',              type: '가이드',    category: '도내',    area: '제주', ceo: '-',      staffName: '최수연',     staffPhone: '010-8834-2256', staffEmail: 'choi@guide.com',       address: '-', commType: 'percent', commValue: '5.0',  bizNo: '-',       monthlyCount: 11, monthlyRevenue: 0 }),
  mkPartner(23, { name: '이지훈',              type: '가이드',    category: '도내',    area: '제주', ceo: '-',      staffName: '이지훈',     staffPhone: '010-5566-9900', staffEmail: 'lee@guide.com',        address: '-', commType: 'percent', commValue: '8.0',  bizNo: '-',       monthlyCount: 8, monthlyRevenue: 0 }),
  mkPartner(24, { name: '김민호',              type: '가이드',    category: '도내',    area: '제주', ceo: '-',      staffName: '김민호',     staffPhone: '010-2244-6688', staffEmail: 'kmh@guide.com',        address: '-', commType: 'percent', commValue: '10.0', bizNo: '-',       monthlyCount: 6, monthlyRevenue: 0 }),
  mkPartner(25, { name: '한라가이드협회',      type: '제휴',      category: '도내',    area: '제주', ceo: '송회장', staffName: '고은비',     staffPhone: '010-7766-5544', staffEmail: 'halla@guide.or.kr',    address: '제주시 일도2동 100', commType: 'amount',  commValue: '5000', bizNo: '7766554433', monthlyCount: 15, monthlyRevenue: 8500000 }),
  mkPartner(26, { name: '제주관광공사',        type: '제휴',      category: '도내',    area: '제주', ceo: '김공사', staffName: '오지혜',     staffPhone: '010-1100-2200', staffEmail: 'jto@jeju.go.kr',       address: '제주시 선덕로 23', commType: 'amount',  commValue: '0',    bizNo: '1100220033', monthlyCount: 20, monthlyRevenue: 0 }),
  mkPartner(27, { name: '신한은행 연수팀',     type: '개별모임',  category: '도외',    area: '서울', ceo: '-',      staffName: '김과장',     staffPhone: '010-3344-5566', staffEmail: 'shb@sinhan.com',       address: '서울시 중구 남대문로 5길 15', commType: 'percent', commValue: '0', bizNo: '-',       monthlyCount: 1, monthlyRevenue: 2400000 }),
  mkPartner(28, { name: 'LG전자 창원공장',     type: '개별모임',  category: '도외',    area: '경남', ceo: '-',      staffName: '최부장',     staffPhone: '010-5566-7788', staffEmail: 'lg@lg.com',            address: '경남 창원시 성산구 완암로 84', commType: 'percent', commValue: '0', bizNo: '-',       monthlyCount: 1, monthlyRevenue: 3800000 }),
  mkPartner(29, { name: '서울여고',            type: '개별모임',  category: '도외',    area: '서울', ceo: '-',      staffName: '박선생',     staffPhone: '010-8899-1122', staffEmail: 'seoul@sh.ac.kr',       address: '서울시 중구 예장동 2-1', commType: 'percent', commValue: '0', bizNo: '-',       monthlyCount: 2, monthlyRevenue: 5200000 }),
  mkPartner(30, { name: '서귀포성당',          type: '기타',      category: '도내',    area: '제주', ceo: '정신부', staffName: '정신부',     staffPhone: '010-2234-8891', staffEmail: 'sgp@cath.kr',          address: '서귀포시 중앙로 77', commType: 'percent', commValue: '0', bizNo: '-',       monthlyCount: 1, monthlyRevenue: 1800000 }),
];

export const partnerStats = {
  total: partners.length,
  agency: partners.filter(p => p.type.includes('여행사')).length,
  guide: partners.filter(p => p.type === '가이드').length,
  monthlyRevenue: '₩' + partners.reduce((s, p) => s + p.monthlyRevenue, 0).toLocaleString(),
};

export const surveys = [
  { id: 'SRV-001', date: '01-08', dow: '수', week: 2, status: '완료', time: '14:00', groupName: '00고', coAgency: 'X',
    ticket: '000 선생님 010-7777-9810', ticketTag: '인포', visitor: '요청/방문자 성명', parkPic: '한철',
    onsite: 'X', bookedMonth: '5.10', groupType: '1.학단', regionCode: '제주', tag: '학단', tagColor: 'yellow',
    region: '제주', note: 'EX) 24년 5월경 150명 방문예정임', action: '상세' },
  { id: 'SRV-002', date: '01-10', dow: '금', week: 2, status: '대기', time: '10:30', groupName: '신한은행 연수팀', coAgency: '투어비스',
    ticket: '김과장 010-3344-5566', ticketTag: '인포', visitor: '김과장 010-3344-5566', parkPic: '김태윤',
    onsite: 'O', bookedMonth: '3.15', groupType: '1.기업', regionCode: '서울', tag: '기업', tagColor: 'purple',
    region: '서울', note: '80명 워크샵 예정, 팀빌딩 필수', action: '접수전환' },
  { id: 'SRV-003', date: '01-12', dow: '일', week: 2, status: '완료', time: '11:00', groupName: '서울여고 2학년', coAgency: 'X',
    ticket: '박선생 010-8899-1122', ticketTag: null, visitor: '박선생 010-8899-1122', parkPic: '박서연',
    onsite: 'O', bookedMonth: '4.20', groupType: '1.학단', regionCode: '서울', tag: '학단', tagColor: 'yellow',
    region: '서울', note: '200명 수학여행, 버스 5대', action: '상세' },
  { id: 'SRV-004', date: '01-14', dow: '화', week: 3, status: '대기', time: '15:00', groupName: '제주관광공사', coAgency: '제주여행사',
    ticket: '이대리 010-2233-4455', ticketTag: '인포', visitor: '이대리 010-2233-4455', parkPic: '김태윤',
    onsite: 'X', bookedMonth: '-', groupType: '-', regionCode: '-', tag: '공공', tagColor: 'green',
    region: '제주', note: '관광상품 개발 협의', action: '접수전환' },
  { id: 'SRV-005', date: '01-15', dow: '수', week: 3, status: '완료', time: '09:30', groupName: 'LG전자 창원공장', coAgency: '스마일투어',
    ticket: '최부장 010-5566-7788', ticketTag: null, visitor: '최부장 010-5566-7788', parkPic: '박서연',
    onsite: 'O', bookedMonth: '2.28', groupType: '1.기업', regionCode: '경남', tag: '기업', tagColor: 'purple',
    region: '경남', note: '120명 포상여행, VIP 프로그램 요청', action: '상세' },
  { id: 'SRV-006', date: '01-17', dow: '금', week: 3, status: '대기', time: '13:00', groupName: '부산외고', coAgency: 'X',
    ticket: '정선생 010-1122-3344', ticketTag: null, visitor: '정선생 010-1122-3344', parkPic: '한철',
    onsite: 'X', bookedMonth: '-', groupType: '-', regionCode: '-', tag: '학단', tagColor: 'yellow',
    region: '부산', note: '60명 현장체험학습 검토중', action: '접수전환' },
];

export const surveyStats = { total: 38, thisMonth: 12, converted: 8, conversionRate: '67%' };

export const receptions = [
  { id: 'RCP-001', mgmtNo: 'M2601-0061', useDate: '2026-01-17', groupName: '광명초등학교', typeTag: '일반단체', typeColor: 'yellow',
    pic: '이정민', phone: '010-3847-9182', inquiry: '1월 17일 4학년 현장체험 85명',
    receiver: '김태윤', confirmer: '박서연', processDate: '2026-01-15',
    processStatus: '통화완료', processColor: 'blue', status: '대기', statusColor: 'pending', note: '-', action: '예약전환' },
  { id: 'RCP-002', mgmtNo: 'M2601-0062', useDate: '2026-01-19', groupName: '투어비스', typeTag: '여행사', typeColor: 'blue',
    pic: '한소희', phone: '010-5528-3371', inquiry: '단체 75명 레이싱+서바이벌 견적',
    receiver: '김태윤', confirmer: '김태윤', processDate: '2026-01-18',
    processStatus: '메일안내', processColor: 'green', status: '완료', statusColor: 'confirmed', note: '예약전환됨', action: '상세' },
  { id: 'RCP-003', mgmtNo: 'M2601-0063', useDate: '2026-01-21', groupName: '현대모비스 기술연구소', typeTag: '기업', typeColor: 'purple',
    pic: '강민재', phone: '010-7742-5563', inquiry: '워크샵 프로그램 95명 견적요청',
    receiver: '박서연', confirmer: '-', processDate: '-',
    processStatus: '미처리', processColor: 'gray', status: '대기', statusColor: 'pending', note: '예산검토중', action: '예약전환' },
  { id: 'RCP-004', mgmtNo: 'M2601-0064', useDate: '2026-01-24', groupName: '서귀포성당', typeTag: '일반단체', typeColor: 'yellow',
    pic: '정신부', phone: '010-2234-8891', inquiry: '청년회 피정 52명',
    receiver: '박서연', confirmer: '한철', processDate: '2026-01-22',
    processStatus: '문자발송', processColor: 'purple', status: '대기', statusColor: 'pending', note: '-', action: '예약전환' },
];

export const receptionStats = { today: 7, pending: 4, converted: 3, weekly: 31 };

export const bookings = [
  { id: 'AB12CD34EF56', mgmtNo: '20260051', useDate: '01-16', useTime: '09:30', status: '확정', statusColor: 'confirmed',
    groupName: '투어비스 2차', agency: '투어비스', agencyTag: 'blue', booker: '한소희', phone: '010-5528-3371',
    pic: '김태윤', ticket: 'A1 레이싱2+서바이벌', qty: 75, payAmount: '₩2,437,500', extraAmount: '-',
    payMethod: '계좌이체', payColor: 'green', groupType: '여행사PKG', groupColor: 'blue', sent: '완료', note: '-', action: '주문생성' },
  { id: 'GH56JK78LM90', mgmtNo: '20260052', useDate: '01-16', useTime: '14:00', status: '대기', statusColor: 'pending',
    groupName: '광명초등학교 4학년', agency: '-', agencyTag: null, booker: '이정민', phone: '010-3847-9182',
    pic: '김태윤', ticket: 'B1 실내풀패키지', qty: 85, payAmount: '₩2,082,500', extraAmount: '+₩425,000',
    payMethod: '카드', payColor: 'blue', groupType: '학단', groupColor: 'yellow', sent: '미전송', note: '-', action: '주문생성' },
  { id: 'NP23QR45ST67', mgmtNo: '20260053', useDate: '01-18', useTime: '10:00', status: '견적', statusColor: 'quote',
    groupName: '현대모비스 1차', agency: '-', agencyTag: null, booker: '강민재', phone: '010-7742-5563',
    pic: '박서연', ticket: 'C2 팀빌딩B', qty: 95, payAmount: '₩5,510,000', extraAmount: '+₩3,025,000',
    payMethod: '-', payColor: null, groupType: '기업연수', groupColor: 'purple', sent: '미전송', note: '-', action: '확정' },
  { id: 'UV89WX23YZ45', mgmtNo: '20260054', useDate: '01-20', useTime: '11:00', status: '취소', statusColor: 'cancelled',
    groupName: '수원공업고 2학년', agency: '-', agencyTag: null, booker: '오교사', phone: '-',
    pic: '박서연', ticket: 'A2 레이싱2+스포츠랩', qty: 110, payAmount: '₩3,630,000', extraAmount: '-',
    payMethod: '-', payColor: null, groupType: '학단', groupColor: null, sent: '-', note: '우천취소', action: null, cancelled: true },
  { id: 'BC67DE89FG12', mgmtNo: '20260055', useDate: '01-22', useTime: '13:30', status: '확정', statusColor: 'confirmed',
    groupName: '제주여행사 5차', agency: '제주여행사', agencyTag: 'blue', booker: '송지원', phone: '010-4421-7782',
    pic: '박서연', ticket: 'A2 레이싱2+스포츠랩', qty: 52, payAmount: '₩1,716,000', extraAmount: '-',
    payMethod: '계좌이체', payColor: 'green', groupType: '여행사PKG', groupColor: 'blue', sent: '완료', note: '-', action: '주문생성' },
];

export const bookingStats = { todayVisit: 5, weekBookings: 23, quotes: 9, monthRevenue: '₩67,300,000' };

export const orders = [
  { id: '30000098', mgmtNo: '20260051', orderNo: '30000098', bookingNo: 'AB12CD34EF56',
    groupName: '투어비스 2차', partner: '투어비스', partnerColor: 'blue', useDateTime: '01-16 09:30',
    product: 'A1 레이싱2+서바이벌', qty: 75, listPrice: '₩3,150,000', payAmount: '₩2,437,500',
    commission: '₩207,188', payMethod: '계좌이체', payColor: 'green',
    status: '발권완료', statusColor: 'confirmed', settleStatus: '대기', settleColor: 'pending',
    taxInvoice: '미발행', taxSent: false, action: '상세' },
  { id: '30000099', mgmtNo: '20260052', orderNo: '30000099', bookingNo: 'GH56JK78LM90',
    groupName: '광명초등학교 4학년', partner: '일반단체', partnerColor: 'yellow', useDateTime: '01-16 14:00',
    product: 'B1 실내풀패키지', qty: 85, listPrice: '₩2,380,000', payAmount: '₩2,082,500',
    commission: '-', payMethod: '카드', payColor: 'blue',
    status: '발권대기', statusColor: 'pending', settleStatus: '-', settleColor: null,
    taxInvoice: '-', taxSent: null, action: '발권' },
  { id: '30000095', mgmtNo: '20260048', orderNo: '30000095', bookingNo: 'HJ34KL56MN78',
    groupName: '제주여행사 4차', partner: '제주여행사', partnerColor: 'blue', useDateTime: '01-12 10:00',
    product: 'A2 레이싱2+스포츠랩', qty: 63, listPrice: '₩2,646,000', payAmount: '₩2,079,000',
    commission: '₩519,750', payMethod: '계좌이체', payColor: 'green',
    status: '이용완료', statusColor: 'confirmed', settleStatus: '완료', settleColor: 'confirmed',
    taxInvoice: '발행', taxSent: true, action: '상세' },
  { id: '30000091', mgmtNo: '20260047', orderNo: '30000091', bookingNo: 'UV89WX23YZ45',
    groupName: '수원공업고 2학년', partner: '일반단체', partnerColor: 'yellow', useDateTime: '01-20 11:00',
    product: 'A2 레이싱2+스포츠랩', qty: 110, listPrice: '₩4,620,000', payAmount: '₩3,630,000',
    commission: '-', payMethod: '-', payColor: null,
    status: '환불', statusColor: 'cancelled', settleStatus: '-', settleColor: null,
    taxInvoice: '-', taxSent: null, action: null, cancelled: true },
  { id: '30000100', mgmtNo: '20260055', orderNo: '30000100', bookingNo: 'BC67DE89FG12',
    groupName: '제주여행사 5차', partner: '제주여행사', partnerColor: 'blue', useDateTime: '01-22 13:30',
    product: 'A2 레이싱2+스포츠랩', qty: 52, listPrice: '₩2,184,000', payAmount: '₩1,716,000',
    commission: '₩429,000', payMethod: '계좌이체', payColor: 'green',
    status: '발권대기', statusColor: 'pending', settleStatus: '대기', settleColor: 'pending',
    taxInvoice: '미발행', taxSent: false, action: '발권' },
];

export const orderStats = { today: 31, pending: 12, todayRevenue: '₩11,200,000', settlementPending: '₩3,700,000' };
