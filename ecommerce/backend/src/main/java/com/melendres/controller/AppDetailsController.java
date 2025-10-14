package com.melendres.controller;
import org.springframework.web.bind.annotation.*;
import com.melendres.model.AppDetail;

import java.util.List;
@RestController
public class AppDetailsController {
    public  List<AppDetail> getMainMenu(){
        List<AppDetail> appDetails = null;
        return appDetails;
    }
}
