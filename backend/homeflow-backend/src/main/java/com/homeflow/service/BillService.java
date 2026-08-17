package com.homeflow.service;

import com.homeflow.entity.Bill;
import com.homeflow.repository.BillRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BillService {

    private final BillRepository billRepository;

    public BillService(BillRepository billRepository) {
        this.billRepository = billRepository;
    }

    public List<Bill> getBillsByUser(Long userId) {
        return billRepository.findByUserIdOrderByDueDateAsc(userId);
    }

    public Bill getBillById(Long id) {
        return billRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bill not found"));
    }

    public Bill addBill(Bill bill) {
        return billRepository.save(bill);
    }

    public Bill updateBill(Long id, Bill updatedBill) {

        Bill existingBill = getBillById(id);

        existingBill.setTitle(updatedBill.getTitle());
        existingBill.setAmount(updatedBill.getAmount());
        existingBill.setCategory(updatedBill.getCategory());
        existingBill.setDueDate(updatedBill.getDueDate());
        existingBill.setStatus(updatedBill.getStatus());
        existingBill.setDescription(updatedBill.getDescription());

        return billRepository.save(existingBill);
    }

    public void deleteBill(Long id) {

        if (!billRepository.existsById(id)) {
            throw new RuntimeException("Bill not found");
        }

        billRepository.deleteById(id);
    }
}