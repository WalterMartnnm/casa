package com.melendres.serviceimpl;
import com.melendres.entity.MenuData;
import com.melendres.model.Menu;
import com.melendres.repository.MenuDataRepository;
import com.melendres.service.MenuService;
import com.melendres.util.Transform;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;


@Slf4j
@Service
public class MenuServiceImpl implements MenuService {

    @Autowired
    MenuDataRepository menuDataRepository;

    Transform<MenuData, Menu> transformMenuData = new Transform<>(Menu.class);
    Transform<Menu, MenuData> transformMenu = new Transform<>(MenuData.class);
    
    @Override
    public List<Menu> getMenus() {
        List<MenuData> menusData = new ArrayList<>();
        List<Menu> menus = new ArrayList<>();
        menuDataRepository.findAll().forEach(menusData::add);
        Iterator<MenuData> it = menusData.iterator();
        while(it.hasNext()) {
            MenuData menuData = it.next();
            Menu menu = transformMenuData.transform(menuData);
            menus.add(menu);
        }
        return menus;
    }

    @Override
    public Menu create(Menu menu) {
        log.info(" add:Input " + menu.toString());
        MenuData menuData = transformMenu.transform(menu);

        MenuData newMenuData = menuDataRepository.save(menuData);

        log.info(" add:Input " + menuData.toString());
        return transformMenuData.transform(newMenuData);
    }
}
