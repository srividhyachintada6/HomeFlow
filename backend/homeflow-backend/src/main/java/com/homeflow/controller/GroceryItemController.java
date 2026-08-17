package com.homeflow.controller;

import com.homeflow.entity.GroceryItem;
import com.homeflow.service.GroceryItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/grocery")
@CrossOrigin(origins = "http://localhost:5173")
public class GroceryItemController {

    private final GroceryItemService groceryItemService;

    public GroceryItemController(
            GroceryItemService groceryItemService
    ) {
        this.groceryItemService = groceryItemService;
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<GroceryItem>> getItemsByUser(
            @PathVariable Long userId
    ) {
        return ResponseEntity.ok(
                groceryItemService.getItemsByUser(userId)
        );
    }

    @GetMapping("/user/{userId}/status/{purchased}")
    public ResponseEntity<List<GroceryItem>> getItemsByStatus(
            @PathVariable Long userId,
            @PathVariable Boolean purchased
    ) {
        return ResponseEntity.ok(
                groceryItemService.getItemsByUserAndStatus(
                        userId,
                        purchased
                )
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<GroceryItem> getItem(
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(
                groceryItemService.getItemById(id)
        );
    }

    @PostMapping
    public ResponseEntity<GroceryItem> addItem(
            @RequestBody GroceryItem item
    ) {
        return ResponseEntity.ok(
                groceryItemService.addItem(item)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<GroceryItem> updateItem(
            @PathVariable Long id,
            @RequestBody GroceryItem item
    ) {
        return ResponseEntity.ok(
                groceryItemService.updateItem(id, item)
        );
    }

    @PutMapping("/{id}/toggle")
    public ResponseEntity<GroceryItem> togglePurchased(
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(
                groceryItemService.togglePurchased(id)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteItem(
            @PathVariable Long id
    ) {
        groceryItemService.deleteItem(id);

        return ResponseEntity.ok(
                "Grocery item deleted successfully"
        );
    }
}