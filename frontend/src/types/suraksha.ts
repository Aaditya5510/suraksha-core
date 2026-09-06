/**
 * SURAKSHA Core Decision Engine - Type Contract Definitions
 * Smart India Hackathon 2026 (SIH26191)
 * Aligned 1:1 with backend Spring Boot DTOs and JPA Entities
 */

export type RiskZone =
  | 'CRITICAL_RED_ZONE'
  | 'AMBER_ZONE'
  | 'YELLOW_MONITORING';

export type RelocationHorizon =
  | 'IMMEDIATE_0_72H'
  | 'SHORT_TERM_TRANSIT'
  | 'MEDIUM_PERMANENT';

export type SiteType =
  | 'TRANSIT_SHELTER'
  | 'RELOCATION_ENCLAVE'
  | 'LOGISTICS_HUB';

export type RecommendationStatus =
  | 'RECOMMENDED_PRIMARY'
  | 'CONDITIONALLY_FEASIBLE'
  | 'OPERATIONALLY_REJECTED'
  | 'CAPACITY_DEFICIT';

export type BottleneckType =
  | 'COVERED_SPACE'
  | 'WATER_SUPPLY'
  | 'SANITATION_UNITS'
  | 'ACCESS_ROUTE'
  | 'NONE';

export interface Habitation {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  population: number;
  slopeDegrees: number;
  landslideHazardIndex: number;
  floodRiskIndex: number;
  vulnerabilityFactor: number;
  cutoffRisk?: number;
  compositeRiskIndex: number;
  riskZone: RiskZone;
  horizon: RelocationHorizon;
  isPermanentlyUnsuitable?: boolean;
  redZoneDeclaredDate?: string | null;
}

export interface CapacityAuditResult {
  grossByArea: number;
  grossByWater: number;
  grossBySanitation: number;
  limitingBottleneck: BottleneckType;
  grossCapacity: number;
  effectiveCapacity: number;
  residualHeadroom: number;
  isDeficit: boolean;
}

export interface CandidateSiteEvaluationDTO {
  siteId: string;
  name: string;
  siteType: SiteType;
  latitude: number;
  longitude: number;
  distanceKm: number;
  feasibilityScore: number;
  recommendation: RecommendationStatus;
  capacityAudit: CapacityAuditResult;
  decisionJustification: string;
}

export interface EvaluationResultResponse {
  habitation: Habitation;
  tacticalShelterImmediate: CandidateSiteEvaluationDTO;
  candidateSites: CandidateSiteEvaluationDTO[];
  operationalDirectiveSummary: string;
  requiresSpillover: boolean;
  spilloverAllocation?: Record<string, number>;
}

export interface RelocationEvaluationRequest {
  habitationId: string;
  simulatedPopulation?: number;
}
