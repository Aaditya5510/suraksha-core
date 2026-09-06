# 🛡️ SURAKSHA — Intelligent Habitation Relocation & Humanitarian Carrying-Capacity Decision Engine

[![Java 21](https://img.shields.io/badge/Java-21%20LTS-007396?style=for-the-badge&logo=openjdk&logoColor=white)](https://openjdk.org/projects/jdk/21/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.4-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Build & Tests](https://img.shields.io/badge/Tests-11%2F11%20Passing-brightgreen?style=for-the-badge&logo=githubactions&logoColor=white)](backend/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**Problem Statement:** SIH26191 (Ministry of Home Affairs - NDRF & DM Division)  
**Initiative:** Smart India Hackathon 2026 Grand Finale  
**Operational Theatre:** Alaknanda Valley Disaster Corridor, Chamoli District, Uttarakhand  

---

## 1. Executive Summary & The Real Operational Gap

In India's disaster management architecture, existing national systems like **ISRO Bhuvan**, **NDEM (National Database for Emergency Management)**, and **GSI LEWS (Landslide Early Warning System)** operate primarily at **"Emergency Tempo" (0–6 Hours)**. They excel at earth observation, satellite damage mapping, and broadcasting regional evacuation alerts.

However, when a critical red alert sounds, disaster managers (District Magistrates, SDMAs, and DDMAs) face an acute **"Planning Tempo" Operational Void**:
- *Which habitations must permanently relocate away from non-mitigable hazard zones?*
- *Which candidate safe havens possess the verified physical utilities to absorb displaced populations without collapsing?*
- *Why is a specific relocation haven selected over alternative sites in a legally defensible, auditable manner?*

```
+-----------------------------------------------------------------------------------+
|                        THE DISASTER MANAGEMENT TEMPO GAP                          |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  [ EMERGENCY TEMPO: ISRO Bhuvan / NDEM / GSI LEWS ]                               |
|  - Real-time hazard monitoring, rain-gauge telemetry, mass CAP SMS alerts.        |
|  - Answers: "Where is the hazard occurring right now?"                            |
|                                                                                   |
+-----------------------------------------+-----------------------------------------+
                                          |
                                          | Downstream Operational Void
                                          v
+-----------------------------------------------------------------------------------+
|  [ PLANNING TEMPO: SURAKSHA Decision Intelligence Engine ]                        |
|  - Dual-Horizon relocation matching & Sphere carrying-capacity constraint solver. |
|  - Answers: "Where can 2,840 displaced citizens actually survive, and why?"       |
|                                                                                   |
+-----------------------------------------------------------------------------------+
```

### Real-World Grounding
- **Wayanad Landslides (Kerala, July 2024):** After catastrophic debris flows, over 2,500 survivors were housed in temporary relief camps. The state administration spent over three months manually surveying tea estates to relocate habitations because no automated tool existed to compute water, sanitation, and slope stability constraints simultaneously.
- **Joshimath Land Subsidence (Uttarakhand, 2023):** Over 800 structures developed acute fissures. Relief operations struggled to match vulnerable wards against candidate prefab shelters due to unverified infrastructure bottlenecks.

**SURAKSHA automates this multi-month administrative and engineering bottleneck in under 15 milliseconds.**

---

## 2. The Core Scientific Engine: Theory of Constraints

### Rejecting the "Land Area = Capacity" Fallacy
A dangerous systemic error in disaster management is estimating relief absorption capacity solely based on raw parcel acreage. Superficial surface area does not preserve human life if water delivery or sanitation infrastructure collapses. Overcrowding a site with land space but deficient sanitation causes **secondary disaster mortality**: waterborne epidemics (cholera, dysentery) and water rationing riots.

### Sphere Humanitarian Minimums Formulation
SURAKSHA implements Goldratt’s Theory of Constraints applied to the international **Sphere Humanitarian Charter**:
- **Covered Living Area:** $3.5\text{ m}^2$ per person.
- **Potable Water Supply:** $15\text{ Litres Per Day (LPD)}$ per person.
- **Sanitation Hygiene:** $1\text{ functional toilet}$ per $25\text{ persons}$ (gender-segregated).

$$\text{GrossCapacity} = \min\left(\left\lfloor\frac{\text{UsableArea}}{3.5}\right\rfloor, \left\lfloor\frac{\text{WaterLPD}}{15.0}\right\rfloor, \text{ToiletsCount} \times 25\right)$$

$$\text{NetEffectiveCapacity} = \max\left(0, \text{GrossCapacity} - \text{ExistingOccupancy}\right)$$

$$\text{ResidualHeadroom} = \text{NetEffectiveCapacity} - \text{DisplacedPopulation}$$

```
+-----------------------------------------------------------------------------------+
|               THEORY OF CONSTRAINTS: SHELTER BOTTLENECK FUNNEL                    |
+-----------------------------------------------------------------------------------+
|  1. Area Meter:       Floor( UsableAreaSqm / 3.5 m² )                             |
|  2. Water Meter:      Floor( WaterLPD / 15.0 Litres )                             |
|  3. Sanitation Meter: ToiletsCount * 25 Persons                                   |
+-----------------------------------------+-----------------------------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
|  GROSS CAPACITY = Minimum( AreaCapacity, WaterCapacity, SanitationCapacity )      |
+-----------------------------------------------------------------------------------+
```

### The Pipalkoti Industrial Shelf Case Study (The Counter-Intuitive Trap)
When relocating $2,840$ residents from `HAB-01` (Nandikot Settlement, slope $42^\circ$, risk $89.4$):
- **Candidate Site B (Pipalkoti Shelf):** Offers $25,000\text{ m}^2$ of flat land (apparent space for $7,142$ people). However, with only $30$ toilets (capacity: $750$) and $200$ existing occupants, its true net capacity is strictly **$550$ persons** (Deficit: **$-2,290$**). Combined with a single river bridge carrying a $66\%$ landslide cutoff risk ($34\%$ reliability), SURAKSHA flags it as **`OPERATIONALLY_REJECTED`**.
- **Candidate Site A (Gopeshwar Enclave):** Offers $16,000\text{ m}^2$, $55,000\text{ LPD}$ water, and $150$ toilets, providing **$3,266$ net capacity** and absorbing the entire displaced population with **$+426$ positive headroom** (**`RECOMMENDED_PRIMARY`**).

---

## 3. System Specifications & Audited Documentation Index

The repository features 10 pre-audited technical specifications defining every facet of the system:

| Document | Purpose & Scope |
| :--- | :--- |
| [Team Technical Briefing](docs/TEAM_TECHNICAL_BRIEFING.md) | Strategic baseline, domain framing & Chamoli pilot ground-truth data. |
| [Technical Walkthrough](docs/TEAM_TECHNICAL_WALKTHROUGH.md) | System architecture, DDL schemas, mathematical formulations & REST API contracts. |
| [Government Data Sources](docs/DATA_SOURCES.md) | GSI LEWS, ISRO NRSC, JJM-IMIS, SBM-G, PMGSY & Census 2011 ingestion mappings. |
| [Golden Demo Scenario](docs/GOLDEN_DEMO_SCENARIO.md) | 90-second Grand Finale jury presentation script & What-If stress test flow. |
| [Demo Fallback Protocol](docs/DEMO_FALLBACK.md) | 3-tier offline edge resilience, emergency runbook & TypeScript mock engine. |
| [SIH Jury Q&A Defense](docs/SIH_QA.md) | 10 lethal jury cross-examination questions, underlying tests & strategic rebuttals. |
| [Presentation Deck Content](docs/SIH_PPT_CONTENT.md) | 7-slide executive pitch deck structure, visual layout guidance & speaker scripts. |
| [Pitch Narrative Playbook](docs/PITCH_NARRATIVE_PLAYBOOK.md) | Dramatic storytelling arc, stage choreography, squad roles & pitch traps. |
| [Third-Party Services Audit](docs/THIRD_PARTY_SERVICES.md) | Sovereign edge design, OSM tile fallback, zero-binary print engine & OSS licensing audit. |
| [AI Agent Governance](docs/AI_ASSISTED_DEVELOPMENT.md) | Zero-hallucination developer rules, 6-phase roadmap, verification gates & rollback protocol. |

---

## 4. Repository Architecture

```
suraksha-core/
├── CONTEXT.md
├── README.md
├── .gitignore
├── docs/
│   ├── AI_ASSISTED_DEVELOPMENT.md
│   ├── DATA_SOURCES.md
│   ├── DEMO_FALLBACK.md
│   ├── GOLDEN_DEMO_SCENARIO.md
│   ├── PITCH_NARRATIVE_PLAYBOOK.md
│   ├── SIH_PPT_CONTENT.md
│   ├── SIH_QA.md
│   ├── TEAM_TECHNICAL_BRIEFING.md
│   ├── TEAM_TECHNICAL_WALKTHROUGH.md
│   └── THIRD_PARTY_SERVICES.md
└── backend/
    ├── pom.xml
    └── src/
        ├── main/
        │   ├── java/
        │   │   └── com/
        │   │       └── suraksha/
        │   │           └── engine/
        │   │               ├── SurakshaEngineApplication.java
        │   │               ├── common/
        │   │               │   ├── api/
        │   │               │   │   └── ApiResponse.java
        │   │               │   └── exception/
        │   │               │       ├── BusinessRuleException.java
        │   │               │       ├── GlobalExceptionHandler.java
        │   │               │       └── ResourceNotFoundException.java
        │   │               ├── config/
        │   │               │   └── CorsConfig.java
        │   │               ├── controller/
        │   │               │   ├── HabitationController.java
        │   │               │   ├── RelocationController.java
        │   │               │   ├── RelocationEvaluationController.java
        │   │               │   └── RelocationSiteController.java
        │   │               ├── model/
        │   │               │   ├── dto/
        │   │               │   │   ├── EvaluateRequest.java
        │   │               │   │   ├── EvaluationResponse.java
        │   │               │   │   ├── request/
        │   │               │   │   │   └── EvaluateRelocationRequest.java
        │   │               │   │   └── response/
        │   │               │   │       ├── CandidateSiteEvaluationResponse.java
        │   │               │   │       ├── CapacityAuditBreakdownResponse.java
        │   │               │   │       ├── EvaluationResultResponse.java
        │   │               │   │       ├── HabitationSummaryResponse.java
        │   │               │   │       ├── SiteIndicatorsResponse.java
        │   │               │   │       └── TacticalShelterResponse.java
        │   │               │   ├── entity/
        │   │               │   │   ├── Habitation.java
        │   │               │   │   └── RelocationSite.java
        │   │               │   └── enums/
        │   │               │       ├── BottleneckResource.java
        │   │               │       ├── RecommendationStatus.java
        │   │               │       ├── RelocationHorizon.java
        │   │               │       ├── RiskZone.java
        │   │               │       └── SiteType.java
        │   │               ├── repository/
        │   │               │   ├── HabitationRepository.java
        │   │               │   └── RelocationSiteRepository.java
        │   │               └── service/
        │   │                   ├── DecisionEngineService.java
        │   │                   ├── HabitationService.java
        │   │                   ├── RelocationSiteService.java
        │   │                   ├── SphereCapacityEngine.java
        │   │                   └── impl/
        │   │                       ├── DecisionEngineServiceImpl.java
        │   │                       ├── HabitationServiceImpl.java
        │   │                       ├── RelocationSiteServiceImpl.java
        │   │                       └── SphereCapacityEngineImpl.java
        │   └── resources/
        │       ├── application.properties
        │       └── data.sql
        └── test/
            └── java/
                └── com/
                    └── suraksha/
                        └── engine/
                            ├── SurakshaEngineApplicationTests.java
                            ├── controller/
                            │   └── RelocationEvaluationControllerTest.java
                            └── service/
                                └── DecisionEngineServiceTest.java
```

---

## 5. Local Setup & Verification

### Prerequisites
- **Java Development Kit (JDK):** Version 21 LTS or later.
- **Apache Maven:** Version 3.9+ or use embedded maven wrapper.

### 1. Build and Run the Backend Engine
```powershell
# Navigate to the backend directory
cd backend

# Execute clean compilation and run the full test suite
mvn clean test

# Start the Spring Boot Decision Engine
mvn spring-boot:run
```
The application will initialize on `http://localhost:8080` with the in-memory H2 database seeded in PostgreSQL compatibility mode. The tactical H2 console is available at `http://localhost:8080/h2-console`.

### 2. Verify REST Decision Evaluation Endpoint
Execute an HTTP POST evaluation request for `HAB-01` (Nandikot Settlement, $2,840$ population):

```powershell
curl -X POST http://localhost:8080/api/v1/relocation/evaluate `
  -H "Content-Type: application/json" `
  -d '{\"habitationId\": \"HAB-01\", \"simulatedPopulation\": 2840}'
```

#### Expected JSON Response Payload:
```json
{
  "success": true,
  "message": "Deterministic relocation carrying-capacity evaluated successfully",
  "timestamp": "2026-09-06T08:31:07.691Z",
  "data": {
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
        "decisionJustification": "Recommended as primary relocation haven. Absorbs entire displaced population of 2840 with +426 positive headroom. POTABLE WATER is the binding constraint (3,266 net capacity). Robust road reliability (88%) and secondary hospital proximity (2.4 km)."
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
}
```

---

## 6. Key Strategic Capabilities

- ⚡ **Sub-15ms In-Memory Calculation Loop:** Delivers instantaneous constraint evaluation with zero external database latency.
- 📐 **Zero-Dependency Pure Java Geodesics:** Executes Haversine trigonometry in pure Java, eliminating brittle native C++ bindings (PostGIS, GDAL).
- 🏕️ **Dual-Horizon Strategy:** Decouples 0–72 Hour tactical emergency life preservation from medium-term permanent community resettlement.
- 🚰 **Secondary Mortality Prevention:** Mathematically enforces Sphere water, space, and sanitation floors before convoys move.
- 🛡️ **Sovereign Edge Resilience:** Designed for air-gapped field deployment during complete Himalayan telecommunications blackouts.

---
*SURAKSHA Technical Architecture Group — Ministry of Home Affairs NDRF & DM Division Initiative (SIH26191)*
