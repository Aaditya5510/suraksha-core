package com.suraksha.engine.repository;

import com.suraksha.engine.model.entity.Habitation;
import com.suraksha.engine.model.enums.RelocationHorizon;
import com.suraksha.engine.model.enums.RiskZone;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HabitationRepository extends JpaRepository<Habitation, String> {

    List<Habitation> findByRiskZone(RiskZone riskZone);

    List<Habitation> findByHorizon(RelocationHorizon horizon);
}
