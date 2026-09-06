package com.suraksha.engine.repository;

import com.suraksha.engine.model.entity.Habitation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HabitationRepository extends JpaRepository<Habitation, String> {

    List<Habitation> findByRiskZone(String riskZone);

    List<Habitation> findByHorizon(String horizon);
}
