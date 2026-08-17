package com.homeflow.service;

import com.homeflow.dto.LoginRequest;
import com.homeflow.dto.ProfileUpdateRequest;
import com.homeflow.dto.RegisterRequest;
import com.homeflow.entity.User;
import com.homeflow.exception.EmailAlreadyExistsException;
import com.homeflow.exception.InvalidCredentialsException;
import com.homeflow.exception.UserNotFoundException;
import com.homeflow.repository.UserRepository;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserService(
            UserRepository userRepository,
            BCryptPasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // =========================
    // REGISTER
    // =========================

    public User register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new EmailAlreadyExistsException(
                    "Email already registered"
            );
        }

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());

        // Hash password before saving
        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );

        return userRepository.save(user);
    }

    // =========================
    // LOGIN
    // =========================

    public User login(LoginRequest request) {

        User user = userRepository
                .findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new InvalidCredentialsException(
                                "Invalid email or password"
                        )
                );

        // Compare entered password with BCrypt hash
        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {

            throw new InvalidCredentialsException(
                    "Invalid email or password"
            );
        }

        return user;
    }

    // =========================
    // GET USER BY ID
    // =========================

    public User getUserById(Long userId) {

        return userRepository.findById(userId)
                .orElseThrow(() ->
                        new UserNotFoundException("User not found"));
    }

    // =========================
    // UPDATE SALARY
    // =========================
    // This is the single source of truth for monthly income. Every
    // budget/expense/dashboard calculation reads this value from the
    // database — it is never recomputed or overridden on the frontend.

    public User updateSalary(Long userId, Double monthlySalary) {

        if (monthlySalary == null || monthlySalary < 0) {
            throw new IllegalArgumentException(
                    "Monthly salary must be a positive number");
        }

        User user = getUserById(userId);
        user.setMonthlySalary(monthlySalary);

        return userRepository.save(user);
    }

    // =========================
    // UPDATE PROFILE (name + salary together, used by Profile page)
    // =========================

    public User updateProfile(Long userId, ProfileUpdateRequest request) {

        User user = getUserById(userId);

        if (request.getName() != null && !request.getName().isBlank()) {
            user.setName(request.getName());
        }

        if (request.getMonthlySalary() != null) {
            if (request.getMonthlySalary() < 0) {
                throw new IllegalArgumentException(
                        "Monthly salary must be a positive number");
            }
            user.setMonthlySalary(request.getMonthlySalary());
        }

        return userRepository.save(user);
    }
}