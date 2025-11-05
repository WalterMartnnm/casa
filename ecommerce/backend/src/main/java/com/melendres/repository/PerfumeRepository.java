// src/main/java/com/melendres/repository/PerfumeRepository.java
package com.melendres.repository;

import com.melendres.model.Perfume;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.persistence.LockModeType;
import java.util.List;
import java.util.Optional;

@Repository
public interface PerfumeRepository extends JpaRepository<Perfume, Integer> {

    // Row lock for safe stock updates
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select p from Perfume p where p.id = :id")
    Optional<Perfume> lockById(@Param("id") Integer id);

    // Atomic decrement (fast-path)
    @Modifying
    @Query("update Perfume p set p.stock = p.stock - :qty " +
            "where p.id = :id and p.stock >= :qty")
    int tryDecrement(@Param("id") Integer id, @Param("qty") int qty);

    // Catalog finders that match your columns
    List<Perfume> findByBrandContainingIgnoreCase(String brand);
    List<Perfume> findByPerfumeNameContainingIgnoreCase(String q);
}
