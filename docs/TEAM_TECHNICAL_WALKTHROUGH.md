# SURAKSHA — Lead Architect Technical Walkthrough & Implementation Blueprint

**System Identity:** SURAKSHA Core Decision Engine  
**Project Code:** SIH26191 (Ministry of Home Affairs - NDRF & DM Division)  
**Target Ecosystem:** Habitation-Level Multi-Hazard Relocation & Humanitarian Carrying-Capacity Determination  
**Classification:** Engineering Specification & Code Implementation Standard  

---

## 1. System Architecture & Complete Directory Tree

The `suraksha-core` repository is engineered as a decoupled, high-resilience architecture consisting of a Java 21 Spring Boot 3.3.x backend engine and a React 18 TypeScript Vite frontend client.

```
suraksha-core/
├── CONTEXT.md
├── docs/
│   ├── TEAM_TECHNICAL_BRIEFING.md
│   └── TEAM_TECHNICAL_WALKTHROUGH.md
├── backend/
│   ├── pom.xml
│   └── src/
│       ├── main/
│       │   ├── java/
│       │   │   └── com/
│       │   │       └── suraksha/
│       │   │           └── engine/
│       │   │               ├── SurakshaEngineApplication.java
│       │   │               ├── config/
│       │   │               │   └── CorsConfig.java
│       │   │               ├── controller/
│       │   │               │   └── RelocationController.java
│       │   │               ├── model/
│       │   │               │   ├── dto/
│       │   │               │   │   ├── EvaluateRequest.java
│       │   │               │   │   └── EvaluationResponse.java
│       │   │               │   └── entity/
│       │   │               │       ├── Habitation.java
│       │   │               │       └── RelocationSite.java
│       │   │               ├── repository/
│       │   │               │   ├── HabitationRepository.java
│       │   │               │   └── RelocationSiteRepository.java
│       │   │               └── service/
│       │   │                   ├── DecisionEngineService.java
│       │   │                   └── SphereCapacityEngine.java
│       │   └── resources/
│       │       ├── application.properties
│       │       └── data.sql
│       └── test/
│           └── java/
│               └── com/
│                   └── suraksha/
│                       └── engine/
│                           └── DecisionEngineServiceTest.java
└── frontend/
    ├── index.html
    ├── package.json
    ├── postcss.config.js
    ├── tailwind.config.js
    ├── tsconfig.json
    ├── vite.config.ts
    └── src/
        ├── App.tsx
        ├── main.tsx
        ├── index.css
        ├── components/
        │   ├── ActionDirectiveModal.tsx
        │   ├── CandidateSiteCard.tsx
        │   ├── CapacityMeters.tsx
        │   ├── HabitationCard.tsx
        │   ├── Header.tsx
        │   ├── TacticalMap.tsx
        │   └── WhatIfSlider.tsx
        ├── mock/
        │   └── offlineFallback.ts
        └── types/
            └── index.ts
```

---

## 2. Deterministic Mathematical Equations & Domain Logic

All decision logic within SURAKSHA is fully deterministic, stateless, and mathematically auditable. The computational pipeline executes across four primary mathematical modules:

```
+----------------------------------------------------------------------------------------------------+
|                                    SURAKSHA MATHEMATICAL PIPELINE                                  |
+----------------------------------------------------------------------------------------------------+
|                                                                                                    |
|  [ Module A: Composite Risk Index (CRI) ]                                                          |
|  Inputs: Landslide Risk, Flood Risk, Slope Angle, Vulnerability Score, Road Cutoff Risk            |
|  Output: CRI Score (0-100), Risk Tier (CRITICAL_RED_ZONE / AMBER_ZONE / YELLOW_MONITORING)          |
|                                                                                                    |
+--------------------------------------------------+-------------------------------------------------+
                                                   |
                                                   v
+--------------------------------------------------+-------------------------------------------------+
|                                                                                                    |
|  [ Module B: Sphere Humanitarian Carrying-Capacity Engine ]                                        |
|  Formula: Gross = min(Floor(Area/3.5), Floor(Water/15.0), Toilets * 25)                            |
|  Formula: Net Effective = max(0, Gross - Existing Occupancy)                                       |
|  Formula: Residual Headroom = Net Effective - Displaced Population                                 |
|                                                                                                    |
+--------------------------------------------------+-------------------------------------------------+
                                                   |
                                                   v
+--------------------------------------------------+-------------------------------------------------+
|                                                                                                    |
|  [ Module C: Site Feasibility Scoring (SFS) ]                                                      |
|  Weighted Multi-Criteria: Hazard Safety (30%), Capacity Adequacy (25%), Road Reliability (20%),    |
|                          Hospital Proximity (15%), Livelihood Continuity (10%)                      |
|                                                                                                    |
+--------------------------------------------------+-------------------------------------------------+
                                                   |
                                                   v
+--------------------------------------------------+-------------------------------------------------+
|                                                                                                    |
|  [ Module D: Rejection Gate & Audit Classification ]                                               |
|  Gates: Road Reliability < 40.0% OR Sanitation < 40 toilets -> OPERATIONALLY_REJECTED              |
|         Residual Headroom < 0 -> CAPACITY_DEFICIT                                                  |
|         Residual Headroom >= 0 & Passes Gates -> RECOMMENDED_PRIMARY / SECONDARY                   |
|                                                                                                    |
+----------------------------------------------------------------------------------------------------+
```

### Module A: Composite Risk Index (CRI)

The Composite Risk Index calculates the urgent physical hazard exposure and structural vulnerability of a source settlement.

$$\text{HazardComposite} = (0.60 \times \text{landslideRisk}) + (0.40 \times \text{floodRisk})$$

$$\text{TerrainMultiplier} = 1.0 + \left(\frac{\text{slopeDeg}}{90.0}\right)$$

$$\text{CRI} = \min\left(100.0, \, (0.40 \times \text{HazardComposite} \times \text{TerrainMultiplier}) + (0.30 \times \text{vulnerabilityScore}) + (0.30 \times \text{cutoffRisk})\right)$$

#### Classification Tiers:
- **$\text{CRI} \ge 80.0$:** `CRITICAL_RED_ZONE` $\rightarrow$ Relocation Horizon: `IMMEDIATE`
- **$60.0 \le \text{CRI} < 80.0$:** `AMBER_ZONE` $\rightarrow$ Relocation Horizon: `SHORT_TERM`
- **$\text{CRI} < 60.0$:** `YELLOW_MONITORING` $\rightarrow$ Relocation Horizon: `MONITORING`

---

### Module B: Sphere Humanitarian Capacity Limits (Theory of Constraints)

Absorption capacity is governed strictly by the physical resource that reaches its ceiling first, enforcing Sphere Project Humanitarian Minimum Standards:

$$\text{Cap}_{\text{Space}} = \left\lfloor\frac{\text{usableAreaSqm}}{3.5}\right\rfloor$$

$$\text{Cap}_{\text{Water}} = \left\lfloor\frac{\text{waterLpd}}{15.0}\right\rfloor$$

$$\text{Cap}_{\text{Sanitation}} = \text{toiletsCount} \times 25$$

$$\text{GrossCapacity} = \min\left(\text{Cap}_{\text{Space}}, \, \text{Cap}_{\text{Water}}, \, \text{Cap}_{\text{Sanitation}}\right)$$

$$\text{NetEffectiveCapacity} = \max\left(0, \, \text{GrossCapacity} - \text{existingOccupancy}\right)$$

$$\text{ResidualHeadroom} = \text{NetEffectiveCapacity} - \text{displacedPopulation}$$

#### Limiting Bottleneck Identification:
- If $\text{GrossCapacity} == \text{Cap}_{\text{Space}} \rightarrow$ `LIMITING_BOTTLENECK = "SHELTER_SPACE"`
- Else if $\text{GrossCapacity} == \text{Cap}_{\text{Water}} \rightarrow$ `LIMITING_BOTTLENECK = "POTABLE_WATER"`
- Else if $\text{GrossCapacity} == \text{Cap}_{\text{Sanitation}} \rightarrow$ `LIMITING_BOTTLENECK = "SANITATION_TOILETS"`

---

### Module C: Site Feasibility Score (SFS)

The composite feasibility index $SFS \in [0.0, 100.0]$ ranks candidate medium-term resettlement locations:

$$\text{CapacityAdequacy} = \min\left(100.0, \, \left(\frac{\text{NetEffectiveCapacity}}{\text{displacedPopulation}}\right) \times 100.0\right)$$

$$\text{HospitalScore} = \max\left(0.0, \, 100.0 - (\text{hospitalDistKm} \times 4.0)\right)$$

$$\text{SFS} = (0.30 \times \text{hazardSafety}) + (0.25 \times \text{CapacityAdequacy}) + (0.20 \times \text{roadReliability}) + (0.15 \times \text{HospitalScore}) + (0.10 \times \text{livelihoodScore})$$

---

### Module D: Rejection Gates & Recommendation Directives

Before a site is recommended, it must pass mandatory humanitarian and infrastructure survival gates:

```
IF (roadReliability < 40.0 OR toiletsCount < 40) THEN
    Status = "OPERATIONALLY_REJECTED"
ELSE IF (ResidualHeadroom < 0) THEN
    Status = "CAPACITY_DEFICIT"
ELSE
    Status = "RECOMMENDED_PRIMARY"
END IF
```

---

## 3. Relational Database Schemas (PostgreSQL / H2 Mode)

The data layer uses Spring Data JPA with standard SQL DDL compatible with both H2 in-memory mode (`MODE=PostgreSQL`) and enterprise PostgreSQL 15+.

### Table: `habitations`

```sql
CREATE TABLE habitations (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    lat DOUBLE PRECISION NOT NULL,
    lng DOUBLE PRECISION NOT NULL,
    population INT NOT NULL,
    slope_deg DOUBLE PRECISION NOT NULL,
    landslide_risk DOUBLE PRECISION NOT NULL,
    flood_risk DOUBLE PRECISION NOT NULL,
    vulnerability_score DOUBLE PRECISION NOT NULL,
    cutoff_risk DOUBLE PRECISION NOT NULL,
    composite_risk DOUBLE PRECISION NOT NULL,
    risk_zone VARCHAR(32) NOT NULL,
    horizon VARCHAR(32) NOT NULL
);
```

### Table: `relocation_sites`

```sql
CREATE TABLE relocation_sites (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    lat DOUBLE PRECISION NOT NULL,
    lng DOUBLE PRECISION NOT NULL,
    horizon_type VARCHAR(32) NOT NULL,
    usable_area_sqm DOUBLE PRECISION NOT NULL,
    water_lpd INT NOT NULL,
    toilets_count INT NOT NULL,
    existing_occupancy INT NOT NULL,
    hazard_safety DOUBLE PRECISION NOT NULL,
    road_reliability DOUBLE PRECISION NOT NULL,
    hospital_dist_km DOUBLE PRECISION NOT NULL,
    livelihood_score DOUBLE PRECISION NOT NULL
);
```

### Production Seed Dataset (`src/main/resources/data.sql`)

```sql
-- Clean tables
DELETE FROM habitations;
DELETE FROM relocation_sites;

-- Seed Origin Habitation: Nandikot Settlement (Joshimath Sector)
INSERT INTO habitations (
    id, name, lat, lng, population, slope_deg, landslide_risk, 
    flood_risk, vulnerability_score, cutoff_risk, composite_risk, risk_zone, horizon
) VALUES (
    'HAB-01', 
    'Nandikot Settlement (Joshimath Sector)', 
    30.5520, 
    79.5640, 
    2840, 
    42.0, 
    92.0, 
    74.0, 
    86.0, 
    88.0, 
    89.4, 
    'CRITICAL_RED_ZONE', 
    'IMMEDIATE'
);

-- Seed Horizon 1 Transit Shelter: Govt Model Inter-College Grounds
INSERT INTO relocation_sites (
    id, name, lat, lng, horizon_type, usable_area_sqm, water_lpd, 
    toilets_count, existing_occupancy, hazard_safety, road_reliability, 
    hospital_dist_km, livelihood_score
) VALUES (
    'SITE-C', 
    'Govt Model Inter-College Grounds', 
    30.5580, 
    79.5490, 
    'IMMEDIATE_SHELTER', 
    12000.0, 
    45000, 
    115, 
    0, 
    94.0, 
    90.0, 
    1.8, 
    50.0
);

-- Seed Candidate Site A: Gopeshwar Administrative Enclave
INSERT INTO relocation_sites (
    id, name, lat, lng, horizon_type, usable_area_sqm, water_lpd, 
    toilets_count, existing_occupancy, hazard_safety, road_reliability, 
    hospital_dist_km, livelihood_score
) VALUES (
    'SITE-A', 
    'Gopeshwar Administrative Enclave', 
    30.4120, 
    79.3240, 
    'PERMANENT_RESETTLEMENT', 
    16000.0, 
    55000, 
    150, 
    400, 
    96.0, 
    88.0, 
    2.4, 
    85.0
);

-- Seed Candidate Site B: Pipalkoti Industrial Shelf (The Counter-Intuitive Trap)
INSERT INTO relocation_sites (
    id, name, lat, lng, horizon_type, usable_area_sqm, water_lpd, 
    toilets_count, existing_occupancy, hazard_safety, road_reliability, 
    hospital_dist_km, livelihood_score
) VALUES (
    'SITE-B', 
    'Pipalkoti Industrial Shelf', 
    30.4310, 
    79.4320, 
    'PERMANENT_RESETTLEMENT', 
    25000.0, 
    18000, 
    30, 
    200, 
    91.0, 
    34.0, 
    18.5, 
    65.0
);
```

---

## 4. Strict REST API Specification

### Endpoint: Evaluate Habitation Relocation Strategy

- **URL:** `/api/v1/relocation/evaluate`
- **Method:** `POST`
- **Headers:** `Content-Type: application/json`, `Accept: application/json`

#### Request Payload (`EvaluateRequest.java`)

```json
{
  "habitationId": "HAB-01",
  "simulatedPopulation": 2840
}
```

#### Response Payload (`200 OK`) (`EvaluationResponse.java`)

```json
{
  "habitation": {
    "id": "HAB-01",
    "name": "Nandikot Settlement (Joshimath Sector)",
    "population": 2840,
    "compositeRisk": 89.4,
    "riskZone": "CRITICAL_RED_ZONE",
    "horizon": "IMMEDIATE",
    "landslide": 92.0,
    "flood": 74.0,
    "slopeDegrees": 42.0,
    "vulnerability": 86.0,
    "roadCutoffRisk": 88.0
  },
  "tacticalShelterImmediate": {
    "siteId": "SITE-C",
    "name": "Govt Model Inter-College Grounds",
    "type": "IMMEDIATE_SHELTER",
    "effectiveCapacity": 2850,
    "distanceKm": 2.1,
    "status": "VIABLE_FOR_IMMEDIATE_EVACUATION"
  },
  "candidateSites": [
    {
      "siteId": "SITE-A",
      "name": "Gopeshwar Administrative Enclave",
      "type": "PERMANENT_RESETTLEMENT",
      "feasibilityScore": 88.65,
      "recommendation": "RECOMMENDED_PRIMARY",
      "capacityAudit": {
        "grossByArea": 4571,
        "grossByWater": 3666,
        "grossBySanitation": 3750,
        "limitingBottleneck": "POTABLE_WATER",
        "effectiveCapacity": 3266,
        "residualHeadroom": 426,
        "isDeficit": false
      },
      "indicators": {
        "hazardSafety": 96.0,
        "roadReliability": 88.0,
        "hospitalDistanceKm": 2.4,
        "livelihoodAccess": 85.0
      },
      "decisionJustification": "Recommended as primary relocation haven. Absorbs entire displaced population of 2840 with +426 positive headroom. Potable water is the binding constraint (3,266 net capacity). Robust road reliability (88%) and secondary hospital proximity (2.4 km)."
    },
    {
      "siteId": "SITE-B",
      "name": "Pipalkoti Industrial Shelf",
      "type": "PERMANENT_RESETTLEMENT",
      "feasibilityScore": 51.65,
      "recommendation": "OPERATIONALLY_REJECTED",
      "capacityAudit": {
        "grossByArea": 7142,
        "grossByWater": 1200,
        "grossBySanitation": 750,
        "limitingBottleneck": "SANITATION_TOILETS",
        "effectiveCapacity": 550,
        "residualHeadroom": -2290,
        "isDeficit": true
      },
      "indicators": {
        "hazardSafety": 91.0,
        "roadReliability": 34.0,
        "hospitalDistanceKm": 18.5,
        "livelihoodAccess": 65.0
      },
      "decisionJustification": "Operationally rejected. Despite 25,000 sqm land area, acute sanitation bottleneck (30 toilets = 750 gross) yields only 550 net effective capacity, creating a severe deficit of -2290 persons. Critical access road reliability of 34% breaches minimum safety threshold (40%)."
    }
  ]
}
```

---

## 5. Non-Functional Specifications & Runtime Constraints

### 1. Zero-Dependency Spatial Distance Engine (Pure Java Haversine)

To eliminate brittle native C++ bindings (e.g., PostGIS, GDAL, GEOS) that frequently fail in offline deployment environments, all spatial distance computations execute in pure Java:

$$\Delta\phi = \text{radians}(\text{lat}_2 - \text{lat}_1), \quad \Delta\lambda = \text{radians}(\text{lng}_2 - \text{lng}_1)$$

$$a = \sin^2\left(\frac{\Delta\phi}{2}\right) + \cos(\text{radians}(\text{lat}_1))\cos(\text{radians}(\text{lat}_2))\sin^2\left(\frac{\Delta\lambda}{2}\right)$$

$$c = 2 \cdot \text{atan2}\left(\sqrt{a}, \sqrt{1-a}\right)$$

$$\text{Distance (km)} = 6371.0 \times c$$

### 2. High-Resilience CORS Configuration (`CorsConfig.java`)

```java
package com.suraksha.engine.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOriginPatterns("*")
                        .allowedMethods("GET", "POST", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(false)
                        .maxAge(3600);
            }
        };
    }
}
```

### 3. Sub-50ms Calculation SLA
The decision engine executes purely in-memory with zero disk I/O during the scoring loop. Benchmark SLA requirement:
- Evaluation of 1 Habitation across 10 Candidate Shelters $\le 15\text{ ms}$.
- Guaranteed p99 response latency $\le 50\text{ ms}$ over HTTP.

### 4. Client-Side Deterministic Offline Fail-Safe Contract

The frontend client maintains a fully synchronized TypeScript mock fallback (`src/mock/offlineFallback.ts`). If an `AxiosError`, network dropout, or server unavailability occurs, the UI immediately hydrates from the deterministic offline fallback without interrupting the disaster commander's operational workflow.

---
*SURAKSHA Technical Architecture Group — Ministry of Home Affairs NDRF & DM Division Initiative (SIH26191)*
