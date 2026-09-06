-- ============================================================================
-- SURAKSHA Core Decision Engine - Seed Dataset (Chamoli Pilot Geography)
-- ============================================================================

-- Clean existing data
DELETE FROM habitations;
DELETE FROM relocation_sites;

-- ----------------------------------------------------------------------------
-- 1. ORIGIN HABITATIONS
-- ----------------------------------------------------------------------------

-- HAB-01: Nandikot Settlement (Joshimath Sector) - Critical Red Zone
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

-- HAB-02: Lower Helang Hamlet - Amber Monitoring Zone
INSERT INTO habitations (
    id, name, lat, lng, population, slope_deg, landslide_risk, 
    flood_risk, vulnerability_score, cutoff_risk, composite_risk, risk_zone, horizon
) VALUES (
    'HAB-02', 
    'Lower Helang Hamlet', 
    30.5280, 
    79.5120, 
    1420, 
    28.0, 
    58.0, 
    45.0, 
    62.0, 
    40.0, 
    64.2, 
    'AMBER_ZONE', 
    'SHORT_TERM'
);

-- ----------------------------------------------------------------------------
-- 2. CANDIDATE SAFE HAVENS & TRANSIT SHELTERS
-- ----------------------------------------------------------------------------

-- SITE-C: Govt Model Inter-College Grounds - Horizon 1 Immediate Transit Shelter (Effective Cap: 2850, Dist: 2.1 km)
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
    114, 
    0, 
    94.0, 
    90.0, 
    1.8, 
    50.0
);

-- SITE-A: Gopeshwar Administrative Enclave - Horizon 2 Permanent Resettlement (Recommended Primary)
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

-- SITE-B: Pipalkoti Industrial Shelf - Horizon 2 Permanent Resettlement (Operationally Rejected)
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
