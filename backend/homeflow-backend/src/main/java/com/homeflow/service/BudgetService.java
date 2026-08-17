package com.homeflow.service;

import com.homeflow.dto.BudgetRequest;
import com.homeflow.entity.Budget;
import com.homeflow.entity.User;
import com.homeflow.repository.BudgetRepository;
import com.homeflow.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BudgetService {

    private final BudgetRepository budgetRepository;
    private final UserRepository userRepository;

    public BudgetService(BudgetRepository budgetRepository,
                         UserRepository userRepository) {
        this.budgetRepository = budgetRepository;
        this.userRepository = userRepository;
    }

    public List<Budget> getBudgets(Long userId) {
        return budgetRepository.findByUserId(userId);
    }

    // Kept for backward compatibility with any caller still passing a
    // raw Budget entity + userId path variable.
    public Budget addBudget(Budget budget, Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        budget.setUser(user);

        return budgetRepository.save(budget);
    }

    // =========================
    // ADD BUDGET (matches the ExpenseRequest pattern — userId travels
    // in the request body, exactly what the frontend already sends)
    // =========================

    public Budget addBudget(BudgetRequest request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Budget budget = new Budget();
        budget.setCategory(request.getCategory());
        budget.setAmount(request.getAmount());
        budget.setStartDate(request.getStartDate());
        budget.setEndDate(request.getEndDate());
        budget.setUser(user);

        return budgetRepository.save(budget);
    }

    // =========================
    // UPDATE BUDGET
    // =========================

    public Budget updateBudget(Long id, BudgetRequest request) {

        Budget existing = budgetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Budget not found"));

        if (!existing.getUser().getId().equals(request.getUserId())) {
            throw new RuntimeException("Unauthorized");
        }

        existing.setCategory(request.getCategory());
        existing.setAmount(request.getAmount());
        existing.setStartDate(request.getStartDate());
        existing.setEndDate(request.getEndDate());

        return budgetRepository.save(existing);
    }

    public void deleteBudget(Long id) {
        budgetRepository.deleteById(id);
    }

    // =========================
    // TOTAL BUDGETED AMOUNT FOR A USER
    // Used by DashboardService/InsightsService to warn when planned
    // category budgets exceed the user's monthly salary.
    // =========================

    public double getTotalBudgeted(Long userId) {
        return budgetRepository.findByUserId(userId)
                .stream()
                .mapToDouble(b -> b.getAmount() != null ? b.getAmount() : 0.0)
                .sum();
    }
}
