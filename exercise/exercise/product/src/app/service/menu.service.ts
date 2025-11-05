// src/app/service/menu.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseHttpService } from './base-http.service';
import { Menu } from '../model/menu';

@Injectable({ providedIn: 'root' })
export class MenuService extends BaseHttpService {
  constructor(protected override http: HttpClient) {
    super(http, '/api/menu');
  }

  // Use API if available; append "Perfumes" if the API doesn't include it.
  override getData(): Observable<Menu[]> {
    return super.getData().pipe(
      map((response: any) => {
        // Accept common shapes: [], {data:[]}, {content:[]}
        const apiMenus: Menu[] = Array.isArray(response)
          ? response
          : Array.isArray(response?.data)
            ? response.data
            : Array.isArray(response?.content)
              ? response.content
              : [];

        const hasPerfumes = apiMenus.some(m =>
          (String(m?.routerPath ?? '').replace(/^\//, '').toLowerCase()) === 'perfumes'
        );

        return hasPerfumes ? apiMenus : [...apiMenus, this.perfumesMenu()];
      }),
      catchError(() => of(this.getFallbackMenus()))
    );
  }

  private perfumesMenu(): Menu {
    return { id: 7, name: 'Perfumes', description: '', routerPath: 'perfumes', categoryName: '' };
  }

  private getFallbackMenus(): Menu[] {
    return [
      { id: 1, name: 'Home',       description: '', routerPath: '',         categoryName: '' },
      { id: 2, name: 'Products',   description: '', routerPath: 'product',  categoryName: '' },
      { id: 3, name: 'Customer',   description: '', routerPath: 'customer', categoryName: '' },
      { id: 4, name: 'Cart',       description: '', routerPath: 'cart',     categoryName: '' },
      { id: 5, name: 'Orders',     description: '', routerPath: 'order',    categoryName: '' },
      { id: 6, name: 'Contact Us', description: '', routerPath: 'contact',  categoryName: '' },
      { id: 7, name: 'Perfumes',   description: '', routerPath: 'perfumes', categoryName: '' }
    ];
  }
}
