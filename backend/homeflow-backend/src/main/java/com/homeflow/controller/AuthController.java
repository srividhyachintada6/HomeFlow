package com.homeflow.controller;

import com.homeflow.dto.LoginRequest;
import com.homeflow.dto.RegisterRequest;
import com.homeflow.dto.UserResponse;
import com.homeflow.entity.User;
import com.homeflow.exception.EmailAlreadyExistsException;
import com.homeflow.exception.InvalidCredentialsException;
import com.homeflow.service.UserService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    // =========================
    // REGISTER
    // =========================

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(
            @RequestBody RegisterRequest request) {

        try {
            userService.register(request);

            return ResponseEntity.ok(
                    Map.of(
                            "message",
                            "User registered successfully"
                    )
            );

        } catch (EmailAlreadyExistsException ex) {

            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(
                            Map.of(
                                    "message",
                                    ex.getMessage()
                            )
                    );
        }
    }

    // =========================
    // LOGIN
    // =========================

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(
            @RequestBody LoginRequest request) {

        try {

            User user = userService.login(request);

            UserResponse userResponse = new UserResponse(
                    user.getId(),
                    user.getName(),
                    user.getEmail(),
                    user.getCreatedAt(),
                    user.getMonthlySalary()
            );

            return ResponseEntity.ok(
                    Map.of(
                            "message", "Login successful",
                            "user", userResponse
                    )
            );

        } catch (InvalidCredentialsException ex) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(
                            Map.of(
                                    "message",
                                    ex.getMessage()
                            )
                    );
        }
    }
}