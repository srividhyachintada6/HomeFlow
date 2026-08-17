package com.homeflow.controller;

import com.homeflow.dto.DashboardResponse;
import com.homeflow.service.DashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:5173")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<DashboardResponse> getDashboard(
            @PathVariable Long userId) {

        return ResponseEntity.ok(dashboardService.getDashboard(userId));
    }
}
