package com.melendres.service;

import com.melendres.model.Order;

public interface OrderService {
    Order create(Order order);
    Order invoice(Order order);
    Order pay(Order order);
    Order pick(Order order);
    Order ship(Order order);
    Order complete(Order order);
    Order cancel(Order order);
    Order suspend(Order order);
    Order update(Order order);
}
