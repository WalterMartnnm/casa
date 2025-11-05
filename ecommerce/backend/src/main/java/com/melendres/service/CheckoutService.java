// src/main/java/com/melendres/service/CheckoutService.java
package com.melendres.service;

import com.melendres.dto.CheckoutRequest;
import com.melendres.dto.CheckoutResponse;
import com.melendres.model.Perfume;
import com.melendres.repository.PerfumeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service
public class CheckoutService {
    private final PerfumeRepository repo;

    public CheckoutService(PerfumeRepository repo) {
        this.repo = repo;
    }

    @Transactional
    public CheckoutResponse checkout(CheckoutRequest req) {
        var resp = new CheckoutResponse();
        resp.updated = new ArrayList<>();

        if (req == null || req.items == null || req.items.isEmpty()) {
            resp.ok = false;
            resp.message = "Cart is empty.";
            return resp;
        }

        // Validate availability first (with locks)
        for (var it : req.items) {
            var p = repo.lockById(it.productId)
                    .orElseThrow(() -> new IllegalArgumentException("Product not found: " + it.productId));
            if (it.qty == null || it.qty <= 0) {
                throw new IllegalArgumentException("Invalid qty for product " + it.productId);
            }
            if (p.getStock() < it.qty) {
                throw new IllegalStateException("Insufficient stock for product " + p.getId() + " (" + p.getStock() + " left)");
            }
        }

        // Perform decrements
        for (var it : req.items) {
            // either use SQL fast path...
            int updated = repo.tryDecrement(it.productId, it.qty);
            if (updated == 0) {
                // ...or fallback to entity update in case of race
                var p = repo.lockById(it.productId).orElseThrow();
                if (p.getStock() < it.qty) {
                    throw new IllegalStateException("Insufficient stock for product " + p.getId());
                }
                p.setStock(p.getStock() - it.qty);
                repo.save(p);
                resp.updated.add(new CheckoutResponse.Updated(p.getId(), p.getStock()));
            } else {
                // read back new stock (cheap: use lock and select or maintain in memory)
                var p = repo.lockById(it.productId).orElseThrow();
                resp.updated.add(new CheckoutResponse.Updated(p.getId(), p.getStock()));
            }
        }

        resp.ok = true;
        resp.message = "Order placed.";
        return resp;
    }
}
