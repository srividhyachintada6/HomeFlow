package com.homeflow.controller;

import com.homeflow.dto.BudgetRequest;
import com.homeflow.entity.Budget;
import com.homeflow.service.BudgetService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/budgets")
@CrossOrigin(origins = "http://localhost:5173")
public class BudgetController {

    private final BudgetService budgetService;

    public BudgetController(BudgetService budgetService) {
        this.budgetService = budgetService;
    }

    @GetMapping("/user/{userId}")
    public List<Budget> getBudgets(@PathVariable Long userId) {
        return budgetService.getBudgets(userId);
    }

    // NOTE: previously this only existed at "/user/{userId}" while the
    // frontend (Budget.jsx) posts to plain "/api/budgets" with userId in
    // the body — that mismatch made "Create Budget" 404. Fixed by
    // matching the ExpenseController/ExpenseRequest pattern, which is
    // the one that already works end-to-end.
    @PostMapping
    public Budget addBudget(@RequestBody BudgetRequest request) {
        return budgetService.addBudget(request);
    }

    @PutMapping("/{id}")
    public Budget updateBudget(
            @PathVariable Long id,
            @RequestBody BudgetRequest request) {

        return budgetService.updateBudget(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteBudget(@PathVariable Long id) {
        budgetService.deleteBudget(id);
    }
}
