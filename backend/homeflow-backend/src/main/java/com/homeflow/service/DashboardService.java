package com.homeflow.service;

import com.homeflow.dto.DashboardResponse;
import com.homeflow.dto.ExpenseResponse;
import com.homeflow.entity.Bill;
import com.homeflow.entity.Budget;
import com.homeflow.entity.Expense;
import com.homeflow.entity.GroceryItem;
import com.homeflow.entity.User;
import com.homeflow.repository.BillRepository;
import com.homeflow.repository.BudgetRepository;
import com.homeflow.repository.ExpenseRepository;
import com.homeflow.repository.GroceryItemRepository;
import com.homeflow.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    private final UserRepository userRepository;
    private final BudgetRepository budgetRepository;
    private final ExpenseRepository expenseRepository;
    private final BillRepository billRepository;
    private final GroceryItemRepository groceryItemRepository;

    public DashboardService(
            UserRepository userRepository,
            BudgetRepository budgetRepository,
            ExpenseRepository expenseRepository,
            BillRepository billRepository,
            GroceryItemRepository groceryItemRepository) {

        this.userRepository = userRepository;
        this.budgetRepository = budgetRepository;
        this.expenseRepository = expenseRepository;
        this.billRepository = billRepository;
        this.groceryItemRepository = groceryItemRepository;
    }

    public DashboardResponse getDashboard(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        DashboardResponse response = new DashboardResponse();
        response.setUserName(user.getName());

        double salary = user.getMonthlySalary() != null
                ? user.getMonthlySalary() : 0.0;
        response.setMonthlySalary(salary);

        // -------------------------
        // SALARY -> EXPENSES -> REMAINING
        // -------------------------

        List<Expense> expenses = expenseRepository
                .findByUserIdOrderByExpenseDateDesc(userId);

        double totalExpenses = expenses.stream()
                .mapToDouble(e -> e.getAmount() != null ? e.getAmount() : 0.0)
                .sum();

        response.setTotalExpenses(totalExpenses);
        response.setRemainingSalary(salary - totalExpenses);

        // -------------------------
        // SALARY -> BUDGETS
        // -------------------------

        List<Budget> budgets = budgetRepository.findByUserId(userId);

        double totalBudgeted = budgets.stream()
                .mapToDouble(b -> b.getAmount() != null ? b.getAmount() : 0.0)
                .sum();

        response.setTotalBudgeted(totalBudgeted);

        double budgetUsedPct = totalBudgeted > 0
                ? round2((totalExpenses / totalBudgeted) * 100)
                : 0.0;
        response.setBudgetUsedPercentage(budgetUsedPct);

        if (salary > 0 && totalBudgeted > salary) {
            double over = totalBudgeted - salary;
            response.setBudgetWarning(
                    "Your planned budgets exceed your monthly income by \u20B9"
                            + formatAmount(over) + ".");
        }

        // -------------------------
        // BUDGETS <-> EXPENSES PER CATEGORY (the core dynamic link)
        // -------------------------

        List<DashboardResponse.CategoryBudget> categoryBudgets = new ArrayList<>();

        for (Budget budget : budgets) {
            double spent = expenses.stream()
                    .filter(e -> e.getCategory() != null
                            && e.getCategory().equalsIgnoreCase(budget.getCategory())
                            && e.getExpenseDate() != null
                            && !e.getExpenseDate().isBefore(budget.getStartDate())
                            && !e.getExpenseDate().isAfter(budget.getEndDate()))
                    .mapToDouble(e -> e.getAmount() != null ? e.getAmount() : 0.0)
                    .sum();

            double amount = budget.getAmount() != null ? budget.getAmount() : 0.0;
            double remaining = amount - spent;
            double pct = amount > 0 ? round2((spent / amount) * 100) : 0.0;

            categoryBudgets.add(new DashboardResponse.CategoryBudget(
                    budget.getCategory(), amount, spent, remaining, pct));
        }

        response.setCategoryBudgets(categoryBudgets);

        // -------------------------
        // RECENT EXPENSES (top 5, already sorted desc by date)
        // -------------------------

        List<ExpenseResponse> recent = expenses.stream()
                .limit(5)
                .map(e -> new ExpenseResponse(
                        e.getId(), e.getTitle(), e.getAmount(),
                        e.getCategory(), e.getExpenseDate(), e.getDescription()))
                .collect(Collectors.toList());

        response.setRecentExpenses(recent);

        // -------------------------
        // BILLS
        // -------------------------

        List<Bill> bills = billRepository.findByUserIdOrderByDueDateAsc(userId);

        List<Bill> unpaid = bills.stream()
                .filter(b -> !"PAID".equalsIgnoreCase(b.getStatus()))
                .sorted(Comparator.comparing(Bill::getDueDate))
                .collect(Collectors.toList());

        response.setUpcomingBillsCount(unpaid.size());

        double upcomingTotal = unpaid.stream()
                .mapToDouble(b -> b.getAmount() != null ? b.getAmount() : 0.0)
                .sum();
        response.setUpcomingBillsTotal(upcomingTotal);

        if (!unpaid.isEmpty()) {
            Bill next = unpaid.get(0);
            response.setNextBill(new DashboardResponse.BillSummary(
                    next.getId(), next.getTitle(), next.getAmount(),
                    next.getDueDate(), next.getStatus()));
        }

        // -------------------------
        // GROCERY
        // -------------------------

        List<GroceryItem> groceries = groceryItemRepository
                .findByUserIdOrderByCreatedDateDesc(userId);

        response.setGroceryTotalCount(groceries.size());

        long purchasedCount = groceries.stream()
                .filter(g -> Boolean.TRUE.equals(g.getPurchased()))
                .count();
        response.setGroceryPurchasedCount((int) purchasedCount);

        double purchasedValue = groceries.stream()
                .filter(g -> Boolean.TRUE.equals(g.getPurchased()))
                .mapToDouble(g -> g.getEstimatedPrice() != null ? g.getEstimatedPrice() : 0.0)
                .sum();
        response.setGroceryPurchasedValue(purchasedValue);

        return response;
    }

    private double round2(double value) {
        return Math.round(value * 100.0) / 100.0;
    }

    private String formatAmount(double value) {
        long rounded = Math.round(value);
        return String.format("%,d", rounded);
    }
}
