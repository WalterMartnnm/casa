// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { MainBodyComponent } from './main-body/main-body.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { ProductOrderComponent } from './product-order/product-order.component';
import { CustomerServiceComponent } from './customer-service/customer-service.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

export const routes: Routes = [
  { path: '', component: MainBodyComponent },
  { path: 'cart', component: ShoppingCartComponent },
  { path: 'product', component: ProductCategoryComponent },
  { path: 'order', component: ProductOrderComponent },
  { path: 'customer', component: CustomerServiceComponent },
  { path: 'contact', component: ContactUsComponent }
];
