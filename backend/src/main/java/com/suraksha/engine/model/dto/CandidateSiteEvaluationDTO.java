package com.suraksha.engine.model.dto;

import com.suraksha.engine.model.enums.RecommendationStatus;
import com.suraksha.engine.model.enums.SiteType;

public class CandidateSiteEvaluationDTO {

    private String siteId;
    private String name;
    private SiteType siteType;
    private Double latitude;
    private Double longitude;
    private Double distanceKm;
    private Double feasibilityScore;
    private RecommendationStatus recommendation;
    private CapacityAuditResult capacityAudit;
    private String decisionJustification;

    public CandidateSiteEvaluationDTO() {
    }

    public CandidateSiteEvaluationDTO(String siteId, String name, SiteType siteType, Double latitude, Double longitude,
                                      Double distanceKm, Double feasibilityScore, RecommendationStatus recommendation,
                                      CapacityAuditResult capacityAudit, String decisionJustification) {
        this.siteId = siteId;
        this.name = name;
        this.siteType = siteType;
        this.latitude = latitude;
        this.longitude = longitude;
        this.distanceKm = distanceKm;
        this.feasibilityScore = feasibilityScore;
        this.recommendation = recommendation;
        this.capacityAudit = capacityAudit;
        this.decisionJustification = decisionJustification;
    }

    public static CandidateSiteEvaluationDTOBuilder builder() {
        return new CandidateSiteEvaluationDTOBuilder();
    }

    public static class CandidateSiteEvaluationDTOBuilder {
        private String siteId;
        private String name;
        private SiteType siteType;
        private Double latitude;
        private Double longitude;
        private Double distanceKm;
        private Double feasibilityScore;
        private RecommendationStatus recommendation;
        private CapacityAuditResult capacityAudit;
        private String decisionJustification;

        public CandidateSiteEvaluationDTOBuilder siteId(String siteId) {
            this.siteId = siteId;
            return this;
        }

        public CandidateSiteEvaluationDTOBuilder name(String name) {
            this.name = name;
            return this;
        }

        public CandidateSiteEvaluationDTOBuilder siteType(SiteType siteType) {
            this.siteType = siteType;
            return this;
        }

        public CandidateSiteEvaluationDTOBuilder latitude(Double latitude) {
            this.latitude = latitude;
            return this;
        }

        public CandidateSiteEvaluationDTOBuilder longitude(Double longitude) {
            this.longitude = longitude;
            return this;
        }

        public CandidateSiteEvaluationDTOBuilder distanceKm(Double distanceKm) {
            this.distanceKm = distanceKm;
            return this;
        }

        public CandidateSiteEvaluationDTOBuilder feasibilityScore(Double feasibilityScore) {
            this.feasibilityScore = feasibilityScore;
            return this;
        }

        public CandidateSiteEvaluationDTOBuilder recommendation(RecommendationStatus recommendation) {
            this.recommendation = recommendation;
            return this;
        }

        public CandidateSiteEvaluationDTOBuilder capacityAudit(CapacityAuditResult capacityAudit) {
            this.capacityAudit = capacityAudit;
            return this;
        }

        public CandidateSiteEvaluationDTOBuilder decisionJustification(String decisionJustification) {
            this.decisionJustification = decisionJustification;
            return this;
        }

        public CandidateSiteEvaluationDTO build() {
            return new CandidateSiteEvaluationDTO(siteId, name, siteType, latitude, longitude,
                    distanceKm, feasibilityScore, recommendation, capacityAudit, decisionJustification);
        }
    }

    public String getSiteId() {
        return siteId;
    }

    public void setSiteId(String siteId) {
        this.siteId = siteId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public SiteType getSiteType() {
        return siteType;
    }

    public void setSiteType(SiteType siteType) {
        this.siteType = siteType;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public Double getDistanceKm() {
        return distanceKm;
    }

    public void setDistanceKm(Double distanceKm) {
        this.distanceKm = distanceKm;
    }

    public Double getFeasibilityScore() {
        return feasibilityScore;
    }

    public void setFeasibilityScore(Double feasibilityScore) {
        this.feasibilityScore = feasibilityScore;
    }

    public RecommendationStatus getRecommendation() {
        return recommendation;
    }

    public void setRecommendation(RecommendationStatus recommendation) {
        this.recommendation = recommendation;
    }

    public CapacityAuditResult getCapacityAudit() {
        return capacityAudit;
    }

    public void setCapacityAudit(CapacityAuditResult capacityAudit) {
        this.capacityAudit = capacityAudit;
    }

    public String getDecisionJustification() {
        return decisionJustification;
    }

    public void setDecisionJustification(String decisionJustification) {
        this.decisionJustification = decisionJustification;
    }
}
