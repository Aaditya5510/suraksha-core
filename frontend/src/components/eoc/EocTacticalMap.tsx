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
import type { EvaluationResultResponse, Habitation } from '../../types/suraksha';
import {
  NandikotMarker,
  HelangMarker,
  JoshimathMarker,
  SiteAMarker,
  SiteBMarker,
  SiteCMarker,
  RoadBlockedMarker,
} from '../MapMarkers';
import { BASELINE_HABITATIONS } from '../../data/baselineData';
import {
  Layers,
  MapPin,
  AlertTriangle,
  ShieldCheck,
  Building2,
  Navigation,
  XCircle,
  AlertOctagon,
  Zap,
  CheckCircle2,
} from 'lucide-react';

interface EocTacticalMapProps {
  evaluation: EvaluationResultResponse;
  selectedHabitationId: string;
  onSelectHabitation: (habId: string) => void;
  selectedHabitation: Habitation;
  selectedSiteId: string;
  onSelectSite: (siteId: string) => void;
  simulatedPopulation: number;
}

/**
 * Controller to smoothly pan and zoom the Leaflet canvas when target coordinates change.
 */
const MapFlyToController: React.FC<{
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

export const EocTacticalMap: React.FC<EocTacticalMapProps> = ({
  evaluation,
  selectedHabitationId: _selectedHabitationId,
  onSelectHabitation,
  selectedHabitation,
  selectedSiteId,
  onSelectSite,
  simulatedPopulation,
}) => {
  const { tacticalShelterImmediate, candidateSites } = evaluation;

  // Layer Toggles
  const [showHazardZones, setShowHazardZones] = useState<boolean>(true);
  const [showEvacVectors, setShowEvacVectors] = useState<boolean>(true);
  const [showSafeShelters, setShowSafeShelters] = useState<boolean>(true);

  // Emergency Road Blockade Simulation Toggle
  const [isRoadCutoff, setIsRoadCutoff] = useState<boolean>(false);

  // Camera Target Viewport Management
  const [cameraCenter, setCameraCenter] = useState<[number, number]>([
    selectedHabitation.latitude,
    selectedHabitation.longitude,
  ]);
  const [cameraZoom, setCameraZoom] = useState<number>(13.5);
  const [cameraTriggerKey, setCameraTriggerKey] = useState<string>(selectedHabitation.id);

  // When selected habitation changes from outside, immediately fly camera to it
  useEffect(() => {
    setCameraCenter([selectedHabitation.latitude, selectedHabitation.longitude]);
    setCameraZoom(13.5);
    setCameraTriggerKey(`${selectedHabitation.id}-${Date.now()}`);
  }, [selectedHabitation.id, selectedHabitation.latitude, selectedHabitation.longitude]);

  // Active Origin Coordinates
  const activeOriginPos: [number, number] = [
    selectedHabitation.latitude,
    selectedHabitation.longitude,
  ];

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

  const busesNeeded = Math.ceil(simulatedPopulation / 40);

  // Dynamic Route Calculations based on Active Habitation
  // 1. Route A: NH-58 Valley Highway (Low Elevation / Riverbed Corridor)
  // 2. Route B: Upper Ridge Bypass (High Elevation Safe Corridor)
  // 3. Route C: Immediate Transit Corridor (to Site-C)
  let routeA_ValleyHighway: [number, number][] = [];
  let routeB_RidgeBypass: [number, number][] = [];
  let routeToSiteC: [number, number][] = [];
  let roadBlockLocation: [number, number] = [30.4125, 79.3230];
  let routeATiming = '12 min';
  let routeBTiming = '24 min';

  if (selectedHabitation.id === 'HAB-01') {
    // Nandikot Sector
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
  } else if (selectedHabitation.id === 'HAB-02') {
    // Helang Sector
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
    // Joshimath Sector (HAB-03)
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
    onSelectHabitation(habId);
    const hab = BASELINE_HABITATIONS.find((h) => h.id === habId);
    if (hab) {
      setCameraCenter([hab.latitude, hab.longitude]);
      setCameraZoom(13.5);
      setCameraTriggerKey(`${habId}-${Date.now()}`);
    }
  };

  const handleSiteMarkerClick = (siteId: string, pos: [number, number], zoom = 14) => {
    onSelectSite(siteId);
    setCameraCenter(pos);
    setCameraZoom(zoom);
    setCameraTriggerKey(`${siteId}-${Date.now()}`);
  };

  return (
    <div className="relative w-full h-full bg-[#07090e] overflow-hidden select-none">
      {/* Top Center Emergency Road Cutoff Alert Badge */}
      {isRoadCutoff && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] w-[92%] max-w-[700px] pointer-events-auto animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="p-3.5 rounded-2xl bg-red-600/95 border-2 border-red-300 backdrop-blur-xl shadow-[0_0_35px_rgba(239,68,68,0.8)] text-white font-mono text-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <AlertOctagon className="w-5 h-5 text-white shrink-0 animate-pulse" />
              <div>
                <div className="font-extrabold tracking-wide text-xs">
                  CRITICAL: NH-58 Valley Highway Blocked by Debris Flow.
                </div>
                <div className="text-[11px] text-red-100 font-semibold mt-0.5">
                  All {busesNeeded} Buses auto-diverted to Upper Ridge Bypass.
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsRoadCutoff(false)}
              className="px-3 py-1.5 rounded-xl bg-black/50 hover:bg-black/70 text-[11px] font-bold text-white border border-white/40 shrink-0 transition-colors"
            >
              Restore Highway
            </button>
          </div>
        </div>
      )}

      {/* Top-Right Floating Tactical Layers & Cutoff Simulation Tray */}
      <div className="absolute top-3 right-3 z-[1000] pointer-events-auto flex flex-col items-end gap-2 font-mono">
        <div className="bg-[#0c111d]/90 backdrop-blur-xl border border-gray-800/90 rounded-2xl p-3 shadow-2xl text-xs space-y-2.5 min-w-[240px]">
          <div className="flex items-center justify-between gap-4 border-b border-gray-800 pb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-blue-400" /> Tactical Layers
            </span>
            <span className="text-[9px] text-emerald-400 font-bold px-1.5 py-0.2 rounded bg-emerald-950 border border-emerald-800">
              LIVE GIS
            </span>
          </div>

          {/* Layer Checkboxes */}
          <div className="flex flex-col gap-2 text-[11px]">
            {/* 1. Hazard Runout */}
            <label className="flex items-center justify-between gap-3 cursor-pointer hover:text-white text-slate-300">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                Hazard Danger Zone
              </span>
              <input
                type="checkbox"
                checked={showHazardZones}
                onChange={(e) => setShowHazardZones(e.target.checked)}
                className="w-3.5 h-3.5 rounded bg-slate-900 border-gray-700 text-red-500 focus:ring-0 cursor-pointer"
              />
            </label>

            {/* 2. Evacuation Vectors */}
            <label className="flex items-center justify-between gap-3 cursor-pointer hover:text-white text-slate-300">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Dual-Route Vectors
              </span>
              <input
                type="checkbox"
                checked={showEvacVectors}
                onChange={(e) => setShowEvacVectors(e.target.checked)}
                className="w-3.5 h-3.5 rounded bg-slate-900 border-gray-700 text-emerald-500 focus:ring-0 cursor-pointer"
              />
            </label>

            {/* 3. Candidate Safe Shelters */}
            <label className="flex items-center justify-between gap-3 cursor-pointer hover:text-white text-slate-300">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                Safe Shelters
              </span>
              <input
                type="checkbox"
                checked={showSafeShelters}
                onChange={(e) => setShowSafeShelters(e.target.checked)}
                className="w-3.5 h-3.5 rounded bg-slate-900 border-gray-700 text-amber-500 focus:ring-0 cursor-pointer"
              />
            </label>
          </div>

          {/* Emergency Simulation Button */}
          <div className="pt-2 border-t border-gray-800">
            <button
              type="button"
              onClick={() => setIsRoadCutoff(!isRoadCutoff)}
              className={`w-full py-2 px-3 rounded-xl font-bold text-[10px] tracking-wide flex items-center justify-center gap-1.5 transition-all shadow-md ${
                isRoadCutoff
                  ? 'bg-red-600 hover:bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)] animate-pulse'
                  : 'bg-[#060911] hover:bg-slate-900 text-amber-400 border border-amber-500/40 hover:border-amber-400'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>{isRoadCutoff ? '⚡ Restore NH-58 Highway' : '⚡ Simulate NH-58 Road Cutoff'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Leaflet Map Engine Container */}
      <MapContainer
        center={cameraCenter}
        zoom={cameraZoom}
        scrollWheelZoom={true}
        className="w-full h-full z-0 tactical-dark-tiles"
      >
        <MapFlyToController
          targetPos={cameraCenter}
          zoom={cameraZoom}
          triggerKey={cameraTriggerKey}
        />

        {/* Clean OpenStreetMap TileLayer with Dark Mode CSS Filter */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />

        {/* Layer 1: Red Hazard Danger Zone (Dynamic center on active village) */}
        {showHazardZones && (
          <>
            {/* Active Habitation Hazard Zone Circle */}
            <Circle
              center={activeOriginPos}
              radius={selectedHabitation.riskZone === 'CRITICAL_RED_ZONE' ? 900 : 500}
              pathOptions={{
                color: selectedHabitation.riskZone === 'CRITICAL_RED_ZONE' ? '#ef4444' : '#f59e0b',
                fillColor: selectedHabitation.riskZone === 'CRITICAL_RED_ZONE' ? '#ef4444' : '#f59e0b',
                fillOpacity: 0.22,
                weight: 2.5,
                dashArray: '5, 5',
              }}
            >
              <Popup>
                <div className="p-2 font-mono text-xs space-y-1">
                  <div
                    className={`font-bold flex items-center gap-1.5 ${
                      selectedHabitation.riskZone === 'CRITICAL_RED_ZONE'
                        ? 'text-red-500'
                        : 'text-amber-400'
                    }`}
                  >
                    <AlertTriangle className="w-4 h-4" />
                    <span>
                      {selectedHabitation.riskZone === 'CRITICAL_RED_ZONE'
                        ? '900M CRITICAL HAZARD DANGER ZONE'
                        : '500M SLOPE MONITORING BUFFER'}
                    </span>
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    Sector {selectedHabitation.id}: {selectedHabitation.name} • {selectedHabitation.slopeDegrees}° critical slope • Evacuee Demand: {simulatedPopulation.toLocaleString()} Evacuees.
                  </p>
                </div>
              </Popup>
            </Circle>

            {/* Site-B Hazardous Terrain Ring / Bottleneck Highlight */}
            {siteB && (
              <Circle
                center={siteBPos}
                radius={selectedSiteId === 'SITE-B' ? 700 : 500}
                pathOptions={{
                  color: '#ef4444',
                  fillColor: '#ef4444',
                  fillOpacity: selectedSiteId === 'SITE-B' ? 0.3 : 0.12,
                  weight: selectedSiteId === 'SITE-B' ? 3 : 1.5,
                  dashArray: '4, 4',
                }}
              >
                <Popup>
                  <div className="p-1.5 font-mono text-xs text-red-400 font-bold">
                    SITE-B PIPALKOTI: 66% ROAD CUTOFF PROBABILITY & 30-TOILET SANITATION BOTTLENECK
                  </div>
                </Popup>
              </Circle>
            )}

            {/* Site-A Safe Zone Highlight Ring */}
            {selectedSiteId === 'SITE-A' && siteA && (
              <Circle
                center={siteAPos}
                radius={650}
                pathOptions={{
                  color: '#10b981',
                  fillColor: '#10b981',
                  fillOpacity: 0.25,
                  weight: 2,
                }}
              />
            )}
          </>
        )}

        {/* Layer 2: Dual-Route Transport Safety Model */}
        {showEvacVectors && (
          <>
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

            {/* 0-72h Immediate Transit Corridor (to Site-C) */}
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
          </>
        )}

        {/* Layer 3: Interactive Tactical Markers */}

        {/* HAB-01: Nandikot Red Zone Origin Pin */}
        <Marker
          position={[hab01.latitude, hab01.longitude]}
          icon={NandikotMarker}
          eventHandlers={{ click: () => handleHabitationMarkerClick('HAB-01') }}
        >
          <Popup>
            <div className="p-2.5 font-mono text-xs space-y-1.5 min-w-[210px]">
              <div className="font-bold text-red-500 flex items-center justify-between border-b border-slate-700 pb-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> {hab01.name}
                </span>
                <span className="text-[9px] px-1 py-0.5 rounded bg-red-950 border border-red-800 text-red-300">
                  HAB-01
                </span>
              </div>
              <div className="text-slate-300 space-y-0.5 text-[11px]">
                <div>Population: <strong className="text-white">{hab01.population.toLocaleString()} Residents</strong></div>
                <div>Risk Index: <strong className="text-red-400">{hab01.compositeRiskIndex} (Critical Red)</strong></div>
                <div>Slope: <strong className="text-red-400">{hab01.slopeDegrees}°</strong></div>
              </div>
              <div className="pt-1 border-t border-slate-800 text-[9px] text-red-400 font-bold">
                MANDATORY EVACUATION ZONE (CLICK TO SELECT)
              </div>
            </div>
          </Popup>
        </Marker>

        {/* HAB-02: Helang Bastion Origin Pin */}
        <Marker
          position={[hab02.latitude, hab02.longitude]}
          icon={HelangMarker}
          eventHandlers={{ click: () => handleHabitationMarkerClick('HAB-02') }}
        >
          <Popup>
            <div className="p-2.5 font-mono text-xs space-y-1.5 min-w-[210px]">
              <div className="font-bold text-amber-400 flex items-center justify-between border-b border-slate-700 pb-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> {hab02.name}
                </span>
                <span className="text-[9px] px-1 py-0.5 rounded bg-amber-950 border border-amber-800 text-amber-300">
                  HAB-02
                </span>
              </div>
              <div className="text-slate-300 space-y-0.5 text-[11px]">
                <div>Population: <strong className="text-white">{hab02.population.toLocaleString()} Residents</strong></div>
                <div>Risk Index: <strong className="text-amber-400">{hab02.compositeRiskIndex} (Amber Zone)</strong></div>
                <div>Slope: <strong className="text-amber-400">{hab02.slopeDegrees}°</strong></div>
              </div>
              <div className="pt-1 border-t border-slate-800 text-[9px] text-amber-400 font-bold">
                SLOPE MONITORING BUFFER (CLICK TO SELECT)
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
            <div className="p-2.5 font-mono text-xs space-y-1.5 min-w-[210px]">
              <div className="font-bold text-red-500 flex items-center justify-between border-b border-slate-700 pb-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> {hab03.name}
                </span>
                <span className="text-[9px] px-1 py-0.5 rounded bg-red-950 border border-red-800 text-red-300">
                  HAB-03
                </span>
              </div>
              <div className="text-slate-300 space-y-0.5 text-[11px]">
                <div>Population: <strong className="text-white">{hab03.population.toLocaleString()} Residents</strong></div>
                <div>Risk Index: <strong className="text-red-400">{hab03.compositeRiskIndex} (Red Zone)</strong></div>
                <div>Slope: <strong className="text-red-400">{hab03.slopeDegrees}°</strong></div>
              </div>
              <div className="pt-1 border-t border-slate-800 text-[9px] text-red-400 font-bold">
                SUBSIDENCE RED ZONE (CLICK TO SELECT)
              </div>
            </div>
          </Popup>
        </Marker>

        {/* Candidate Safe Shelters (Site-A, Site-B, Site-C) */}
        {showSafeShelters && (
          <>
            {/* SITE-C: Govt Model Inter-College Grounds (Transit Shelter) */}
            <Marker
              position={siteCPos}
              icon={SiteCMarker}
              eventHandlers={{ click: () => handleSiteMarkerClick('SITE-C', siteCPos, 14.5) }}
            >
              <Popup>
                <div className="p-2.5 font-mono text-xs space-y-1.5 min-w-[210px]">
                  <div className="font-bold text-amber-400 flex items-center justify-between border-b border-slate-700 pb-1">
                    <span className="flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5" /> {tacticalShelterImmediate.name}
                    </span>
                    <span className="text-[9px] px-1 py-0.5 rounded bg-amber-950 border border-amber-800 text-amber-300">
                      SITE-C
                    </span>
                  </div>
                  <div className="text-slate-300 space-y-0.5 text-[11px]">
                    <div>Role: <strong className="text-amber-300">0-72h Immediate Transit</strong></div>
                    <div>Capacity: <strong className="text-emerald-400">{tacticalShelterImmediate.capacityAudit.effectiveCapacity.toLocaleString()} People</strong></div>
                    <div>Distance: <strong className="text-white">{tacticalShelterImmediate.distanceKm} km</strong></div>
                  </div>
                  <div className="pt-1 border-t border-slate-800 text-[9px] text-amber-400 font-bold">
                    CLICK TO INSPECT SITE DOSSIER
                  </div>
                </div>
              </Popup>
            </Marker>

            {/* SITE-A: Gopeshwar Enclave (Recommended Primary) */}
            <Marker
              position={siteAPos}
              icon={SiteAMarker}
              eventHandlers={{ click: () => handleSiteMarkerClick('SITE-A', siteAPos, 14) }}
            >
              <Popup>
                <div className="p-2.5 font-mono text-xs space-y-1.5 min-w-[210px]">
                  <div className="font-bold text-emerald-400 flex items-center justify-between border-b border-slate-700 pb-1">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> {siteA.name}
                    </span>
                    <span className="text-[9px] px-1 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-300">
                      SITE-A
                    </span>
                  </div>
                  <div className="text-slate-300 space-y-0.5 text-[11px]">
                    <div>Status: <strong className="text-emerald-400">RECOMMENDED PRIMARY</strong></div>
                    <div>Sphere Intake: <strong className="text-emerald-400">{siteA.capacityAudit.effectiveCapacity.toLocaleString()} People</strong></div>
                    <div>Headroom: <strong className="text-emerald-300">+{siteA.capacityAudit.residualHeadroom} Surplus</strong></div>
                    <div>Distance: <strong className="text-white">{siteA.distanceKm} km</strong></div>
                  </div>
                  <div className="pt-1 border-t border-slate-800 text-[9px] text-emerald-400 font-bold">
                    CLICK TO INSPECT SITE DOSSIER
                  </div>
                </div>
              </Popup>
            </Marker>

            {/* SITE-B: Pipalkoti Shelf (Operationally Rejected) */}
            {siteB && (
              <Marker
                position={siteBPos}
                icon={SiteBMarker}
                eventHandlers={{ click: () => handleSiteMarkerClick('SITE-B', siteBPos, 14) }}
              >
                <Popup>
                  <div className="p-2.5 font-mono text-xs space-y-1.5 min-w-[210px]">
                    <div className="font-bold text-red-400 line-through flex items-center justify-between border-b border-slate-700 pb-1">
                      <span className="flex items-center gap-1">
                        <XCircle className="w-3.5 h-3.5 text-red-500" /> {siteB.name}
                      </span>
                      <span className="text-[9px] px-1 py-0.5 rounded bg-red-950 border border-red-800 text-red-300">
                        REJECTED
                      </span>
                    </div>
                    <div className="text-slate-300 space-y-0.5 text-[11px]">
                      <div>Disqualification: <strong className="text-red-400">30-Toilet Sanitation Ceiling (550 Max)</strong></div>
                      <div>Bridge Cutoff Risk: <strong className="text-red-400">66% Single Bridge Risk</strong></div>
                      <div>Distance: <strong className="text-white">{siteB.distanceKm} km</strong></div>
                    </div>
                    <div className="pt-1 border-t border-slate-800 text-[9px] text-red-400 font-bold">
                      CLICK TO INSPECT BOTTLENECK ANALYSIS
                    </div>
                  </div>
                </Popup>
              </Marker>
            )}
          </>
        )}
      </MapContainer>

      {/* Bottom Floating Route Safety Legend */}
      <div className="absolute bottom-3 left-3 z-[1000] pointer-events-auto flex flex-wrap items-center gap-2 font-mono text-xs">
        <div className="px-3 py-1.5 rounded-xl bg-[#0c111d]/90 border border-gray-800/90 backdrop-blur-md shadow-xl flex items-center gap-3 text-[11px]">
          {/* Route A Tag */}
          <div className="flex items-center gap-1.5">
            <span className={`w-3 h-1 rounded ${isRoadCutoff ? 'bg-red-500 animate-pulse' : 'bg-amber-400'}`} />
            <span className={isRoadCutoff ? 'text-red-400 font-bold' : 'text-slate-300'}>
              NH-58 Valley Highway: {isRoadCutoff ? 'BLOCKED' : `Fast (${routeATiming}) | High Flood Risk`}
            </span>
          </div>

          <span className="text-slate-600">|</span>

          {/* Route B Tag */}
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-1 rounded bg-emerald-400" />
            <span className="text-emerald-300 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Upper Ridge Bypass: Stable ({routeBTiming}) | 100% Flood-Safe
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
