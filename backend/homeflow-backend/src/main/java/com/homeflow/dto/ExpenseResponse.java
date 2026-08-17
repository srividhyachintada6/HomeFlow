package com.homeflow.dto;

import java.time.LocalDate;

public class ExpenseResponse {

    private Long id;
    private String title;
    private Double amount;
    private String category;
    private LocalDate expenseDate;
    private String description;

    public ExpenseResponse(
            Long id,
            String title,
            Double amount,
            String category,
            LocalDate expenseDate,
            String description) {

        this.id = id;
        this.title = title;
        this.amount = amount;
        this.category = category;
        this.expenseDate = expenseDate;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public Double getAmount() {
        return amount;
    }

    public String getCategory() {
        return category;
    }

    public LocalDate getExpenseDate() {
        return expenseDate;
    }

    public String getDescription() {
        return description;
    }
}