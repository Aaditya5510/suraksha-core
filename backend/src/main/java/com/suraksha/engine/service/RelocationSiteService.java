package com.suraksha.engine.service;

import com.suraksha.engine.model.entity.RelocationSite;

import java.util.List;

public interface RelocationSiteService {

    List<RelocationSite> getAllSites();

    RelocationSite getSiteById(String id);

    List<RelocationSite> getSitesByHorizonType(String horizonType);
}
