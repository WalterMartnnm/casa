import { Routes } from '@angular/router';
import { PerfumeListComponent } from './pages/perfume-list/perfume-list.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductOrderComponent } from './product-order/product-order.component';

import { CustomerServiceComponent } from './customer-service/customer-service.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

export const routes: Routes = [
  { path: '', redirectTo: 'perfumes', pathMatch: 'full' },
  { path: 'perfumes', component: PerfumeListComponent },
  
  { path: 'cart', component: ShoppingCartComponent },
  { path: 'order', component: ProductOrderComponent },
  { path: 'customer', component: CustomerServiceComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: '**', redirectTo: 'perfumes' }
];
