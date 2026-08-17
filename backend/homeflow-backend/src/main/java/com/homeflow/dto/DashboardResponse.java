package com.homeflow.dto;

import java.time.LocalDate;
import java.util.List;

public class DashboardResponse {

    private String userName;
    private Double monthlySalary;

    private Double totalExpenses;
    private Double remainingSalary;

    private Double totalBudgeted;
    private Double budgetUsedPercentage;
    private String budgetWarning; // null when budgets are within salary

    private Integer upcomingBillsCount;
    private Double upcomingBillsTotal;
    private BillSummary nextBill;

    private Integer groceryTotalCount;
    private Integer groceryPurchasedCount;
    private Double groceryPurchasedValue;

    private List<CategoryBudget> categoryBudgets;
    private List<ExpenseResponse> recentExpenses;

    public DashboardResponse() {
    }

    // --- getters/setters ---

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Double getMonthlySalary() {
        return monthlySalary;
    }

    public void setMonthlySalary(Double monthlySalary) {
        this.monthlySalary = monthlySalary;
    }

    public Double getTotalExpenses() {
        return totalExpenses;
    }

    public void setTotalExpenses(Double totalExpenses) {
        this.totalExpenses = totalExpenses;
    }

    public Double getRemainingSalary() {
        return remainingSalary;
    }

    public void setRemainingSalary(Double remainingSalary) {
        this.remainingSalary = remainingSalary;
    }

    public Double getTotalBudgeted() {
        return totalBudgeted;
    }

    public void setTotalBudgeted(Double totalBudgeted) {
        this.totalBudgeted = totalBudgeted;
    }

    public Double getBudgetUsedPercentage() {
        return budgetUsedPercentage;
    }

    public void setBudgetUsedPercentage(Double budgetUsedPercentage) {
        this.budgetUsedPercentage = budgetUsedPercentage;
    }

    public String getBudgetWarning() {
        return budgetWarning;
    }

    public void setBudgetWarning(String budgetWarning) {
        this.budgetWarning = budgetWarning;
    }

    public Integer getUpcomingBillsCount() {
        return upcomingBillsCount;
    }

    public void setUpcomingBillsCount(Integer upcomingBillsCount) {
        this.upcomingBillsCount = upcomingBillsCount;
    }

    public Double getUpcomingBillsTotal() {
        return upcomingBillsTotal;
    }

    public void setUpcomingBillsTotal(Double upcomingBillsTotal) {
        this.upcomingBillsTotal = upcomingBillsTotal;
    }

    public BillSummary getNextBill() {
        return nextBill;
    }

    public void setNextBill(BillSummary nextBill) {
        this.nextBill = nextBill;
    }

    public Integer getGroceryTotalCount() {
        return groceryTotalCount;
    }

    public void setGroceryTotalCount(Integer groceryTotalCount) {
        this.groceryTotalCount = groceryTotalCount;
    }

    public Integer getGroceryPurchasedCount() {
        return groceryPurchasedCount;
    }

    public void setGroceryPurchasedCount(Integer groceryPurchasedCount) {
        this.groceryPurchasedCount = groceryPurchasedCount;
    }

    public Double getGroceryPurchasedValue() {
        return groceryPurchasedValue;
    }

    public void setGroceryPurchasedValue(Double groceryPurchasedValue) {
        this.groceryPurchasedValue = groceryPurchasedValue;
    }

    public List<CategoryBudget> getCategoryBudgets() {
        return categoryBudgets;
    }

    public void setCategoryBudgets(List<CategoryBudget> categoryBudgets) {
        this.categoryBudgets = categoryBudgets;
    }

    public List<ExpenseResponse> getRecentExpenses() {
        return recentExpenses;
    }

    public void setRecentExpenses(List<ExpenseResponse> recentExpenses) {
        this.recentExpenses = recentExpenses;
    }

    // =========================
    // NESTED TYPES
    // =========================

    public static class BillSummary {
        private Long id;
        private String title;
        private Double amount;
        private LocalDate dueDate;
        private String status;

        public BillSummary() {
        }

        public BillSummary(Long id, String title, Double amount, LocalDate dueDate, String status) {
            this.id = id;
            this.title = title;
            this.amount = amount;
            this.dueDate = dueDate;
            this.status = status;
        }

        public Long getId() { return id; }
        public String getTitle() { return title; }
        public Double getAmount() { return amount; }
        public LocalDate getDueDate() { return dueDate; }
        public String getStatus() { return status; }
    }

    public static class CategoryBudget {
        private String category;
        private Double budgeted;
        private Double spent;
        private Double remaining;
        private Double percentage;

        public CategoryBudget() {
        }

        public CategoryBudget(String category, Double budgeted, Double spent, Double remaining, Double percentage) {
            this.category = category;
            this.budgeted = budgeted;
            this.spent = spent;
            this.remaining = remaining;
            this.percentage = percentage;
        }

        public String getCategory() { return category; }
        public Double getBudgeted() { return budgeted; }
        public Double getSpent() { return spent; }
        public Double getRemaining() { return remaining; }
        public Double getPercentage() { return percentage; }
    }
}
