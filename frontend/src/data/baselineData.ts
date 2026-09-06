import type { EvaluationResultResponse, Habitation } from '../types/suraksha';

/**
 * Chamoli Pilot Scenario Baseline Seed Data (Joshimath / Nandikot / Helang Sector)
 * SIH26191 Benchmark Dataset
 */

export const BASELINE_HABITATIONS: Habitation[] = [
  {
    id: 'HAB-01',
    name: 'Nandikot Settlement',
    latitude: 30.4158,
    longitude: 79.3248,
    population: 2840,
    slopeDegrees: 42.0,
    landslideHazardIndex: 88.0,
    floodRiskIndex: 45.0,
    vulnerabilityFactor: 0.85,
    cutoffRisk: 0.85,
    compositeRiskIndex: 89.4,
    riskZone: 'CRITICAL_RED_ZONE',
    horizon: 'IMMEDIATE_0_72H',
    isPermanentlyUnsuitable: true,
    redZoneDeclaredDate: '2024-08-15',
  },
  {
    id: 'HAB-02',
    name: 'Helang Bastion',
    latitude: 30.5280,
    longitude: 79.5128,
    population: 1120,
    slopeDegrees: 34.0,
    landslideHazardIndex: 68.0,
    floodRiskIndex: 30.0,
    vulnerabilityFactor: 0.70,
    cutoffRisk: 0.70,
    compositeRiskIndex: 71.2,
    riskZone: 'AMBER_ZONE',
    horizon: 'SHORT_TERM_TRANSIT',
    isPermanentlyUnsuitable: false,
    redZoneDeclaredDate: null,
  },
  {
    id: 'HAB-03',
    name: 'Joshimath Sub-Sector B',
    latitude: 30.5560,
    longitude: 79.5620,
    population: 1850,
    slopeDegrees: 38.0,
    landslideHazardIndex: 82.0,
    floodRiskIndex: 35.0,
    vulnerabilityFactor: 0.80,
    cutoffRisk: 0.75,
    compositeRiskIndex: 84.1,
    riskZone: 'CRITICAL_RED_ZONE',
    horizon: 'IMMEDIATE_0_72H',
    isPermanentlyUnsuitable: true,
    redZoneDeclaredDate: '2024-09-01',
  },
];

export const DEFAULT_EVALUATION: EvaluationResultResponse = {
  habitation: BASELINE_HABITATIONS[0],
  tacticalShelterImmediate: {
    siteId: 'SITE-C',
    name: 'Govt Model Inter-College Grounds',
    siteType: 'TRANSIT_SHELTER',
    latitude: 30.4120,
    longitude: 79.3210,
    distanceKm: 2.1,
    feasibilityScore: 91.5,
    recommendation: 'RECOMMENDED_PRIMARY',
    capacityAudit: {
      grossByArea: 3428,
      grossByWater: 3000,
      grossBySanitation: 3000,
      limitingBottleneck: 'WATER_SUPPLY',
      grossCapacity: 3000,
      effectiveCapacity: 2850,
      residualHeadroom: 10,
      isDeficit: false,
    },
    decisionJustification: 'Optimal immediate 0-72h transit staging post with dual-lane mountain road access.',
  },
  candidateSites: [
    {
      siteId: 'SITE-A',
      name: 'Gopeshwar Enclave',
      siteType: 'RELOCATION_ENCLAVE',
      latitude: 30.4080,
      longitude: 79.3190,
      distanceKm: 3.4,
      feasibilityScore: 88.5,
      recommendation: 'RECOMMENDED_PRIMARY',
      capacityAudit: {
        grossByArea: 5142,
        grossByWater: 4333,
        grossBySanitation: 3500,
        limitingBottleneck: 'SANITATION_UNITS',
        grossCapacity: 3500,
        effectiveCapacity: 3266,
        residualHeadroom: 426,
        isDeficit: false,
      },
      decisionJustification: 'Optimal permanent resettlement site with multi-route access, 0.08 bridge cutoff risk, and +426 headroom.',
    },
    {
      siteId: 'SITE-B',
      name: 'Pipalkoti Shelf',
      siteType: 'RELOCATION_ENCLAVE',
      latitude: 30.4290,
      longitude: 79.4270,
      distanceKm: 11.2,
      feasibilityScore: 42.0,
      recommendation: 'OPERATIONALLY_REJECTED',
      capacityAudit: {
        grossByArea: 7142,
        grossByWater: 3000,
        grossBySanitation: 750,
        limitingBottleneck: 'SANITATION_UNITS',
        grossCapacity: 750,
        effectiveCapacity: 550,
        residualHeadroom: -2290,
        isDeficit: true,
      },
      decisionJustification: 'Disqualified due to critical sanitation bottleneck (only 30 toilets for 2,840 pop) and 66% bridge cutoff risk.',
    },
  ],
  operationalDirectiveSummary:
    'MANDATORY EVACUATION DIRECTIVE: Nandikot Red Zone declared non-mitigable. Direct 2,840 evacuees to Site-C transit triage (0-72h). Resettlement corridor to Site-A (Gopeshwar). Pipalkoti rejected due to 30-toilet bottleneck.',
  requiresSpillover: false,
  spilloverAllocation: {},
};

export function getBaselineEvaluation(habitationId: string): EvaluationResultResponse {
  const hab = BASELINE_HABITATIONS.find((h) => h.id === habitationId) || BASELINE_HABITATIONS[0];
  const evalCopy: EvaluationResultResponse = JSON.parse(JSON.stringify(DEFAULT_EVALUATION));
  evalCopy.habitation = hab;

  if (hab.id === 'HAB-02') {
    evalCopy.operationalDirectiveSummary =
      'AMBER MONITORING DIRECTIVE: Helang Bastion under slope stability watch (CRI 71.2). Prepare secondary transit corridor to Site-C and Site-A for rapid staging if rainfall threshold exceeds 65mm/hr.';
  } else if (hab.id === 'HAB-03') {
    evalCopy.operationalDirectiveSummary =
      'MANDATORY EVACUATION DIRECTIVE: Joshimath Sub-Sector B (CRI 84.1, 38° slope) exhibiting rapid active subsidence. Mobilize 1,850 evacuees along arterial corridors to Site-A Gopeshwar Enclave.';
  }

  return evalCopy;
}
