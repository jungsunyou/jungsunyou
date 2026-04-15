// Shared small badge/tag/status helpers for reservation management tables

const STATUS_STYLES = {
  pending: 'bg-yellow-50 text-yellow-700',
  confirmed: 'bg-green-50 text-green-700',
  cancelled: 'bg-red-50 text-red-600',
  quote: 'bg-violet-50 text-violet-700',
  am: 'bg-blue-50 text-blue-600',
  pm: 'bg-orange-50 text-orange-600',
};

const STATUS_LABELS = {
  '대기': 'pending',
  '완료': 'confirmed',
  '확정': 'confirmed',
  '취소': 'cancelled',
  '환불': 'cancelled',
  '견적': 'quote',
  '발권완료': 'confirmed',
  '이용완료': 'confirmed',
  '발권대기': 'pending',
};

export function StatusBadge({ children, variant }) {
  const key = variant || STATUS_LABELS[children] || 'pending';
  return (
    <span className={`inline-flex px-1.5 py-0.5 rounded text-[10px] font-medium ${STATUS_STYLES[key] || STATUS_STYLES.pending}`}>
      {children}
    </span>
  );
}

const TAG_STYLES = {
  blue: 'bg-blue-50 text-blue-600',
  green: 'bg-green-50 text-green-700',
  yellow: 'bg-yellow-50 text-yellow-700',
  purple: 'bg-violet-50 text-violet-700',
  gray: 'bg-slate-100 text-slate-500',
};

export function Tag({ children, color = 'blue' }) {
  return (
    <span className={`inline-flex px-1.5 py-0.5 rounded text-[10px] font-medium ${TAG_STYLES[color] || TAG_STYLES.blue}`}>
      {children}
    </span>
  );
}

export function StatCard({ label, value, valueClass = 'text-slate-800' }) {
  return (
    <div className="flex-1 bg-white border border-slate-200 rounded-md px-4 py-3">
      <div className="text-[11px] text-slate-400 mb-0.5">{label}</div>
      <div className={`text-xl font-bold font-mono ${valueClass}`}>{value}</div>
    </div>
  );
}

export function StatsRow({ children }) {
  return <div className="flex gap-3 mb-4">{children}</div>;
}

export function FilterBar({ children }) {
  return (
    <div className="flex items-center gap-2 flex-wrap bg-white p-3 rounded-md border border-slate-200 mb-3">
      {children}
    </div>
  );
}

export function SearchBox({ placeholder }) {
  return (
    <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded px-2 min-w-[200px]">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-400">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" strokeLinecap="round" />
      </svg>
      <input type="text" placeholder={placeholder}
        className="flex-1 bg-transparent border-none py-1.5 text-xs outline-none" />
    </div>
  );
}

export function Select({ children, className = '' }) {
  return (
    <select className={`px-2 py-1.5 border border-slate-200 rounded text-xs bg-white cursor-pointer ${className}`}>
      {children}
    </select>
  );
}

export function DateInput({ defaultValue }) {
  return (
    <input type="date" defaultValue={defaultValue}
      className="px-2 py-1.5 border border-slate-200 rounded text-xs bg-white" />
  );
}

export function Btn({ children, variant = 'primary', onClick, className = '' }) {
  const styles = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    secondary: 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50',
    success: 'bg-green-500 hover:bg-green-600 text-white',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
  };
  return (
    <button onClick={onClick}
      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded text-xs font-medium transition-colors ${styles[variant]} ${className}`}>
      {children}
    </button>
  );
}

export function RowAction({ children, variant = 'primary', onClick }) {
  const styles = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    success: 'bg-green-500 hover:bg-green-600 text-white',
  };
  return (
    <button onClick={onClick}
      className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${styles[variant]}`}>
      {children}
    </button>
  );
}

export function TableContainer({ title, count, children }) {
  return (
    <div className="bg-white border border-slate-200 rounded-md overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2.5 border-b border-slate-200 bg-slate-50">
        <div className="flex items-baseline gap-1.5">
          <span className="text-[13px] font-semibold text-slate-700">{title}</span>
          <span className="text-[11px] text-slate-400">{count}</span>
        </div>
      </div>
      <div className="overflow-x-auto">{children}</div>
      <div className="flex items-center justify-between px-3 py-2.5 border-t border-slate-200">
        <div className="text-[11px] text-slate-400">{count}</div>
        <div className="flex gap-0.5">
          <button className="min-w-[28px] h-7 rounded border border-slate-200 bg-white text-slate-500 text-[11px]">←</button>
          <button className="min-w-[28px] h-7 rounded border border-blue-500 bg-blue-500 text-white text-[11px]">1</button>
          <button className="min-w-[28px] h-7 rounded border border-slate-200 bg-white text-slate-500 text-[11px]">2</button>
          <button className="min-w-[28px] h-7 rounded border border-slate-200 bg-white text-slate-500 text-[11px]">→</button>
        </div>
      </div>
    </div>
  );
}
