package com.homeflow.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeFlowController {

    @GetMapping("/api/test")
    public String testEndpoint() {
        return "HomeFlow Backend is Running Successfully!";
    }
}