# SURAKSHA — AI-Assisted Development Protocol, Agent Governance & Zero-Hallucination Framework

**Document Title:** Autonomous Agent Operating Standard, Code Drift Mitigation & Verification Governance  
**Project Code:** SIH26191 (Ministry of Home Affairs - NDRF & DM Division)  
**Classification:** AI Governance, Agent Orchestration & Quality Assurance Architecture  
**Target Audience:** Lead Architects, Autonomous Agent Controllers, QA Engineers, Code Reviewers  

---

## 1. Document Purpose & Governance Philosophy

### The Zero-Drift Mandate
When building complex mission-critical systems using autonomous AI coding agents (such as Antigravity / Gemini 3.7 & 3.8 models), agent drift and subtle hallucination represent the primary threats to engineering velocity. Common failure modes include:
- Modifying frozen REST API JSON field names between frontend and backend.
- Silently injecting unapproved third-party dependencies or native binaries (e.g., PostGIS, GDAL).
- Introducing partial code stubs or placeholder comments (`// TODO`, `/* rest of code here */`).
- Drifting away from verified ground-truth pilot coordinates and mathematical formulas.

This governance framework establishes **immutable operating boundaries, frozen interface contracts, and automated verification gates** that eliminate agent hallucination and guarantee 100% deterministic code synthesis.

---

## 2. The Zero-Hallucination Code Generation Rules

All autonomous agents executing tasks within the `suraksha-core` repository must adhere strictly to the following five immutable developer constraints:

```
+-----------------------------------------------------------------------------------+
|                     THE 5 IMMUTABLE DEVELOPER CONSTRAINTS                         |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  RULE 1: CONTEXT IMMUTABILITY                                                     |
|  - All code must strictly derive from CONTEXT.md and the docs/ baseline.          |
|  - Prohibited: Altering seed coordinates, changing formulas, or renaming variables|
|                                                                                   |
|  RULE 2: FROZEN API & DTO CONTRACTS                                               |
|  - Endpoint POST /api/v1/relocation/evaluate and its JSON payload are immutable. |
|  - Frontend TypeScript types must match Java DTOs field-for-field.                |
|                                                                                   |
|  RULE 3: NO POSTGIS / NATIVE BINARY CREEP                                         |
|  - Pure Java Haversine math on double precision lat/lng fields only.              |
|  - Prohibited: PostGIS, Hibernate Spatial, GDAL, or C++ shared libraries in pom.  |
|                                                                                   |
|  RULE 4: COMPLETE IMPLEMENTATIONS ONLY                                            |
|  - Zero stubbing, zero ellipses (...), zero "// TODO implement here" comments.    |
|  - Every class, component, and method must be completely implemented.             |
|                                                                                   |
|  RULE 5: MANDATORY OFFLINE RESILIENCE                                             |
|  - Frontend MUST embed src/mock/offlineFallback.ts with the full mock engine.     |
|  - Guaranteed zero-stutter failover on network drop or backend termination.       |
|                                                                                   |
+-----------------------------------------------------------------------------------+
```

### Detailed Constraint Breakdown

1. **Rule 1 — Context Immutability:**
   All code synthesis must read from and conform to the audited architectural specifications in `docs/`. An agent is strictly prohibited from inventing new risk multipliers, altering the Chamoli seed dataset (`HAB-01` population $2,840$, `SITE-A` water $55,000\text{ LPD}$, `SITE-B` toilets $30$), or modifying mathematical formulas.

2. **Rule 2 — Frozen API & DTO Contracts:**
   The REST interface `POST /api/v1/relocation/evaluate` defined in `docs/TEAM_TECHNICAL_WALKTHROUGH.md` is locked. Request and response payloads are frozen. Java records/DTOs (`EvaluateRequest.java`, `EvaluationResponse.java`) and TypeScript interfaces (`src/types/index.ts`) must have 100% casing and type parity.

3. **Rule 3 — Zero PostGIS / Native Binary Creep:**
   Geospatial distance calculations must execute in pure Java using the Haversine trigonometric formula. Under no circumstances may an agent inject PostGIS dependencies, GDAL binaries, GEOS bindings, or Hibernate Spatial into `backend/pom.xml`.

4. **Rule 4 — Complete Implementations Only:**
   Autonomous agents must emit complete, production-grade source code. Any file containing truncated methods, placeholder ellipses (`...`), or comments such as `// implement logic here` will fail code review and trigger an immediate revert.

5. **Rule 5 — Mandatory Offline Edge Resilience:**
   The frontend must maintain the static mock dataset and client-side Sphere recalculation engine inside `src/mock/offlineFallback.ts` as specified in `docs/DEMO_FALLBACK.md`. Network timeouts or backend crashes must trigger seamless in-memory fallback without throwing runtime error toasts.

---

## 3. Phased Implementation Roadmap

Development proceeds sequentially through six gated execution phases. An agent may not proceed to a downstream phase until the current phase passes its verification gate:

```
+-----------------------------------------------------------------------------------+
|                        PHASED IMPLEMENTATION PIPELINE                             |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  [ PHASE 1: Spring Boot 3.3 Backend Infrastructure ]                              |
|  ├── Entities: Habitation.java, RelocationSite.java                               |
|  ├── Repositories: Spring Data JPA interfaces                                     |
|  └── Datastore: In-Memory H2 DB (PostgreSQL Mode) + Complete data.sql seed        |
|                                                                                   |
+-----------------------------------------+-----------------------------------------+
                                          | [Gate 1: mvn clean test-compile]
                                          v
+-----------------------------------------+-----------------------------------------+
|                                                                                   |
|  [ PHASE 2: Decision Intelligence Services & Controller ]                         |
|  ├── SphereCapacityEngine.java (Theory of Constraints implementation)             |
|  ├── DecisionEngineService.java (CRI, SFS, Rejection Gates, Audit Generation)     |
|  ├── RelocationController.java (POST /api/v1/relocation/evaluate)                 |
|  └── CorsConfig.java (Cross-Origin Policy)                                        |
|                                                                                   |
+-----------------------------------------+-----------------------------------------+
                                          | [Gate 2: Backend Handshake Test]
                                          v
+-----------------------------------------+-----------------------------------------+
|                                                                                   |
|  [ PHASE 3: React 18 + Vite + Leaflet Tactical Map Core ]                         |
|  ├── TacticalMap.tsx (Leaflet container, Chamoli 30.45, 79.45 centering)         |
|  ├── Custom SVG Markers (Pulsing Red Habitation, Green Safe Haven, Red Rejected)  |
|  └── Vector Overlays (Dynamic route polylines and bridge cutoff toggles)          |
|                                                                                   |
+-----------------------------------------+-----------------------------------------+
                                          | [Gate 3: Map Render & Tile Fallback]
                                          v
+-----------------------------------------+-----------------------------------------+
|                                                                                   |
|  [ PHASE 4: Tactical Command Dashboard Components ]                               |
|  ├── Header.tsx (Title, EOC status, offline badge)                                |
|  ├── HabitationCard.tsx (CRI breakdown, slope, cutoff risk meters)                |
|  ├── CapacityMeters.tsx (Space vs Water vs Sanitation bottleneck visualizer)      |
|  ├── CandidateSiteCard.tsx (SFS score, Pipalkoti rejection badge, justification)  |
|  └── ActionDirectiveModal.tsx (SDMA printable dispatch order)                     |
|                                                                                   |
+-----------------------------------------+-----------------------------------------+
                                          | [Gate 4: Component Rendering & Print CSS]
                                          v
+-----------------------------------------+-----------------------------------------+
|                                                                                   |
|  [ PHASE 5: Interactive Dynamic "What-If" Slider & Split Engine ]                 |
|  ├── WhatIfSlider.tsx (Population range: 1000 - 5000, default 2840)               |
|  ├── Real-time recalculation trigger (<15ms debounced execution)                  |
|  └── Automatic multi-site split directive generator on capacity deficit           |
|                                                                                   |
+-----------------------------------------+-----------------------------------------+
                                          | [Gate 5: Slider Stress-Test]
                                          v
+-----------------------------------------+-----------------------------------------+
|                                                                                   |
|  [ PHASE 6: End-to-End Integration, CORS Validation & Offline Failover ]          |
|  ├── Frontend Axios integration with silent fallback to offlineFallback.ts        |
|  ├── Production build verification (`npm run build` + `mvn package`)              |
|  └── 100% Zero-Crash Chaos Test under network kill scenarios                     |
|                                                                                   |
+-----------------------------------------------------------------------------------+
```

---

## 4. Audit & Verification Gates (Acceptance Criteria)

Before any phase is marked complete, the executing agent must execute and pass the corresponding automated verification commands:

| Verification Gate | Terminal Command / Execution Check | Passing Criteria (Zero-Tolerance) |
| :--- | :--- | :--- |
| **Gate 1: Backend Infrastructure** | `mvn clean test-compile` | `BUILD SUCCESS` with zero compilation warnings and clean JPA entity mappings. |
| **Gate 2: REST Handshake** | `curl -X POST http://localhost:8080/api/v1/relocation/evaluate -H "Content-Type: application/json" -d '{"habitationId":"HAB-01","simulatedPopulation":2840}'` | Returns `HTTP 200 OK` with:<br>• `habitation.compositeRisk = 89.4`<br>• `habitation.riskZone = "CRITICAL_RED_ZONE"`<br>• `tacticalShelterImmediate.effectiveCapacity = 2850`<br>• Site A `residualHeadroom = 426`<br>• Site B `recommendation = "OPERATIONALLY_REJECTED"` |
| **Gate 3: Frontend Compilation** | `npm run build` (runs `tsc --noEmit && vite build`) | Zero TypeScript errors, clean bundle emitted to `dist/`, total bundle size $<500\text{ KB}$ gzipped. |
| **Gate 4: Calculation SLA** | Apache Benchmark / Spring Actuator metric | Average response latency $\le 15\text{ ms}$; p99 latency $\le 50\text{ ms}$ under 50 concurrent requests. |
| **Gate 5: Chaos Resilience** | Terminate backend process (`Stop-Process`), drag What-If slider in browser | UI immediately recalculates using `offlineFallback.ts`; zero unhandled promise rejections, zero error popups, zero layout shift. |
| **Gate 6: Print Engine** | Trigger `window.print()` inside `ActionDirectiveModal` | Directs clean A4 monochrome dispatch order with zero overlapping elements, hiding all map and navigation components. |

---

## 5. Agent Drift Mitigation & Recovery Protocol

If an autonomous coding agent exhibits hallucination, schema drift, or test failures, execute the following three-step remediation protocol immediately:

```
+-----------------------------------------------------------------------------------+
|                        AGENT DRIFT REMEDIATION WORKFLOW                           |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  [ STEP 1: Immediate Git Rollback ]                                               |
|  Execute: `git checkout -- <drifted_file>`                                        |
|  Reverts the file to the last audited green state.                                |
|                                                                                   |
|  [ STEP 2: Diff & Violation Isolation ]                                           |
|  Execute: `git diff HEAD` to identify the exact line where schema drifted.        |
|                                                                                   |
|  [ STEP 3: Re-Anchoring Prompt Injection ]                                        |
|  Inject the standard re-anchoring instruction:                                    |
|  "VIOLATION DETECTED: Code drifted from docs/TEAM_TECHNICAL_WALKTHROUGH.md.       |
|   Re-anchor strictly to frozen DTO contracts and formulas. Do not invent fields." |
|                                                                                   |
+-----------------------------------------------------------------------------------+
```

### Standard Agent Re-Anchoring Command
When prompting an agent to correct a hallucinated artifact, use the following standardized directive:
> *"Re-anchor strictly to `docs/TEAM_TECHNICAL_WALKTHROUGH.md` and `docs/DEMO_FALLBACK.md`. You must restore the exact variable names, formulas, and JSON schemas specified in the baseline. Do not add external libraries, do not alter data types, and provide the complete, uncompressed source code with zero placeholder comments."*

---
*SURAKSHA Technical Architecture Group — Ministry of Home Affairs NDRF & DM Division Initiative (SIH26191)*
