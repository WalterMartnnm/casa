// src/app/shopping-cart/shopping-cart.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

const CART_KEY = 'gmart_cart'; // must match the key used by your CartService

export interface CartItem {
  id: number | string;
  name: string;
  brand?: string;
  pricePhp: number;
  imageUrl?: string;
  qty: number;
  /** NEW: available stock for this product (optional if not stored) */
  stock?: number;
}

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  items: CartItem[] = [];
  count = 0;
  subtotal = 0;
  message = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.load();
  }

  /** -------- localStorage helpers -------- */
  private readCart(): CartItem[] {
    try {
      const raw = localStorage.getItem(CART_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw) as any[];
      return (parsed || []).map(p => ({
        id: p.id,
        name: p.name,
        brand: p.brand ?? '',
        pricePhp: Number(p.pricePhp) || 0,
        imageUrl: p.imageUrl ?? '',
        qty: Number(p.qty) > 0 ? Number(p.qty) : 1,
        // NEW: carry stock if your addToCart stored it; default to "infinite"
        stock: Number.isFinite(Number(p.stock)) ? Number(p.stock) : undefined
      }));
    } catch {
      return [];
    }
  }

  private writeCart(items: CartItem[]): void {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }

  private recompute(): void {
    this.count = this.items.reduce((s, i) => s + i.qty, 0);
    this.subtotal = this.items.reduce((s, i) => s + i.qty * i.pricePhp, 0);
  }

  load(): void {
    this.items = this.readCart();
    this.recompute();
  }

  /** -------- qty controls (respect stock) -------- */
  canInc(it: CartItem): boolean {
    // allow increment if stock is not known OR qty < stock
    return it.stock == null || it.qty < it.stock;
  }

  inc(it: CartItem): void {
    if (!this.canInc(it)) return;
    it.qty += 1;
    this.writeCart(this.items);
    this.recompute();
  }

  dec(it: CartItem): void {
    if (it.qty > 1) {
      it.qty -= 1;
      this.writeCart(this.items);
      this.recompute();
    } else {
      this.remove(it);
    }
  }

  remove(it: CartItem): void {
    this.items = this.items.filter(x => x.id !== it.id);
    this.writeCart(this.items);
    this.recompute();
  }

  clear(): void {
    this.items = [];
    this.writeCart(this.items);
    this.recompute();
  }

  trackById = (_: number, it: CartItem) => it.id;

  /** -------- checkout: calls Spring and clears cart -------- */
  checkout(): void {
    if (this.items.length === 0) return;

    this.message = '';
    const payload = {
      items: this.items.map(i => ({
        productId: Number(i.id),
        qty: i.qty
      }))
    };

    this.http.post<{ ok: boolean; message?: string; updated?: { id: number; stock: number }[] }>(
      '/api/orders/checkout',
      payload
    ).subscribe({
      next: (resp) => {
        if (resp?.ok) {
          // Optional: log updated stocks returned by backend
          // console.table(resp.updated || []);
          this.clear();
          this.message = 'Order placed! Stock updated.';
        } else {
          this.message = resp?.message || 'Checkout failed.';
        }
      },
      error: (err) => {
        this.message = err?.error?.message || 'Checkout failed.';
      }
    });
  }
}
