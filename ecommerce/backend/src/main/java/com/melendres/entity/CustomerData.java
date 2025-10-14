package com.melendres.entity;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

public class CustomerData {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int id;
    String firstname;
    String middlename;
    String lastname;
    Date dateOfBirth;
    String Gender;
}

