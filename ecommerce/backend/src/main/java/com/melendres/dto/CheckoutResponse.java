package com.melendres.dto;

import java.util.List;

public class CheckoutResponse {
    public boolean ok;
    public String message;
    public List<Updated> updated;

    public static class Updated {
        public Integer id;
        public Integer stock;
        public Updated(Integer id, Integer stock){ this.id=id; this.stock=stock; }
    }
}