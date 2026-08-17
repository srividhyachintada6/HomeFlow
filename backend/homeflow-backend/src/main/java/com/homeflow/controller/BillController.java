package com.homeflow.controller;

import com.homeflow.entity.Bill;
import com.homeflow.service.BillService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bills")
@CrossOrigin(origins = "http://localhost:5173")
public class BillController {

    private final BillService billService;

    public BillController(BillService billService) {
        this.billService = billService;
    }

    // Get all bills for a user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Bill>> getBillsByUser(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                billService.getBillsByUser(userId)
        );
    }

    // Get one bill
    @GetMapping("/{id}")
    public ResponseEntity<Bill> getBillById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                billService.getBillById(id)
        );
    }

    // Add bill
    @PostMapping
    public ResponseEntity<Bill> addBill(
            @RequestBody Bill bill) {

        return ResponseEntity.ok(
                billService.addBill(bill)
        );
    }

    // Update bill
    @PutMapping("/{id}")
    public ResponseEntity<Bill> updateBill(
            @PathVariable Long id,
            @RequestBody Bill bill) {

        return ResponseEntity.ok(
                billService.updateBill(id, bill)
        );
    }

    // Delete bill
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBill(
            @PathVariable Long id) {

        billService.deleteBill(id);

        return ResponseEntity.noContent().build();
    }
}