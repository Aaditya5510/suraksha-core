package com.suraksha.engine.controller;

import com.suraksha.engine.common.api.ApiResponse;
import com.suraksha.engine.model.entity.Habitation;
import com.suraksha.engine.service.HabitationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/habitations")
@CrossOrigin(origins = "*")
public class HabitationController {

    private final HabitationService habitationService;

    public HabitationController(HabitationService habitationService) {
        this.habitationService = habitationService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Habitation>>> getAllHabitations() {
        List<Habitation> habitations = habitationService.getAllHabitations();
        return ResponseEntity.ok(ApiResponse.success(habitations, "Retrieved habitations successfully"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Habitation>> getHabitationById(@PathVariable String id) {
        Habitation habitation = habitationService.getHabitationById(id);
        return ResponseEntity.ok(ApiResponse.success(habitation, "Retrieved habitation details successfully"));
    }
}
