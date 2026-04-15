import { useState } from 'react';
import { orders, orderStats } from '../data/reservationData';
import { StatsRow, StatCard, FilterBar, SearchBox, Select, DateInput, Btn, TableContainer, StatusBadge, Tag, RowAction } from '../components/Badges';
import OrderDetailPanel from '../components/OrderDetailPanel';

// 주문 행 데이터를 OrderDetailPanel 형식으로 매핑
function toReservation(o) {
  return {
    mgmtNo: o.mgmtNo,
    agencyName: o.partner !== '일반단체' ? o.partner : null,
    groupName: o.groupName,
    contactName: '-',
    contactPhone: '-',
    groupType: o.partner,
    region: '제주',
    parkManager: '김태윤',
    agencyCommissionRate: 15,
    products: [{ orderNo: o.orderNo, code: o.product.split(' ')[0], name: o.product, qty: o.qty, price: 0, discount: 0, status: o.status }],
    totalAmount: Number(o.payAmount.replace(/[₩,]/g, '')) || 0,
    commissionAmount: Number((o.commission || '0').replace(/[₩,]/g, '')) || 0,
    settlementStatus: o.settleStatus,
    taxInvoiceStatus: o.taxInvoice === '발행' ? '발행완료' : '미발행',
  };
}

export default function OrderSettlement() {
  const [selected, setSelected] = useState(null);

  return (
    <div>
      <StatsRow>
        <StatCard label="오늘 주문" value={orderStats.today} />
        <StatCard label="발권 대기" value={orderStats.pending} valueClass="text-yellow-600" />
        <StatCard label="오늘 결제액" value={orderStats.todayRevenue} />
        <StatCard label="정산 대기" value={orderStats.settlementPending} valueClass="text-red-600" />
      </StatsRow>

      <FilterBar>
        <SearchBox placeholder="예약번호, 주문번호 검색" />
        <Select><option>전체 상태</option><option>발권대기</option><option>발권완료</option><option>이용완료</option><option>환불</option></Select>
        <Select><option>전체 거래처</option><option>투어비스</option><option>제주여행사</option></Select>
        <DateInput defaultValue="2026-01-01" />
        <span className="text-xs text-slate-400">~</span>
        <DateInput defaultValue="2026-01-31" />
        <div className="ml-auto flex gap-2">
          <Btn variant="secondary">엑셀</Btn>
          <Btn variant="success">선택 발권</Btn>
        </div>
      </FilterBar>

      <TableContainer title="주문/결제 내역" count="124건">
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              {['관리번호','주문번호','예약번호','단체명','거래처','이용일시','상품','수량','정상가','결제금액','수수료','결제방식','상태','정산상태','세금계산서','액션'].map(h => (
                <th key={h} className="text-left px-1.5 py-2 text-[11px] font-medium text-slate-500">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id} className={`border-b border-slate-100 hover:bg-slate-50 text-xs ${o.cancelled ? 'bg-red-50 text-slate-400' : ''}`}>
                <td className="px-1.5 py-2"><span className="text-blue-600 cursor-pointer">{o.mgmtNo}</span></td>
                <td className="px-1.5 py-2"><span className="text-blue-600 cursor-pointer font-mono">{o.orderNo}</span></td>
                <td className="px-1.5 py-2 font-mono text-blue-600">{o.bookingNo}</td>
                <td className="px-1.5 py-2">{o.groupName}</td>
                <td className="px-1.5 py-2"><Tag color={o.partnerColor}>{o.partner}</Tag></td>
                <td className={`px-1.5 py-2 font-mono ${o.cancelled ? 'line-through' : ''}`}>{o.useDateTime}</td>
                <td className="px-1.5 py-2">{o.product}</td>
                <td className="px-1.5 py-2 font-mono text-center">{o.qty}</td>
                <td className={`px-1.5 py-2 font-mono text-right ${o.cancelled ? 'line-through' : ''}`}>{o.listPrice}</td>
                <td className={`px-1.5 py-2 font-mono text-right font-medium ${o.cancelled ? 'line-through' : ''}`}>{o.payAmount}</td>
                <td className="px-1.5 py-2 font-mono text-right text-green-600">{o.commission}</td>
                <td className="px-1.5 py-2">{o.payColor ? <Tag color={o.payColor}>{o.payMethod}</Tag> : o.payMethod}</td>
                <td className="px-1.5 py-2"><StatusBadge variant={o.statusColor}>{o.status}</StatusBadge></td>
                <td className="px-1.5 py-2">{o.settleColor ? <StatusBadge variant={o.settleColor}>{o.settleStatus}</StatusBadge> : o.settleStatus}</td>
                <td className={`px-1.5 py-2 ${o.taxSent === true ? 'text-green-600' : o.taxSent === false ? 'text-red-500' : ''}`}>{o.taxInvoice}</td>
                <td className="px-1.5 py-2">
                  {o.action && (
                    <RowAction
                      variant={o.action === '상세' ? 'primary' : 'success'}
                      onClick={() => o.action === '상세' && setSelected(toReservation(o))}
                    >
                      {o.action}
                    </RowAction>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableContainer>

      {selected && <OrderDetailPanel reservation={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
