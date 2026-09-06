import React, { useState, useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  Polyline,
  useMap,
} from 'react-leaflet';
import type { EvaluationResultResponse } from '../types/suraksha';
import {
  NandikotMarker,
  HelangMarker,
  JoshimathMarker,
  SiteAMarker,
  SiteBMarker,
  SiteCMarker,
  RoadBlockedMarker,
} from './MapMarkers';
import { BASELINE_HABITATIONS } from '../data/baselineData';
import {
  MapPin,
  Compass,
  AlertTriangle,
  ShieldCheck,
  Building2,
  Navigation,
  XCircle,
  Zap,
  AlertOctagon,
  CheckCircle2,
} from 'lucide-react';

interface TacticalMapProps {
  evaluation: EvaluationResultResponse;
  selectedSiteId?: string;
  onSelectSite?: (siteId: string) => void;
  onSelectHabitation?: (habId: string) => void;
}

/**
 * MapController component to invalidate size and auto-pan (flyTo) when the active sector or site changes.
 */
const MapController: React.FC<{
  targetPos: [number, number];
  zoom?: number;
  triggerKey: string;
}> = ({ targetPos, zoom = 13.5, triggerKey }) => {
  const map = useMap();

  useEffect(() => {
    map.invalidateSize();
    map.flyTo(targetPos, zoom, { duration: 1.2 });
  }, [map, targetPos[0], targetPos[1], zoom, triggerKey]);

  return null;
};

export const TacticalMap: React.FC<TacticalMapProps> = ({
  evaluation,
  selectedSiteId = 'SITE-A',
  onSelectSite,
  onSelectHabitation,
}) => {
  const { habitation, tacticalShelterImmediate, candidateSites } = evaluation;

  // Emergency Road Blockade Simulation Toggle
  const [isRoadCutoff, setIsRoadCutoff] = useState<boolean>(false);

  // Camera Target Viewport Management
  const [cameraCenter, setCameraCenter] = useState<[number, number]>([
    habitation.latitude,
    habitation.longitude,
  ]);
  const [cameraZoom, setCameraZoom] = useState<number>(13.5);
  const [cameraTriggerKey, setCameraTriggerKey] = useState<string>(habitation.id);

  // When active habitation changes, immediately fly camera to it
  useEffect(() => {
    setCameraCenter([habitation.latitude, habitation.longitude]);
    setCameraZoom(13.5);
    setCameraTriggerKey(`${habitation.id}-${Date.now()}`);
  }, [habitation.id, habitation.latitude, habitation.longitude]);

  // Active Crisis Habitation Origin & Target Site Coordinates
  const activeOriginPos: [number, number] = [habitation.latitude, habitation.longitude];

  const hab01 = BASELINE_HABITATIONS.find((h) => h.id === 'HAB-01') || BASELINE_HABITATIONS[0];
  const hab02 = BASELINE_HABITATIONS.find((h) => h.id === 'HAB-02') || BASELINE_HABITATIONS[1];
  const hab03 = BASELINE_HABITATIONS.find((h) => h.id === 'HAB-03') || BASELINE_HABITATIONS[2];

  const siteCPos: [number, number] = [
    tacticalShelterImmediate.latitude,
    tacticalShelterImmediate.longitude,
  ];

  const siteA = candidateSites.find((s) => s.siteId === 'SITE-A') || candidateSites[0];
  const siteAPos: [number, number] = siteA ? [siteA.latitude, siteA.longitude] : [30.4080, 79.3190];

  const siteB = candidateSites.find((s) => s.siteId === 'SITE-B');
  const siteBPos: [number, number] = siteB ? [siteB.latitude, siteB.longitude] : [30.4290, 79.4270];

  const busesNeeded = Math.ceil(habitation.population / 40);

  // Dynamic Route Calculations based on Active Habitation
  let routeA_ValleyHighway: [number, number][] = [];
  let routeB_RidgeBypass: [number, number][] = [];
  let routeToSiteC: [number, number][] = [];
  let roadBlockLocation: [number, number] = [30.4125, 79.3230];
  let routeATiming = '12 min';
  let routeBTiming = '24 min';

  if (habitation.id === 'HAB-01') {
    routeA_ValleyHighway = [
      [30.4158, 79.3248],
      [30.4125, 79.3230],
      [30.4098, 79.3208],
      siteAPos,
    ];
    routeB_RidgeBypass = [
      [30.4158, 79.3248],
      [30.4190, 79.3160],
      [30.4140, 79.3130],
      [30.4095, 79.3160],
      siteAPos,
    ];
    routeToSiteC = [
      [30.4158, 79.3248],
      [30.4135, 79.3225],
      siteCPos,
    ];
    roadBlockLocation = [30.4125, 79.3230];
    routeATiming = '12 min';
    routeBTiming = '24 min';
  } else if (habitation.id === 'HAB-02') {
    routeA_ValleyHighway = [
      [30.5280, 79.5128],
      [30.4850, 79.4800],
      [30.4450, 79.4600],
      [30.4290, 79.4270],
      [30.4180, 79.3500],
      siteAPos,
    ];
    routeB_RidgeBypass = [
      [30.5280, 79.5128],
      [30.5150, 79.4650],
      [30.4700, 79.4100],
      [30.4350, 79.3550],
      [30.4150, 79.3180],
      siteAPos,
    ];
    routeToSiteC = [
      [30.5280, 79.5128],
      [30.4800, 79.4600],
      [30.4200, 79.3300],
      siteCPos,
    ];
    roadBlockLocation = [30.4450, 79.4600];
    routeATiming = '35 min';
    routeBTiming = '48 min';
  } else {
    routeA_ValleyHighway = [
      [30.5560, 79.5620],
      [30.5380, 79.5300],
      [30.5280, 79.5128],
      [30.4850, 79.4800],
      [30.4450, 79.4600],
      [30.4290, 79.4270],
      [30.4180, 79.3500],
      siteAPos,
    ];
    routeB_RidgeBypass = [
      [30.5560, 79.5620],
      [30.5450, 79.5250],
      [30.5050, 79.4600],
      [30.4600, 79.4000],
      [30.4250, 79.3400],
      siteAPos,
    ];
    routeToSiteC = [
      [30.5560, 79.5620],
      [30.5200, 79.4800],
      [30.4300, 79.3400],
      siteCPos,
    ];
    roadBlockLocation = [30.4850, 79.4800];
    routeATiming = '45 min';
    routeBTiming = '62 min';
  }

  const handleHabitationMarkerClick = (habId: string) => {
    onSelectHabitation?.(habId);
    const hab = BASELINE_HABITATIONS.find((h) => h.id === habId);
    if (hab) {
      setCameraCenter([hab.latitude, hab.longitude]);
      setCameraZoom(13.5);
      setCameraTriggerKey(`${habId}-${Date.now()}`);
    }
  };

  const handleSiteMarkerClick = (siteId: string, pos: [number, number], zoom = 14) => {
    onSelectSite?.(siteId);
    setCameraCenter(pos);
    setCameraZoom(zoom);
    setCameraTriggerKey(`${siteId}-${Date.now()}`);
  };

  return (
    <div className="relative w-full h-[520px] md:h-[580px] rounded-xl overflow-hidden border border-borderDark bg-bgDark shadow-2xl">
      {/* Top Tactical HUD Bar */}
      <div className="absolute top-3 left-3 right-3 z-[1000] pointer-events-none flex flex-wrap items-center justify-between gap-2">
        <div className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cardDark/90 border border-borderDark backdrop-blur-md shadow-lg text-xs font-mono text-slate-200">
          <Compass className="w-3.5 h-3.5 text-infoBlue animate-spin-slow" />
          <span className="text-slate-400">SECTOR:</span>
          <span className="font-bold text-slate-100">{habitation.id} {habitation.name.toUpperCase()}</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">POS:</span>
          <span className="text-amber-400 font-semibold">{habitation.latitude.toFixed(4)}° N, {habitation.longitude.toFixed(4)}° E</span>
        </div>

        {/* Road Cutoff Simulation Button in HUD */}
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsRoadCutoff(!isRoadCutoff)}
            className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold flex items-center gap-1.5 transition-all shadow-lg ${
              isRoadCutoff
                ? 'bg-red-600 hover:bg-red-500 text-white animate-pulse'
                : 'bg-cardDark/90 hover:bg-slate-800 text-amber-400 border border-amber-500/40'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>{isRoadCutoff ? '⚡ Restore NH-58 Highway' : '⚡ Simulate NH-58 Cutoff'}</span>
          </button>
        </div>
      </div>

      {/* Road Cutoff Floating Alert Banner */}
      {isRoadCutoff && (
        <div className="absolute top-14 left-1/2 -translate-x-1/2 z-[1000] w-[90%] max-w-[650px] pointer-events-auto animate-in fade-in duration-200">
          <div className="p-3 rounded-xl bg-red-600/95 border border-red-300 backdrop-blur-md shadow-2xl text-white font-mono text-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <AlertOctagon className="w-4 h-4 text-white shrink-0 animate-pulse" />
              <div>
                <span className="font-bold block">CRITICAL: NH-58 Valley Highway Blocked by Debris Flow.</span>
                <span className="text-[10px] text-red-100">All {busesNeeded} Buses auto-diverted to Upper Ridge Bypass.</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsRoadCutoff(false)}
              className="px-2 py-1 rounded bg-black/40 hover:bg-black/60 text-[10px] font-bold text-white border border-white/30 shrink-0"
            >
              Restore
            </button>
          </div>
        </div>
      )}

      {/* Leaflet Map Engine Container */}
      <MapContainer
        center={cameraCenter}
        zoom={cameraZoom}
        scrollWheelZoom={true}
        className="w-full h-full z-0 tactical-dark-tiles"
      >
        <MapController
          targetPos={cameraCenter}
          zoom={cameraZoom}
          triggerKey={cameraTriggerKey}
        />

        {/* Clean OpenStreetMap TileLayer with Dark Mode CSS Filter */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />

        {/* Layer 1: Active Habitation Hazard Runout Danger Zone (900m / 500m) */}
        <Circle
          center={activeOriginPos}
          radius={habitation.riskZone === 'CRITICAL_RED_ZONE' ? 900 : 500}
          pathOptions={{
            color: habitation.riskZone === 'CRITICAL_RED_ZONE' ? '#ef4444' : '#f59e0b',
            fillColor: habitation.riskZone === 'CRITICAL_RED_ZONE' ? '#ef4444' : '#f59e0b',
            fillOpacity: 0.22,
            weight: 2.5,
            dashArray: '5, 5',
          }}
        >
          <Popup>
            <div className="p-2 space-y-1 font-mono text-xs">
              <div className={`flex items-center gap-1.5 font-bold ${habitation.riskZone === 'CRITICAL_RED_ZONE' ? 'text-alertRed' : 'text-warnAmber'}`}>
                <AlertTriangle className="w-4 h-4" />
                <span>{habitation.riskZone === 'CRITICAL_RED_ZONE' ? '900M CRITICAL HAZARD DANGER ZONE' : '500M SLOPE MONITORING BUFFER'}</span>
              </div>
              <p className="text-slate-300 text-[11px]">
                Sector {habitation.id}: {habitation.name} • {habitation.slopeDegrees}° critical slope • Evacuees: {habitation.population.toLocaleString()}.
              </p>
            </div>
          </Popup>
        </Circle>

        {/* Pulsing Hazard Ring around Site-B */}
        {siteB && (
          <Circle
            center={siteBPos}
            radius={selectedSiteId === 'SITE-B' ? 700 : 500}
            pathOptions={{
              color: '#ef4444',
              fillColor: '#ef4444',
              fillOpacity: selectedSiteId === 'SITE-B' ? 0.35 : 0.12,
              weight: selectedSiteId === 'SITE-B' ? 3 : 1.5,
              dashArray: '6, 6',
            }}
          >
            <Popup>
              <div className="p-2 font-mono text-xs text-alertRed font-bold flex items-center gap-1">
                <XCircle className="w-4 h-4" />
                <span>SITE-B PIPALKOTI: SANITATION CAPACITY CEILING (550 SOULS) & 66% ROAD CUTOFF</span>
              </div>
            </Popup>
          </Circle>
        )}

        {/* Glowing Emerald Ring around Site-A */}
        {selectedSiteId === 'SITE-A' && siteA && (
          <Circle
            center={siteAPos}
            radius={600}
            pathOptions={{
              color: '#10b981',
              fillColor: '#10b981',
              fillOpacity: 0.25,
              weight: 2,
            }}
          />
        )}

        {/* Layer 2: Dual-Route Transport Safety Model */}
        {/* ROUTE A: "NH-58 Valley Highway" (Low Elevation / Riverbed Corridor) */}
        <Polyline
          positions={routeA_ValleyHighway}
          pathOptions={{
            color: isRoadCutoff ? '#ef4444' : '#f59e0b',
            weight: isRoadCutoff ? 5 : 4,
            dashArray: isRoadCutoff ? '6, 6' : undefined,
            opacity: 0.95,
          }}
        >
          <Popup>
            <div className="p-2 font-mono text-xs space-y-1">
              <div className={`font-bold flex items-center gap-1.5 ${isRoadCutoff ? 'text-red-400' : 'text-amber-400'}`}>
                <Navigation className="w-3.5 h-3.5" />
                <span>ROUTE A: NH-58 Valley Highway {isRoadCutoff ? '(BLOCKED)' : '(Low Elevation)'}</span>
              </div>
              <p className="text-slate-300 text-[11px]">
                {isRoadCutoff
                  ? 'SEVERED: Debris flow blockage at KM 342.6. Traffic suspended.'
                  : `NH-58: Fast (${routeATiming}) | High Inundation Risk (88% Riverbed Susceptibility)`}
              </p>
            </div>
          </Popup>
        </Polyline>

        {/* ROUTE B: "Upper Ridge Bypass" (High Elevation Safe Route) */}
        <Polyline
          positions={routeB_RidgeBypass}
          pathOptions={{
            color: '#10b981',
            weight: 4.5,
            dashArray: '6, 6',
            opacity: 0.95,
          }}
        >
          <Popup>
            <div className="p-2 font-mono text-xs space-y-1">
              <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>ROUTE B: Upper Ridge Bypass (Safe Crest Corridor)</span>
              </div>
              <p className="text-slate-300 text-[11px]">
                Ridge Bypass: Stable ({routeBTiming}) | 100% Flood-Safe Corridor (All-Weather Recommended)
              </p>
            </div>
          </Popup>
        </Polyline>

        {/* Route to Site-C (0-72h Immediate Transit Corridor) */}
        <Polyline
          positions={routeToSiteC}
          pathOptions={{
            color: '#06b6d4',
            weight: 3.5,
            dashArray: '4, 4',
            opacity: 0.85,
          }}
        >
          <Popup>
            <div className="p-2 font-mono text-xs space-y-1">
              <div className="text-cyan-400 font-bold flex items-center gap-1">
                <Navigation className="w-3.5 h-3.5" />
                <span>HORIZON 1: IMMEDIATE TRANSIT TRIAGE (SITE-C)</span>
              </div>
              <p className="text-slate-300 text-[11px]">
                Proximity: {tacticalShelterImmediate.distanceKm} km • Direct road to {tacticalShelterImmediate.name}.
              </p>
            </div>
          </Popup>
        </Polyline>

        {/* Road Blocked Warning Marker when Cutoff Active */}
        {isRoadCutoff && (
          <Marker position={roadBlockLocation} icon={RoadBlockedMarker}>
            <Popup>
              <div className="p-2 font-mono text-xs text-red-400 font-bold space-y-1">
                <div>🚨 NH-58 SEVERED AT KM 342.6</div>
                <div className="text-slate-300 text-[11px]">
                  Debris avalanche has cut direct valley road. All {busesNeeded} buses diverted to Route B (Upper Ridge Bypass).
                </div>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Layer 3: Interactive Markers */}
        {/* HAB-01: Nandikot Red Zone Origin Pin */}
        <Marker
          position={[hab01.latitude, hab01.longitude]}
          icon={NandikotMarker}
          eventHandlers={{ click: () => handleHabitationMarkerClick('HAB-01') }}
        >
          <Popup>
            <div className="p-2.5 font-mono text-xs space-y-2 min-w-[220px]">
              <div className="flex items-center justify-between border-b border-slate-700 pb-1.5">
                <span className="font-bold text-alertRed flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> {hab01.name}
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-red-900/50 text-red-300 border border-red-700">
                  HAB-01
                </span>
              </div>
              <div className="space-y-1 text-slate-300 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-400">Population:</span>
                  <span className="font-bold text-slate-100">{hab01.population.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Composite Risk (CRI):</span>
                  <span className="font-bold text-alertRed">{hab01.compositeRiskIndex} (CRITICAL)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Slope Angle:</span>
                  <span className="font-bold text-alertRed">{hab01.slopeDegrees}°</span>
                </div>
              </div>
              <div className="pt-1 border-t border-slate-800 text-[10px] text-red-400 font-semibold">
                MANDATORY EVACUATION ZONE (CLICK TO SELECT)
              </div>
            </div>
          </Popup>
        </Marker>

        {/* HAB-02: Helang Lower Bastion Origin Pin */}
        <Marker
          position={[hab02.latitude, hab02.longitude]}
          icon={HelangMarker}
          eventHandlers={{ click: () => handleHabitationMarkerClick('HAB-02') }}
        >
          <Popup>
            <div className="p-2.5 font-mono text-xs space-y-2 min-w-[220px]">
              <div className="flex items-center justify-between border-b border-slate-700 pb-1.5">
                <span className="font-bold text-amber-400 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> {hab02.name}
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-900/50 text-amber-300 border border-amber-700">
                  HAB-02
                </span>
              </div>
              <div className="space-y-1 text-slate-300 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-400">Population:</span>
                  <span className="font-bold text-slate-100">{hab02.population.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Composite Risk (CRI):</span>
                  <span className="font-bold text-amber-400">{hab02.compositeRiskIndex} (MONITORING)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Slope Angle:</span>
                  <span className="font-bold text-amber-400">{hab02.slopeDegrees}°</span>
                </div>
              </div>
              <div className="pt-1 border-t border-slate-800 text-[10px] text-amber-400 font-semibold">
                AMBER MONITORING BUFFER (CLICK TO SELECT)
              </div>
            </div>
          </Popup>
        </Marker>

        {/* HAB-03: Joshimath Sub-Sector B Origin Pin */}
        <Marker
          position={[hab03.latitude, hab03.longitude]}
          icon={JoshimathMarker}
          eventHandlers={{ click: () => handleHabitationMarkerClick('HAB-03') }}
        >
          <Popup>
            <div className="p-2.5 font-mono text-xs space-y-2 min-w-[220px]">
              <div className="flex items-center justify-between border-b border-slate-700 pb-1.5">
                <span className="font-bold text-alertRed flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> {hab03.name}
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-red-900/50 text-red-300 border border-red-700">
                  HAB-03
                </span>
              </div>
              <div className="space-y-1 text-slate-300 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-400">Population:</span>
                  <span className="font-bold text-slate-100">{hab03.population.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Composite Risk (CRI):</span>
                  <span className="font-bold text-alertRed">{hab03.compositeRiskIndex} (CRITICAL RED)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Slope Angle:</span>
                  <span className="font-bold text-alertRed">{hab03.slopeDegrees}°</span>
                </div>
              </div>
              <div className="pt-1 border-t border-slate-800 text-[10px] text-red-400 font-semibold">
                SUBSIDENCE RED ZONE (CLICK TO SELECT)
              </div>
            </div>
          </Popup>
        </Marker>

        {/* SITE-C: Govt Model Inter-College Grounds */}
        <Marker
          position={siteCPos}
          icon={SiteCMarker}
          eventHandlers={{ click: () => handleSiteMarkerClick('SITE-C', siteCPos, 14.5) }}
        >
          <Popup>
            <div className="p-2.5 font-mono text-xs space-y-2 min-w-[220px]">
              <div className="flex items-center justify-between border-b border-slate-700 pb-1.5">
                <span className="font-bold text-amber-400 flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5" /> {tacticalShelterImmediate.name}
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-900/50 text-amber-300 border border-amber-700">
                  SITE-C
                </span>
              </div>
              <div className="space-y-1 text-slate-300 text-[11px]">
                <div>Role: <strong className="text-amber-300">0-72h Transit Shelter</strong></div>
                <div>Capacity: <strong className="text-emerald-400">{tacticalShelterImmediate.capacityAudit.effectiveCapacity.toLocaleString()} evacuees</strong></div>
                <div>Distance: <strong className="text-white">{tacticalShelterImmediate.distanceKm} km</strong></div>
              </div>
            </div>
          </Popup>
        </Marker>

        {/* SITE-A: Gopeshwar Enclave */}
        <Marker
          position={siteAPos}
          icon={SiteAMarker}
          eventHandlers={{ click: () => handleSiteMarkerClick('SITE-A', siteAPos, 14) }}
        >
          <Popup>
            <div className="p-2.5 font-mono text-xs space-y-2 min-w-[220px]">
              <div className="flex items-center justify-between border-b border-slate-700 pb-1.5">
                <span className="font-bold text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> {siteA.name}
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-900/50 text-emerald-300 border border-emerald-700">
                  SITE-A
                </span>
              </div>
              <div className="space-y-1 text-slate-300 text-[11px]">
                <div>Status: <strong className="text-emerald-400">RECOMMENDED PRIMARY (SAFE)</strong></div>
                <div>Sphere Intake: <strong className="text-emerald-400">{siteA.capacityAudit.effectiveCapacity.toLocaleString()} evacuees</strong></div>
                <div>Headroom: <strong className="text-emerald-300">+{siteA.capacityAudit.residualHeadroom} persons</strong></div>
              </div>
            </div>
          </Popup>
        </Marker>

        {/* SITE-B: Pipalkoti Shelf */}
        {siteB && (
          <Marker
            position={siteBPos}
            icon={SiteBMarker}
            eventHandlers={{ click: () => handleSiteMarkerClick('SITE-B', siteBPos, 14) }}
          >
            <Popup>
              <div className="p-2.5 font-mono text-xs space-y-2 min-w-[220px]">
                <div className="flex items-center justify-between border-b border-slate-700 pb-1.5">
                  <span className="font-bold text-slate-400 line-through decoration-red-500">
                    {siteB.name}
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-red-950 text-red-400 border border-red-800">
                    REJECTED
                  </span>
                </div>
                <div className="space-y-1 text-slate-300 text-[11px]">
                  <div>Disqualification: <strong className="text-red-400">30-Toilet Sanitation Ceiling</strong></div>
                  <div>Bridge Cutoff Risk: <strong className="text-red-400">66% (Single Access)</strong></div>
                </div>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>

      {/* Bottom Floating Route Safety Legend */}
      <div className="absolute bottom-3 left-3 z-[1000] pointer-events-auto flex flex-wrap items-center gap-2 font-mono text-xs">
        <div className="px-3 py-1.5 rounded-xl bg-cardDark/90 border border-borderDark backdrop-blur-md shadow-xl flex items-center gap-3 text-[11px]">
          <div className="flex items-center gap-1.5">
            <span className={`w-3 h-1 rounded ${isRoadCutoff ? 'bg-red-500 animate-pulse' : 'bg-amber-400'}`} />
            <span className={isRoadCutoff ? 'text-red-400 font-bold' : 'text-slate-300'}>
              NH-58: {isRoadCutoff ? 'BLOCKED' : `Fast (${routeATiming}) | High Inundation Risk`}
            </span>
          </div>

          <span className="text-slate-600">|</span>

          <div className="flex items-center gap-1.5">
            <span className="w-3 h-1 rounded bg-emerald-400" />
            <span className="text-emerald-300 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Ridge Bypass: Stable ({routeBTiming}) | 100% Flood-Safe Corridor
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
