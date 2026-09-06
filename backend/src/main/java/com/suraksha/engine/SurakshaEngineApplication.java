package com.suraksha.engine;

import com.suraksha.engine.repository.HabitationRepository;
import com.suraksha.engine.repository.RelocationSiteRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class SurakshaEngineApplication {

    private static final Logger log = LoggerFactory.getLogger(SurakshaEngineApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(SurakshaEngineApplication.class, args);
    }

    @Bean
    public CommandLineRunner databaseInitVerification(
            HabitationRepository habitationRepository,
            RelocationSiteRepository relocationSiteRepository) {
        return args -> {
            long habitationsCount = habitationRepository.count();
            long sitesCount = relocationSiteRepository.count();
            log.info("====================================================================");
            log.info("SURAKSHA Core Decision Engine - Initialized Successfully");
            log.info("In-Memory Datastore Loaded: {} Habitations, {} Relocation Sites", habitationsCount, sitesCount);
            log.info("H2 Tactical Console Available: http://localhost:8080/h2-console");
            log.info("====================================================================");
        };
    }
}
