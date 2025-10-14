package com.melendres.model;

import lombok.Data;

import java.util.List;
@Data
public class ProductCategory {
    String categoryName;
    List<Product> products;
}