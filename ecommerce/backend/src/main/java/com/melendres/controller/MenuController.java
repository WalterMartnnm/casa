package com.melendres.controller;

import com.melendres.model.Menu;
import com.melendres.service.MenuService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@Slf4j
public class MenuController {
    @Autowired
    private MenuService menuService;

    @RequestMapping("/api/menu")
    public ResponseEntity<?> getMenus()
    {
        HttpHeaders headers = new HttpHeaders();
        ResponseEntity<?> response;
        try {
            List<Menu> menus = menuService.getMenus();
            response = ResponseEntity.ok(menus);
        }
        catch( Exception ex)
        {
            log.error("Failed to retrieve menu with id : {}", ex.getMessage(), ex);
            response = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
        }
        return response;
    }
    @PutMapping("/api/menu")
    public ResponseEntity<?> add(@RequestBody Menu menu){
        log.info("Input >> " + menu.toString() );
        HttpHeaders headers = new HttpHeaders();
        ResponseEntity<?> response;
        try {
            Menu newMenu = menuService.create(menu);
            log.info("created menu >> " + newMenu.toString() );
            response = ResponseEntity.ok(newMenu);
        }
        catch( Exception ex)
        {
            log.error("Failed to retrieve menu with id : {}", ex.getMessage(), ex);
            response = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
        }
        return response;
    }
}
