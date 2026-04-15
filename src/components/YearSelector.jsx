import { AVAILABLE_YEARS } from '../data/dashboardData';

export default function YearSelector({ value, onChange, className = '' }) {
  return (
    <select
      value={value}
      onChange={e => onChange(Number(e.target.value))}
      className={`text-xs font-semibold text-slate-600 bg-slate-100 border border-slate-200 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer ${className}`}
    >
      {AVAILABLE_YEARS.map(y => (
        <option key={y} value={y}>{y}년</option>
      ))}
    </select>
  );
}
