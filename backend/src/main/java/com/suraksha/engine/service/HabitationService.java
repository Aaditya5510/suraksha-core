package com.suraksha.engine.service;

import com.suraksha.engine.model.entity.Habitation;

import java.util.List;

public interface HabitationService {

    List<Habitation> getAllHabitations();

    Habitation getHabitationById(String id);
}
