package com.homeflow.controller;

import com.homeflow.dto.ProfileUpdateRequest;
import com.homeflow.dto.SalaryUpdateRequest;
import com.homeflow.dto.UserResponse;
import com.homeflow.entity.User;
import com.homeflow.service.UserService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // =========================
    // GET CURRENT USER (profile + salary)
    // =========================

    @GetMapping("/{userId}")
    public ResponseEntity<UserResponse> getUser(
            @PathVariable Long userId) {

        return ResponseEntity.ok(toResponse(userService.getUserById(userId)));
    }

    // =========================
    // UPDATE SALARY ONLY
    // =========================

    @PutMapping("/{userId}/salary")
    public ResponseEntity<UserResponse> updateSalary(
            @PathVariable Long userId,
            @RequestBody SalaryUpdateRequest request) {

        User updated = userService.updateSalary(
                userId, request.getMonthlySalary());

        return ResponseEntity.ok(toResponse(updated));
    }

    // =========================
    // UPDATE PROFILE (name + salary)
    // =========================

    @PutMapping("/{userId}/profile")
    public ResponseEntity<UserResponse> updateProfile(
            @PathVariable Long userId,
            @RequestBody ProfileUpdateRequest request) {

        User updated = userService.updateProfile(userId, request);

        return ResponseEntity.ok(toResponse(updated));
    }

    private UserResponse toResponse(User user) {
        return new UserResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getCreatedAt(),
                user.getMonthlySalary()
        );
    }
}