import { useState } from 'react';
import { formatNumber, formatCurrencyFull } from '../data/dashboardData';

// 섹션 박스
function Section({ title, children, actions }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 mb-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-800">{title}</h3>
        {actions && <div className="flex gap-2">{actions}</div>}
      </div>
      {children}
    </div>
  );
}

// 정보 필드
function InfoField({ label, value, highlight }) {
  return (
    <div className="flex items-center gap-8 py-2">
      <span className="text-xs text-slate-400 w-20 flex-shrink-0">{label}</span>
      <span className={`text-sm ${highlight ? 'font-semibold text-blue-600' : 'text-slate-700'}`}>
        {value || '-'}
      </span>
    </div>
  );
}

export default function OrderDetailPanel({ reservation, onClose }) {
  const [selectedProducts, setSelectedProducts] = useState(new Set());

  if (!reservation) return null;

  const toggleProduct = (orderNo) => {
    setSelectedProducts(prev => {
      const next = new Set(prev);
      if (next.has(orderNo)) next.delete(orderNo);
      else next.add(orderNo);
      return next;
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      <div className="relative w-full max-w-5xl bg-slate-50 shadow-2xl h-full overflow-y-auto" onClick={e => e.stopPropagation()}>
        {/* 헤더 */}
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-base font-bold text-slate-800">주문/결제 상세 정보</h2>
              <span className="text-xs font-mono bg-slate-100 text-slate-500 px-2 py-1 rounded">
                {reservation.mgmtNo}
              </span>
              {reservation.agencyName && (
                <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">
                  {reservation.agencyName}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                처리 이력
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-400 bg-slate-100 rounded-lg cursor-not-allowed">
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                전체 환불
              </button>
              <button
                onClick={onClose}
                className="px-3 py-1.5 text-xs font-medium text-slate-500 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
              >
                닫기
              </button>
            </div>
          </div>
        </div>

        {/* 내용 */}
        <div className="p-6">
          {/* 예약자 정보 */}
          <Section title="예약자 정보">
            <div className="grid grid-cols-2 gap-x-12 gap-y-0">
              <InfoField label="단체명" value={reservation.groupName} highlight />
              <InfoField label="담당자" value={reservation.contactName} />
              <InfoField label="연락처" value={reservation.contactPhone} />
              <InfoField label="단체 유형" value={reservation.groupType} />
              <InfoField label="지역" value={reservation.region} />
              <InfoField label="여행사" value={reservation.agencyName} />
              <InfoField label="파크 담당자" value={reservation.parkManager} />
              {reservation.agencyName && (
                <InfoField label="여행사 수수료" value={`${reservation.agencyCommissionRate}%`} />
              )}
            </div>
          </Section>

          {/* 주문 내역 및 이용 현황 */}
          <Section
            title="주문 내역 및 이용 현황"
            actions={
              <>
                <button className="px-3 py-1.5 text-xs font-medium text-slate-400 bg-slate-100 rounded-lg cursor-not-allowed">
                  주문 추가
                </button>
                <button className="px-3 py-1.5 text-xs font-medium text-slate-400 bg-slate-100 rounded-lg cursor-not-allowed">
                  환불 확정
                </button>
              </>
            }
          >
            {reservation.products.map((prod, idx) => (
              <div key={prod.orderNo} className="border border-slate-200 rounded-lg mb-3 overflow-hidden">
                {/* 상품 헤더 */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="product"
                      className="w-4 h-4"
                      onChange={() => toggleProduct(prod.orderNo)}
                    />
                    <span className="text-sm font-semibold text-slate-700">
                      {prod.name} ({prod.qty}건)
                    </span>
                    <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      주문번호 {prod.orderNo}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1 text-xs font-medium text-white bg-red-500 rounded hover:bg-red-600">
                      전체 환불
                    </button>
                    <button className="text-slate-400 hover:text-slate-600">
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M5 15l7-7 7 7" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* 주문 테이블 */}
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="text-slate-400 border-b border-slate-100">
                        <th className="text-left py-2 px-3 font-normal">상태</th>
                        <th className="text-left py-2 px-2 font-normal">주문 정보</th>
                        <th className="text-left py-2 px-2 font-normal">티켓 번호</th>
                        <th className="text-left py-2 px-2 font-normal">상품명</th>
                        <th className="text-left py-2 px-2 font-normal">이용 일시</th>
                        <th className="text-right py-2 px-2 font-normal">상품 가격</th>
                        <th className="text-left py-2 px-2 font-normal">할인 내역</th>
                        <th className="text-right py-2 px-2 font-normal">할인 금액</th>
                        <th className="text-right py-2 px-2 font-normal">결제 금액</th>
                        <th className="text-center py-2 px-2 font-normal">환불 대상 확인</th>
                        <th className="text-right py-2 px-2 font-normal">환불 금액</th>
                        <th className="text-right py-2 px-3 font-normal">매출 금액</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* 합계 행 */}
                      <tr className="border-b border-slate-100 bg-slate-50/30">
                        <td colSpan="5" className="py-2 px-3"></td>
                        <td className="text-right py-2 px-2 font-semibold text-slate-700">
                          {formatNumber(prod.price * prod.qty)}
                        </td>
                        <td className="py-2 px-2"></td>
                        <td className="text-right py-2 px-2 font-semibold text-slate-700">
                          {formatNumber(prod.discount * prod.qty)}
                        </td>
                        <td className="text-right py-2 px-2 font-semibold text-blue-600">
                          {formatNumber(prod.finalPrice * prod.qty)}
                        </td>
                        <td className="text-center py-2 px-2">-</td>
                        <td className="text-right py-2 px-2 text-red-400">-</td>
                        <td className="text-right py-2 px-3 font-semibold text-blue-600">
                          {formatNumber(prod.finalPrice * prod.qty)}
                        </td>
                      </tr>
                      {/* 상세 행 */}
                      {Array.from({ length: Math.min(prod.qty, 3) }).map((_, i) => (
                        <tr key={i} className="border-b border-slate-100 last:border-0">
                          <td className="py-2 px-3">
                            <span className="inline-block px-2 py-0.5 text-[10px] font-semibold text-blue-600 bg-blue-50 rounded">
                              {prod.status}
                            </span>
                          </td>
                          <td className="py-2 px-2">
                            <div className="text-slate-700">{prod.orderNo + i}</div>
                            <div className="text-[10px] text-slate-400">ONSITE</div>
                            <div className="text-[10px] text-slate-400">{prod.payMethodCode}</div>
                          </td>
                          <td className="py-2 px-2 font-mono text-slate-600">{prod.ticketNo.slice(0, 13)}</td>
                          <td className="py-2 px-2 text-slate-700">{prod.name}</td>
                          <td className="py-2 px-2 text-slate-600">{prod.useDateTime}</td>
                          <td className="text-right py-2 px-2 text-slate-600">{formatNumber(prod.price)}</td>
                          <td className="py-2 px-2 text-[10px] text-slate-500">직권할인 금액할인</td>
                          <td className="text-right py-2 px-2 text-slate-600">{formatNumber(prod.discount)}</td>
                          <td className="text-right py-2 px-2 font-semibold text-blue-600">{formatNumber(prod.finalPrice)}</td>
                          <td className="text-center py-2 px-2">
                            <button className="text-[10px] text-blue-500 hover:underline">환불 확인</button>
                          </td>
                          <td className="text-right py-2 px-2 text-slate-400">-</td>
                          <td className="text-right py-2 px-3 font-semibold text-blue-600">{formatNumber(prod.finalPrice)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* 발권 처리 */}
                {prod.status === '발권' && (
                  <div className="border-t border-slate-200 bg-slate-50/50 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-slate-600">발권 처리</span>
                      <div className="flex gap-1.5">
                        <button className="px-2.5 py-1 text-[11px] font-medium text-slate-400 bg-white border border-slate-200 rounded">레이서 분리</button>
                        <button className="px-2.5 py-1 text-[11px] font-medium text-slate-400 bg-white border border-slate-200 rounded">레이서 병합</button>
                        <span className="w-px bg-slate-300 mx-0.5" />
                        <button className="px-2.5 py-1 text-[11px] font-medium text-slate-400 bg-white border border-slate-200 rounded">발권하기</button>
                        <button className="px-2.5 py-1 text-[11px] font-medium text-slate-400 bg-white border border-slate-200 rounded">발권 취소</button>
                      </div>
                    </div>
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="text-slate-400 border-b border-slate-200">
                          <th className="text-left py-2 font-normal w-8"><input type="checkbox" /></th>
                          <th className="text-left py-2 px-2 font-normal">레이서</th>
                          <th className="text-left py-2 px-2 font-normal">상품 주문 번호</th>
                          <th className="text-left py-2 px-2 font-normal">티켓 No</th>
                          <th className="text-left py-2 px-2 font-normal">발권 상태</th>
                          <th className="text-left py-2 px-2 font-normal">상품명</th>
                          <th className="text-left py-2 px-2 font-normal">티켓</th>
                          <th className="text-left py-2 px-2 font-normal">발권 일시</th>
                          <th className="text-left py-2 px-2 font-normal">할인</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-slate-100">
                          <td className="py-2"><input type="checkbox" /></td>
                          <td className="py-2 px-2 text-slate-600">pion</td>
                          <td className="py-2 px-2 text-slate-600">{prod.orderNo}</td>
                          <td className="py-2 px-2 font-mono text-slate-600">{prod.ticketNo}</td>
                          <td className="py-2 px-2">
                            <span className="text-blue-600">발권</span>
                          </td>
                          <td className="py-2 px-2 text-slate-600">{prod.name}</td>
                          <td className="py-2 px-2">
                            <span className="inline-block px-2 py-0.5 text-[10px] font-medium text-amber-600 bg-amber-50 rounded">재발권</span>
                          </td>
                          <td className="py-2 px-2 text-slate-500">{prod.issuedAt}</td>
                          <td className="py-2 px-2 text-slate-400">-</td>
                        </tr>
                        <tr>
                          <td className="py-2"><input type="checkbox" /></td>
                          <td className="py-2 px-2 text-slate-600">임시레이서의 동승자 2DLP</td>
                          <td className="py-2 px-2 text-slate-600">{prod.orderNo}</td>
                          <td className="py-2 px-2 font-mono text-slate-600">{(BigInt(prod.ticketNo) + 1n).toString()}</td>
                          <td className="py-2 px-2">
                            <span className="text-blue-600">발권</span>
                          </td>
                          <td className="py-2 px-2 text-slate-600">{prod.name}</td>
                          <td className="py-2 px-2">
                            <span className="inline-block px-2 py-0.5 text-[10px] font-medium text-amber-600 bg-amber-50 rounded">재발권</span>
                          </td>
                          <td className="py-2 px-2 text-slate-500">{prod.issuedAt}</td>
                          <td className="py-2 px-2 text-slate-400">-</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </Section>

          {/* 결제 및 정산 정보 */}
          <Section title="결제 및 정산 정보">
            <div className="grid grid-cols-2 gap-4">
              {/* 결제 금액 상세 */}
              <div className="border border-slate-200 rounded-lg p-4">
                <h4 className="text-xs font-semibold text-slate-600 mb-3">결제 금액 상세</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">티켓 결제가</span>
                    <span className="text-slate-700 font-medium">{formatCurrencyFull(reservation.totalAmount)}</span>
                  </div>
                  {reservation.products.map(prod => (
                    <div key={prod.orderNo} className="flex justify-between text-xs pl-3">
                      <span className="text-slate-400">└ {prod.name} x {prod.qty} (결제 완료)</span>
                      <span className="text-slate-600">{formatCurrencyFull(prod.finalPrice * prod.qty)}</span>
                    </div>
                  ))}
                  <div className="border-t border-slate-100 pt-2 mt-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600 font-medium">소계</span>
                      <span className="text-slate-800 font-semibold">{formatCurrencyFull(reservation.totalAmount)}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 bg-amber-50 rounded-lg p-3 space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">수수료율</span>
                    <span className="text-slate-700 font-medium">{reservation.agencyCommissionRate || 0}%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">수수료 금액</span>
                    <span className="text-amber-600 font-semibold">{formatCurrencyFull(reservation.commissionAmount || 0)}</span>
                  </div>
                </div>
              </div>

              {/* 정산 정보 */}
              <div className="border border-slate-200 rounded-lg p-4">
                <h4 className="text-xs font-semibold text-slate-600 mb-3">정산 정보</h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">결제완료금액</span>
                    <span className="text-blue-600 font-bold">{formatCurrencyFull(reservation.totalAmount)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">정산 상태</span>
                    <span className="text-slate-700 font-medium">{reservation.settlementStatus}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">세금계산서</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      reservation.taxInvoiceStatus === '발행완료'
                        ? 'bg-emerald-50 text-emerald-600'
                        : 'bg-red-50 text-red-500'
                    }`}>
                      {reservation.taxInvoiceStatus}
                    </span>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <button className="w-full py-2 text-sm font-medium text-blue-600 bg-white border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors">
                    세금계산서 발행
                  </button>
                  <button className="w-full py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors">
                    정산 완료
                  </button>
                </div>
              </div>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}
