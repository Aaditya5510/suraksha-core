import React from 'react';
import { ShieldAlert, Radio, Activity, Terminal, CheckCircle2, Server } from 'lucide-react';

interface HeaderProps {
  isLive?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isLive = false }) => {
  return (
    <header className="w-full bg-cardDark/95 border-b border-borderDark backdrop-blur-md px-4 py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand & Mission Identifier */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-alertRed/10 border border-alertRed/30 rounded-lg text-alertRed flex items-center justify-center">
            <ShieldAlert className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg md:text-xl font-bold tracking-wider text-slate-100 tactical-heading">
                SURAKSHA
              </h1>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                SIH26191
              </span>
            </div>
            <p className="text-xs font-mono text-slate-400">
              NDRF & SDMA INTELLIGENT HABITATION RELOCATION & CARRYING-CAPACITY ENGINE
            </p>
          </div>
        </div>

        {/* Tactical Status Badges */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Flashing Red Status Pill */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-alertRed/10 border border-alertRed/40 text-alertRed text-xs font-mono font-semibold tactical-pulse-red">
            <span className="w-2 h-2 rounded-full bg-alertRed animate-ping" />
            <Radio className="w-3.5 h-3.5" />
            <span>PILOT SECTOR: ALAKNANDA VALLEY (CRI 89.4 - RED ZONE)</span>
          </div>

          {/* Backend Connection Status Badge */}
          {isLive ? (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-safeGreen text-xs font-mono font-bold shadow-[0_0_10px_rgba(16,185,129,0.2)]">
              <Server className="w-3.5 h-3.5" />
              <span>SPRING BOOT LIVE (PORT 8080)</span>
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          ) : (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-safeGreen text-xs font-mono font-medium">
              <Activity className="w-3.5 h-3.5" />
              <span>STANDALONE / ZERO-FAILOVER</span>
            </div>
          )}

          {/* Core Version Status */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-slate-900 border border-borderDark text-xs font-mono text-slate-400">
            <Terminal className="w-3.5 h-3.5 text-infoBlue" />
            <span>V1.0.0</span>
          </div>
        </div>
      </div>
    </header>
  );
};
