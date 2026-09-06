package com.suraksha.engine.service.impl;

import com.suraksha.engine.common.exception.ResourceNotFoundException;
import com.suraksha.engine.model.entity.RelocationSite;
import com.suraksha.engine.repository.RelocationSiteRepository;
import com.suraksha.engine.service.RelocationSiteService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class RelocationSiteServiceImpl implements RelocationSiteService {

    private final RelocationSiteRepository relocationSiteRepository;

    public RelocationSiteServiceImpl(RelocationSiteRepository relocationSiteRepository) {
        this.relocationSiteRepository = relocationSiteRepository;
    }

    @Override
    public List<RelocationSite> getAllSites() {
        return relocationSiteRepository.findAll();
    }

    @Override
    public RelocationSite getSiteById(String id) {
        return relocationSiteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("RelocationSite", "id", id));
    }

    @Override
    public List<RelocationSite> getSitesByHorizonType(String horizonType) {
        return relocationSiteRepository.findByHorizonType(horizonType);
    }
}
