import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService, CartItem } from '../service/cart.service';

@Component({
  selector: 'app-product-order',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-order.component.html',
  styleUrls: ['./product-order.component.css']
})
export class ProductOrderComponent implements OnInit {

  // ----- cart summary -----
  items: CartItem[] = [];
  subtotal = 0;
  shipping = 0;
  total = 0;

  // ----- simple checkout form model -----
  form = {
    fullName: '',
    phone: '',
    address: '',
    paymentMethod: 'COD',   // COD | GCash | Card
    notes: ''
  };

  // ----- state/flags -----
  isPlacing = false;

  // ----- constants / storage -----
  private readonly FREE_SHIPPING_MIN = 5000;
  private readonly SHIPPING_FEE = 150;
  private readonly ORDERS_KEY = 'orders_v1';

  constructor(private cart: CartService, private router: Router) {}

  ngOnInit(): void {
    this.refreshFromCart();
  }

  // ---- quantity controls (use service so stock limits apply) ----
  inc(i: CartItem) { this.cart.inc(Number(i.id)); this.refreshFromCart(); }
  dec(i: CartItem) { this.cart.dec(Number(i.id)); this.refreshFromCart(); }
  remove(i: CartItem) { this.cart.remove(Number(i.id)); this.refreshFromCart(); }
  clearCart() { this.cart.clear(); this.refreshFromCart(); }

  // ---- main checkout action ----
  placeOrder(): void {
    if (!this.items.length) { alert('Your cart is empty.'); return; }
    const error = this.validateForm();
    if (error) { alert(error); return; }
    if (this.isPlacing) return;

    this.isPlacing = true;

    const order = {
      id: this.genId(),
      createdAt: new Date().toISOString(),
      items: this.clone(this.items),
      subtotal: this.subtotal,
      shipping: this.shipping,
      total: this.total,
      customer: this.clone(this.form)
    };

    // 1) call backend to decrement stocks atomically
    this.cart.checkout().subscribe({
      next: (resp: any) => {
        this.isPlacing = false;

        if (resp?.ok) {
          // console.table(resp.updated ?? []); // (optional) inspect new stocks

          // 2) persist local order history (optional)
          const all = this.loadOrders();
          all.push(order);
          localStorage.setItem(this.ORDERS_KEY, JSON.stringify(all));

          // 3) clear cart + refresh totals
          this.cart.clear();
          this.refreshFromCart();

          alert('✅ Order placed! Stock updated.');
          this.router.navigate(['/order-success', order.id]);
        } else {
          alert(`❌ Checkout failed${resp?.message ? `: ${resp.message}` : ''}`);
        }
      },
      error: (err) => {
        this.isPlacing = false;
        const msg = err?.error?.message || err?.message || 'Unknown error';
        alert(`❌ Checkout failed: ${msg}`);
      }
    });
  }

  // ---------- helpers ----------
  private refreshFromCart(): void {
    this.items = this.cart.items();
    this.subtotal = this.cart.subtotal();
    this.shipping = this.subtotal >= this.FREE_SHIPPING_MIN
      ? 0
      : (this.items.length ? this.SHIPPING_FEE : 0);
    this.total = this.subtotal + this.shipping;
  }

  private validateForm(): string | null {
    if (!this.form.fullName.trim()) return 'Please enter your full name.';
    if (!this.form.phone.trim()) return 'Please enter your phone number.';
    if (!this.form.address.trim()) return 'Please enter your address.';
    return null;
  }

  private loadOrders(): any[] {
    try { return JSON.parse(localStorage.getItem(this.ORDERS_KEY) || '[]'); }
    catch { return []; }
  }

  private genId(): string {
    return 'ORD-' + Math.random().toString(36).slice(2,7).toUpperCase()
           + '-' + Date.now().toString().slice(-5);
  }

  private clone<T>(v: T): T {
    return JSON.parse(JSON.stringify(v));
  }
}
