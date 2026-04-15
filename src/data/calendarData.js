// 981 PARK 단체 예약 샘플 데이터

// 단체 유형 (속성)
const GROUP_TYPES = ['학단', '기업연수', '공공기관', '개별모임', '여행사', '종교', '전지훈련'];

const GROUP_TYPE_COLORS = {
  '학단': '#3b82f6',
  '기업연수': '#f97316',
  '공공기관': '#10b981',
  '개별모임': '#8b5cf6',
  '여행사': '#ef4444',
  '종교': '#eab308',
  '전지훈련': '#6b7280',
};

// 지역
const REGIONS = ['제주', '도외', '국외'];

// 결제 수단
const PAYMENT_METHODS = [
  { code: 'ONSITE_PAY_CARD', label: '현장결제(카드)' },
  { code: 'ONSITE_PAY_CASH', label: '현장결제(현금)' },
  { code: 'PRE_PAY_CARD', label: '선결제(카드)' },
  { code: 'PRE_PAY_BANK', label: '선결제(계좌이체)' },
  { code: 'TAX_BILL', label: '세금계산서' },
];

// 상품 (이용티켓)
const PRODUCTS = [
  { code: 'A1', name: '2인승 2회권 3코스', price: 44500, discount: 8900 },
  { code: 'A2', name: '2인승 1회권 3코스', price: 27500, discount: 5500 },
  { code: 'A3', name: '1인승 2회권 3코스', price: 39500, discount: 7900 },
  { code: 'A4', name: '2인승 2회권 5코스', price: 64500, discount: 12900 },
  { code: 'B1', name: '레이싱2+서바이벌', price: 58000, discount: 10000 },
  { code: 'B2', name: '레이싱2+스포츠랩', price: 62000, discount: 12000 },
  { code: 'C1', name: '실내풀패키지', price: 48000, discount: 8000 },
  { code: 'C2', name: '팀빌딩B', price: 75000, discount: 15000 },
  { code: 'D1', name: '단체할인권', price: 32000, discount: 4000 },
];

// 여행사
const TRAVEL_AGENCIES = [
  { name: '세인국제여행사', commission: 20 },
  { name: '투어비스', commission: 15 },
  { name: '제주여행사', commission: 18 },
  { name: '하나투어', commission: 17 },
  { name: '모두투어', commission: 16 },
  { name: '참좋은여행', commission: 15 },
  { name: '롯데관광', commission: 18 },
  { name: '노랑풍선', commission: 14 },
];

// 파크 담당자
const PARK_MANAGERS = ['김태윤', '박서연', '한철', '이정원', '최민수'];

// 상태
const STATUSES = [
  { code: 'RESERVED', label: '예약확정', color: '#3b82f6' },
  { code: 'PAID', label: '결제완료', color: '#10b981' },
  { code: 'ISSUED', label: '발권완료', color: '#8b5cf6' },
  { code: 'USED', label: '이용완료', color: '#6b7280' },
  { code: 'CANCELED', label: '취소', color: '#ef4444' },
];

// 단체명 (유형별)
const GROUP_NAMES = {
  '학단': ['서울초등학교 3반', '부산대학교 MT', '연세대학교 OT', '고려대학교 수련회', '경기도교육청 수련회', '제주중앙고 현장학습', '이화여대 동아리', '한양대 체육학과'],
  '기업연수': ['삼성전자 리더십캠프', 'LG전자 워크숍', '현대자동차 연수', 'SK하이닉스 팀빌딩', '포스코 리더십과정', '네이버 개발캠프', '카카오 전략회의', '한화그룹 연수', 'CJ그룹 워크숍', 'GS칼텍스 팀빌딩'],
  '공공기관': ['서울시교육청 수련회', '한국관광공사 워크숍', '국방부 체력단련', '경기도 공무원연수', '대전시청 워크숍', '인천광역시 연수'],
  '개별모임': ['김철수 가족모임', '제주동창회', '서울동호회', '우정모임 2026', '가족여행단'],
  '여행사': ['패키지_대만', '패키지_일본', '패키지_중국', '패키지_베트남', '패키지_태국', '제주투어 A팀', '제주투어 B팀', '국내여행 단체'],
  '종교': ['서울교회 수련회', '사랑의교회 캠프', '여의도순복음 수련회', '제주성당 피정', '불교청년회'],
  '전지훈련': ['전주 FC 전지훈련', '수원삼성 전지훈련', '울산현대 캠프', '대한체육회 훈련캠프'],
};

// 담당자명
const CONTACT_NAMES = ['김영희', '이철수', '박지민', '최수진', '정민호', '홍길동', '장효회 가이드님', '김민수 팀장', '이영주 과장'];

// 시드 랜덤
function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// 관리번호 생성
function generateMgmtNo(rand) {
  const chars = '0123456789ABCDEF';
  let result = '';
  for (let i = 0; i < 12; i++) {
    result += chars[Math.floor(rand() * 16)];
  }
  return result;
}

// 주문번호 생성
function generateOrderNo(rand) {
  return Math.floor(rand() * 900000) + 100000;
}

// 티켓번호 생성
function generateTicketNo(rand) {
  let result = '';
  for (let i = 0; i < 13; i++) {
    result += Math.floor(rand() * 10);
  }
  return result;
}

// 연락처 생성
function generatePhone(rand) {
  const mid = Math.floor(rand() * 9000) + 1000;
  const end = Math.floor(rand() * 9000) + 1000;
  return `010-${mid}-${end}`;
}

// 예약 생성
function generateReservations(year, month) {
  const rand = seededRandom(year * 100 + month);
  const daysInMonth = new Date(year, month, 0).getDate();
  const reservations = [];

  // 성수기 비중
  const peakMonths = [4, 5, 9, 10];
  const midMonths = [3, 6, 11];
  let baseCount;
  if (peakMonths.includes(month)) baseCount = 35;
  else if (midMonths.includes(month)) baseCount = 22;
  else baseCount = 12;

  for (let i = 0; i < baseCount; i++) {
    const day = Math.floor(rand() * daysInMonth) + 1;
    const dow = new Date(year, month - 1, day).getDay();
    if (dow === 0 && rand() > 0.3) continue;

    // 유형 선택 (기업연수 비중 높게)
    let groupType;
    const r = rand();
    if (r < 0.35) groupType = '기업연수';
    else if (r < 0.55) groupType = '여행사';
    else if (r < 0.7) groupType = '학단';
    else if (r < 0.8) groupType = '공공기관';
    else if (r < 0.88) groupType = '개별모임';
    else if (r < 0.95) groupType = '종교';
    else groupType = '전지훈련';

    // 단체명
    const names = GROUP_NAMES[groupType];
    const groupName = names[Math.floor(rand() * names.length)];

    // 지역
    let region;
    if (groupType === '여행사' && rand() < 0.4) region = '국외';
    else if (rand() < 0.4) region = '제주';
    else region = '도외';

    // 여행사
    const isTravelAgency = groupType === '여행사';
    const agency = isTravelAgency
      ? TRAVEL_AGENCIES[Math.floor(rand() * TRAVEL_AGENCIES.length)]
      : (rand() < 0.3 ? TRAVEL_AGENCIES[Math.floor(rand() * TRAVEL_AGENCIES.length)] : null);

    // 상품 선택 (1~3개)
    const productCount = Math.floor(rand() * 3) + 1;
    const selectedProducts = [];
    const usedCodes = new Set();
    for (let p = 0; p < productCount; p++) {
      let prod;
      do {
        prod = PRODUCTS[Math.floor(rand() * PRODUCTS.length)];
      } while (usedCodes.has(prod.code));
      usedCodes.add(prod.code);

      const qty = groupType === '기업연수' ? Math.floor(rand() * 50) + 20 :
        groupType === '학단' ? Math.floor(rand() * 80) + 30 :
        Math.floor(rand() * 30) + 5;

      const orderNo = generateOrderNo(rand);
      const ticketNo = generateTicketNo(rand);
      const useTime = `${Math.floor(rand() * 10) + 9}:${rand() < 0.5 ? '00' : '30'}`;
      const payMethod = PAYMENT_METHODS[Math.floor(rand() * PAYMENT_METHODS.length)];
      const status = rand() < 0.3 ? '발권' : rand() < 0.5 ? '결제완료' : '예약확정';

      selectedProducts.push({
        orderNo,
        ticketNo,
        code: prod.code,
        name: prod.name,
        qty,
        useTime,
        useDateTime: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ${useTime}`,
        price: prod.price,
        discount: prod.discount,
        finalPrice: prod.price - prod.discount,
        totalPrice: (prod.price - prod.discount) * qty,
        payMethodCode: payMethod.code,
        payMethodLabel: payMethod.label,
        status,
        issuedAt: status === '발권' ? `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} 10:53` : null,
      });
    }

    const totalPeople = selectedProducts.reduce((s, p) => s + p.qty, 0);
    const totalAmount = selectedProducts.reduce((s, p) => s + p.totalPrice, 0);
    const commissionAmount = agency ? Math.round(totalAmount * (agency.commission / 100)) : 0;

    const statusObj = STATUSES[Math.floor(rand() * 4)]; // 취소 제외 기본
    const isForeign = region === '국외';

    reservations.push({
      // 기본 식별
      id: `R-${year}${String(month).padStart(2, '0')}${String(day).padStart(2, '0')}-${String(i).padStart(3, '0')}`,
      mgmtNo: generateMgmtNo(rand),
      bookingNo: generateOrderNo(rand),

      // 날짜
      date: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
      year, month, day,
      useTime: selectedProducts[0].useTime,

      // 단체 정보
      groupName,
      groupType,
      groupTypeColor: GROUP_TYPE_COLORS[groupType],
      region,

      // 담당자
      contactName: CONTACT_NAMES[Math.floor(rand() * CONTACT_NAMES.length)],
      contactPhone: generatePhone(rand),
      guideName: rand() < 0.6 ? CONTACT_NAMES[Math.floor(rand() * CONTACT_NAMES.length)] : '',
      guidePhone: generatePhone(rand),

      // 여행사
      agencyName: agency?.name || '',
      agencyCommissionRate: agency?.commission || 0,
      commissionAmount,

      // 파크 담당자
      parkManager: PARK_MANAGERS[Math.floor(rand() * PARK_MANAGERS.length)],

      // 상품/주문
      products: selectedProducts,

      // 금액
      totalPeople,
      totalAmount,

      // 상태
      status: statusObj.label,
      statusCode: statusObj.code,
      statusColor: statusObj.color,

      // 정산
      settlementStatus: rand() < 0.3 ? '정산완료' : '정산대기',
      taxInvoiceStatus: rand() < 0.3 ? '발행완료' : '미발행',

      // 외국인
      isForeign,
      nationality: isForeign ? ['일본', '중국', '베트남', '태국', '대만', '미국'][Math.floor(rand() * 6)] : '한국',

      // 채널
      channel: rand() < 0.6 ? '직접' : rand() < 0.5 ? '제휴호텔' : '제휴렌터카',

      // 메모
      memo: rand() < 0.3 ? '식사 알레르기 확인 필요' : '',
    });
  }

  return reservations.sort((a, b) => a.day - b.day);
}

// 2026년 전체 예약 데이터 생성
export const allReservations = [];
for (let m = 1; m <= 12; m++) {
  allReservations.push(...generateReservations(2026, m));
}

export function getReservationsForMonth(year, month) {
  return allReservations.filter(r => r.year === year && r.month === month);
}

export function getReservationsForDate(dateStr) {
  return allReservations.filter(r => r.date === dateStr);
}

export function getDaySummary(dateStr) {
  const dayRes = getReservationsForDate(dateStr);
  if (dayRes.length === 0) return null;

  const totalPeople = dayRes.reduce((s, r) => s + r.totalPeople, 0);
  const totalAmount = dayRes.reduce((s, r) => s + r.totalAmount, 0);
  const byType = {};
  dayRes.forEach(r => {
    if (!byType[r.groupType]) byType[r.groupType] = { count: 0, people: 0 };
    byType[r.groupType].count++;
    byType[r.groupType].people += r.totalPeople;
  });

  return { count: dayRes.length, totalPeople, totalAmount, byType };
}

export {
  GROUP_TYPES, GROUP_TYPE_COLORS, REGIONS, PAYMENT_METHODS, PRODUCTS,
  TRAVEL_AGENCIES, PARK_MANAGERS, STATUSES, GROUP_NAMES,
};

// 호환용 exports
export const ATTRIBUTE_COLORS = GROUP_TYPE_COLORS;
export const ATTRIBUTES = GROUP_TYPES;
export const STATUS_COLORS = STATUSES.reduce((acc, s) => { acc[s.label] = s.color; return acc; }, {});
