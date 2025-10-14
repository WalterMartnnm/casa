package com.melendres.entity;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

public class OrderData {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int id;
}
