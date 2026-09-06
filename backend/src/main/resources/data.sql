-- ============================================================================
-- SURAKSHA Core Decision Engine - Chamoli Pilot Seed Dataset
-- Problem Statement: SIH26191 (Smart India Hackathon 2026)
-- ============================================================================

-- Clean existing data
DELETE FROM habitations;
DELETE FROM candidate_sites;
DELETE FROM relocation_sites;

-- ----------------------------------------------------------------------------
-- 1. ORIGIN HABITATIONS
-- ----------------------------------------------------------------------------

-- HAB-01: Nandikot Settlement (Joshimath Sector) - Critical Red Zone
INSERT INTO habitations (
    id, name, lat, lng, population, slope_deg, landslide_risk, 
    flood_risk, vulnerability_score, cutoff_risk, composite_risk, 
    risk_zone, horizon, is_permanently_unsuitable, red_zone_declared_date
) VALUES (
    'HAB-01', 
    'Nandikot Settlement', 
    30.4150, 
    79.3240, 
    2840, 
    42.0, 
    88.0, 
    45.0, 
    0.85, 
    0.85, 
    89.4, 
    'CRITICAL_RED_ZONE', 
    'IMMEDIATE_0_72H', 
    true, 
    '2024-08-15'
);

-- HAB-02: Helang Lower Bastion - Amber Monitoring Zone
INSERT INTO habitations (
    id, name, lat, lng, population, slope_deg, landslide_risk, 
    flood_risk, vulnerability_score, cutoff_risk, composite_risk, 
    risk_zone, horizon, is_permanently_unsuitable, red_zone_declared_date
) VALUES (
    'HAB-02', 
    'Helang Lower Bastion', 
    30.5280, 
    79.5100, 
    1120, 
    31.0, 
    68.0, 
    72.0, 
    0.70, 
    0.70, 
    71.2, 
    'AMBER_ZONE', 
    'SHORT_TERM_TRANSIT', 
    false, 
    null
);

-- ----------------------------------------------------------------------------
-- 2. CANDIDATE RESETTLEMENT ENCLAVES & TRANSIT SHELTERS
-- ----------------------------------------------------------------------------

-- SITE-A: Gopeshwar Enclave - Horizon 2 Resettlement Enclave (Recommended Primary)
INSERT INTO candidate_sites (
    id, name, site_type, latitude, longitude, usable_area_sqm, 
    water_supply_lpd, toilet_count, existing_occupancy, allocated_population, 
    slope_degrees, multi_route_access, bridge_cutoff_probability, 
    hospital_proximity_km, livelihood_proximity_km
) VALUES (
    'SITE-A', 
    'Gopeshwar Enclave', 
    'RELOCATION_ENCLAVE', 
    30.4080, 
    79.3190, 
    18000.0, 
    65000.0, 
    140, 
    234, 
    0, 
    8.5, 
    true, 
    0.08, 
    1.8, 
    2.2
);

-- SITE-B: Pipalkoti Shelf - Horizon 2 Resettlement Enclave (Operationally Rejected / Sanitation Bottleneck)
INSERT INTO candidate_sites (
    id, name, site_type, latitude, longitude, usable_area_sqm, 
    water_supply_lpd, toilet_count, existing_occupancy, allocated_population, 
    slope_degrees, multi_route_access, bridge_cutoff_probability, 
    hospital_proximity_km, livelihood_proximity_km
) VALUES (
    'SITE-B', 
    'Pipalkoti Shelf', 
    'RELOCATION_ENCLAVE', 
    30.4290, 
    79.4270, 
    25000.0, 
    45000.0, 
    30, 
    200, 
    0, 
    6.2, 
    false, 
    0.66, 
    8.4, 
    4.1
);

-- SITE-C: Govt Model Inter-College Grounds - Horizon 1 Immediate Transit Shelter (0-72h Window)
INSERT INTO candidate_sites (
    id, name, site_type, latitude, longitude, usable_area_sqm, 
    water_supply_lpd, toilet_count, existing_occupancy, allocated_population, 
    slope_degrees, multi_route_access, bridge_cutoff_probability, 
    hospital_proximity_km, livelihood_proximity_km
) VALUES (
    'SITE-C', 
    'Govt Model Inter-College Grounds', 
    'TRANSIT_SHELTER', 
    30.4120, 
    79.3210, 
    12000.0, 
    45000.0, 
    120, 
    150, 
    0, 
    4.0, 
    true, 
    0.02, 
    0.9, 
    0.5
);

-- ----------------------------------------------------------------------------
-- 3. LEGACY RELOCATION SITES (Backward Compatibility)
-- ----------------------------------------------------------------------------

INSERT INTO relocation_sites (
    id, name, lat, lng, horizon_type, usable_area_sqm, water_lpd, 
    toilets_count, existing_occupancy, hazard_safety, road_reliability, 
    hospital_dist_km, livelihood_score
) VALUES (
    'SITE-A', 
    'Gopeshwar Enclave', 
    30.4080, 
    79.3190, 
    'PERMANENT_RESETTLEMENT', 
    18000.0, 
    65000, 
    140, 
    234, 
    96.0, 
    88.0, 
    1.8, 
    85.0
);

INSERT INTO relocation_sites (
    id, name, lat, lng, horizon_type, usable_area_sqm, water_lpd, 
    toilets_count, existing_occupancy, hazard_safety, road_reliability, 
    hospital_dist_km, livelihood_score
) VALUES (
    'SITE-B', 
    'Pipalkoti Shelf', 
    30.4290, 
    79.4270, 
    'PERMANENT_RESETTLEMENT', 
    25000.0, 
    45000, 
    30, 
    200, 
    91.0, 
    34.0, 
    8.4, 
    65.0
);

INSERT INTO relocation_sites (
    id, name, lat, lng, horizon_type, usable_area_sqm, water_lpd, 
    toilets_count, existing_occupancy, hazard_safety, road_reliability, 
    hospital_dist_km, livelihood_score
) VALUES (
    'SITE-C', 
    'Govt Model Inter-College Grounds', 
    30.4120, 
    79.3210, 
    'IMMEDIATE_SHELTER', 
    12000.0, 
    45000, 
    120, 
    150, 
    94.0, 
    90.0, 
    0.9, 
    50.0
);
