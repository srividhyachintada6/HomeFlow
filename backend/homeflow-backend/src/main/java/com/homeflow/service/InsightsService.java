package com.homeflow.service;

import com.homeflow.dto.InsightsResponse;
import com.homeflow.entity.Budget;
import com.homeflow.repository.BillRepository;
import com.homeflow.repository.BudgetRepository;
import com.homeflow.repository.ExpenseRepository;
import com.homeflow.repository.GroceryItemRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class InsightsService {

    private final ExpenseRepository expenseRepository;
    private final BudgetRepository budgetRepository;
    private final BillRepository billRepository;
    private final GroceryItemRepository groceryItemRepository;

    public InsightsService(
            ExpenseRepository expenseRepository,
            BudgetRepository budgetRepository,
            BillRepository billRepository,
            GroceryItemRepository groceryItemRepository
    ) {
        this.expenseRepository = expenseRepository;
        this.budgetRepository = budgetRepository;
        this.billRepository = billRepository;
        this.groceryItemRepository = groceryItemRepository;
    }

    public InsightsResponse getInsights(Long userId) {

        InsightsResponse response = new InsightsResponse();

        // -------------------------
        // TOTAL EXPENSE
        // -------------------------

        Double totalSpent =
                expenseRepository.getTotalExpense(userId);

        if (totalSpent == null) {
            totalSpent = 0.0;
        }

        response.setTotalSpent(totalSpent);

        // -------------------------
        // TOTAL BUDGET
        // -------------------------

        List<Budget> budgets =
                budgetRepository.findByUserId(userId);

        double totalBudget = 0.0;

        for (Budget budget : budgets) {

            if (budget.getAmount() != null) {
                totalBudget += budget.getAmount();
            }
        }

        response.setTotalBudget(totalBudget);

        // -------------------------
        // REMAINING BUDGET
        // -------------------------

        double remainingBudget =
                totalBudget - totalSpent;

        response.setRemainingBudget(remainingBudget);

        // -------------------------
        // BUDGET USED %
        // -------------------------

        double budgetPercentage = 0.0;

        if (totalBudget > 0) {

            budgetPercentage =
                    (totalSpent / totalBudget) * 100;

            budgetPercentage =
                    Math.round(budgetPercentage * 100.0) / 100.0;
        }

        response.setBudgetUsedPercentage(
                budgetPercentage
        );

        // -------------------------
        // CATEGORY BREAKDOWN
        // -------------------------

        List<Object[]> categoryData =
                expenseRepository.getCategoryWiseExpenses(userId);

        List<InsightsResponse.CategoryInsight>
                categoryInsights = new ArrayList<>();

        String highestCategory = "No spending yet";
        double highestAmount = 0.0;

        for (Object[] row : categoryData) {

            String category =
                    row[0] != null
                            ? row[0].toString()
                            : "Other";

            Double amount =
                    row[1] != null
                            ? ((Number) row[1]).doubleValue()
                            : 0.0;

            double percentage = 0.0;

            if (totalSpent > 0) {

                percentage =
                        (amount / totalSpent) * 100;

                percentage =
                        Math.round(percentage * 100.0) / 100.0;
            }

            categoryInsights.add(
                    new InsightsResponse.CategoryInsight(
                            category,
                            amount,
                            percentage
                    )
            );

            if (amount > highestAmount) {

                highestAmount = amount;
                highestCategory = category;
            }
        }

        response.setCategoryBreakdown(
                categoryInsights
        );

        response.setHighestSpendingCategory(
                highestCategory
        );

        response.setHighestCategoryAmount(
                highestAmount
        );

        // -------------------------
        // BILLS + GROCERY (now backed by real queries)
        // -------------------------

        Double totalBills = billRepository.getTotalUpcoming(userId);
        response.setTotalBills(totalBills != null ? totalBills : 0.0);

        Double totalGrocery = groceryItemRepository.getTotalPurchasedValue(userId);
        response.setTotalGrocery(totalGrocery != null ? totalGrocery : 0.0);

        return response;
    }
}