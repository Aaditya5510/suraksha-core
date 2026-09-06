# SURAKSHA — Team Technical Briefing & Strategic Baseline

**Problem Statement:** SIH26191 (Ministry of Home Affairs - NDRF & DM Division)  
**Scope:** Habitation-Level Relocation & Humanitarian Carrying-Capacity Decision System  
**Document Classification:** Technical Architecture & Operational Domain Reference  
**Target Audience:** Engineering Team, Domain Specialists, SDMA/NDMA Technical Evaluators  

---

## 1. Executive Summary & Problem Framing

SURAKSHA addresses a mission-critical gap in India's disaster management architecture: the absence of a deterministic, habitation-level decision support system for post-disaster resettlement and capacity-bounded evacuation. 

While existing national platforms excel at early warning dissemination and immediate hazard observation, disaster management authorities (NDMA, SDMAs, DDMAs) currently lack computational systems to evaluate whether a vulnerable Himalayan or riverine settlement requires immediate tactical evacuation or permanent resettlement, which candidate safe havens possess the verified physical carrying capacity to absorb displaced populations, and why a specific site is mathematically selected over alternatives.

SURAKSHA operationalizes internationally accepted Sphere Humanitarian Standards and multi-criteria spatial constraints into an auditable, deterministic decision engine.

---

## 2. The Real Operational Gap: Emergency Tempo vs. Planning Tempo

India's disaster tech ecosystem hosts sophisticated geospatial platforms, including:
- **ISRO Bhuvan / NDEM (National Database for Emergency Management):** Earth observation, flood inundation mapping, and macro-satellite damage assessment.
- **GSI LEWS (Landslide Early Warning System):** Regional rainfall-threshold-based landslide hazard modeling.
- **NDMA SACHET (CAP-based Early Warning):** Bulk SMS and broadcast emergency alerts to populations at risk.

### The Tempo Disconnect

| Operational Vector | Existing National Portals | SURAKSHA Decision Engine |
| :--- | :--- | :--- |
| **Operational Tempo** | **Emergency Tempo (0–6 Hours):** Real-time monitoring, broad alerts, situational awareness. | **Planning Tempo (Habitation Lifecycle & Tactical 0–72h):** Structural resettlement, resource allocation, absorption feasibility. |
| **Core Question** | "Where is the hazard occurring right now?" | "Which specific habitations must permanently relocate, which candidate sites can absorb them safely, and why?" |
| **Spatial Granularity** | Regional / District / Tehsil polygon overlays. | Habitation / Village / Revenue Khasra pinpoint coordinates. |
| **Humanitarian Modeling** | Static shelter listing with unverified capacity. | Dynamic Theory-of-Constraints bottleneck calculations based on Sphere Minimums. |
| **Output Type** | Heatmaps, alert broadcasts, and situational maps. | Deterministic relocation matrices, bottleneck audit logs, and actionable DDMA evacuation orders. |

### The SURAKSHA 5-Point Decision Matrix

SURAKSHA answers five structural questions without ambiguity:

1. **WHO:** Identifies the precise vulnerable habitation (e.g., Nandikot Settlement) utilizing composite multi-hazard risk scores (slope instability, historical landslides, flood proximity, road cutoff vulnerability).
2. **WHEN:** Determines whether relocation follows Horizon 1 (0–72 Hour tactical evacuation to transit relief shelters) or Horizon 2 (Medium-term/permanent habitation resettlement).
3. **WHERE:** Ranks verified, georeferenced candidate safe havens based on terrain safety, access route reliability, and critical infrastructure proximity.
4. **HOW MANY:** Calculates the binding resource limit (Net Effective Carrying Capacity) to enforce strict population intake caps before site saturation.
5. **WHY:** Delivers fully auditable, deterministic reasoning showing exact mathematical step-by-step scoring, eliminating subjective or political bias during crisis operations.

---

## 3. Dual-Horizon Relocation Strategy

Relocation operations fail when emergency relief camps are conflated with long-term resettlement sites. SURAKSHA bifurcates the operational pipeline into two distinct execution horizons:

```
+-----------------------------------------------------------------------------------+
|                           SURAKSHA DUAL-HORIZON PIPELINE                          |
+-----------------------------------------------------------------------------------+
                                          |
                   [ Composite Habitation Risk Evaluation ]
                                          |
                +-------------------------+-------------------------+
                |                                                   |
                v                                                   v
   [ HORIZON 1: TACTICAL EVACUATION ]              [ HORIZON 2: HABITATION RESETTLEMENT ]
   - Timeframe: 0–72 Hours                         - Timeframe: Medium-Term / Permanent
   - Driver: Life Preservation                     - Driver: Chronic Red Zone Inhabitability
   - Focus: Transit Relief Shelters                - Focus: Sustainable Permanent Relocation
   - Standard: Strict Sphere Minimums              - Standard: Infrastructure & Access Stability
   - Constraints: Usable Space, Water, Toilets     - Constraints: Road Cutoff, Health Proximity
```

### Horizon 1: Immediate Tactical Evacuation (0–72 Hours)
- **Objective:** Immediate preservation of human life during sudden-onset catastrophic triggers (e.g., cloudbursts, active slope liquefaction, glacial lake outburst floods).
- **Target Facilities:** Designated transit relief shelters, school compounds, community halls, and prefabricated military-style tent cities within immediate transit radius.
- **Humanitarian Constraints:** Enforces non-negotiable Sphere Humanitarian Minimums:
  - **Water Supply:** Minimum 15 Litres Per Day (LPD) per person for drinking and basic hygiene.
  - **Covered Living Area:** Minimum 3.5 m² per person of usable covered shelter space.
  - **Sanitation Infrastructure:** Minimum 1 functional toilet per 25 persons, separated by gender.

### Horizon 2: Medium-Term & Permanent Habitation Relocation (Planning Tempo)
- **Objective:** Planned resettlement of entire communities situated in persistent, non-mitigable Red Zones exhibiting recurring mass wasting or foundation subsidence.
- **Target Facilities:** Master-planned resettlement enclaves, administrative hubs, and geotechnically stable plateau shelves.
- **Evaluation Criteria:**
  - **Terrain Safety:** Low slope angle (< 15°), geologically stable bedrock, zero flood/avalanche inundation paths.
  - **All-Weather Road Access:** Multi-route arterial connectivity with resilient bridge crossings.
  - **Healthcare Proximity:** Secondary/tertiary hospital accessibility within critical travel time (< 5 km).
  - **Livelihood & Civic Continuity:** Integration with viable economic zones, schools, and civic infrastructure.

---

## 4. The Sphere-Standard Carrying-Capacity Engine

### The Fallacy of "Land Area = Capacity"
A standard systemic error in emergency management is estimating relief camp absorption capacity solely on gross land parcel area (e.g., dividing total acreage by an arbitrary factor). In real-world disaster operations, land area does not preserve human life if water delivery or waste handling collapses. 

Overcrowding a site with land space but deficient sanitation leads to secondary mortality:
- Outbreaks of cholera, dysentery, and waterborne epidemics.
- Water rationing riots and civil breakdown.
- Complete system collapse requiring emergency re-evacuation during an active crisis.

### Mathematical Formulation: Theory of Constraints

SURAKSHA implements Goldratt's Theory of Constraints applied to humanitarian logistics. A shelter's gross capacity is strictly governed by its most constrained resource:

$$\text{GrossCapacity} = \min\left(\left\lfloor\frac{\text{UsableArea}}{3.5}\right\rfloor, \left\lfloor\frac{\text{WaterLPD}}{15.0}\right\rfloor, \text{ToiletsCount} \times 25\right)$$

$$\text{NetEffectiveCapacity} = \max\left(0, \text{GrossCapacity} - \text{ExistingOccupancy}\right)$$

$$\text{ResidualHeadroom} = \text{NetEffectiveCapacity} - \text{DisplacedPopulation}$$

### Bottleneck Identification Rules
1. **Area Bottleneck:** Occurs when $\lfloor\text{UsableArea} / 3.5\rfloor$ is the minimum value.
2. **Water Bottleneck:** Occurs when $\lfloor\text{WaterLPD} / 15.0\rfloor$ is the minimum value.
3. **Sanitation Bottleneck:** Occurs when $\text{ToiletsCount} \times 25$ is the minimum value.

If $\text{ResidualHeadroom} \ge 0$, the candidate site can safely absorb the entire displaced population. If $\text{ResidualHeadroom} < 0$, the site suffers from a capacity deficit equal to $|\text{ResidualHeadroom}|$, mandating either load-splitting across multiple sites or complete operational rejection.

---

## 5. Pilot Geography: Chamoli District, Uttarakhand

The system is calibrated using ground-truth operational baseline parameters from the vulnerable Joshimath-Chamoli disaster corridor in Uttarakhand.

### Master Baseline Data Table

| Entity Type | Name / Location | Coordinates (Lat, Lng) | Population / Area | Critical Hazard & Resource Metrics | Calculated Capacity / Risk | Operational Status & Decision |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Origin Habitation** | Nandikot Settlement (Joshimath Sector) | 30.5520° N, 79.5640° E | Pop: 2840 | Slope: 42°<br>Landslide Risk: 92%<br>Flood Risk: 74%<br>Road Cutoff Risk: 88%<br>Vulnerability: 86% | **Composite Risk: 89.4**<br>(CRITICAL_RED_ZONE) | **Horizon: IMMEDIATE**<br>Mandatory total relocation required. |
| **Horizon 1 Facility** | Govt Model Inter-College Grounds | 30.5580° N, 79.5490° E | Distance: 2.1 km | Transit relief shelter with emergency water/sanitation mobilization | **Effective Capacity: 2850** | **IMMEDIATE_SHELTER**<br>Capable of absorbing 2840 persons (Headroom: +10). |
| **Candidate Site A** | Gopeshwar Administrative Enclave | 30.4120° N, 79.3240° E | Usable Area: 16,000 m² | Water: 55,000 LPD<br>Toilets: 150<br>Occupancy: 400<br>Terrain Safety: 96%<br>Road Reliability: 88%<br>Hospital Dist: 2.4 km | Space Cap: 4,571<br>Water Cap: 3,666<br>Sanitation Cap: 3,750<br>Gross: 3,666<br>**Net Effective: 3,266** | **RECOMMENDED_PRIMARY**<br>Absorbs 2840 displaced persons with **+426 headroom**. Water is binding constraint. |
| **Candidate Site B** | Pipalkoti Industrial Shelf | 30.4310° N, 79.4320° E | Usable Area: 25,000 m² *(Large flat land)* | Water: 18,000 LPD<br>Toilets: 30<br>Occupancy: 200<br>Terrain Safety: 91%<br>Road Reliability: 34% *(Single bridge washout risk)*<br>Hospital Dist: 18.5 km | Space Cap: 7,142<br>Water Cap: 1,200<br>Sanitation Cap: 750<br>Gross: 750<br>**Net Effective: 550** | **OPERATIONALLY_REJECTED**<br>Severe sanitation bottleneck (550 vs 2840 required = -2290 deficit) and 66% road failure vulnerability. |

### In-Depth Analysis: The Pipalkoti "Counter-Intuitive Trap"
Candidate Site B (Pipalkoti Industrial Shelf) illustrates why naive visual or area-based site selection causes catastrophic humanitarian failures:
- **Surface Area Illusion:** At 25,000 m², it appears superficially superior to Gopeshwar (16,000 m²), offering apparent space for 7,142 people.
- **Resource Reality:** With only 30 toilets (capacity 750) and 18,000 LPD water (capacity 1,200), after subtracting existing occupancy (200), its true carrying capacity is strictly **550 people**.
- **Logistical Vulnerability:** It depends on a single river bridge with a 66% failure probability (34% road reliability) during monsoon events, and lies 18.5 km from secondary trauma care.
- **SURAKSHA Decision:** Automatic operational rejection with a detailed resource bottleneck breakdown.

---

## 6. Execution Constraints & Stack Boundaries

To guarantee deterministic behavior, zero-lag decision execution, and field resilience during disaster scenarios, the system architecture adheres to strict engineering boundaries:

```
+-----------------------------------------------------------------------------------+
|                               SURAKSHA ARCHITECTURE                               |
+-----------------------------------------------------------------------------------+
|  FRONTEND (React 18 + Vite + TypeScript + Tailwind CSS + Leaflet GIS)             |
|  - Real-time Interactive Geospatial Map (Origin vs Candidate Sites)               |
|  - Theory-of-Constraints Bottleneck Breakdown Visualizer                         |
|  - Client-Side Fallback Store (Deterministic Offline Mock Payload)                |
+-----------------------------------------------------------------------------------+
                                          |
                              REST API / JSON Payload
                                          |
+-----------------------------------------------------------------------------------+
|  BACKEND (Java 21 + Spring Boot 3.3+ + Spring Data JPA)                           |
|  - Deterministic Decision & Ranking Engine                                        |
|  - Sphere Standard Carrying-Capacity Calculator (Theory of Constraints)           |
|  - Pure Java Haversine Spatial Distance Calculator (No PostGIS/GDAL runtime)      |
|  - H2 Database (In-Memory, PostgreSQL Mode)                                       |
+-----------------------------------------------------------------------------------+
```

### Technology Stack Specifications

1. **Backend Service:**
   - **Runtime:** Java 21 LTS.
   - **Framework:** Spring Boot 3.3+.
   - **Data Layer:** Spring Data JPA with H2 in-memory database configured in PostgreSQL compatibility mode for instant zero-config startup and test reproducibility.
   - **Geospatial Math Engine:** Pure Java-side Haversine trigonometry for distance and spatial proximity calculations. No external native C-bindings, PostGIS extensions, or GDAL runtime binaries required.

2. **Frontend Client:**
   - **Framework:** React 18 with TypeScript and Vite.
   - **Styling:** Tailwind CSS with a high-contrast dark theme optimized for emergency operations centers (EOC).
   - **Geospatial Visualization:** Leaflet GIS with interactive vector overlays for habitations, shelters, candidate relocation sites, and vulnerable transit corridors.

3. **Spatial Calculation Rule:**
   - Great-circle distance calculations between habitations and candidate sites are computed in pure Java using the Haversine formula ($R = 6371.0\text{ km}$):
     $$a = \sin^2\left(\frac{\Delta\phi}{2}\right) + \cos(\phi_1)\cos(\phi_2)\sin^2\left(\frac{\Delta\lambda}{2}\right)$$
     $$c = 2 \cdot \text{atan2}\left(\sqrt{a}, \sqrt{1-a}\right)$$
     $$d = R \cdot c$$
   - Eliminates geospatial server dependency overhead while maintaining sub-meter precision suitable for tactical decisions.

4. **Resilience & Offline Guarantee:**
   - The frontend includes a comprehensive client-side offline mock payload representing the Chamoli pilot baseline.
   - If the backend REST service experiences network disconnection or field server dropouts during an operational demo or disaster deployment, the client seamlessly shifts to the local cache without UI freeze or error dialogs.

---

## 7. Verification & Audit Trail Compliance

Every decision generated by SURAKSHA outputs a machine-readable, human-verifiable audit trace containing:
1. `habitation_id` and calculated `composite_risk_score`.
2. `horizon_classification` (`HORIZON_1_IMMEDIATE` vs `HORIZON_2_MEDIUM_TERM`).
3. Evaluated candidate sites with step-by-step constraint metrics:
   - `space_capacity_gross`
   - `water_capacity_gross`
   - `sanitation_capacity_gross`
   - `binding_constraint` (`AREA` | `WATER` | `SANITATION`)
   - `net_effective_capacity`
   - `residual_headroom`
   - `access_route_reliability_index`
   - `selection_status` (`RECOMMENDED_PRIMARY` | `RECOMMENDED_SECONDARY` | `OPERATIONALLY_REJECTED`)
4. Deterministic rejection rationale (e.g., `"Rejected: Sanitation bottleneck limits capacity to 550 against displaced load of 2840; Access road cutoff probability 66% exceeds safe operational threshold"`).

---
*SURAKSHA Technical Architecture Group — Ministry of Home Affairs NDRF & DM Division Initiative (SIH26191)*
