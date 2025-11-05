// src/main/java/com/melendres/model/Perfume.java
package com.melendres.model;

import javax.persistence.*;

@Entity
@Table(name = "perfumes")
public class Perfume {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "perfume_name")
    private String perfumeName;

    @Column(name = "brand")
    private String brand;

    @Column(name = "price_php")
    private Double pricePhp;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "stock", nullable = false)
    private Integer stock;

    // getters/setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getPerfumeName() { return perfumeName; }
    public void setPerfumeName(String perfumeName) { this.perfumeName = perfumeName; }
    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }
    public Double getPricePhp() { return pricePhp; }
    public void setPricePhp(Double pricePhp) { this.pricePhp = pricePhp; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public Integer getStock() { return stock; }
    public void setStock(Integer stock) { this.stock = stock; }
}
