package com.homeflow.controller;

import com.homeflow.dto.InsightsResponse;
import com.homeflow.service.InsightsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/insights")
@CrossOrigin(origins = "http://localhost:5173")
public class InsightsController {

    private final InsightsService insightsService;

    public InsightsController(
            InsightsService insightsService
    ) {
        this.insightsService = insightsService;
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<InsightsResponse> getInsights(
            @PathVariable Long userId
    ) {

        return ResponseEntity.ok(
                insightsService.getInsights(userId)
        );
    }
}