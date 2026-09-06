package com.suraksha.engine.repository;

import com.suraksha.engine.model.entity.RelocationSite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RelocationSiteRepository extends JpaRepository<RelocationSite, String> {

    List<RelocationSite> findByHorizonType(String horizonType);
}
