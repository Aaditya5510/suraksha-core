package com.suraksha.engine.service.impl;

import com.suraksha.engine.common.exception.ResourceNotFoundException;
import com.suraksha.engine.model.entity.Habitation;
import com.suraksha.engine.repository.HabitationRepository;
import com.suraksha.engine.service.HabitationService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class HabitationServiceImpl implements HabitationService {

    private final HabitationRepository habitationRepository;

    public HabitationServiceImpl(HabitationRepository habitationRepository) {
        this.habitationRepository = habitationRepository;
    }

    @Override
    public List<Habitation> getAllHabitations() {
        return habitationRepository.findAll();
    }

    @Override
    public Habitation getHabitationById(String id) {
        return habitationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Habitation", "id", id));
    }
}
