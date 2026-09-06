# SURAKSHA — System Context & Master Reference

**Problem Statement:** SIH26191 (Ministry of Home Affairs - NDRF & DM Division)  
**Project Name:** SURAKSHA — Habitation-Level Multi-Hazard Relocation & Humanitarian Carrying-Capacity Decision System  
**Pilot District:** Chamoli District (Upper Alaknanda Valley), Uttarakhand  

---

## 1. System Summary
SURAKSHA is a deterministic decision support system for post-disaster resettlement and carrying-capacity-bounded tactical evacuation. It connects upstream hazard models (ISRO Bhuvan, GSI LEWS, NDMA SACHET) to downstream operational execution, implementing a Dual-Horizon strategy with Goldratt's Theory of Constraints applied to Sphere Humanitarian Standards.

---

## 2. Core Documentation Reference
- [docs/TEAM_TECHNICAL_BRIEFING.md](file:///d:/suraksha-core/docs/TEAM_TECHNICAL_BRIEFING.md) — Strategic Baseline & Operational Gap Analysis
- [docs/TEAM_TECHNICAL_WALKTHROUGH.md](file:///d:/suraksha-core/docs/TEAM_TECHNICAL_WALKTHROUGH.md) — System Schemas, Math & REST Contracts
- [docs/DATA_SOURCES.md](file:///d:/suraksha-core/docs/DATA_SOURCES.md) — Government Registry Mapping & ETL Ingestion Pipeline
- [docs/GOLDEN_DEMO_SCENARIO.md](file:///d:/suraksha-core/docs/GOLDEN_DEMO_SCENARIO.md) — 90-Second Demonstration Script & Run-Sheet
- [docs/DEMO_FALLBACK.md](file:///d:/suraksha-core/docs/DEMO_FALLBACK.md) — Multi-Tier Resilience & Client Mock Engine
- [docs/SIH_QA.md](file:///d:/suraksha-core/docs/SIH_QA.md) — Grand Finale Jury Defense & Q&A Playbook
- [docs/SIH_PPT_CONTENT.md](file:///d:/suraksha-core/docs/SIH_PPT_CONTENT.md) — 7-Slide Executive Pitch Deck
- [docs/THIRD_PARTY_SERVICES.md](file:///d:/suraksha-core/docs/THIRD_PARTY_SERVICES.md) — Dependency Audits, CDN Policies & Licensing
- [docs/AI_ASSISTED_DEVELOPMENT.md](file:///d:/suraksha-core/docs/AI_ASSISTED_DEVELOPMENT.md) — Development Governance & Zero-Hallucination Framework

---

## 3. Technology Stack
- **Backend:** Java 21 LTS, Spring Boot 3.3.4, Spring Data JPA, H2 (PostgreSQL Mode), Pure Java Haversine math.
- **Frontend:** React 18, Vite, TypeScript, Tailwind CSS, Leaflet GIS, Client-side Edge Mock fallback.
- **Port Bindings:** Backend on `8080`, Frontend on `5173`.
