package com.homeflow.repository;

import com.homeflow.entity.GroceryItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface GroceryItemRepository extends JpaRepository<GroceryItem, Long> {

    List<GroceryItem> findByUserIdOrderByCreatedDateDesc(Long userId);

    @Query("""
        SELECT COALESCE(SUM(g.estimatedPrice), 0)
        FROM GroceryItem g
        WHERE g.user.id = :userId
        AND g.purchased = true
    """)
    Double getTotalPurchasedValue(@Param("userId") Long userId);

    List<GroceryItem> findByUserIdAndPurchasedOrderByCreatedDateDesc(
            Long userId,
            Boolean purchased
    );
}