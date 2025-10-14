package com.melendres.service;
import com.melendres.enums.OrderItemStatus;
import com.melendres.model.OrderItem;

import java.util.List;

public interface OrderItemService {
    List<OrderItem> getAll();
    List<OrderItem> getOrderItems(Integer customerId);
    List<OrderItem> getCartItems(Integer customerId);
    OrderItem create(OrderItem orderItem);
    List<OrderItem> create(List<OrderItem> orderItems);
    OrderItem update(OrderItem orderItem);
    List<OrderItem> update(List<OrderItem> orderItems);
    List<OrderItem> updateStatus(List<Integer> id, OrderItemStatus orderItemStatus);
    OrderItem get(Integer id);
    void delete (Integer id);
}
