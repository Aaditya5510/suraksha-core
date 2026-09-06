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
 * Controller to smoothly pan and zoom the map when target location changes.
 */
const MapFlyToController: React.FC<{ targetPos: [number, number]; zoom?: number }> = ({
  targetPos,
  zoom = 13.5,
}) => {
  const map = useMap();

  useEffect(() => {
    map.invalidateSize();
    map.flyTo(targetPos, zoom, { duration: 1.2 });
  }, [map, targetPos, zoom]);

  return null;
};

export const EocTacticalMap: React.FC<EocTacticalMapProps> = ({
  evaluation,
  selectedHabitationId,
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
  ]; // [30.4120, 79.3210]

  const siteA = candidateSites.find((s) => s.siteId === 'SITE-A') || candidateSites[0];
  const siteAPos: [number, number] = siteA ? [siteA.latitude, siteA.longitude] : [30.4080, 79.3190];

  const siteB = candidateSites.find((s) => s.siteId === 'SITE-B');
  const siteBPos: [number, number] = siteB ? [siteB.latitude, siteB.longitude] : [30.4290, 79.4270];

  // Mountain Valley Waypoints (Haversine mountain tortuosity geometry)
  const routeToSiteC: [number, number][] = [
    activeOriginPos,
    [30.4135, 79.3225],
    siteCPos,
  ];

  // NH-58 Primary Arterial Route to Site-A
  const routeToSiteA_Nominal: [number, number][] = [
    activeOriginPos,
    [30.4110, 79.3215],
    siteAPos,
  ];

  // NH-58 Arterial Route (NH-58 Mountain Highway Segment)
  const nh58Segment: [number, number][] = [
    [30.4150, 79.3240],
    [30.4210, 79.3520],
    [30.4290, 79.4270],
    [30.4450, 79.4600],
    [30.5280, 79.5120],
    [30.5560, 79.5620],
  ];

  // Emergency Secondary Bypass / Detour Corridor (when NH-58 is severed)
  const secondaryDetourRoute: [number, number][] = [
    activeOriginPos,
    [30.4180, 79.3150],
    [30.4140, 79.3180],
    siteCPos,
    siteAPos,
  ];

  return (
    <div className="relative w-full h-full bg-[#07090e] overflow-hidden select-none">
      {/* Top Center Emergency Notification Banner when Road Cutoff is Active */}
      {isRoadCutoff && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] w-[90%] max-w-[680px] pointer-events-auto animate-bounce-slow">
          <div className="p-3 rounded-2xl bg-red-600/90 border-2 border-red-400 backdrop-blur-xl shadow-[0_0_30px_rgba(239,68,68,0.7)] text-white font-mono text-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <AlertOctagon className="w-5 h-5 text-white shrink-0 animate-pulse" />
              <div>
                <div className="font-extrabold tracking-wide text-xs">
                  CRITICAL: NH-58 HIGHWAY SEVERED BY DEBRIS AVALANCHE (KM 342.6)
                </div>
                <div className="text-[10px] text-red-100">
                  Direct arterial transit blocked. Traffic dynamically re-routed via Helang Secondary Ridge to Transit Site-C.
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsRoadCutoff(false)}
              className="px-2.5 py-1 rounded-lg bg-black/40 hover:bg-black/60 text-[10px] font-bold text-white border border-white/30 shrink-0"
            >
              RESTORE
            </button>
          </div>
        </div>
      )}

      {/* Top Floating Map Tool Tray (Controls: Layer Toggles & Emergency Simulation) */}
      <div className="absolute top-4 right-4 md:right-[380px] z-[1000] pointer-events-auto flex flex-col items-end gap-2 font-mono">
        <div className="bg-[#0c111d]/90 backdrop-blur-xl border border-gray-800/90 rounded-2xl p-3 shadow-2xl text-xs space-y-2.5">
          <div className="flex items-center justify-between gap-4 border-b border-gray-800 pb-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-blue-400" /> Tactical Layers
            </span>
            <span className="text-[9px] text-slate-500 font-mono">GIS v1.33</span>
          </div>

          {/* Layer Checkboxes */}
          <div className="flex flex-col gap-1.5 text-[11px]">
            {/* 1. Hazard Runout */}
            <label className="flex items-center justify-between gap-3 cursor-pointer hover:text-white text-slate-300">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                900m Hazard Runout Zones
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
                Evacuation Vectors
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
                Candidate Safe Shelters
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
          <div className="pt-1.5 border-t border-gray-800">
            <button
              type="button"
              onClick={() => setIsRoadCutoff(!isRoadCutoff)}
              className={`w-full py-1.5 px-3 rounded-xl font-bold text-[10px] tracking-wide flex items-center justify-center gap-1.5 transition-all ${
                isRoadCutoff
                  ? 'bg-red-600 hover:bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)] animate-pulse'
                  : 'bg-[#060911] hover:bg-slate-900 text-amber-400 border border-amber-500/40 hover:border-amber-400'
              }`}
            >
              <Zap className="w-3 h-3" />
              <span>{isRoadCutoff ? '⚡ NH-58 BLOCKED (CLICK TO CLEAR)' : '⚡ SIMULATE NH-58 ROAD CUTOFF'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Leaflet Map Engine Container */}
      <MapContainer
        center={activeOriginPos}
        zoom={13}
        scrollWheelZoom={true}
        className="w-full h-full z-0 tactical-dark-tiles"
      >
        <MapFlyToController targetPos={activeOriginPos} zoom={13.5} />

        {/* Clean OpenStreetMap TileLayer with Dark Mode CSS Filter */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />

        {/* Layer 1: 900m / 500m Hazard Runout Zones */}
        {showHazardZones && (
          <>
            {/* Active Habitation Hazard Zone */}
            <Circle
              center={activeOriginPos}
              radius={selectedHabitation.riskZone === 'CRITICAL_RED_ZONE' ? 900 : 500}
              pathOptions={{
                color: selectedHabitation.riskZone === 'CRITICAL_RED_ZONE' ? '#ef4444' : '#f59e0b',
                fillColor: selectedHabitation.riskZone === 'CRITICAL_RED_ZONE' ? '#ef4444' : '#f59e0b',
                fillOpacity: 0.22,
                weight: 2,
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
                        ? '900M NON-MITIGABLE HAZARD RUNOUT ZONE'
                        : '500M SLOPE MONITORING ZONE'}
                    </span>
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    Sector {selectedHabitationId}: {selectedHabitation.name} • {selectedHabitation.slopeDegrees}° critical slope • Evacuee Demand: {simulatedPopulation.toLocaleString()} souls.
                  </p>
                </div>
              </Popup>
            </Circle>

            {/* Site-B Hazardous Terrain Zone / Selected Ring */}
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
                    SITE-B PIPALKOTI: 66% ROAD CUTOFF PROBABILITY & 30-TOILET BINDING SANITATION CEILING (550 MAX)
                  </div>
                </Popup>
              </Circle>
            )}

            {/* Site-A Selected Highlight Ring */}
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

        {/* Layer 2: Mountain Evacuation Vectors & NH-58 Arterial Line */}
        {showEvacVectors && (
          <>
            {/* NH-58 Main Mountain Arterial Highway Segment */}
            <Polyline
              positions={nh58Segment}
              pathOptions={{
                color: isRoadCutoff ? '#ef4444' : '#3b82f6',
                weight: isRoadCutoff ? 5 : 3.5,
                dashArray: isRoadCutoff ? '8, 8' : undefined,
                opacity: isRoadCutoff ? 0.95 : 0.6,
              }}
            >
              <Popup>
                <div className="p-2 font-mono text-xs space-y-1">
                  <div className={`font-bold ${isRoadCutoff ? 'text-red-400' : 'text-blue-400'}`}>
                    NATIONAL HIGHWAY NH-58 ARTERIAL AXIS {isRoadCutoff && '(SEVERED)'}
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    {isRoadCutoff
                      ? 'BLOCKED: Debris flow blockage at KM 342.6. Ingress/egress suspended.'
                      : 'Primary arterial mountain corridor connecting Joshimath, Helang, Pipalkoti & Chamoli.'}
                  </p>
                </div>
              </Popup>
            </Polyline>

            {/* Route to Site-C (0-72h Immediate Transit Corridor) */}
            <Polyline
              positions={routeToSiteC}
              pathOptions={{
                color: '#f59e0b',
                weight: 4,
                dashArray: '6, 6',
                opacity: 0.95,
              }}
            >
              <Popup>
                <div className="p-2 font-mono text-xs space-y-1">
                  <div className="text-amber-400 font-bold flex items-center gap-1">
                    <Navigation className="w-3.5 h-3.5" />
                    <span>HORIZON 1: IMMEDIATE TRANSIT TRIAGE CORRIDOR (SITE-C)</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    Proximity: {tacticalShelterImmediate.distanceKm} km • Direct mountain road to {tacticalShelterImmediate.name}.
                  </p>
                </div>
              </Popup>
            </Polyline>

            {/* Route to Site-A (Primary Resettlement Corridor) */}
            {!isRoadCutoff ? (
              <Polyline
                positions={routeToSiteA_Nominal}
                pathOptions={{
                  color: '#10b981',
                  weight: 4,
                  opacity: 0.95,
                }}
              >
                <Popup>
                  <div className="p-2 font-mono text-xs space-y-1">
                    <div className="text-emerald-400 font-bold flex items-center gap-1">
                      <Navigation className="w-3.5 h-3.5" />
                      <span>HORIZON 2: PRIMARY RESETTLEMENT CORRIDOR (SITE-A)</span>
                    </div>
                    <p className="text-slate-300 text-[11px]">
                      Proximity: {siteA.distanceKm} km • Dual-lane all-weather corridor to {siteA.name}.
                    </p>
                  </div>
                </Popup>
              </Polyline>
            ) : (
              /* Emergency Detour Route when NH-58 Cutoff is active */
              <Polyline
                positions={secondaryDetourRoute}
                pathOptions={{
                  color: '#06b6d4',
                  weight: 4.5,
                  dashArray: '4, 4',
                  opacity: 0.95,
                }}
              >
                <Popup>
                  <div className="p-2 font-mono text-xs space-y-1">
                    <div className="text-cyan-400 font-bold flex items-center gap-1">
                      <Navigation className="w-3.5 h-3.5" />
                      <span>EMERGENCY DETOUR: SECONDARY RIDGE BYPASS</span>
                    </div>
                    <p className="text-slate-300 text-[11px]">
                      Bypassing NH-58 debris choke-point $\to$ routing fleet to Site-C transit node before final staging.
                    </p>
                  </div>
                </Popup>
              </Polyline>
            )}
          </>
        )}

        {/* Layer 3: Interactive Tactical Markers */}

        {/* HAB-01: Nandikot Red Zone Origin Pin */}
        <Marker
          position={[hab01.latitude, hab01.longitude]}
          icon={NandikotMarker}
          eventHandlers={{ click: () => onSelectHabitation('HAB-01') }}
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
                <div>Population: <strong className="text-white">{hab01.population.toLocaleString()} souls</strong></div>
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
          eventHandlers={{ click: () => onSelectHabitation('HAB-02') }}
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
                <div>Population: <strong className="text-white">{hab02.population.toLocaleString()} souls</strong></div>
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
          eventHandlers={{ click: () => onSelectHabitation('HAB-03') }}
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
                <div>Population: <strong className="text-white">{hab03.population.toLocaleString()} souls</strong></div>
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
              eventHandlers={{ click: () => onSelectSite('SITE-C') }}
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
                    <div>Capacity: <strong className="text-emerald-400">{tacticalShelterImmediate.capacityAudit.effectiveCapacity.toLocaleString()} souls</strong></div>
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
              eventHandlers={{ click: () => onSelectSite('SITE-A') }}
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
                    <div>Sphere Intake: <strong className="text-emerald-400">{siteA.capacityAudit.effectiveCapacity.toLocaleString()} souls</strong></div>
                    <div>Headroom: <strong className="text-emerald-300">+{siteA.capacityAudit.residualHeadroom} souls</strong></div>
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
                eventHandlers={{ click: () => onSelectSite('SITE-B') }}
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
    </div>
  );
};
