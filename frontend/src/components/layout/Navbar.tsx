import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldAlert,
  Map,
  BarChart3,
  Truck,
  FileText,
  Server,
  Activity,
} from 'lucide-react';

export type NavTab = 'map' | 'shelter' | 'dispatch';

interface NavbarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  isLive: boolean;
  onExportOrder: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  isLive,
  onExportOrder,
}) => {
  const navigate = useNavigate();

  return (
    <header className="h-16 bg-[#0a0d14]/90 backdrop-blur border-b border-gray-800 px-4 md:px-6 flex items-center justify-between sticky top-0 z-50 select-none">
      {/* Left: Brand, Shield Icon, Gradient Title & Subtitle */}
      <div
        onClick={() => navigate('/')}
        className="flex items-center gap-3 cursor-pointer group"
        title="Return to Decision Architecture Pipeline"
      >
        <div className="p-2 bg-red-500/10 group-hover:bg-cyan-500/20 border border-red-500/30 group-hover:border-cyan-500/50 rounded-lg text-red-500 group-hover:text-cyan-400 flex items-center justify-center shadow-[0_0_10px_rgba(239,68,68,0.3)] transition-all">
          <ShieldAlert className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-black tracking-wider bg-gradient-to-r from-red-500 via-amber-400 to-emerald-400 bg-clip-text text-transparent font-mono">
              SURAKSHA
            </span>
            <span className="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              SIH26191
            </span>
          </div>
          <p className="hidden md:block text-[11px] font-mono text-slate-400">
            NDRF/SDMA Command Suite v1.0 • Tactical Carrying-Capacity Core
          </p>
        </div>
      </div>

      {/* Center: Segmented Navigation Pills */}
      <nav className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-gray-800 shadow-inner">
        <button
          type="button"
          onClick={() => onTabChange('map')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
            activeTab === 'map'
              ? 'bg-blue-600 text-white shadow-[0_0_12px_rgba(37,99,235,0.5)]'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <Map className="w-3.5 h-3.5" />
          <span>Situation Map</span>
        </button>

        <button
          type="button"
          onClick={() => onTabChange('shelter')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
            activeTab === 'shelter'
              ? 'bg-emerald-600 text-white shadow-[0_0_12px_rgba(16,185,129,0.5)]'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Shelter Matrix</span>
        </button>

        <button
          type="button"
          onClick={() => onTabChange('dispatch')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
            activeTab === 'dispatch'
              ? 'bg-amber-600 text-white shadow-[0_0_12px_rgba(245,158,11,0.5)]'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <Truck className="w-3.5 h-3.5" />
          <span>Dispatch & Logistics</span>
        </button>
      </nav>

      {/* Right: Live Spring Boot Indicator + Export DM Order Tactical Button */}
      <div className="flex items-center gap-3">
        {/* Connection Status Indicator */}
        {isLive ? (
          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <Server className="w-3 h-3 text-emerald-400" />
            <span>LIVE (PORT 8080)</span>
          </div>
        ) : (
          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-medium">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <Activity className="w-3 h-3 text-amber-400" />
            <span>EDGE FALLBACK</span>
          </div>
        )}

        {/* Export DM Order Button */}
        <button
          type="button"
          onClick={onExportOrder}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-mono font-bold shadow-[0_0_12px_rgba(239,68,68,0.4)] transition-all"
        >
          <FileText className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Export DM Order</span>
          <span className="sm:hidden">DM Order</span>
        </button>
      </div>
    </header>
  );
};
