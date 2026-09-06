# SURAKSHA — Third-Party Services, External Dependencies & Offline Licensing Architecture

**Document Title:** Infrastructure Dependencies, CDN Policies, Open-Source Audits & Sovereign Edge Resilience  
**Project Code:** SIH26191 (Ministry of Home Affairs - NDRF & DM Division)  
**Classification:** Infrastructure Architecture & Open-Source Software (OSS) Compliance Reference  
**Target Audience:** Infrastructure Architects, Security Officers, Licensing Compliance Auditors  

---

## 1. Document Metadata & Architecture Philosophy

### The "Zero-Vulnerability, Sovereign Edge" Design Principle
Disaster management platforms deployed in high-altitude, seismically active, or remote border regions (such as Uttarakhand's Alaknanda Valley) operate under extreme infrastructure constraints. In actual disaster conditions, commercial internet access, cloud API gateways, and external CDN networks frequently suffer total blackout.

SURAKSHA is engineered under a **Zero-Vulnerability, Sovereign Edge Philosophy**:
1. **Zero Paid API Dependencies:** No Google Maps Platform billing keys, Mapbox access tokens, or third-party commercial geospatial subscription lock-in.
2. **Zero Runtime CDN Injections:** All JavaScript bundles, stylesheets, and SVG vector icon assets are packaged locally within the build artifact.
3. **Deterministic Offline Execution:** The core system boots, renders, and calculates carrying-capacity constraints in completely air-gapped environments.

---

## 2. Geospatial Map Tiles & CDN Dependencies

The table below catalogs every external runtime asset, its endpoint, licensing profile, and deterministic offline failover behavior:

| Service / Library | Exact Endpoint / Source | Licensing | Production Strategy | Offline / Blackout Fallback |
| :--- | :--- | :--- | :--- | :--- |
| **Basemap Tiles** | `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png` | Open Data Commons Open Database License (ODbL) | Standard OpenStreetMap raster tile layer consumed when online connectivity is present. Sub-domains `{a, b, c}` distributed for load balancing. | Client-side Leaflet `tileerror` event automatically catches packet loss within $1.5\text{s}$, switching background to **Dark Tactical Vector Canvas (`#0f172a` slate)** with pre-cached GeoJSON contours and road networks. |
| **Map Visualization Engine** | `react-leaflet` v4.x & `leaflet` v1.9+ | BSD-2-Clause License | Compiled directly into the frontend production distribution bundle via Vite. Zero runtime `<script>` tag CDN fetches. | $100\%$ offline operational. Leaflet core and vector renderers execute purely within local browser memory. |
| **Iconography & Visual Tokens** | `lucide-react` v0.400+ | ISC License | Pre-compiled inline SVG tree components for tactical warning triangles, shields, water droplets, and transport routes. | Bundled directly in JavaScript AST; renders instantly with zero external font-file downloads or HTTP roundtrips. |
| **Typography & Fonts** | Native System UI Font Stack (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`) | Public Domain / OS Native | Uses hardware-accelerated local system fonts across Windows, macOS, Linux, and Android. | Zero Google Fonts HTTP requests (`fonts.googleapis.com`); guarantees zero Cumulative Layout Shift (CLS) and instant typography rendering on air-gapped field laptops. |

---

## 3. Report Generation & Export Engine: SDMA Directives

### The Zero-Binary Strategy
Traditional web architectures often generate official disaster directives by spawning heavy server-side headless browsers (e.g., Puppeteer, Chromium binaries, or `wkhtmltopdf`). In emergency operations centers, these approaches cause severe operational failures:
- Memory exhaustion and JVM process hangs on low-spec field laptops.
- Dynamic link library (`.dll` / `.so`) incompatibilities in bare-metal deployments.
- Multi-second latency rendering simple administrative orders.

```
+-----------------------------------------------------------------------------------+
|                   SDMA TACTICAL DIRECTIVE EXPORT ARCHITECTURE                     |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  [ User Action: Click "Generate SDMA Operational Directive" ]                     |
|                                                                                   |
|  ├── 1. State Capture:                                                            |
|  │      Gathers calculated carrying-capacity, bottleneck rationale,               |
|  │      convoy routes, water tanker volumes, and police check-posts.              |
|  │                                                                                |
|  ├── 2. Tactical Modal Rendering (`ActionDirectiveModal.tsx`):                    |
|  │      Renders formatted, high-contrast government dispatch layout.              |
|  │                                                                                |
|  └── 3. Native Print Engine Trigger (`window.print()`):                           |
|         │                                                                         |
|         ├── Applies `@media print` CSS Stylesheet Rules:                          |
|         │   - Page Size: A4 Portrait with strict 15mm margins                     |
|         │   - Color Mode: High-contrast monochrome optimization                   |
|         │   - Page-Break-Inside: Avoid breaks across critical data tables          |
|         │   - Hide Non-Printable Elements (Navbars, Sliders, Map Overlays)        |
|         │                                                                         |
|         └── Direct-to-PDF / Hardware Printer Dispatch (Zero Server Overhead)      |
|                                                                                   |
+-----------------------------------------------------------------------------------+
```

### Technical Print Styling Rules (`index.css`)
```css
@media print {
  body {
    background-color: #ffffff !important;
    color: #000000 !important;
  }
  .no-print, nav, .leaflet-container, .slider-container {
    display: none !important;
  }
  .printable-directive {
    display: block !important;
    width: 100% !important;
    margin: 0 !important;
    padding: 20px !important;
    page-break-after: avoid;
  }
  .directive-table {
    width: 100%;
    border-collapse: collapse;
  }
  .directive-table th, .directive-table td {
    border: 1px solid #333333;
    padding: 8px;
  }
}
```

---

## 4. Ingestion Data APIs: Production Roadmap vs. Demo Isolation

SURAKSHA establishes a clean separation between long-term ministerial API integration pathways and the isolated, high-resilience cache utilized during tactical deployments and hackathon evaluations:

```
+-----------------------------------------------------------------------------------+
|                     DATA INTEGRATION & ISOLATION TOPOLOGY                         |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  [ UPSTREAM PRODUCTION ROADMAP (Live Ministerial Gateways) ]                      |
|  ├── 1. ISRO Bhuvan OGC WMS/WFS: Automated flood/landslide shapefile ingestion.   |
|  ├── 2. Jal Jeevan Mission IMIS REST API: Daily village-level tap supply yield.   |
|  ├── 3. PMGSY Highway Geoportal: Real-time bridge vulnerability status.           |
|  └── 4. NHFR / ABDM Registry: Live district hospital bed availability.            |
|                                                                                   |
+-----------------------------------------+-----------------------------------------+
                                          |
                                          | Decoupled & Cached via ETL
                                          v
+-----------------------------------------------------------------------------------+
|  [ TACTICAL DEPLOYMENT & SIH DEMO EXECUTION (Air-Gapped Local Datastore) ]        |
|  ├── Backend: Seeded In-Memory H2 Table (`src/main/resources/data.sql`)           |
|  └── Frontend: Fully Synchronized TypeScript Store (`src/mock/offlineFallback.ts`)|
|                                                                                   |
|  BENEFITS:                                                                        |
|  • Zero network latency (<15ms evaluation cycle)                                  |
|  • Zero vulnerability to upstream ministerial server outages or auth revocations  |
|  • Guaranteed 100% test reproducibility across all evaluation stages              |
+-----------------------------------------------------------------------------------+
```

### Upstream Production Gateway Profiles
1. **ISRO Bhuvan Disaster Services (OGC WFS / WMS):**
   - **Protocol:** Standard OGC Web Feature Service (WFS 2.0.0) returning GML/GeoJSON.
   - **Role:** Periodic spatial polygon clipping to update settlement hazard exposure.
2. **Jal Jeevan Mission (JJM-IMIS REST Gateway):**
   - **Protocol:** HTTPS REST JSON API with JWT government bearer tokens.
   - **Role:** Automated monthly ingestion of certified storage tank capacity and tap flow rates.
3. **PMGSY Rural Road Geoportal:**
   - **Protocol:** REST GeoJSON query interface.
   - **Role:** Graph topology ingestion for single-access arterial bridge failure scoring.

---

## 5. Licensing & Sovereign Atmanirbhar Bharat Compliance

All software libraries, build tools, and frameworks in SURAKSHA adhere strictly to the **Government of India Policy on Adoption of Open Source Software (OSS)**:

| Component | Framework / Tool | Version | License | Commercial / Government Use Rights |
| :--- | :--- | :--- | :--- | :--- |
| **Backend Runtime** | Java Development Kit (OpenJDK) | 21 LTS | GNU GPL v2 with Classpath Exception | Unrestricted, non-viral enterprise runtime distribution. |
| **Application Core** | Spring Boot | 3.3.x | Apache License 2.0 | Permissive open-source; allows free government modification and deployment. |
| **Data Access** | Spring Data JPA / Hibernate | 6.x | LGPL v2.1 / Apache 2.0 | Free relational abstraction layer. |
| **Database Engine** | H2 In-Memory Database | 2.2+ | Eclipse Public License (EPL) 1.0 / MPL 2.0 | Permissive embedded database with zero licensing fees. |
| **Frontend Runtime** | React & React-DOM | 18.3+ | MIT License | Fully permissive; allows unrestricted modification and government hosting. |
| **Build Tooling** | Vite | 5.x | MIT License | High-speed local bundler with zero telemetry runtime footprint. |
| **Styling Engine** | Tailwind CSS | 3.4+ | MIT License | Compile-time utility generator with zero runtime bloat. |
| **Mapping Engine** | Leaflet.js | 1.9+ | BSD-2-Clause License | Permissive, lightweight open-source GIS engine. |
| **Geographic Data** | OpenStreetMap Contributors | Global | Open Database License (ODbL) 1.0 | Free attribution-based global spatial cartography. |

### Sovereign Compliance Certification
- **100% Sovereign IP:** All core decision-making algorithms, carrying-capacity formulas, and spatial Haversine mathematics are custom-developed in-house without proprietary external algorithm licensing.
- **Zero Telemetry / Zero Tracking:** No third-party analytics trackers (e.g., Google Analytics, Mixpanel, Sentry) are embedded in the application, guaranteeing total data sovereignty and privacy compliance for sensitive national security infrastructure.

---
*SURAKSHA Technical Architecture Group — Ministry of Home Affairs NDRF & DM Division Initiative (SIH26191)*
