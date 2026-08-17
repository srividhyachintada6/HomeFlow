package com.homeflow.service;

import com.homeflow.entity.GroceryItem;
import com.homeflow.repository.GroceryItemRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class GroceryItemService {

    private final GroceryItemRepository groceryItemRepository;

    public GroceryItemService(GroceryItemRepository groceryItemRepository) {
        this.groceryItemRepository = groceryItemRepository;
    }

    public List<GroceryItem> getItemsByUser(Long userId) {
        return groceryItemRepository
                .findByUserIdOrderByCreatedDateDesc(userId);
    }

    public List<GroceryItem> getItemsByUserAndStatus(
            Long userId,
            Boolean purchased
    ) {
        return groceryItemRepository
                .findByUserIdAndPurchasedOrderByCreatedDateDesc(
                        userId,
                        purchased
                );
    }

    public GroceryItem getItemById(Long id) {
        return groceryItemRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Grocery item not found"));
    }

    public GroceryItem addItem(GroceryItem item) {

        if (item.getPurchased() == null) {
            item.setPurchased(false);
        }

        if (item.getCreatedDate() == null) {
            item.setCreatedDate(LocalDate.now());
        }

        return groceryItemRepository.save(item);
    }

    public GroceryItem updateItem(
            Long id,
            GroceryItem updatedItem
    ) {

        GroceryItem existingItem = getItemById(id);

        existingItem.setName(updatedItem.getName());
        existingItem.setQuantity(updatedItem.getQuantity());
        existingItem.setUnit(updatedItem.getUnit());
        existingItem.setCategory(updatedItem.getCategory());
        existingItem.setEstimatedPrice(
                updatedItem.getEstimatedPrice()
        );
        existingItem.setPurchased(updatedItem.getPurchased());

        return groceryItemRepository.save(existingItem);
    }

    public GroceryItem togglePurchased(Long id) {

        GroceryItem item = getItemById(id);

        item.setPurchased(!item.getPurchased());

        return groceryItemRepository.save(item);
    }

    public void deleteItem(Long id) {

        if (!groceryItemRepository.existsById(id)) {
            throw new RuntimeException("Grocery item not found");
        }

        groceryItemRepository.deleteById(id);
    }
}