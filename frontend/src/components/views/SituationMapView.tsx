import React from 'react';
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
  SiteAMarker,
  SiteBMarker,
  SiteCMarker,
} from '../MapMarkers';
import { BASELINE_HABITATIONS } from '../../data/baselineData';
import {
  MapPin,
  ChevronDown,
  AlertTriangle,
  Radio,
  Building2,
  ShieldCheck,
  Navigation,
  Compass,
} from 'lucide-react';

interface SituationMapViewProps {
  evaluation: EvaluationResultResponse;
  selectedHabitationId: string;
  onSelectHabitation: (habId: string) => void;
  selectedHabitation: Habitation;
  selectedSiteId: string;
  onSelectSite: (siteId: string) => void;
}

/**
 * Auto-pans Leaflet map when target coordinates change
 */
const MapFlyToController: React.FC<{ targetPos: [number, number]; zoom?: number }> = ({
  targetPos,
  zoom = 13.5,
}) => {
  const map = useMap();

  React.useEffect(() => {
    map.invalidateSize();
    map.flyTo(targetPos, zoom, { duration: 1.2 });
  }, [map, targetPos, zoom]);

  return null;
};

export const SituationMapView: React.FC<SituationMapViewProps> = ({
  evaluation,
  selectedHabitationId,
  onSelectHabitation,
  selectedHabitation,
  selectedSiteId: _selectedSiteId,
  onSelectSite,
}) => {
  const { tacticalShelterImmediate, candidateSites } = evaluation;

  const activeOriginPos: [number, number] = [selectedHabitation.latitude, selectedHabitation.longitude];
  const isRedZone = selectedHabitation.riskZone === 'CRITICAL_RED_ZONE';

  const hab01 = BASELINE_HABITATIONS.find((h) => h.id === 'HAB-01') || BASELINE_HABITATIONS[0];
  const hab02 = BASELINE_HABITATIONS.find((h) => h.id === 'HAB-02') || BASELINE_HABITATIONS[1];

  const siteCPos: [number, number] = [tacticalShelterImmediate.latitude, tacticalShelterImmediate.longitude];
  const siteA = candidateSites.find((s) => s.siteId === 'SITE-A') || candidateSites[0];
  const siteAPos: [number, number] = [siteA.latitude, siteA.longitude];
  const siteB = candidateSites.find((s) => s.siteId === 'SITE-B');
  const siteBPos: [number, number] = siteB ? [siteB.latitude, siteB.longitude] : [30.429, 79.427];

  // Mountain Valley Waypoints (Haversine mountain tortuosity corridors)
  const routeToSiteC: [number, number][] = [
    activeOriginPos,
    [30.4135, 79.3225],
    siteCPos,
  ];

  const routeToSiteA: [number, number][] = [
    activeOriginPos,
    [30.4110, 79.3215],
    siteAPos,
  ];

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] bg-[#07090e] overflow-hidden select-none">
      {/* 1. Only ONE Lightweight Floating Card (Top-Left) */}
      <div className="absolute top-4 left-4 z-[1000] w-[340px] max-w-[calc(100vw-2rem)] pointer-events-auto">
        <div className="bg-[#0b0f19]/95 backdrop-blur-xl border border-gray-800/90 rounded-2xl p-4 shadow-2xl space-y-3 font-mono text-xs">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-800/80 pb-2">
            <div className="flex items-center gap-2 text-white font-bold tracking-wide">
              <Radio className="w-4 h-4 text-red-500 animate-pulse" />
              <span>CRISIS SECTOR TRIAGE</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
              STEP 1 & 2
            </span>
          </div>

          {/* Habitation Selector Dropdown */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-semibold text-slate-400">
              Active Hazard Habitation:
            </label>
            <div className="relative">
              <select
                value={selectedHabitationId}
                onChange={(e) => onSelectHabitation(e.target.value)}
                className="w-full bg-[#05070c] border border-gray-700/80 hover:border-gray-600 text-slate-100 py-2 pl-3 pr-8 rounded-xl appearance-none text-xs font-mono focus:outline-none focus:border-blue-500 cursor-pointer shadow-inner transition-colors"
              >
                {BASELINE_HABITATIONS.map((hab) => (
                  <option key={hab.id} value={hab.id} className="bg-slate-900 text-slate-100">
                    {hab.id}: {hab.name} ({hab.riskZone === 'CRITICAL_RED_ZONE' ? 'Red Zone' : 'Amber Zone'}, {hab.population.toLocaleString()} souls)
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Telemetry Readouts: Slope, CRI, Status Pill */}
          <div className="grid grid-cols-2 gap-2 pt-0.5">
            {/* CRI Readout */}
            <div className="p-2.5 rounded-xl bg-[#05070c] border border-gray-800/80 space-y-0.5">
              <span className="text-[10px] text-slate-400 block uppercase">Composite Risk</span>
              <div className="flex items-baseline gap-1">
                <span className={`text-xl font-extrabold ${isRedZone ? 'text-red-500' : 'text-amber-400'}`}>
                  {selectedHabitation.compositeRiskIndex}
                </span>
                <span className="text-[10px] text-slate-500">/ 100</span>
              </div>
            </div>

            {/* Slope Readout */}
            <div className="p-2.5 rounded-xl bg-[#05070c] border border-gray-800/80 space-y-0.5">
              <span className="text-[10px] text-slate-400 block uppercase flex items-center gap-1">
                <Compass className="w-3 h-3 text-blue-400" /> Slope Angle
              </span>
              <div className="flex items-baseline gap-1">
                <span className={`text-xl font-extrabold ${selectedHabitation.slopeDegrees >= 35 ? 'text-red-400' : 'text-amber-400'}`}>
                  {selectedHabitation.slopeDegrees}°
                </span>
                <span className="text-[10px] text-slate-500">Slope</span>
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <div
            className={`p-2 rounded-xl border flex items-center justify-between text-[11px] font-bold ${
              isRedZone
                ? 'bg-red-500/15 border-red-500/40 text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.2)]'
                : 'bg-amber-500/15 border-amber-500/40 text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.2)]'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isRedZone ? 'bg-red-500 animate-ping' : 'bg-amber-400'}`} />
              <span>{isRedZone ? 'CRITICAL RED ZONE' : 'AMBER MONITORING ZONE'}</span>
            </div>
            <span className="text-[10px] font-normal text-slate-300">
              {isRedZone ? 'Evacuation Mandatory' : 'Corridor Standby'}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Top Right Corridors Legend */}
      <div className="absolute top-4 right-4 z-[1000] pointer-events-auto hidden sm:flex items-center gap-3 px-3.5 py-2 rounded-xl bg-[#0b0f19]/90 border border-gray-800/90 backdrop-blur-md shadow-xl text-[11px] font-mono">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-slate-300">Crisis Origin</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded bg-amber-500" />
          <span className="text-slate-300">0-72h Transit (Site-C)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded bg-emerald-500" />
          <span className="text-slate-300">Resettlement Enclave (Site-A)</span>
        </div>
      </div>

      {/* 3. Full-Viewport Dark Leaflet Map (Zero Watermark) */}
      <MapContainer
        center={activeOriginPos}
        zoom={13}
        scrollWheelZoom={true}
        className="w-full h-full z-0 tactical-dark-tiles"
      >
        <MapFlyToController targetPos={activeOriginPos} zoom={13.5} />

        {/* Clean OpenStreetMap Tiles with Dark CSS Filter */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />

        {/* Layer 1: Glowing 900m / 500m Hazard Runout Zone */}
        <Circle
          center={activeOriginPos}
          radius={isRedZone ? 900 : 500}
          pathOptions={{
            color: isRedZone ? '#ef4444' : '#f59e0b',
            fillColor: isRedZone ? '#ef4444' : '#f59e0b',
            fillOpacity: 0.22,
            weight: 2,
            dashArray: '5, 5',
          }}
        >
          <Popup>
            <div className="p-2 font-mono text-xs space-y-1">
              <div className={`font-bold flex items-center gap-1.5 ${isRedZone ? 'text-red-500' : 'text-amber-400'}`}>
                <AlertTriangle className="w-4 h-4" />
                <span>{isRedZone ? '900M NON-MITIGABLE HAZARD RUNOUT ZONE' : '500M SLOPE MONITORING ZONE'}</span>
              </div>
              <p className="text-slate-300 text-[11px]">
                {isRedZone
                  ? '42° critical slope debris avalanche risk. In situ civil engineering impossible.'
                  : 'Active geological slope deformation monitoring zone.'}
              </p>
            </div>
          </Popup>
        </Circle>

        {/* Layer 2: Amber Transit Corridor Line (to Site-C) */}
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
                Proximity: {tacticalShelterImmediate.distanceKm} km • Dual-lane mountain corridor to {tacticalShelterImmediate.name}.
              </p>
            </div>
          </Popup>
        </Polyline>

        {/* Layer 3: Emerald Permanent Resettlement Corridor Line (to Site-A) */}
        <Polyline
          positions={routeToSiteA}
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
                <span>HORIZON 2: PERMANENT RESETTLEMENT CORRIDOR (SITE-A)</span>
              </div>
              <p className="text-slate-300 text-[11px]">
                Proximity: {siteA.distanceKm} km • All-weather arterial corridor to {siteA.name}.
              </p>
            </div>
          </Popup>
        </Polyline>

        {/* Layer 4: Interactive Tactical Markers */}

        {/* HAB-01: Nandikot Red Zone Origin Pin */}
        <Marker
          position={[hab01.latitude, hab01.longitude]}
          icon={NandikotMarker}
          eventHandlers={{ click: () => onSelectHabitation('HAB-01') }}
        >
          <Popup>
            <div className="p-2.5 font-mono text-xs space-y-1.5 min-w-[200px]">
              <div className="font-bold text-red-500 flex items-center gap-1 border-b border-slate-700 pb-1">
                <MapPin className="w-3.5 h-3.5" /> {hab01.name} (HAB-01)
              </div>
              <div className="text-slate-300 space-y-0.5 text-[11px]">
                <div>Population: <strong className="text-white">{hab01.population.toLocaleString()} souls</strong></div>
                <div>Risk Index: <strong className="text-red-400">{hab01.compositeRiskIndex} (Red Zone)</strong></div>
                <div>Slope: <strong className="text-amber-400">{hab01.slopeDegrees}°</strong></div>
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
            <div className="p-2.5 font-mono text-xs space-y-1.5 min-w-[200px]">
              <div className="font-bold text-amber-400 flex items-center gap-1 border-b border-slate-700 pb-1">
                <MapPin className="w-3.5 h-3.5" /> {hab02.name} (HAB-02)
              </div>
              <div className="text-slate-300 space-y-0.5 text-[11px]">
                <div>Population: <strong className="text-white">{hab02.population.toLocaleString()} souls</strong></div>
                <div>Risk Index: <strong className="text-amber-400">{hab02.compositeRiskIndex} (Amber)</strong></div>
                <div>Slope: <strong className="text-amber-400">{hab02.slopeDegrees}°</strong></div>
              </div>
            </div>
          </Popup>
        </Marker>

        {/* SITE-C: Govt Model Inter-College Grounds (Transit Shelter) */}
        <Marker
          position={siteCPos}
          icon={SiteCMarker}
          eventHandlers={{ click: () => onSelectSite('SITE-C') }}
        >
          <Popup>
            <div className="p-2.5 font-mono text-xs space-y-1.5 min-w-[210px]">
              <div className="font-bold text-amber-400 flex items-center gap-1 border-b border-slate-700 pb-1">
                <Building2 className="w-3.5 h-3.5" /> {tacticalShelterImmediate.name}
              </div>
              <div className="text-slate-300 space-y-0.5 text-[11px]">
                <div>Type: <strong className="text-amber-300">0-72h Transit Shelter</strong></div>
                <div>Intake Capacity: <strong className="text-emerald-400">{tacticalShelterImmediate.capacityAudit.effectiveCapacity.toLocaleString()} souls</strong></div>
                <div>Distance: <strong className="text-white">{tacticalShelterImmediate.distanceKm} km</strong></div>
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
              <div className="font-bold text-emerald-400 flex items-center gap-1 border-b border-slate-700 pb-1">
                <ShieldCheck className="w-3.5 h-3.5" /> {siteA.name}
              </div>
              <div className="text-slate-300 space-y-0.5 text-[11px]">
                <div>Status: <strong className="text-emerald-400">RECOMMENDED PRIMARY</strong></div>
                <div>Sphere Intake: <strong className="text-emerald-400">{siteA.capacityAudit.effectiveCapacity.toLocaleString()} souls</strong></div>
                <div>Surplus Headroom: <strong className="text-emerald-300">+{siteA.capacityAudit.residualHeadroom} souls</strong></div>
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
                <div className="font-bold text-red-400 line-through flex items-center gap-1 border-b border-slate-700 pb-1">
                  {siteB.name} (REJECTED)
                </div>
                <div className="text-slate-300 space-y-0.5 text-[11px]">
                  <div>Disqualification: <strong className="text-red-400">30-Toilet Sanitation Ceiling (550 Max)</strong></div>
                  <div>Bridge Cutoff Risk: <strong className="text-red-400">66% Probability</strong></div>
                </div>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};
