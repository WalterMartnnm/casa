package com.melendres.model;
import com.melendres.enums.OrderItemStatus;
import lombok.Data;

import java.util.*;

@Data
public class OrderItem {
    int id;
    int orderId;
    int customerId;
    String customerName;
    int productId;
    String productName;
    String productDescription;
    String productCategoryName;
    String productImageFile;
    String productUnitOfMeasure;
    double quantity;
    double price;
    OrderItemStatus status;
    Date created;
    Date lastUpdated;
}
