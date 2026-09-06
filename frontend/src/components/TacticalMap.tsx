import React, { useEffect } from 'react';
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
  SiteAMarker,
  SiteBMarker,
  SiteCMarker,
} from './MapMarkers';
import {
  Layers,
  MapPin,
  Compass,
  AlertTriangle,
  ShieldCheck,
  Building2,
  Navigation,
} from 'lucide-react';

interface TacticalMapProps {
  evaluation: EvaluationResultResponse;
  selectedSiteId?: string;
  onSelectSite?: (siteId: string) => void;
}

/**
 * MapController component to invalidate size and auto-pan (flyTo) when the active sector changes.
 */
const MapController: React.FC<{ targetPos: [number, number] }> = ({ targetPos }) => {
  const map = useMap();

  useEffect(() => {
    map.invalidateSize();
    map.flyTo(targetPos, 13.5, { duration: 1.2 });
  }, [map, targetPos]);

  return null;
};

export const TacticalMap: React.FC<TacticalMapProps> = ({
  evaluation,
  selectedSiteId: _selectedSiteId,
  onSelectSite,
}) => {
  const { habitation, tacticalShelterImmediate, candidateSites } = evaluation;

  // Active Crisis Habitation Origin & Target Site Coordinates
  const originPos: [number, number] = [habitation.latitude, habitation.longitude];
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
    originPos,
    [30.4135, 79.3225],
    siteCPos,
  ];

  const routeToSiteA: [number, number][] = [
    originPos,
    [30.4110, 79.3215],
    siteAPos,
  ];

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

        {/* Map Legend Pill */}
        <div className="pointer-events-auto hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-lg bg-cardDark/90 border border-borderDark backdrop-blur-md shadow-lg text-[11px] font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-alertRed animate-pulse" />
            <span className="text-slate-300">Crisis Origin</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-amber-500" />
            <span className="text-slate-300">0-72h Transit</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-emerald-500" />
            <span className="text-slate-300">Primary Enclave</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-slate-600" />
            <span className="text-slate-400">Rejected Site</span>
          </div>
        </div>
      </div>

      {/* Leaflet Map Engine Container */}
      <MapContainer
        center={originPos}
        zoom={13}
        scrollWheelZoom={true}
        className="w-full h-full z-0 tactical-dark-tiles"
      >
        <MapController targetPos={originPos} />

        {/* Clean OpenStreetMap TileLayer with Dark Mode CSS Filter (Zero Watermark / Zero API Key Required) */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />

        {/* Layer 1: Crisis Hazard Runout Buffer (900m / 500m) */}
        <Circle
          center={originPos}
          radius={habitation.riskZone === 'CRITICAL_RED_ZONE' ? 900 : 500}
          pathOptions={{
            color: habitation.riskZone === 'CRITICAL_RED_ZONE' ? '#ef4444' : '#f59e0b',
            fillColor: habitation.riskZone === 'CRITICAL_RED_ZONE' ? '#ef4444' : '#f59e0b',
            fillOpacity: 0.2,
            weight: 2,
            dashArray: '4, 4',
          }}
        >
          <Popup>
            <div className="p-2 space-y-1 font-mono text-xs">
              <div className={`flex items-center gap-1.5 font-bold ${habitation.riskZone === 'CRITICAL_RED_ZONE' ? 'text-alertRed' : 'text-warnAmber'}`}>
                <AlertTriangle className="w-4 h-4" />
                <span>{habitation.riskZone === 'CRITICAL_RED_ZONE' ? 'NON-MITIGABLE LANDSLIDE RUNOUT ZONE' : 'SLOPE DEFORMATION MONITORING BUFFER'}</span>
              </div>
              <p className="text-slate-300 text-[11px]">
                Radius: {habitation.riskZone === 'CRITICAL_RED_ZONE' ? '900m' : '500m'} buffer • {habitation.slopeDegrees}° critical slope • {habitation.riskZone === 'CRITICAL_RED_ZONE' ? 'In situ civil mitigation impossible.' : 'Active slope deformation monitoring.'}
              </p>
            </div>
          </Popup>
        </Circle>

        {/* Layer 3: Dynamic Route Vectors (Evacuation Corridors) */}
        {/* Route 1: Habitation to SITE-C (Immediate Transit Triage - Amber Glowing Dashed Line) */}
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
                <span>HORIZON 1: IMMEDIATE TRANSIT TRIAGE CORRIDOR</span>
              </div>
              <p className="text-slate-300 text-[11px]">
                Route: {habitation.name} $\to$ Govt Inter-College Ground (2.1 km mountain road access)
              </p>
            </div>
          </Popup>
        </Polyline>

        {/* Route 2: Habitation to SITE-A (Primary Resettlement Corridor - Tactical Emerald Solid Line) */}
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
                <span>HORIZON 2: PRIMARY RESETTLEMENT CORRIDOR</span>
              </div>
              <p className="text-slate-300 text-[11px]">
                Route: {habitation.name} $\to$ Gopeshwar Enclave (3.4 km dual-lane arterial corridor)
              </p>
            </div>
          </Popup>
        </Polyline>

        {/* Layer 2: Markers with Distinct Div-Icons */}
        {/* Habitation Crisis Origin */}
        <Marker position={originPos} icon={NandikotMarker}>
          <Popup>
            <div className="p-2.5 font-mono text-xs space-y-2 min-w-[220px]">
              <div className="flex items-center justify-between border-b border-slate-700 pb-1.5">
                <span className={`font-bold flex items-center gap-1 ${habitation.riskZone === 'CRITICAL_RED_ZONE' ? 'text-alertRed' : 'text-warnAmber'}`}>
                  <MapPin className="w-3.5 h-3.5" /> {habitation.name}
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 border border-slate-600">
                  {habitation.id}
                </span>
              </div>
              <div className="space-y-1 text-slate-300 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-400">Population:</span>
                  <span className="font-bold text-slate-100">{habitation.population.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Composite Risk (CRI):</span>
                  <span className={`font-bold ${habitation.riskZone === 'CRITICAL_RED_ZONE' ? 'text-alertRed' : 'text-warnAmber'}`}>
                    {habitation.compositeRiskIndex} ({habitation.riskZone === 'CRITICAL_RED_ZONE' ? 'CRITICAL' : 'MONITORING'})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Slope:</span>
                  <span className="font-bold text-amber-400">{habitation.slopeDegrees}°</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Landslide Hazard:</span>
                  <span className="font-bold text-slate-200">{habitation.landslideHazardIndex}%</span>
                </div>
              </div>
              <div className={`pt-1 border-t border-slate-800 text-[10px] font-semibold ${habitation.riskZone === 'CRITICAL_RED_ZONE' ? 'text-red-400' : 'text-amber-400'}`}>
                STATUS: {habitation.riskZone === 'CRITICAL_RED_ZONE' ? 'NON-MITIGABLE RED ZONE — MANDATORY EVACUATION' : 'AMBER MONITORING — PREPARE EVACUATION CORRIDORS'}
              </div>
            </div>
          </Popup>
        </Marker>

        {/* SITE-C: Govt Model Inter-College Grounds (Transit Shelter 0-72h) */}
        <Marker
          position={siteCPos}
          icon={SiteCMarker}
          eventHandlers={{ click: () => onSelectSite?.('SITE-C') }}
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
                <div className="flex justify-between">
                  <span className="text-slate-400">Type:</span>
                  <span className="font-bold text-amber-300">0-72h Transit Shelter</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Effective Capacity:</span>
                  <span className="font-bold text-emerald-400">
                    {tacticalShelterImmediate.capacityAudit.effectiveCapacity.toLocaleString()} evacuees
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Distance from Origin:</span>
                  <span className="font-bold text-slate-200">{tacticalShelterImmediate.distanceKm} km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Feasibility Score:</span>
                  <span className="font-bold text-slate-100">{tacticalShelterImmediate.feasibilityScore} / 100</span>
                </div>
              </div>
            </div>
          </Popup>
        </Marker>

        {/* SITE-A: Gopeshwar Enclave (Recommended Primary Enclave) */}
        <Marker
          position={siteAPos}
          icon={SiteAMarker}
          eventHandlers={{ click: () => onSelectSite?.('SITE-A') }}
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
                <div className="flex justify-between">
                  <span className="text-slate-400">Status:</span>
                  <span className="font-bold text-emerald-400">RECOMMENDED PRIMARY (SAFE)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Effective Capacity:</span>
                  <span className="font-bold text-emerald-400">
                    {siteA.capacityAudit.effectiveCapacity.toLocaleString()} evacuees
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Residual Headroom:</span>
                  <span className="font-bold text-emerald-300">+{siteA.capacityAudit.residualHeadroom} persons</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Distance:</span>
                  <span className="font-bold text-slate-200">{siteA.distanceKm} km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Feasibility Score:</span>
                  <span className="font-bold text-slate-100">{siteA.feasibilityScore} / 100</span>
                </div>
              </div>
            </div>
          </Popup>
        </Marker>

        {/* SITE-B: Pipalkoti Shelf (Operationally Rejected Site) */}
        {siteB && (
          <Marker
            position={siteBPos}
            icon={SiteBMarker}
            eventHandlers={{ click: () => onSelectSite?.('SITE-B') }}
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
                  <div className="flex justify-between">
                    <span className="text-slate-400">Disqualification Reason:</span>
                    <span className="font-bold text-alertRed">30-Toilet Sanitation Ceiling</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Gross Sanitation Cap:</span>
                    <span className="font-bold text-slate-200">750 (550 Effective)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Capacity Deficit:</span>
                    <span className="font-bold text-alertRed">{siteB.capacityAudit.residualHeadroom} persons</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Bridge Cutoff Risk:</span>
                    <span className="font-bold text-alertRed">66% (Single Access)</span>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>

      {/* Bottom Floating Tactical Action Bar */}
      <div className="absolute bottom-3 left-3 right-3 z-[1000] pointer-events-none flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="pointer-events-auto px-3 py-1.5 rounded-lg bg-cardDark/90 border border-borderDark backdrop-blur-md shadow-lg text-xs font-mono text-slate-300 flex items-center gap-2">
          <Layers className="w-3.5 h-3.5 text-infoBlue" />
          <span>SPATIAL CONSTRAINTS: 900M HAZARD RUNOUT ZONE • 2 ACTIVE CORRIDORS</span>
        </div>

        <div className="pointer-events-auto px-3 py-1.5 rounded-lg bg-cardDark/90 border border-borderDark backdrop-blur-md shadow-lg text-[11px] font-mono text-slate-400">
          GIS ENGINE: PURE-JAVA HAVERSINE TORTUOSITY ($1.326\times$)
        </div>
      </div>
    </div>
  );
};
