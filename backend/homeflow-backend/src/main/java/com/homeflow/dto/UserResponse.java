package com.homeflow.dto;

import java.time.LocalDateTime;

public class UserResponse {

    private Long id;
    private String name;
    private String email;
    private LocalDateTime createdAt;
    private Double monthlySalary;

    public UserResponse(
            Long id,
            String name,
            String email,
            LocalDateTime createdAt,
            Double monthlySalary) {

        this.id = id;
        this.name = name;
        this.email = email;
        this.createdAt = createdAt;
        this.monthlySalary = monthlySalary;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public Double getMonthlySalary() {
        return monthlySalary;
    }
}
