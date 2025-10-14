import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseHttpService } from './base-http.service';
import { Menu } from '../model/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService extends BaseHttpService {
  constructor(protected override http: HttpClient) {
    super(http, '/api/menu');
  }

  override getData(): Observable<Menu[]> {
    return super.getData().pipe(
      map((response: any) => {
        if (Array.isArray(response) && response.length > 0) {
          return response;
        }

        return this.getFallbackMenus();
      }),
      catchError((error) => {
        console.warn('⚠️ Menu API unavailable, loading fallback menu...', error);
        return of(this.getFallbackMenus());
      })
    );
  }

  private getFallbackMenus(): Menu[] {
    return [
      { id: 1, name: 'Home', description: '', routerPath: '', categoryName: '' },
      { id: 2, name: 'Products', description: '', routerPath: 'product', categoryName: '' },
      { id: 3, name: 'Customer', description: '', routerPath: 'customer', categoryName: '' },
      { id: 4, name: 'Cart', description: '', routerPath: 'cart', categoryName: '' },
      { id: 5, name: 'Orders', description: '', routerPath: 'order', categoryName: '' },
      { id: 6, name: 'Contact Us', description: '', routerPath: 'contact', categoryName: '' }
    ];
  }
}
