import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MenuService } from '../service/menu.service';
import { Menu } from '../model/menu';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [MenuService] // ✅ add this line
})
export class HeaderComponent implements OnInit {
  public menus: Menu[] = [];

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.menuService.getData().subscribe((data) => {
      this.menus = data;
    });
  }
}
