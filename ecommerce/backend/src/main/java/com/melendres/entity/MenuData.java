package com.melendres.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "menu_data")
public class MenuData {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int id;
    String name;
    String description;
    String routerPath;
    String categoryName;
    String icon;
}
