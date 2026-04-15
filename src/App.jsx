import { useState } from 'react';
import Dashboard from './pages/Dashboard';
import Calendar from './pages/Calendar';
import PartnerManagement from './pages/PartnerManagement';
import Survey from './pages/Survey';
import Reception from './pages/Reception';
import Booking from './pages/Booking';
import OrderSettlement from './pages/OrderSettlement';
import TargetSetting from './components/TargetSetting';

const NAV_ITEMS = [
  { id: 'dashboard', label: '대시보드' },
  { id: 'calendar', label: '캘린더' },
  { id: 'partners', label: '거래처 관리' },
  { id: 'survey', label: '답사' },
  { id: 'reception', label: '접수' },
  { id: 'booking', label: '예약' },
  { id: 'order', label: '주문/결제/정산' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showTargetSetting, setShowTargetSetting] = useState(false);

  const renderPage = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'calendar': return <Calendar />;
      case 'partners': return <PartnerManagement />;
      case 'survey': return <Survey />;
      case 'reception': return <Reception />;
      case 'booking': return <Booking />;
      case 'order': return <OrderSettlement />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-[1600px] mx-auto px-6">
          {/* Row 1: Logo + user info + target setting */}
          <div className="flex items-center justify-between h-14 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                981
              </div>
              <div>
                <h1 className="text-sm font-bold text-blue-600 leading-tight">981 PARK</h1>
                <p className="text-[10px] text-slate-400 leading-tight">단체 예약 관리</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                <span>admin@monolith.co.kr</span>
              </div>
              <button
                onClick={() => setShowTargetSetting(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-md hover:bg-amber-100 transition-colors"
              >
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                목표 설정
              </button>
            </div>
          </div>

          {/* Row 2: Tab bar */}
          <nav className="flex items-center gap-1 h-12">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-4 py-1.5 rounded-md text-xs font-medium transition-colors border ${
                  activeTab === item.id
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-[1600px] mx-auto px-6 py-5">
        {renderPage()}
      </main>

      <TargetSetting
        isOpen={showTargetSetting}
        onClose={() => setShowTargetSetting(false)}
        onSave={(targets) => { console.log('Targets saved:', targets); }}
      />
    </div>
  );
}
