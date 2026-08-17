package com.homeflow.controller;

import com.homeflow.dto.ExpenseRequest;
import com.homeflow.dto.ExpenseResponse;
import com.homeflow.service.ExpenseService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "http://localhost:5173")
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    // GET ALL EXPENSES
    @GetMapping
    public ResponseEntity<List<ExpenseResponse>> getExpenses(
            @RequestParam Long userId) {

        return ResponseEntity.ok(
                expenseService.getExpenses(userId)
        );
    }

    // ADD EXPENSE
    @PostMapping
    public ResponseEntity<ExpenseResponse> addExpense(
            @RequestBody ExpenseRequest request) {

        return ResponseEntity.ok(
                expenseService.addExpense(request)
        );
    }

    // UPDATE EXPENSE
    @PutMapping("/{id}")
    public ResponseEntity<ExpenseResponse> updateExpense(
            @PathVariable Long id,
            @RequestBody ExpenseRequest request) {

        return ResponseEntity.ok(
                expenseService.updateExpense(id, request)
        );
    }

    // DELETE EXPENSE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpense(
            @PathVariable Long id,
            @RequestParam Long userId) {

        expenseService.deleteExpense(id, userId);

        return ResponseEntity.noContent().build();
    }
}