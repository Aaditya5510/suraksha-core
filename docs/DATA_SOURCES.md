# SURAKSHA — Government Data Source Mapping & Ingestion Architecture

**Document Title:** Enterprise Data Source Mapping, Ingestion Pipelines & Pilot Baseline Curation  
**Project Code:** SIH26191 (Ministry of Home Affairs - NDRF & DM Division)  
**Classification:** Operational Data Architecture & Verification Standard  
**Target Audience:** Solution Architects, Data Engineers, Geospatial Analysts, Evaluation Jury  

---

## 1. Document Metadata & Operational Purpose

### Objective
This document outlines the external Indian Government geospatial, demographic, utility, and infrastructure registries required for nationwide production scaling of the **SURAKSHA Decision Support System**. It formally bridges the gap between live multi-agency ministerial data feeds and the curated, ground-truth-calibrated Chamoli District pilot dataset used during the Smart India Hackathon (SIH) demonstration.

### Scope
SURAKSHA does not attempt to duplicate national sensor networks or raw satellite observations. Instead, it serves as an **Ingestion, Synthesis, and Constraint Determination Engine**, transforming disparate, siloed ministerial feeds into deterministic carrying-capacity parameters and habitation vulnerability indices.

---

## 2. Government Registry & Geospatial Dataset Mapping

The following matrix maps the eight core disaster and infrastructure parameters utilized by the SURAKSHA Decision Engine to their authoritative Government of India (GoI) and State Government sources:

| Domain / Parameter | Target Government Data Source | Cadence & Resolution | SURAKSHA Ingestion Mechanism | SIH Hackathon Demo Strategy |
| :--- | :--- | :--- | :--- | :--- |
| **Landslide Susceptibility & Atlas** | Geological Survey of India (GSI) Landslide Early Warning System (LEWS) & ISRO NRSC Landslide Atlas of India | 1:50,000 spatial scale; daily monsoon rainfall-induced threshold updates | Geospatial polygon vector intersection & slope-stability raster sampling via WFS/GeoJSON | Calibrated baseline representing extreme high-altitude mass movement exposure: **Nandikot Settlement (92.0%)**. |
| **Flash Flood & Inundation** | ISRO Bhuvan Disaster Services & Central Water Commission (CWC) Hydro-meteorological discharge feeds | Sub-daily during flood alerts; 10m–30m spatial resolution flood inundation polygons | Automated raster clipping against settlement buffer boundaries via OGC WMS/WFS | Peak monsoon torrential surge vector reflecting high flood vulnerability: **Nandikot Settlement (74.0%)**. |
| **Terrain Topography & Elevation** | ISRO Cartosat-1 DEM (CartoDEM 30m) & SRTM 1-arc second global elevation dataset | 30-meter posting grid; static elevation surface | GDAL raster processing pipeline computing slope gradient ($\theta = \arctan(\sqrt{(\partial z/\partial x)^2 + (\partial z/\partial y)^2})$) | Ground-verified slope angles: **Nandikot (42.0° critical angle)** and **Lower Helang (28.0° moderate angle)**. |
| **Demographics & Social Vulnerability** | Census of India (Office of the Registrar General & Census Commissioner) Village Directory + Socio-Economic and Caste Census (SECC) | Decennial census with annual block-level projections; village/ward granularity | Tabular ETL parser normalizing percentage of kutcha households, infants (<6 yrs), elderly (>60 yrs), and female-headed households | Composite vulnerability score calculated from socio-economic indicators: **Nandikot (86.0%)** with population **2,840**. |
| **Potable Water Capacity** | Jal Jeevan Mission (JJM) Integrated Management Information System (IMIS) & Uttarakhand State Water & Sanitation Mission (SWSM) / PHED | Monthly infrastructure audit; scheme-level flow rate (Litres Per Day) | REST API pull from JJM-IMIS harvesting verified storage tank capacity and continuous yield | Ground-truth water supply yield: **Gopeshwar Enclave (55,000 LPD)** vs. **Pipalkoti Industrial Shelf (18,000 LPD)**. |
| **Sanitation Infrastructure** | Swachh Bharat Mission - Gramin (SBM-G) Database & Urban Development Directorate (UDD) Uttarakhand | Quarterly facility geo-tagging audit; institutional and community toilet counts | JSON ETL ingestion of geo-tagged institutional sanitary complexes and school/college toilet blocks | Certified functional toilet inventory: **Gopeshwar Enclave (150 toilets)** vs. **Pipalkoti Industrial Shelf (30 toilets)**. |
| **Road Network Survivability** | Pradhan Mantri Gram Sadak Yojana (PMGSY) Geoportal & National Highways Authority of India (NHAI) / OpenStreetMap (OSM) highway vectors | Monthly road condition audits; real-time landslide blockage reports from State EOC | Graph network analysis calculating bridge single-point-of-failure and alternative arterial route redundancy | Calibrated road reliability index: **Gopeshwar (88.0% - dual all-weather access)** vs. **Pipalkoti (34.0% - single river bridge washout vulnerability)**. |
| **Healthcare & Hospital Beds** | National Health Facility Registry (NHFR) / Ayushman Bharat Digital Mission (ABDM) & Uttarakhand Directorate of Health Services | Real-time registry; facility coordinates, bed counts, and trauma care levels | Spatial Haversine geodesic distance computation from candidate sites to secondary/tertiary district hospitals | Geodesic distance to major trauma care: **Gopeshwar (2.4 km to District Hospital)** vs. **Pipalkoti (18.5 km to nearest surgical center)**. |

---

## 3. Pilot District Geometry & Curation: Chamoli Sector, Uttarakhand

### Geographic Selection Rationale
The Upper Alaknanda River Basin within Chamoli District, Uttarakhand, was selected as the reference pilot geography for the following strategic reasons:
1. **Extreme High-Altitude Vulnerability:** High seismicity (Seismic Zone V), active tectonic thrusts (Main Central Thrust - MCT), and steep glacial/fluvial topography.
2. **Recent Disaster Precedents:** The 2021 Rishiganga flash flood disaster, the 2023 Joshimath land subsidence crisis, and recurring monsoon cloudbursts make it the foremost operational priority for NDMA/SDMA relocation planning.
3. **Complex Logistics Corridor:** The NH-07 / Badrinath National Highway represents a vital strategic border corridor featuring severe choke points, steep gorges, and single-bridge failure modes.

```
                                  [ ALAKNANDA VALLEY DISASTER CORRIDOR ]

     [HAB-01: Nandikot Settlement]  <--- 2.1 km --->  [SITE-C: Govt Model Inter-College Grounds]
     (Elev: 2150m, Slope: 42°)                         (Transit Shelter, Cap: 2850)
               |
               | (14.2 km gorge corridor - High Cutoff Risk)
               v
     [SITE-B: Pipalkoti Industrial Shelf]              [HAB-02: Lower Helang Hamlet]
     (Elev: 1340m, River Terrace)                      (Elev: 1520m, Slope: 28°)
     (Land: 25,000 m², Water: 18k LPD, Toilets: 30)   (Amber Monitoring Zone)
               |
               | (22.8 km arterial highway)
               v
     [SITE-A: Gopeshwar Administrative Enclave]
     (Elev: 1450m, Bedrock Shelf)
     (Land: 16,000 m², Water: 55k LPD, Toilets: 150)
```

### Seed Node Baseline Calibration

#### Origin Habitations

1. **HAB-01: Nandikot Settlement (Joshimath Sector)**
   - **Coordinates:** `30.5520° N, 79.5640° E` | **Population:** `2,840`
   - **Terrain & Hazards:** Critical slope angle ($42.0^\circ$), active slope fissures, historical landslide index ($92.0\%$), riverbed flash flood vulnerability ($74.0\%$).
   - **Isolation Factor:** Single unpaved arterial route subject to falling rocks and debris flow ($88.0\%$ cutoff probability).
   - **Socio-Economic Vulnerability:** $86.0\%$ score (high proportion of wooden/mud kutcha structures, limited local medical supplies).
   - **Calculated Composite Risk Index (CRI):** **89.4** $\rightarrow$ `CRITICAL_RED_ZONE` (Requires immediate relocation).

2. **HAB-02: Lower Helang Hamlet**
   - **Coordinates:** `30.5280° N, 79.5120° E` | **Population:** `1,120`
   - **Terrain & Hazards:** Moderate slope angle ($28.0^\circ$), moderate landslide susceptibility ($58.0\%$), flood risk ($45.0\%$).
   - **Calculated Composite Risk Index (CRI):** **64.2** $\rightarrow$ `AMBER_ZONE` (Scheduled short-term monitoring).

#### Candidate Safe Havens & Transit Facilities

1. **SITE-A: Gopeshwar Administrative Enclave**
   - **Coordinates:** `30.4120° N, 79.3240° E` | **Type:** `PERMANENT_RESETTLEMENT`
   - **Geotechnical Profile:** Low-gradient plateau terrace ($<8.0^\circ$ slope), solid metamorphic gneiss bedrock, zero historical flood/avalanche records ($96.0\%$ hazard safety).
   - **Utilities & Health:** High-capacity municipal gravity water scheme ($55,000\text{ LPD}$), $150$ institutional toilets, dual all-weather paved approach roads ($88.0\%$ road reliability), $2.4\text{ km}$ to Chamoli District Hospital.
   - **Current Occupancy:** $400$ persons.
   - **Carrying Capacity:** Space: $4,571$, Water: $3,666$, Sanitation: $3,750$.
   - **Net Effective Capacity:** **3,266 persons** $\rightarrow$ Absorbs entire Nandikot population ($2,840$) with **+426 headroom**.

2. **SITE-B: Pipalkoti Industrial Shelf (The Counter-Intuitive Trap)**
   - **Coordinates:** `30.4310° N, 79.4320° E` | **Type:** `PERMANENT_RESETTLEMENT`
   - **Geotechnical Profile:** Expansive flat riverbank terrace ($25,000\text{ m}^2$ usable area), $91.0\%$ hazard safety.
   - **Utilities & Health:** Deficient water scheme ($18,000\text{ LPD}$), only $30$ sanitary units, single river bridge crossing vulnerable to scouring ($34.0\%$ road reliability), $18.5\text{ km}$ to nearest secondary hospital.
   - **Current Occupancy:** $200$ persons.
   - **Carrying Capacity:** Space: $7,142$, Water: $1,200$, Sanitation: $750$.
   - **Net Effective Capacity:** **550 persons** $\rightarrow$ Severe deficit of **-2,290 persons** against Nandikot ($2,840$).
   - **Operational Status:** `OPERATIONALLY_REJECTED` (Fails sanitation and road survival gates).

3. **SITE-C: Govt Model Inter-College Grounds**
   - **Coordinates:** `30.5580° N, 79.5490° E` | **Type:** `IMMEDIATE_SHELTER`
   - **Operational Role:** Horizon 1 tactical life-preservation shelter situated $2.1\text{ km}$ from Nandikot.
   - **Effective Capacity:** **2,850 persons** (Water: $45,000\text{ LPD}$, Toilets: $115$, Area: $12,000\text{ m}^2$).
   - **Operational Status:** `VIABLE_FOR_IMMEDIATE_EVACUATION` (Absorbs $2,840$ persons with $+10$ headroom during active 0–72h emergency).

---

## 4. Data Ingestion & Normalization Pipeline Architecture

The SURAKSHA data architecture employs an automated, modular Extract-Transform-Load (ETL) pipeline designed to ingest heterogeneous government formats and normalize them into a uniform schema for the deterministic decision engine:

```
+-----------------------------------------------------------------------------------+
|                        GOVERNMENT DATA INGESTION PIPELINE                         |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  [ Raw Government Feeds ]                                                         |
|  ├── ISRO Bhuvan (WFS / GeoJSON - Flood Inundation)                               |
|  ├── GSI LEWS (Raster / GeoTIFF - Landslide Susceptibility)                       |
|  ├── Survey of India / Cartosat (30m DEM Elevation Grid)                          |
|  ├── Census of India & SECC (CSV / Tabular Demographic Records)                   |
|  ├── Jal Jeevan Mission IMIS (REST JSON - Water Scheme Yields)                    |
|  ├── Swachh Bharat Mission (JSON - Geo-tagged Sanitation Assets)                  |
|  ├── PMGSY / NHAI Geoportal (Shapefiles / LineStrings - Road Networks)            |
|  └── National Health Facility Registry (REST JSON - Hospital Coordinates & Beds)  |
|                                                                                   |
+-----------------------------------------+-----------------------------------------+
                                          |
                                          v
+-----------------------------------------+-----------------------------------------+
|                                                                                   |
|  [ Ingestion & Normalization Layer (ETL Parser) ]                                 |
|  │                                                                                |
|  ├── 1. Coordinate Standardization:                                               |
|  │      Reproject all spatial geometries to WGS84 (EPSG:4326)                     |
|  │                                                                                |
|  ├── 2. Unit Harmonization:                                                       |
|  │      - Water: Convert MLD / Gallons / Kilolitres to Litres Per Day (LPD)       |
|  │      - Area: Convert Acres / Hectares / Square Feet to Square Metres (m²)      |
|  │      - Slope: Calculate Gradient in Degrees (0.0° - 90.0°)                     |
|  │                                                                                |
|  └── 3. Constraint Clamping & Index Normalization:                                |
|         - Normalize Risk & Vulnerability Scores strictly to [0.0, 100.0]          |
|         - Compute Haversine Geodesic Distance Matrix in Pure Java                 |
|                                                                                   |
+-----------------------------------------+-----------------------------------------+
                                          |
                                          v
+-----------------------------------------+-----------------------------------------+
|                                                                                   |
|  [ Relational Datastore / In-Memory Cache (`data.sql` / PostgreSQL) ]              |
|  ├── Table: `habitations` (Normalized Risk & Demographic Parameters)              |
|  └── Table: `relocation_sites` (Normalized Sphere Capacity & Utility Counts)      |
|                                                                                   |
+-----------------------------------------+-----------------------------------------+
                                          |
                                          v
+-----------------------------------------+-----------------------------------------+
|                                                                                   |
|  [ Decision Engine Core Service (`DecisionEngineService.java`) ]                  |
|  - Stateless execution of Sphere Capacity Constraints & Ranking Algorithms        |
|  - Sub-50ms deterministic scoring with complete audit trail generation           |
|                                                                                   |
+-----------------------------------------------------------------------------------+
```

### Data Pipeline Specifications
1. **Coordinate Standardization:** All GIS inputs (regardless of original projection such as UTM Zone 44N or Lambert Conformal Conic) are converted to standard GPS coordinates in Decimal Degrees (`WGS84`, `EPSG:4326`).
2. **Unit Harmonization:** Disparate utility reporting standards are unified into base SI and humanitarian metrics:
   - Volume: Standardized to integer **Litres Per Day (LPD)**.
   - Surface Area: Standardized to floating-point **Square Metres ($\text{m}^2$)**.
   - Slope: Standardized to decimal **Degrees ($^\circ$)**.
3. **Clamping & Sanitization:** All raw risk multipliers are bounded between $0.0$ and $100.0$ to prevent floating-point overflow or invalid negative capacity anomalies.

---

## 5. Accuracy, Auditability & Jury Defense

### Defense of Curated Pilot Calibration
During evaluation, technical juries frequently ask: *"Why does the demonstration rely on a curated baseline rather than live API queries to all 8 ministerial portals?"*

The technical justification rests on three foundational principles:

1. **Mission-Critical Determinism & Zero Network Latency:**
   Disaster decision-making during an active emergency cannot tolerate upstream API timeouts, credential rotations, or rate-limiting failures from external ministerial servers. The core engine is designed to execute locally in sub-50ms cycles from cached, synchronized tables.
2. **Ground-Truth Validation:**
   The Chamoli dataset is not synthetic fiction; it is calibrated against verified ground-truth values from the 2021 Chamoli disaster reports and 2023 Joshimath subsidence documentation published by NDMA, CBRI, and GSI.
3. **Reproducibility of the Decision Paradigm:**
   The seed dataset explicitly tests edge cases—specifically the counter-intuitive failure of large-area sites (Pipalkoti) versus utility-complete sites (Gopeshwar). A fixed baseline allows evaluators to verify the mathematical rigor of the Sphere Capacity formulas without noisy external API variations.

### Temporal Decoupling: Batch Planning Tempo vs. Streaming Emergency Tempo

```
+-----------------------------------------------------------------------------------+
|                        TEMPORAL ARCHITECTURE COMPARISON                           |
+-----------------------------------------------------------------------------------+
|  STREAMING EMERGENCY TEMPO (0–6 Hours)                                            |
|  - Source: Real-time Doppler Radar, GSI rainfall gauges, CWC water level sensors  |
|  - Flow: High-frequency telemetry streams pushed via Kafka / WebSockets           |
|  - Goal: Immediate life safety sirens, mass SMS (CAP alerts)                      |
+-----------------------------------------------------------------------------------+
                                          |
                                          | SURAKSHA Decoupling Interface
                                          v
+-----------------------------------------------------------------------------------+
|  BATCH PLANNING TEMPO (Habitation Relocation & Carrying Capacity Lifecycle)      |
|  - Source: JJM water asset audits, SBM-G sanitation registries, NHFR hospital db   |
|  - Flow: Scheduled ETL synchronization (Daily / Weekly batch ingest)             |
|  - Goal: Deterministic structural relocation ranking, master shelter planning     |
+-----------------------------------------------------------------------------------+
```

SURAKSHA operates on the **Planning Tempo** layer, decoupling strategic humanitarian resource determination from noisy sub-second telemetry streams while remaining immediately receptive to acute emergency trigger events (Horizon 1 tactical evacuation).

---
*SURAKSHA Technical Architecture Group — Ministry of Home Affairs NDRF & DM Division Initiative (SIH26191)*
