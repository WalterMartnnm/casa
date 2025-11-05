package com.melendres.dto;

import java.util.List;

public class CheckoutRequest {
    public List<Item> items;

    public static class Item {
        public Integer productId;
        public Integer qty;
    }
}