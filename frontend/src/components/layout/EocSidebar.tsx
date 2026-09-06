import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldAlert,
  LayoutDashboard,
  MapPin,
  Layers,
  Truck,
  FileText,
  Radio,
  UserCheck,
  ChevronRight,
} from 'lucide-react';
import { BASELINE_HABITATIONS } from '../../data/baselineData';

export type EocNavModule =
  | 'dashboard'
  | 'triage'
  | 'sphere'
  | 'fleet'
  | 'orders';

interface EocSidebarProps {
  activeModule: EocNavModule;
  onSelectModule: (module: EocNavModule) => void;
  selectedHabitationId: string;
  onSelectHabitation: (habId: string) => void;
  isLive: boolean;
  onOpenOrdersModal: () => void;
}

export const EocSidebar: React.FC<EocSidebarProps> = ({
  activeModule,
  onSelectModule,
  selectedHabitationId,
  onSelectHabitation,
  isLive,
  onOpenOrdersModal: _onOpenOrdersModal,
}) => {
  const navigate = useNavigate();

  const navItems = [
    {
      id: 'dashboard' as EocNavModule,
      label: 'Operations Dashboard',
      icon: LayoutDashboard,
      desc: 'Real-time situational awareness',
    },
    {
      id: 'triage' as EocNavModule,
      label: 'Habitation Demands & Triage',
      icon: MapPin,
      desc: 'SMR hazard & slope runout',
    },
    {
      id: 'sphere' as EocNavModule,
      label: 'Sphere Constraint Matrix',
      icon: Layers,
      desc: '3.5m² space, 15LPD, 1:25 toilets',
    },
    {
      id: 'fleet' as EocNavModule,
      label: 'Fleet & Transport Allocations',
      icon: Truck,
      desc: 'Buses, tankers & bio-units',
    },
    {
      id: 'orders' as EocNavModule,
      label: 'Statutory Relocation Orders',
      icon: FileText,
      desc: 'DM Act 2005 (Sec 34) Directives',
    },
  ];

  return (
    <aside className="w-64 bg-[#090d16] border-r border-gray-800 flex flex-col justify-between shrink-0 select-none h-full font-mono text-xs z-30">
      {/* Top Header & Branding */}
      <div className="flex flex-col">
        <div
          onClick={() => navigate('/')}
          className="p-4 border-b border-gray-800 flex items-center gap-3 cursor-pointer group hover:bg-slate-900/60 transition-colors"
          title="Return to Public Decision Architecture Landing Page"
        >
          <div className="p-2 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-cyan-500/40 rounded-xl text-cyan-400 group-hover:text-emerald-400 flex items-center justify-center shadow-[0_0_12px_rgba(6,182,212,0.3)] transition-all">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-black tracking-wider bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                SURAKSHA
              </span>
              <span className="text-[9px] px-1 py-0.2 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800">
                EOC
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-sans">
              EOC Command v1.0 • Chamoli
            </p>
          </div>
        </div>

        {/* Active Sectors Quick Picker */}
        <div className="p-3 border-b border-gray-800/80 space-y-1.5 bg-[#060911]/60">
          <div className="flex items-center justify-between text-[10px] uppercase font-bold text-gray-400 tracking-wider">
            <span>ACTIVE CRISIS SECTORS</span>
            <span className="text-red-400 animate-pulse">● LIVE</span>
          </div>

          <div className="space-y-1">
            {BASELINE_HABITATIONS.map((hab) => {
              const isSelected = hab.id === selectedHabitationId;
              const isRed = hab.riskZone === 'CRITICAL_RED_ZONE';

              return (
                <button
                  key={hab.id}
                  type="button"
                  onClick={() => onSelectHabitation(hab.id)}
                  className={`w-full text-left p-2 rounded-lg border transition-all flex items-center justify-between ${
                    isSelected
                      ? isRed
                        ? 'bg-red-500/15 border-red-500/60 text-white shadow-[0_0_10px_rgba(239,68,68,0.2)]'
                        : 'bg-amber-500/15 border-amber-500/60 text-white shadow-[0_0_10px_rgba(245,158,11,0.2)]'
                      : 'bg-[#0a0f1d]/40 border-gray-800 text-slate-400 hover:border-gray-700 hover:text-slate-200'
                  }`}
                >
                  <div className="truncate pr-1">
                    <div className="font-bold text-[11px] truncate">{hab.name}</div>
                    <div className="text-[9px] text-slate-400">
                      Pop: {hab.population.toLocaleString()} | CRI: {hab.compositeRiskIndex}
                    </div>
                  </div>
                  <span
                    className={`text-[8px] font-bold px-1 py-0.5 rounded shrink-0 ${
                      isRed ? 'bg-red-950 text-red-400 border border-red-800' : 'bg-amber-950 text-amber-400 border border-amber-800'
                    }`}
                  >
                    {hab.id}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Operational Modules Navigation List */}
        <div className="p-3 space-y-1">
          <div className="px-2 py-1 text-[10px] uppercase font-bold text-gray-500 tracking-wider">
            OPERATIONAL MODULES
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const IconComp = item.icon;
              const isActive = activeModule === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectModule(item.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl border transition-all flex items-center justify-between group ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border-cyan-500/60 text-white shadow-[0_0_12px_rgba(6,182,212,0.25)] font-bold'
                      : 'bg-transparent border-transparent text-slate-400 hover:bg-slate-900/80 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <IconComp
                      className={`w-4 h-4 shrink-0 ${
                        isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-200'
                      }`}
                    />
                    <div className="truncate">
                      <div className="text-[11px] leading-tight truncate">{item.label}</div>
                    </div>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-cyan-400 shrink-0" />}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Bottom Status & Incident Commander Profile */}
      <div className="p-3 border-t border-gray-800 space-y-2 bg-[#060911]/80">
        {/* Edge Sync Pill */}
        <div className="p-2 rounded-xl bg-slate-900 border border-gray-800 flex items-center justify-between text-[10px]">
          <div className="flex items-center gap-2">
            <Radio className={`w-3.5 h-3.5 ${isLive ? 'text-emerald-400 animate-pulse' : 'text-amber-400'}`} />
            <span className="text-slate-300">Edge Engine Sync</span>
          </div>
          <span
            className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
              isLive
                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                : 'bg-amber-950 text-amber-400 border border-amber-800'
            }`}
          >
            {isLive ? 'ACTIVE (8080)' : 'STANDALONE'}
          </span>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-950/60 border border-gray-800/80">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-bold text-xs shrink-0">
            <UserCheck className="w-3.5 h-3.5" />
          </div>
          <div className="truncate">
            <div className="text-[11px] font-bold text-slate-200 truncate font-sans">
              Incident Commander
            </div>
            <div className="text-[9px] text-slate-400 truncate">
              DEOC Chamoli • SDMA
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
