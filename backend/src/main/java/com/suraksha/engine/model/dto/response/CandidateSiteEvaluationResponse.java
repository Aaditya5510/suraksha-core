package com.suraksha.engine.model.dto.response;

public class CandidateSiteEvaluationResponse {

    private String siteId;
    private String name;
    private String type;
    private Double feasibilityScore;
    private String recommendation;
    private CapacityAuditBreakdownResponse capacityAudit;
    private SiteIndicatorsResponse indicators;
    private String decisionJustification;

    public CandidateSiteEvaluationResponse() {
    }

    public CandidateSiteEvaluationResponse(String siteId, String name, String type, Double feasibilityScore,
                                           String recommendation, CapacityAuditBreakdownResponse capacityAudit,
                                           SiteIndicatorsResponse indicators, String decisionJustification) {
        this.siteId = siteId;
        this.name = name;
        this.type = type;
        this.feasibilityScore = feasibilityScore;
        this.recommendation = recommendation;
        this.capacityAudit = capacityAudit;
        this.indicators = indicators;
        this.decisionJustification = decisionJustification;
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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Double getFeasibilityScore() {
        return feasibilityScore;
    }

    public void setFeasibilityScore(Double feasibilityScore) {
        this.feasibilityScore = feasibilityScore;
    }

    public String getRecommendation() {
        return recommendation;
    }

    public void setRecommendation(String recommendation) {
        this.recommendation = recommendation;
    }

    public CapacityAuditBreakdownResponse getCapacityAudit() {
        return capacityAudit;
    }

    public void setCapacityAudit(CapacityAuditBreakdownResponse capacityAudit) {
        this.capacityAudit = capacityAudit;
    }

    public SiteIndicatorsResponse getIndicators() {
        return indicators;
    }

    public void setIndicators(SiteIndicatorsResponse indicators) {
        this.indicators = indicators;
    }

    public String getDecisionJustification() {
        return decisionJustification;
    }

    public void setDecisionJustification(String decisionJustification) {
        this.decisionJustification = decisionJustification;
    }
}
