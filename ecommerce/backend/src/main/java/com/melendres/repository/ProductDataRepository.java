// src/main/java/com/melendres/repository/ProductDataRepository.java
package com.melendres.repository;

import com.melendres.entity.ProductData;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.persistence.LockModeType;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductDataRepository extends JpaRepository<ProductData, Integer> {

    // Row lock for safe stock checks/updates
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select p from ProductData p where p.id = :id")
    Optional<ProductData> lockById(@Param("id") Integer id);

    // Optional fast-path atomic decrement
    @Modifying
    @Query("update ProductData p set p.stock = p.stock - :qty " +
            "where p.id = :id and p.stock >= :qty")
    int tryDecrement(@Param("id") Integer id, @Param("qty") int qty);

    // Catalog queries that match your fields
    List<ProductData> findByCategoryNameIgnoreCase(String categoryName);
    List<ProductData> findByNameContainingIgnoreCase(String q);
}
