package com.suraksha.engine.repository;

import com.suraksha.engine.model.entity.CandidateSite;
import com.suraksha.engine.model.enums.SiteType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CandidateSiteRepository extends JpaRepository<CandidateSite, String> {

    List<CandidateSite> findBySiteType(SiteType siteType);

    @Query("SELECT s FROM CandidateSite s WHERE s.slopeDegrees <= 15.0")
    List<CandidateSite> findTopographicallySafeSites();
}
