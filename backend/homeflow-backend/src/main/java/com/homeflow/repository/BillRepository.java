package com.homeflow.repository;

import com.homeflow.entity.Bill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface BillRepository extends JpaRepository<Bill, Long> {

    List<Bill> findByUserIdOrderByDueDateAsc(Long userId);

    @Query("""
        SELECT COALESCE(SUM(b.amount), 0)
        FROM Bill b
        WHERE b.user.id = :userId
        AND b.status <> 'PAID'
    """)
    Double getTotalUpcoming(@Param("userId") Long userId);

    @Query("""
        SELECT COALESCE(SUM(b.amount), 0)
        FROM Bill b
        WHERE b.user.id = :userId
        AND b.status = 'PAID'
    """)
    Double getTotalPaid(@Param("userId") Long userId);

    List<Bill> findByUserIdAndStatusOrderByDueDateAsc(
            Long userId,
            String status
    );

    List<Bill> findByUserIdAndCategoryOrderByDueDateAsc(
            Long userId,
            String category
    );

    List<Bill> findByUserIdAndDueDateBetweenOrderByDueDateAsc(
            Long userId,
            LocalDate startDate,
            LocalDate endDate
    );
}