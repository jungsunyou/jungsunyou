import { useState, useMemo } from 'react';
import { PRODUCTS, PAYMENT_METHODS, GROUP_TYPES, REGIONS, TRAVEL_AGENCIES, PARK_MANAGERS } from '../data/calendarData';
import { formatCurrencyFull } from '../data/dashboardData';

// 입력 필드 컴포넌트
function Field({ label, required, children }) {
  return (
    <div className="flex-1 min-w-0">
      <label className="block text-xs font-medium text-slate-600 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}

function TextInput({ placeholder, value, onChange, type = 'text' }) {
  return (
    <input
      type={type}
      value={value || ''}
      onChange={e => onChange?.(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-slate-300"
    />
  );
}

function SelectInput({ placeholder, value, onChange, options, icon }) {
  return (
    <div className="relative">
      {icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </div>
      )}
      <select
        value={value || ''}
        onChange={e => onChange?.(e.target.value)}
        className={`w-full py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent appearance-none bg-white ${
          icon ? 'pl-9 pr-8' : 'pl-3 pr-8'
        } ${!value ? 'text-slate-300' : 'text-slate-700'}`}
      >
        <option value="">{placeholder}</option>
        {options.map(opt => (
          <option key={opt.value || opt} value={opt.value || opt}>
            {opt.label || opt}
          </option>
        ))}
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
}

function SearchInput({ placeholder, value, onChange }) {
  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21 21l-4.35-4.35" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <input
        type="text"
        value={value || ''}
        onChange={e => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-slate-300"
      />
    </div>
  );
}

function DateInput({ value, onChange }) {
  return (
    <SelectInput
      placeholder="선택된 날짜 없음"
      value={value}
      onChange={onChange}
      options={[
        '2026-04-01', '2026-04-02', '2026-04-03', '2026-04-05', '2026-04-10',
        '2026-04-15', '2026-04-20', '2026-05-01', '2026-05-10',
      ]}
      icon={
        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      }
    />
  );
}

function TimeInput({ value, onChange }) {
  return (
    <SelectInput
      placeholder="시간 선택"
      value={value}
      onChange={onChange}
      options={['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']}
      icon={
        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      }
    />
  );
}

// 상품 아이템
function ProductItem({ index, product, onUpdate, onRemove, canRemove }) {
  const selectedProd = PRODUCTS.find(p => p.code === product.productCode);
  const totalAmount = useMemo(() => {
    if (product.customAmount) return parseInt(product.customAmount) || 0;
    if (product.customUnitPrice && product.qty) return parseInt(product.customUnitPrice) * parseInt(product.qty);
    if (selectedProd && product.qty) return selectedProd.price * parseInt(product.qty);
    return 0;
  }, [product, selectedProd]);

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-3">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-slate-700">상품 {index + 1}</span>
        {canRemove && (
          <button
            onClick={onRemove}
            className="text-slate-400 hover:text-red-500"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
      </div>

      <div className="space-y-3">
        <Field label="" required>
          <SelectInput
            placeholder="상품 선택 *"
            value={product.productCode}
            onChange={v => onUpdate({ ...product, productCode: v })}
            options={PRODUCTS.map(p => ({ value: p.code, label: `${p.name} (₩${p.price.toLocaleString()})` }))}
          />
        </Field>

        <div className="grid grid-cols-3 gap-3">
          <Field label="수량" required>
            <TextInput
              type="number"
              placeholder="수량"
              value={product.qty}
              onChange={v => onUpdate({ ...product, qty: v })}
            />
          </Field>
          <Field label="탑승 시간 (선택)">
            <SelectInput
              placeholder="상품 선택 후 조회됩니다"
              value={product.boardingTime}
              onChange={v => onUpdate({ ...product, boardingTime: v })}
              options={['09:00', '10:00', '11:00', '13:00', '14:00', '15:00']}
            />
          </Field>
          <Field label="결제 수단 (선택)">
            <SelectInput
              placeholder="결제 수단 선택"
              value={product.payMethod}
              onChange={v => onUpdate({ ...product, payMethod: v })}
              options={PAYMENT_METHODS.map(p => ({ value: p.code, label: p.label }))}
            />
          </Field>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Field label="커스텀 결제 금액 (선택)">
            <TextInput
              type="number"
              placeholder="금액 입력"
              value={product.customAmount}
              onChange={v => onUpdate({ ...product, customAmount: v })}
            />
          </Field>
          <Field label="커스텀 단가 X 수량 (선택)">
            <TextInput
              type="number"
              placeholder="단가 입력"
              value={product.customUnitPrice}
              onChange={v => onUpdate({ ...product, customUnitPrice: v })}
            />
          </Field>
          <Field label="커스텀 수수료 단가 X 수량 (선택)">
            <TextInput
              type="number"
              placeholder="단가 입력"
              value={product.customCommissionUnit}
              onChange={v => onUpdate({ ...product, customCommissionUnit: v })}
            />
          </Field>
        </div>

        <Field label="메모 (선택)">
          <TextInput
            placeholder="메모 입력"
            value={product.memo}
            onChange={v => onUpdate({ ...product, memo: v })}
          />
        </Field>
      </div>
    </div>
  );
}

export default function BookingRegister({ isOpen, onClose, initialDate, onSave }) {
  const [form, setForm] = useState({
    useDate: initialDate || '',
    useTime: '',
    groupName: '',
    groupType: '',
    region: '',
    payMethod: '',
    contactName: '',
    contactPhone: '',
    guideName: '',
    guidePhone: '',
    agencyName: '',
    parkManager: '',
    memo: '',
  });

  const [products, setProducts] = useState([
    { productCode: '', qty: '', boardingTime: '', payMethod: '', customAmount: '', customUnitPrice: '', customCommissionUnit: '', memo: '' },
  ]);

  const { totalAmount, totalCommission } = useMemo(() => {
    let amount = 0;
    let commission = 0;
    products.forEach(p => {
      const prod = PRODUCTS.find(pd => pd.code === p.productCode);
      if (p.customAmount) {
        amount += parseInt(p.customAmount) || 0;
      } else if (p.customUnitPrice && p.qty) {
        amount += parseInt(p.customUnitPrice) * parseInt(p.qty);
      } else if (prod && p.qty) {
        amount += prod.price * parseInt(p.qty);
      }
      if (p.customCommissionUnit && p.qty) {
        commission += parseInt(p.customCommissionUnit) * parseInt(p.qty);
      }
    });
    return { totalAmount: amount, totalCommission: commission };
  }, [products]);

  const updateField = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const addProduct = () => {
    setProducts(prev => [...prev, {
      productCode: '', qty: '', boardingTime: '', payMethod: '',
      customAmount: '', customUnitPrice: '', customCommissionUnit: '', memo: '',
    }]);
  };

  const updateProduct = (idx, newProd) => {
    setProducts(prev => prev.map((p, i) => i === idx ? newProd : p));
  };

  const removeProduct = (idx) => {
    setProducts(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = () => {
    onSave?.({ ...form, products });
    onClose?.();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
        {/* 헤더 */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h2 className="text-base font-bold text-slate-800">예약 등록</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* 폼 본문 */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* 이용예정일 / 이용시간 */}
          <div className="grid grid-cols-2 gap-3">
            <Field label="이용예정일" required>
              <DateInput value={form.useDate} onChange={v => updateField('useDate', v)} />
            </Field>
            <Field label="이용시간" required>
              <TimeInput value={form.useTime} onChange={v => updateField('useTime', v)} />
            </Field>
          </div>

          {/* 단체명 / 구분 */}
          <div className="grid grid-cols-2 gap-3">
            <Field label="단체명" required>
              <TextInput
                placeholder="단체명"
                value={form.groupName}
                onChange={v => updateField('groupName', v)}
              />
            </Field>
            <Field label="구분" required>
              <SelectInput
                placeholder="구분 선택"
                value={form.groupType}
                onChange={v => updateField('groupType', v)}
                options={GROUP_TYPES}
              />
            </Field>
          </div>

          {/* 지역 / 결제 수단 */}
          <div className="grid grid-cols-2 gap-3">
            <Field label="지역" required>
              <SelectInput
                placeholder="지역 선택"
                value={form.region}
                onChange={v => updateField('region', v)}
                options={REGIONS}
              />
            </Field>
            <Field label="결제 수단" required>
              <SelectInput
                placeholder="결제 수단 선택"
                value={form.payMethod}
                onChange={v => updateField('payMethod', v)}
                options={PAYMENT_METHODS.map(p => ({ value: p.code, label: p.label }))}
              />
            </Field>
          </div>

          {/* 단체 담당자 / 담당자 연락처 */}
          <div className="grid grid-cols-2 gap-3">
            <Field label="단체 담당자" required>
              <TextInput
                placeholder="담당자명"
                value={form.contactName}
                onChange={v => updateField('contactName', v)}
              />
            </Field>
            <Field label="담당자 연락처">
              <TextInput
                placeholder="010-0000-0000"
                value={form.contactPhone}
                onChange={v => updateField('contactPhone', v)}
              />
            </Field>
          </div>

          {/* 인솔자 / 인솔자 연락처 */}
          <div className="grid grid-cols-2 gap-3">
            <Field label="인솔자">
              <TextInput
                placeholder="인솔자명"
                value={form.guideName}
                onChange={v => updateField('guideName', v)}
              />
            </Field>
            <Field label="인솔자 연락처">
              <TextInput
                placeholder="010-0000-0000"
                value={form.guidePhone}
                onChange={v => updateField('guidePhone', v)}
              />
            </Field>
          </div>

          {/* 여행사 / 파크 담당자 */}
          <div className="grid grid-cols-2 gap-3">
            <Field label="여행사">
              <SearchInput
                placeholder="여행사명으로 검색"
                value={form.agencyName}
                onChange={v => updateField('agencyName', v)}
              />
            </Field>
            <Field label="파크 담당자">
              <SearchInput
                placeholder="담당자명으로 검색"
                value={form.parkManager}
                onChange={v => updateField('parkManager', v)}
              />
            </Field>
          </div>

          {/* 상품 */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-2">
              상품 <span className="text-red-500">*</span>
            </label>
            {products.map((prod, idx) => (
              <ProductItem
                key={idx}
                index={idx}
                product={prod}
                onUpdate={newProd => updateProduct(idx, newProd)}
                onRemove={() => removeProduct(idx)}
                canRemove={products.length > 1}
              />
            ))}
            <button
              onClick={addProduct}
              className="w-full py-2 text-sm font-medium text-blue-600 border border-dashed border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
            >
              + 상품 추가
            </button>
          </div>

          {/* 전체 메모 */}
          <Field label="메모">
            <textarea
              value={form.memo}
              onChange={e => updateField('memo', e.target.value)}
              placeholder="메모 입력"
              rows={3}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-slate-300 resize-none"
            />
          </Field>

          {/* 합계 */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-700">총 예상 결제 금액</span>
              <span className="text-base font-bold text-blue-600">{formatCurrencyFull(totalAmount)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-700">총 예상 수수료 금액</span>
              <span className="text-base font-bold text-amber-600">{formatCurrencyFull(totalCommission)}</span>
            </div>
          </div>
        </div>

        {/* 푸터 */}
        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-slate-200 bg-slate-50">
          <button
            onClick={onClose}
            className="px-6 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            className="px-8 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            등록
          </button>
        </div>
      </div>
    </div>
  );
}
