// src/main/java/com/melendres/controller/OrderController.java
package com.melendres.controller;

import com.melendres.model.Perfume;
import com.melendres.repository.PerfumeRepository;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping(value = "/api/orders", produces = MediaType.APPLICATION_JSON_VALUE)
public class OrderController {
    private final PerfumeRepository repo;
    public OrderController(PerfumeRepository repo) { this.repo = repo; }

    @PostMapping(value="/checkout", consumes = MediaType.APPLICATION_JSON_VALUE)
    @Transactional
    public ResponseEntity<CheckoutResponse> checkout(@RequestBody CheckoutRequest req){
        if (req == null || req.items == null || req.items.isEmpty())
            return ResponseEntity.badRequest().body(CheckoutResponse.error("No items to checkout."));

        Map<Integer, Perfume> locked = new HashMap<>();
        for (CheckoutItem it : req.items) {
            if (it == null || it.productId == null || it.qty <= 0)
                return ResponseEntity.badRequest().body(CheckoutResponse.error("Invalid item."));
            var p = repo.lockById(it.productId).orElse(null);
            if (p == null) return ResponseEntity.status(404).body(CheckoutResponse.error("Product " + it.productId + " not found."));
            if (p.getStock() < it.qty) return ResponseEntity.status(409).body(CheckoutResponse.error("Insufficient stock for " + it.productId));
            locked.put(p.getId(), p);
        }

        for (CheckoutItem it : req.items) {
            int changed = repo.tryDecrement(it.productId, it.qty);
            if (changed == 0) {
                var p = locked.get(it.productId);
                if (p.getStock() < it.qty) return ResponseEntity.status(409).body(CheckoutResponse.error("Insufficient stock for " + it.productId));
                p.setStock(p.getStock() - it.qty);
            }
        }
        repo.saveAll(locked.values());

        var updated = new ArrayList<UpdatedStock>();
        for (var p : locked.values()) updated.add(new UpdatedStock(p.getId(), p.getStock()));
        return ResponseEntity.ok(CheckoutResponse.ok(updated));
    }

    // DTOs
    public static class CheckoutItem { public Integer productId; public int qty; }
    public static class CheckoutRequest { public List<CheckoutItem> items; }
    public static class UpdatedStock { public Integer id; public int stock; public UpdatedStock(Integer id,int stock){this.id=id;this.stock=stock;} }
    public static class CheckoutResponse {
        public boolean ok; public String message; public List<UpdatedStock> updated;
        public static CheckoutResponse ok(List<UpdatedStock> u){ var r=new CheckoutResponse(); r.ok=true; r.updated=u; return r; }
        public static CheckoutResponse error(String m){ var r=new CheckoutResponse(); r.ok=false; r.message=m; r.updated=List.of(); return r; }
    }
}
