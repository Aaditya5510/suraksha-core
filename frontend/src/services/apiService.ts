import { getBaselineEvaluation, BASELINE_HABITATIONS } from '../data/baselineData';
import type { EvaluationResultResponse, Habitation, CapacityAuditResult, BottleneckType } from '../types/suraksha';

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  timestamp?: string;
  data: T;
}

const RAW_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  (typeof window !== 'undefined' && window.location.hostname.includes('onrender.com')
    ? 'https://suraksha-backend-ilst.onrender.com'
    : '')
).trim().replace(/\/$/, '');

const API_BASE = RAW_BASE_URL
  ? (RAW_BASE_URL.endsWith('/api/v1') ? RAW_BASE_URL : `${RAW_BASE_URL}/api/v1`)
  : '/api/v1';

/**
 * Actively fetches relocation evaluation for a given habitation and simulated population.
 * 1. Tries GET /api/v1/relocation/evaluate/{habitationId}?population={population}
 * 2. Fallbacks to POST /api/v1/relocation/evaluate
 * 3. Fallbacks to Local Deterministic Offline Engine (Zero-Failover)
 */
export async function fetchEvaluation(
  habitationId: string = 'HAB-01',
  population?: number
): Promise<{ data: EvaluationResultResponse; isLive: boolean }> {
  const pop = population && population > 0 ? population : 2840;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    // Attempt 1: Direct GET endpoint
    const getUrl = `${API_BASE}/relocation/evaluate/${habitationId}${population ? `?population=${pop}` : ''}`;
    const getResponse = await fetch(getUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (getResponse.ok) {
      const json: ApiResponse<EvaluationResultResponse> = await getResponse.json();
      if (json && json.data) {
        return { data: json.data, isLive: true };
      }
    }
  } catch (_err) {
    // Try POST endpoint fallback if GET fails
    try {
      const postController = new AbortController();
      const postTimeoutId = setTimeout(() => postController.abort(), 2000);

      const postResponse = await fetch(`${API_BASE}/relocation/evaluate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          habitationId,
          simulatedPopulation: pop,
        }),
        signal: postController.signal,
      });

      clearTimeout(postTimeoutId);

      if (postResponse.ok) {
        const json: ApiResponse<EvaluationResultResponse> = await postResponse.json();
        if (json && json.data) {
          return { data: json.data, isLive: true };
        }
      }
    } catch (_postErr) {
      // Proceed to offline fallback
    }
  }

  // Pure TypeScript Offline Fallback Engine (Edge Fallback Mode)
  const base = getBaselineEvaluation(habitationId);
  base.habitation.population = pop;

  // Dynamically adjust candidate site headrooms and spillover for UI reactivity
  base.candidateSites = base.candidateSites.map((site) => {
    const headroom = site.capacityAudit.effectiveCapacity - pop;
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

  if (pop > primaryCap) {
    base.requiresSpillover = true;
    base.spilloverAllocation = {
      'SITE-A': primaryCap,
      'SITE-C': Math.min(pop - primaryCap, 2850),
    };
  } else {
    base.requiresSpillover = false;
    base.spilloverAllocation = {};
  }

  return { data: base, isLive: false };
}

/**
 * Backward compatibility alias for fetchEvaluation.
 */
export const evaluateRelocation = fetchEvaluation;

/**
 * Audits a specific candidate site's 3-way Sphere capacity against target evacuees.
 * Calls POST /api/v1/capacity/audit or falls back to client-side Sphere 2018 calculation.
 */
export async function auditSite(
  siteId: string,
  evacuees: number
): Promise<{ data: CapacityAuditResult; isLive: boolean }> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    const response = await fetch(`${API_BASE}/capacity/audit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        siteId,
        evacuees,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const json: ApiResponse<CapacityAuditResult> = await response.json();
      if (json && json.data) {
        return { data: json.data, isLive: true };
      }
    }
  } catch (_err) {
    // Offline fallback computation
  }

  // Client-side offline fallback
  let usableArea = 18000;
  let waterLpd = 65000;
  let toilets = 140;
  let occ = 234;

  if (siteId === 'SITE-B') {
    usableArea = 25000;
    waterLpd = 45000;
    toilets = 30;
    occ = 200;
  } else if (siteId === 'SITE-C') {
    usableArea = 12000;
    waterLpd = 45000;
    toilets = 120;
    occ = 150;
  }

  const grossArea = Math.floor(usableArea / 3.5);
  const grossWater = Math.floor(waterLpd / 15.0);
  const grossSanitation = toilets * 25;

  let bottleneck: BottleneckType = 'NONE';
  if (grossSanitation <= grossWater && grossSanitation <= grossArea) {
    bottleneck = 'SANITATION_UNITS';
  } else if (grossWater <= grossArea) {
    bottleneck = 'WATER_SUPPLY';
  } else {
    bottleneck = 'COVERED_SPACE';
  }

  const grossCap = Math.min(grossArea, Math.min(grossWater, grossSanitation));
  const effectiveCap = Math.max(0, grossCap - occ);
  const residual = effectiveCap - evacuees;

  return {
    data: {
      grossByArea: grossArea,
      grossByWater: grossWater,
      grossBySanitation: grossSanitation,
      limitingBottleneck: bottleneck,
      grossCapacity: grossCap,
      effectiveCapacity: effectiveCap,
      residualHeadroom: residual,
      isDeficit: residual < 0,
    },
    isLive: false,
  };
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
      headers: {
        'Accept': 'application/json',
      },
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
