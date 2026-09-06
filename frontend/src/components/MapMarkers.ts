import L from 'leaflet';

/**
 * Custom High-Density Tactical Leaflet Marker Icons
 * Uses pure HTML/CSS/SVG via L.divIcon to eliminate Vite asset bundling 404 issues.
 */

// 1. HAB-01: Nandikot Red Zone Origin Beacon (Pulsing Red with Concentric Radar Rings)
export const nandikotMarker = L.divIcon({
  className: 'custom-tactical-marker',
  html: `
    <div class="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2 cursor-pointer group">
      <!-- Radar Ping Outer Rings -->
      <div class="absolute w-12 h-12 rounded-full border border-red-500/80 bg-red-500/20 radar-ping pointer-events-none"></div>
      <div class="absolute w-12 h-12 rounded-full border border-red-500/60 bg-red-500/10 radar-ping-delay pointer-events-none"></div>
      
      <!-- Core Beacon -->
      <div class="relative z-10 w-7 h-7 rounded-full bg-red-600/90 border-2 border-red-200 flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.8)]">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-white animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
          <line x1="12" y1="9" x2="12" y2="13"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
      </div>

      <!-- Tactical Tag -->
      <div class="absolute top-8 whitespace-nowrap px-2 py-0.5 rounded bg-slate-900/90 border border-red-500/60 text-[10px] font-mono font-bold text-red-400 shadow-md pointer-events-none">
        HAB-01 NANDIKOT (2,840)
      </div>
    </div>
  `,
  iconSize: [0, 0],
  iconAnchor: [0, 0],
  popupAnchor: [0, -20],
});

// 2. SITE-A: Gopeshwar Enclave (Tactical Green Shield - Recommended Primary)
export const recommendedPrimaryMarker = L.divIcon({
  className: 'custom-tactical-marker',
  html: `
    <div class="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2 cursor-pointer group">
      <!-- Glow Aura -->
      <div class="absolute w-9 h-9 rounded-full bg-emerald-500/20 animate-pulse pointer-events-none"></div>

      <!-- Shield Beacon -->
      <div class="relative z-10 w-7 h-7 rounded-lg bg-emerald-600 border-2 border-emerald-200 flex items-center justify-center shadow-[0_0_12px_rgba(16,185,129,0.7)]">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <path d="m9 12 2 2 4-4"/>
        </svg>
      </div>

      <!-- Tactical Tag -->
      <div class="absolute top-8 whitespace-nowrap px-2 py-0.5 rounded bg-slate-900/90 border border-emerald-500/60 text-[10px] font-mono font-bold text-emerald-400 shadow-md pointer-events-none">
        SITE-A (3,266)
      </div>
    </div>
  `,
  iconSize: [0, 0],
  iconAnchor: [0, 0],
  popupAnchor: [0, -20],
});

// 3. SITE-C: Govt Model Inter-College Grounds (Amber Shelter - Transit Triage 0-72h)
export const transitShelterMarker = L.divIcon({
  className: 'custom-tactical-marker',
  html: `
    <div class="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2 cursor-pointer group">
      <!-- Glow Aura -->
      <div class="absolute w-8 h-8 rounded-full bg-amber-500/20 pointer-events-none"></div>

      <!-- Shelter Beacon -->
      <div class="relative z-10 w-7 h-7 rounded-lg bg-amber-600 border-2 border-amber-200 flex items-center justify-center shadow-[0_0_12px_rgba(245,158,11,0.7)]">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      </div>

      <!-- Tactical Tag -->
      <div class="absolute top-8 whitespace-nowrap px-2 py-0.5 rounded bg-slate-900/90 border border-amber-500/60 text-[10px] font-mono font-bold text-amber-400 shadow-md pointer-events-none">
        SITE-C (2,850)
      </div>
    </div>
  `,
  iconSize: [0, 0],
  iconAnchor: [0, 0],
  popupAnchor: [0, -20],
});

// 4. SITE-B: Pipalkoti Shelf (Desaturated Slate/Red - Operationally Rejected)
export const rejectedSiteMarker = L.divIcon({
  className: 'custom-tactical-marker',
  html: `
    <div class="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2 cursor-pointer group opacity-85 hover:opacity-100 transition-opacity">
      <!-- Rejected Beacon -->
      <div class="relative z-10 w-6 h-6 rounded-lg bg-slate-800 border border-red-500/70 flex items-center justify-center shadow-md">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
        </svg>
      </div>

      <!-- Tactical Tag -->
      <div class="absolute top-7 whitespace-nowrap px-1.5 py-0.5 rounded bg-slate-900/90 border border-slate-700 text-[9px] font-mono text-slate-400 line-through decoration-red-500 shadow pointer-events-none">
        SITE-B (REJECTED)
      </div>
    </div>
  `,
  iconSize: [0, 0],
  iconAnchor: [0, 0],
  popupAnchor: [0, -18],
});
