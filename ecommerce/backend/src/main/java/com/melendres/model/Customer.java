package com.melendres.model;

import lombok.Data;

import java.util.Date;

@Data
public class Customer {
    int id;
    String firstname;
    String middlename;
    String lastname;
    Date dateOfBirth;
    String Gender;
}
