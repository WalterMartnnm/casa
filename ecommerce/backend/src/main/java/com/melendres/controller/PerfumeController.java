// src/main/java/com/melendres/controller/PerfumeController.java
package com.melendres.controller;

import com.melendres.model.Perfume;
import com.melendres.repository.PerfumeRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/perfumes")
public class PerfumeController {
    private final PerfumeRepository repo;
    public PerfumeController(PerfumeRepository repo) { this.repo = repo; }

    @GetMapping
    public List<Perfume> list(
            @RequestParam(required = false) String brand,
            @RequestParam(required = false, name = "q") String q
    ) {
        if (brand != null && !brand.isBlank()) return repo.findByBrandContainingIgnoreCase(brand);
        if (q != null && !q.isBlank()) return repo.findByPerfumeNameContainingIgnoreCase(q);
        return repo.findAll();
    }
}
