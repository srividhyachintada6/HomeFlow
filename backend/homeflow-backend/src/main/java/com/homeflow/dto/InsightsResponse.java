package com.homeflow.dto;

import java.util.List;

public class InsightsResponse {

    private Double totalSpent;
    private Double totalBudget;
    private Double remainingBudget;
    private Double budgetUsedPercentage;

    private Double totalBills;
    private Double totalGrocery;

    private String highestSpendingCategory;
    private Double highestCategoryAmount;

    private List<CategoryInsight> categoryBreakdown;

    public InsightsResponse() {
    }

    public Double getTotalSpent() {
        return totalSpent;
    }

    public void setTotalSpent(Double totalSpent) {
        this.totalSpent = totalSpent;
    }

    public Double getTotalBudget() {
        return totalBudget;
    }

    public void setTotalBudget(Double totalBudget) {
        this.totalBudget = totalBudget;
    }

    public Double getRemainingBudget() {
        return remainingBudget;
    }

    public void setRemainingBudget(Double remainingBudget) {
        this.remainingBudget = remainingBudget;
    }

    public Double getBudgetUsedPercentage() {
        return budgetUsedPercentage;
    }

    public void setBudgetUsedPercentage(Double budgetUsedPercentage) {
        this.budgetUsedPercentage = budgetUsedPercentage;
    }

    public Double getTotalBills() {
        return totalBills;
    }

    public void setTotalBills(Double totalBills) {
        this.totalBills = totalBills;
    }

    public Double getTotalGrocery() {
        return totalGrocery;
    }

    public void setTotalGrocery(Double totalGrocery) {
        this.totalGrocery = totalGrocery;
    }

    public String getHighestSpendingCategory() {
        return highestSpendingCategory;
    }

    public void setHighestSpendingCategory(String highestSpendingCategory) {
        this.highestSpendingCategory = highestSpendingCategory;
    }

    public Double getHighestCategoryAmount() {
        return highestCategoryAmount;
    }

    public void setHighestCategoryAmount(Double highestCategoryAmount) {
        this.highestCategoryAmount = highestCategoryAmount;
    }

    public List<CategoryInsight> getCategoryBreakdown() {
        return categoryBreakdown;
    }

    public void setCategoryBreakdown(List<CategoryInsight> categoryBreakdown) {
        this.categoryBreakdown = categoryBreakdown;
    }

    public static class CategoryInsight {

        private String category;
        private Double amount;
        private Double percentage;

        public CategoryInsight() {
        }

        public CategoryInsight(
                String category,
                Double amount,
                Double percentage
        ) {
            this.category = category;
            this.amount = amount;
            this.percentage = percentage;
        }

        public String getCategory() {
            return category;
        }

        public void setCategory(String category) {
            this.category = category;
        }

        public Double getAmount() {
            return amount;
        }

        public void setAmount(Double amount) {
            this.amount = amount;
        }

        public Double getPercentage() {
            return percentage;
        }

        public void setPercentage(Double percentage) {
            this.percentage = percentage;
        }
    }
}