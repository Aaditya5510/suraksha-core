import L from 'leaflet';

/**
 * Custom High-Density Tactical Leaflet Marker Icons
 * Uses pure HTML/CSS/SVG via L.divIcon to eliminate Vite asset bundling 404 issues
 * and prevent coordinate/label overlap.
 */

// 1. HAB-01: Nandikot Red Zone Origin Beacon (Crimson Glowing Beacon with Animated Ping Ring)
export const NandikotMarker = L.divIcon({
  className: 'custom-tactical-marker',
  html: `
    <div class="relative flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-30">
      <!-- Radar Ping Outer Rings -->
      <div class="absolute w-12 h-12 rounded-full border-2 border-red-500/80 bg-red-500/20 radar-ping pointer-events-none"></div>
      <div class="absolute w-12 h-12 rounded-full border border-red-500/60 bg-red-500/10 radar-ping-delay pointer-events-none"></div>
      
      <!-- Core Beacon -->
      <div class="relative z-10 w-7 h-7 rounded-full bg-red-600 border-2 border-red-200 flex items-center justify-center shadow-[0_0_16px_rgba(239,68,68,0.9)]">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-white animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
          <line x1="12" y1="9" x2="12" y2="13"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
      </div>

      <!-- Badge Label Positioned Below Icon -->
      <div class="mt-1.5 whitespace-nowrap px-2 py-0.5 rounded bg-slate-950/95 border border-red-500/80 text-[10px] font-mono font-bold text-red-400 shadow-[0_2px_8px_rgba(0,0,0,0.8)] pointer-events-none">
        HAB-01 NANDIKOT (RED ZONE)
      </div>
    </div>
  `,
  iconSize: [0, 0],
  iconAnchor: [0, 0],
  popupAnchor: [0, -22],
});

// 2. SITE-A: Gopeshwar Enclave (Tactical Emerald Shield Icon - Safe Resettlement)
export const SiteAMarker = L.divIcon({
  className: 'custom-tactical-marker',
  html: `
    <div class="relative flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20">
      <!-- Glow Aura -->
      <div class="absolute w-9 h-9 rounded-full bg-emerald-500/25 animate-pulse pointer-events-none"></div>

      <!-- Shield Beacon -->
      <div class="relative z-10 w-7 h-7 rounded-lg bg-emerald-600 border-2 border-emerald-200 flex items-center justify-center shadow-[0_0_14px_rgba(16,185,129,0.8)]">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <path d="m9 12 2 2 4-4"/>
        </svg>
      </div>

      <!-- Badge Label Positioned Below Icon -->
      <div class="mt-1.5 whitespace-nowrap px-2 py-0.5 rounded bg-slate-950/95 border border-emerald-500/80 text-[10px] font-mono font-bold text-emerald-400 shadow-[0_2px_8px_rgba(0,0,0,0.8)] pointer-events-none">
        SITE-A GOPESHWAR (SAFE)
      </div>
    </div>
  `,
  iconSize: [0, 0],
  iconAnchor: [0, 0],
  popupAnchor: [0, -22],
});

// 3. SITE-B: Pipalkoti Shelf (Warning Slate Marker with Diagonal Strike-Through - Bottleneck Rejected)
export const SiteBMarker = L.divIcon({
  className: 'custom-tactical-marker',
  html: `
    <div class="relative flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2 cursor-pointer group opacity-90 hover:opacity-100 transition-opacity z-10">
      <!-- Rejected Beacon -->
      <div class="relative z-10 w-6 h-6 rounded-lg bg-slate-900 border-2 border-red-500/80 flex items-center justify-center shadow-[0_0_10px_rgba(239,68,68,0.5)]">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
        </svg>
      </div>

      <!-- Badge Label Positioned Below Icon -->
      <div class="mt-1.5 whitespace-nowrap px-2 py-0.5 rounded bg-slate-950/95 border border-slate-700 text-[10px] font-mono font-bold text-slate-300 shadow-[0_2px_8px_rgba(0,0,0,0.8)] pointer-events-none">
        SITE-B PIPALKOTI (<span class="text-red-400 font-extrabold">BOTTLENECK REJECTED</span>)
      </div>
    </div>
  `,
  iconSize: [0, 0],
  iconAnchor: [0, 0],
  popupAnchor: [0, -20],
});

// 4. SITE-C: Govt Model Inter-College Grounds (Amber Transit Shelter Icon - 0-72h Triage)
export const SiteCMarker = L.divIcon({
  className: 'custom-tactical-marker',
  html: `
    <div class="relative flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20">
      <!-- Glow Aura -->
      <div class="absolute w-8 h-8 rounded-full bg-amber-500/25 pointer-events-none"></div>

      <!-- Shelter Beacon -->
      <div class="relative z-10 w-7 h-7 rounded-lg bg-amber-600 border-2 border-amber-200 flex items-center justify-center shadow-[0_0_14px_rgba(245,158,11,0.8)]">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      </div>

      <!-- Badge Label Positioned Below Icon -->
      <div class="mt-1.5 whitespace-nowrap px-2 py-0.5 rounded bg-slate-950/95 border border-amber-500/80 text-[10px] font-mono font-bold text-amber-400 shadow-[0_2px_8px_rgba(0,0,0,0.8)] pointer-events-none">
        SITE-C INTER-COLLEGE (0-72H TRIAGE)
      </div>
    </div>
  `,
  iconSize: [0, 0],
  iconAnchor: [0, 0],
  popupAnchor: [0, -22],
});

// 5. HAB-02: Helang Lower Bastion Origin Beacon (Amber Monitoring Beacon with Radar Ping)
export const HelangMarker = L.divIcon({
  className: 'custom-tactical-marker',
  html: `
    <div class="relative flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-30">
      <!-- Radar Ping Outer Rings -->
      <div class="absolute w-10 h-10 rounded-full border-2 border-amber-500/80 bg-amber-500/20 radar-ping pointer-events-none"></div>
      
      <!-- Core Beacon -->
      <div class="relative z-10 w-7 h-7 rounded-full bg-amber-600 border-2 border-amber-200 flex items-center justify-center shadow-[0_0_16px_rgba(245,158,11,0.9)]">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-white animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      </div>

      <!-- Badge Label Positioned Below Icon -->
      <div class="mt-1.5 whitespace-nowrap px-2 py-0.5 rounded bg-slate-950/95 border border-amber-500/80 text-[10px] font-mono font-bold text-amber-400 shadow-[0_2px_8px_rgba(0,0,0,0.8)] pointer-events-none">
        HAB-02 HELANG (AMBER ZONE)
      </div>
    </div>
  `,
  iconSize: [0, 0],
  iconAnchor: [0, 0],
  popupAnchor: [0, -22],
});

// 6. HAB-03: Joshimath Sub-Sector B Origin Beacon (Critical Red Zone with Double Pulse)
export const JoshimathMarker = L.divIcon({
  className: 'custom-tactical-marker',
  html: `
    <div class="relative flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-30">
      <!-- Radar Ping Outer Rings -->
      <div class="absolute w-12 h-12 rounded-full border-2 border-red-600/80 bg-red-600/20 radar-ping pointer-events-none"></div>
      
      <!-- Core Beacon -->
      <div class="relative z-10 w-7 h-7 rounded-full bg-red-700 border-2 border-red-200 flex items-center justify-center shadow-[0_0_16px_rgba(220,38,38,0.95)]">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-white animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      </div>

      <!-- Badge Label Positioned Below Icon -->
      <div class="mt-1.5 whitespace-nowrap px-2 py-0.5 rounded bg-slate-950/95 border border-red-600/80 text-[10px] font-mono font-bold text-red-400 shadow-[0_2px_8px_rgba(0,0,0,0.8)] pointer-events-none">
        HAB-03 JOSHIMATH (RED ZONE)
      </div>
    </div>
  `,
  iconSize: [0, 0],
  iconAnchor: [0, 0],
  popupAnchor: [0, -22],
});

// 7. Road Blocked Warning Marker (NH-58 Cutoff Hazard Flag)
export const RoadBlockedMarker = L.divIcon({
  className: 'custom-tactical-marker',
  html: `
    <div class="relative flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-40">
      <div class="absolute w-12 h-12 rounded-full bg-red-600/40 animate-ping pointer-events-none"></div>
      <div class="relative z-10 px-2.5 py-1 rounded-lg bg-red-600 border-2 border-white text-white font-mono font-black text-[10px] flex items-center gap-1 shadow-[0_0_16px_rgba(239,68,68,1)]">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
        <span>X - NH-58 BLOCKED</span>
      </div>
      <div class="mt-1 px-1.5 py-0.5 rounded bg-black/90 text-red-300 text-[9px] font-mono border border-red-500 font-bold shadow">
        DEBRIS FLOW (KM 342.6)
      </div>
    </div>
  `,
  iconSize: [0, 0],
  iconAnchor: [0, 0],
  popupAnchor: [0, -22],
});

// Backward-compatibility aliases
export const nandikotMarker = NandikotMarker;
export const helangMarker = HelangMarker;
export const joshimathMarker = JoshimathMarker;
export const siteAMarker = SiteAMarker;
export const recommendedPrimaryMarker = SiteAMarker;
export const siteBMarker = SiteBMarker;
export const rejectedSiteMarker = SiteBMarker;
export const siteCMarker = SiteCMarker;
export const transitShelterMarker = SiteCMarker;
export const roadBlockedMarker = RoadBlockedMarker;
