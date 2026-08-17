package com.homeflow.repository;

import com.homeflow.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDate;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    List<Expense> findByUserIdOrderByExpenseDateDesc(Long userId);

    List<Expense> findByUserIdAndCategoryOrderByExpenseDateDesc(
            Long userId,
            String category
    );

    @Query("""
    SELECT COALESCE(SUM(e.amount), 0)
    FROM Expense e
    WHERE e.user.id = :userId
    AND e.category = :category
    AND e.expenseDate BETWEEN :startDate AND :endDate
""")
Double getTotalSpent(
        @Param("userId") Long userId,
        @Param("category") String category,
        @Param("startDate") LocalDate startDate,
        @Param("endDate") LocalDate endDate
);

@Query("""
    SELECT COALESCE(SUM(e.amount), 0)
    FROM Expense e
    WHERE e.user.id = :userId
""")
Double getTotalExpense(
        @Param("userId") Long userId
);
@Query("""
    SELECT e.category, COALESCE(SUM(e.amount), 0)
    FROM Expense e
    WHERE e.user.id = :userId
    GROUP BY e.category
    ORDER BY SUM(e.amount) DESC
""")
List<Object[]> getCategoryWiseExpenses(
        @Param("userId") Long userId
);

@Query("""
    SELECT COALESCE(SUM(e.amount), 0)
    FROM Expense e
    WHERE e.user.id = :userId
    AND e.expenseDate BETWEEN :startDate AND :endDate
""")
Double getTotalExpenseBetween(
        @Param("userId") Long userId,
        @Param("startDate") LocalDate startDate,
        @Param("endDate") LocalDate endDate
);
}