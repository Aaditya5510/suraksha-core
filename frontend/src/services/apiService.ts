import { DEFAULT_EVALUATION, BASELINE_HABITATIONS } from '../data/baselineData';
import type { EvaluationResultResponse, Habitation } from '../types/suraksha';

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  timestamp?: string;
  data: T;
}

const API_BASE = '/api/v1';

/**
 * Evaluates relocation for a given habitation and simulated population.
 * Implements Zero-Failover Graceful Degradation:
 * Attempts live backend call; if unreachable, computes or returns baseline data seamlessly.
 */
export async function evaluateRelocation(
  habitationId: string = 'HAB-01',
  simulatedPopulation: number = 2840
): Promise<{ data: EvaluationResultResponse; isLive: boolean }> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const response = await fetch(`${API_BASE}/relocation/evaluate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        habitationId,
        simulatedPopulation,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const json: ApiResponse<EvaluationResultResponse> = await response.json();
      if (json && json.data) {
        return { data: json.data, isLive: true };
      }
    }
  } catch (_err) {
    // Graceful offline fallback
  }

  // Pure TypeScript Offline Fallback Engine
  const base = JSON.parse(JSON.stringify(DEFAULT_EVALUATION)) as EvaluationResultResponse;
  base.habitation.population = simulatedPopulation;

  // Dynamically adjust candidate site headrooms and spillover for UI reactivity
  base.candidateSites = base.candidateSites.map((site) => {
    const headroom = site.capacityAudit.effectiveCapacity - simulatedPopulation;
    return {
      ...site,
      capacityAudit: {
        ...site.capacityAudit,
        residualHeadroom: headroom,
        isDeficit: headroom < 0,
      },
    };
  });

  const primarySite = base.candidateSites.find((s) => s.siteId === 'SITE-A');
  const primaryCap = primarySite ? primarySite.capacityAudit.effectiveCapacity : 3266;

  if (simulatedPopulation > primaryCap) {
    base.requiresSpillover = true;
    base.spilloverAllocation = {
      'SITE-A': primaryCap,
      'SITE-C': Math.min(simulatedPopulation - primaryCap, 2850),
    };
  } else {
    base.requiresSpillover = false;
    base.spilloverAllocation = {};
  }

  return { data: base, isLive: false };
}

/**
 * Fetches all habitations from the backend or returns local offline baseline.
 */
export async function fetchHabitations(): Promise<{ data: Habitation[]; isLive: boolean }> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const response = await fetch(`${API_BASE}/habitations`, {
      method: 'GET',
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const json: ApiResponse<Habitation[]> = await response.json();
      if (json && json.data) {
        return { data: json.data, isLive: true };
      }
    }
  } catch (_err) {
    // Fallback
  }

  return { data: BASELINE_HABITATIONS, isLive: false };
}
