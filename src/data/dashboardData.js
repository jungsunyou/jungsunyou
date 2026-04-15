// 연도별 월별 실적 데이터
export const AVAILABLE_YEARS = [2026, 2025, 2024];

export const monthlyPerformance = {
  2026: [
    { month: '1월', users: 3762, revenue: 135550815, targetUsers: 5052, targetRevenue: 156612000, prevUsers: 3055, prevRevenue: 97138485 },
    { month: '2월', users: 3121, revenue: 98641100, targetUsers: 4535, targetRevenue: 145132800, prevUsers: 2245, prevRevenue: 79539440 },
    { month: '3월', users: 8012, revenue: 283028685, targetUsers: 11649, targetRevenue: 361119000, prevUsers: 7081, prevRevenue: 267877600 },
    { month: '4월', users: 15122, revenue: 579184055, targetUsers: 20997, targetRevenue: 692884500, prevUsers: 15024, prevRevenue: 574343550 },
    { month: '5월', users: 18770, revenue: 767549500, targetUsers: 35585, targetRevenue: 1174313250, prevUsers: 28845, prevRevenue: 995576490 },
    { month: '6월', users: 4317, revenue: 161054400, targetUsers: 18093, targetRevenue: 597054150, prevUsers: 12669, prevRevenue: 439776165 },
    { month: '7월', users: 139, revenue: 5322000, targetUsers: 6882, targetRevenue: 220217600, prevUsers: 5276, prevRevenue: 181070185 },
    { month: '8월', users: 390, revenue: 7425000, targetUsers: 8758, targetRevenue: 280238400, prevUsers: 6756, prevRevenue: 224565230 },
    { month: '9월', users: 5295, revenue: 144710500, targetUsers: 18745, targetRevenue: 618588300, prevUsers: 15545, prevRevenue: 546976230 },
    { month: '10월', users: 10185, revenue: 185779300, targetUsers: 32250, targetRevenue: 1161000000, prevUsers: 24298, prevRevenue: 885916365 },
    { month: '11월', users: 2515, revenue: 65995000, targetUsers: 18650, targetRevenue: 615450000, prevUsers: 14019, prevRevenue: 505254960 },
    { month: '12월', users: 0, revenue: 0, targetUsers: 9930, targetRevenue: 307830000, prevUsers: 4820, prevRevenue: 158893165 },
  ],
  2025: [
    { month: '1월', users: 3055, revenue: 97138485, targetUsers: 3800, targetRevenue: 120000000, prevUsers: 2410, prevRevenue: 72500000 },
    { month: '2월', users: 2245, revenue: 79539440, targetUsers: 3200, targetRevenue: 105000000, prevUsers: 1890, prevRevenue: 61200000 },
    { month: '3월', users: 7081, revenue: 267877600, targetUsers: 8500, targetRevenue: 310000000, prevUsers: 5620, prevRevenue: 198500000 },
    { month: '4월', users: 15024, revenue: 574343550, targetUsers: 16500, targetRevenue: 620000000, prevUsers: 12100, prevRevenue: 438000000 },
    { month: '5월', users: 28845, revenue: 995576490, targetUsers: 30000, targetRevenue: 1050000000, prevUsers: 22500, prevRevenue: 780000000 },
    { month: '6월', users: 12669, revenue: 439776165, targetUsers: 14000, targetRevenue: 500000000, prevUsers: 10200, prevRevenue: 348000000 },
    { month: '7월', users: 5276, revenue: 181070185, targetUsers: 6000, targetRevenue: 200000000, prevUsers: 4100, prevRevenue: 135000000 },
    { month: '8월', users: 6756, revenue: 224565230, targetUsers: 7500, targetRevenue: 250000000, prevUsers: 5300, prevRevenue: 172000000 },
    { month: '9월', users: 15545, revenue: 546976230, targetUsers: 17000, targetRevenue: 580000000, prevUsers: 12800, prevRevenue: 425000000 },
    { month: '10월', users: 24298, revenue: 885916365, targetUsers: 26000, targetRevenue: 950000000, prevUsers: 19500, prevRevenue: 680000000 },
    { month: '11월', users: 14019, revenue: 505254960, targetUsers: 15500, targetRevenue: 550000000, prevUsers: 11200, prevRevenue: 385000000 },
    { month: '12월', users: 4820, revenue: 158893165, targetUsers: 5500, targetRevenue: 180000000, prevUsers: 3760, prevRevenue: 121000000 },
  ],
};

// 하위 호환용 alias
export const monthlyPerformance2026 = monthlyPerformance[2026];

// 연간 합계
export const yearSummary = {
  2026: {
    totalUsers: 71628,
    totalRevenue: 2434240355,
    targetUsers: 191126,
    targetRevenue: 6330440000,
    achievementRate: 38.45,
    avgUnitPrice: 33984,
    prevTotalUsers: 139633,
    prevTotalRevenue: 4956927865,
    prevAvgUnitPrice: 35500,
  },
  2025: {
    totalUsers: 139633,
    totalRevenue: 4956927865,
    targetUsers: 153500,
    targetRevenue: 5415000000,
    achievementRate: 91.54,
    avgUnitPrice: 35500,
    prevTotalUsers: 111380,
    prevTotalRevenue: 3816200000,
    prevAvgUnitPrice: 34264,
  },
};

export const yearSummary2026 = yearSummary[2026];

// 속성별 매출 (2026)
export const revenueByAttribute = [
  { name: '학단', value: 9648650, color: '#3b82f6' },
  { name: '기업연수', value: 1972513380, color: '#f97316' },
  { name: '공공기관', value: 137725875, color: '#10b981' },
  { name: '개별모임', value: 60529880, color: '#8b5cf6' },
  { name: '여행사PKG', value: 79449780, color: '#ef4444' },
  { name: '종교', value: 18162880, color: '#eab308' },
  { name: '전지훈련', value: 9051100, color: '#6b7280' },
];

// 속성별 인원 (2026)
export const usersByAttribute = [
  { name: '학단', value: 588, color: '#3b82f6' },
  { name: '기업연수', value: 57804, color: '#f97316' },
  { name: '공공기관', value: 4177, color: '#10b981' },
  { name: '개별모임', value: 1957, color: '#8b5cf6' },
  { name: '여행사PKG', value: 1769, color: '#ef4444' },
  { name: '종교', value: 3230, color: '#eab308' },
  { name: '전지훈련', value: 541, color: '#6b7280' },
];

// 속성별 월별 매출 (2026)
export const attributeMonthlyRevenue = [
  { month: '1월', 학단: 27040200, 기업연수: 18520830, 공공기관: 15515900, 개별모임: 26878950, 여행사PKG: 14948000, 종교: 7604800, 전지훈련: 7197500 },
  { month: '2월', 학단: 11054380, 기업연수: 18261760, 공공기관: 5503400, 개별모임: 11005450, 여행사PKG: 21918400, 종교: 10210480, 전지훈련: 1853600 },
  { month: '3월', 학단: 0, 기업연수: 173699100, 공공기관: 34402460, 개별모임: 13977200, 여행사PKG: 14782835, 종교: 30021680, 전지훈련: 0 },
  { month: '4월', 학단: 9470650, 기업연수: 522135800, 공공기관: 38755425, 개별모임: 19312180, 여행사PKG: 5473475, 종교: 11593700, 전지훈련: 347600 },
  { month: '5월', 학단: 178000, 기업연수: 738868800, 공공기관: 8273000, 개별모임: 1890000, 여행사PKG: 1209000, 종교: 968000, 전지훈련: 0 },
  { month: '6월', 학단: 0, 기업연수: 138541800, 공공기관: 8952400, 개별모임: 515200, 여행사PKG: 168000, 종교: 0, 전지훈련: 0 },
  { month: '7월', 학단: 0, 기업연수: 570000, 공공기관: 0, 개별모임: 3816000, 여행사PKG: 0, 종교: 0, 전지훈련: 0 },
  { month: '8월', 학단: 0, 기업연수: 0, 공공기관: 0, 개별모임: 0, 여행사PKG: 0, 종교: 0, 전지훈련: 0 },
  { month: '9월', 학단: 0, 기업연수: 118394000, 공공기관: 3520000, 개별모임: 0, 여행사PKG: 0, 종교: 0, 전지훈련: 0 },
  { month: '10월', 학단: 0, 기업연수: 184114300, 공공기관: 7040000, 개별모임: 0, 여행사PKG: 0, 종교: 0, 전지훈련: 0 },
  { month: '11월', 학단: 0, 기업연수: 58095000, 공공기관: 0, 개별모임: 0, 여행사PKG: 0, 종교: 0, 전지훈련: 0 },
  { month: '12월', 학단: 0, 기업연수: 0, 공공기관: 0, 개별모임: 0, 여행사PKG: 0, 종교: 0, 전지훈련: 0 },
];

// 제휴 호텔 데이터 (2026)
export const partnerHotel = {
  total: { count: 137, revenue: 3301650, unitPrice: 24100 },
  monthly: [
    { month: '1월', count: 78, revenue: 1728600, unitPrice: 39271 },
    { month: '2월', count: 46, revenue: 1155900, unitPrice: 38250 },
    { month: '3월', count: 11, revenue: 319050, unitPrice: 38250 },
    { month: '4월', count: 2, revenue: 98100, unitPrice: 38250 },
  ],
};

// 제휴 렌터카 데이터 (2026)
export const partnerRentcar = {
  total: { count: 1179, revenue: 52720125 },
  monthly: [
    { month: '1월', count: 371, revenue: 16116035 },
    { month: '2월', count: 374, revenue: 17677730 },
    { month: '3월', count: 363, revenue: 15826360 },
    { month: '4월', count: 71, revenue: 3100000 },
  ],
};

// 외국인 데이터 (2026)
export const foreignVisitors = {
  total2026: { users: 3680, revenue: 87825085, unitPrice: 23866 },
  monthly: [
    { month: '1월', users2026: 643, revenue2026: 15641700, unitPrice2026: 24326, target: 784, targetRevenue: 18538750, targetUnitPrice: 23646 },
    { month: '2월', users2026: 916, revenue2026: 22358800, unitPrice2026: 24409, target: 485, targetRevenue: 13215500, targetUnitPrice: 27248 },
    { month: '3월', users2026: 1430, revenue2026: 36730685, unitPrice2026: 25686, target: 578, targetRevenue: 13293700, targetUnitPrice: 22999 },
    { month: '4월', users2026: 563, revenue2026: 12125900, unitPrice2026: 21538, target: 623, targetRevenue: 16778400, targetUnitPrice: 26932 },
    { month: '5월', users2026: 90, revenue2026: 968000, unitPrice2026: 0, target: 998, targetRevenue: 24219925, targetUnitPrice: 24268 },
    { month: '6월', users2026: 38, revenue2026: 0, unitPrice2026: 0, target: 267, targetRevenue: 11714840, targetUnitPrice: 43876 },
    { month: '7월', users2026: 0, revenue2026: 0, unitPrice2026: 0, target: 495, targetRevenue: 22051935, targetUnitPrice: 44549 },
    { month: '8월', users2026: 0, revenue2026: 0, unitPrice2026: 0, target: 535, targetRevenue: 23102605, targetUnitPrice: 43182 },
    { month: '9월', users2026: 0, revenue2026: 0, unitPrice2026: 0, target: 421, targetRevenue: 17501665, targetUnitPrice: 41572 },
    { month: '10월', users2026: 0, revenue2026: 0, unitPrice2026: 0, target: 334, targetRevenue: 14271300, targetUnitPrice: 42729 },
    { month: '11월', users2026: 0, revenue2026: 0, unitPrice2026: 0, target: 271, targetRevenue: 11453080, targetUnitPrice: 42262 },
    { month: '12월', users2026: 0, revenue2026: 0, unitPrice2026: 0, target: 464, targetRevenue: 20230005, targetUnitPrice: 43599 },
  ],
};

// 단체 수수료 (2025)
export const groupCommission = [
  { month: '1월', amount: 3868800 },
  { month: '2월', amount: 1529900 },
  { month: '3월', amount: 24963900 },
  { month: '4월', amount: 54922600 },
  { month: '5월', amount: 116589700 },
  { month: '6월', amount: 22911700 },
  { month: '7월', amount: 57000 },
  { month: '8월', amount: 0 },
  { month: '9월', amount: 13462700 },
  { month: '10월', amount: 21237700 },
  { month: '11월', amount: 0 },
  { month: '12월', amount: 0 },
];

// 학식 (F&B) 데이터
export const mealData = [
  { month: '1월', revenue2026: 1258000, revenue2025: 0 },
  { month: '2월', revenue2026: 1530000, revenue2025: 0 },
  { month: '3월', revenue2026: 9766000, revenue2025: 7633000 },
  { month: '4월', revenue2026: 37011000, revenue2025: 24910000 },
  { month: '5월', revenue2026: 56440000, revenue2025: 51695000 },
  { month: '6월', revenue2026: 4624000, revenue2025: 16289600 },
  { month: '7월', revenue2026: 0, revenue2025: 700000 },
  { month: '8월', revenue2026: 0, revenue2025: 4420000 },
  { month: '9월', revenue2026: 4760000, revenue2025: 31341000 },
  { month: '10월', revenue2026: 9350000, revenue2025: 50885000 },
  { month: '11월', revenue2026: 0, revenue2025: 24204000 },
  { month: '12월', revenue2026: 0, revenue2025: 0 },
];

// 답사 데이터
export const inspectionData = [
  { month: '1월', count2026: 36, count2025: 13, count2024: 13 },
  { month: '2월', count2026: 52, count2025: 56, count2024: 25 },
  { month: '3월', count2026: 70, count2025: 68, count2024: 55 },
  { month: '4월', count2026: 0, count2025: 121, count2024: 78 },
  { month: '5월', count2026: 0, count2025: 45, count2024: 49 },
  { month: '6월', count2026: 0, count2025: 35, count2024: 30 },
  { month: '7월', count2026: 0, count2025: 68, count2024: 55 },
  { month: '8월', count2026: 0, count2025: 42, count2024: 36 },
  { month: '9월', count2026: 0, count2025: 39, count2024: 30 },
  { month: '10월', count2026: 0, count2025: 24, count2024: 20 },
  { month: '11월', count2026: 0, count2025: 23, count2024: 18 },
  { month: '12월', count2026: 0, count2025: 20, count2024: 21 },
];

// 연도별 추이 (2019~2026)
export const yearlyTrend = [
  { year: '2019', users: 4271, revenue: 122406350 },
  { year: '2020', users: 4474, revenue: 262738350 },
  { year: '2021', users: 8138, revenue: 1485016570 },
  { year: '2022', users: 48411, revenue: 2798287770 },
  { year: '2023', users: 85395, revenue: 4118864660 },
  { year: '2024', users: 113382, revenue: 4956927865 },
  { year: '2025', users: 139633, revenue: 4956927865 },
  { year: '2026', users: 71689, revenue: 2402621030 },
];

// 유틸리티: 숫자 포맷팅
export const formatNumber = (num) => {
  if (num === null || num === undefined) return '-';
  return num.toLocaleString('ko-KR');
};

export const formatCurrency = (num) => {
  if (num === null || num === undefined) return '-';
  if (num >= 100000000) return `${(num / 100000000).toFixed(1)}억`;
  if (num >= 10000) return `${(num / 10000).toFixed(0)}만`;
  return num.toLocaleString('ko-KR');
};

export const formatCurrencyFull = (num) => {
  if (num === null || num === undefined) return '-';
  return `₩${num.toLocaleString('ko-KR')}`;
};
