package com.homeflow.service;

import com.homeflow.dto.ExpenseRequest;
import com.homeflow.dto.ExpenseResponse;
import com.homeflow.entity.Expense;
import com.homeflow.entity.User;
import com.homeflow.repository.ExpenseRepository;
import com.homeflow.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;

    public ExpenseService(
            ExpenseRepository expenseRepository,
            UserRepository userRepository) {

        this.expenseRepository = expenseRepository;
        this.userRepository = userRepository;
    }

    // =========================
    // GET ALL EXPENSES
    // =========================

    public List<ExpenseResponse> getExpenses(Long userId) {

        return expenseRepository
                .findByUserIdOrderByExpenseDateDesc(userId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    // =========================
    // ADD EXPENSE
    // =========================

    public ExpenseResponse addExpense(ExpenseRequest request) {

        User user = userRepository
                .findById(request.getUserId())
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Expense expense = new Expense();

        expense.setTitle(request.getTitle());
        expense.setAmount(request.getAmount());
        expense.setCategory(request.getCategory());
        expense.setExpenseDate(request.getExpenseDate());
        expense.setDescription(request.getDescription());
        expense.setUser(user);

        Expense saved = expenseRepository.save(expense);

        return toResponse(saved);
    }

    // =========================
    // DELETE EXPENSE
    // =========================

    public void deleteExpense(Long expenseId, Long userId) {

        Expense expense = expenseRepository
                .findById(expenseId)
                .orElseThrow(() ->
                        new RuntimeException("Expense not found"));

        if (!expense.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }

        expenseRepository.delete(expense);
    }

    // =========================
    // UPDATE EXPENSE
    // =========================

    public ExpenseResponse updateExpense(
            Long expenseId,
            ExpenseRequest request) {

        Expense expense = expenseRepository
                .findById(expenseId)
                .orElseThrow(() ->
                        new RuntimeException("Expense not found"));

        if (!expense.getUser().getId().equals(request.getUserId())) {
            throw new RuntimeException("Unauthorized");
        }

        expense.setTitle(request.getTitle());
        expense.setAmount(request.getAmount());
        expense.setCategory(request.getCategory());
        expense.setExpenseDate(request.getExpenseDate());
        expense.setDescription(request.getDescription());

        Expense updated = expenseRepository.save(expense);

        return toResponse(updated);
    }

    // =========================
    // RESPONSE MAPPER
    // =========================

    private ExpenseResponse toResponse(Expense expense) {

        return new ExpenseResponse(
                expense.getId(),
                expense.getTitle(),
                expense.getAmount(),
                expense.getCategory(),
                expense.getExpenseDate(),
                expense.getDescription()
        );
    }
}