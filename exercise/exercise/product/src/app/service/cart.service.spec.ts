import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service'; // ok to keep, not used for now
import { HttpClient } from '@angular/common/http';

export interface CartItem {
  id: number;
  name: string;
  brand: string;
  pricePhp: number;
  imageUrl?: string;
  qty: number;
}
export interface CartState { items: CartItem[]; }

const KEY = 'cart_v1';

@Injectable({ providedIn: 'root' })
export class CartService extends BaseHttpService {
  private state: CartState;

  constructor(protected override http: HttpClient) {
    super(http, '/api/cart'); // not used; you said no API for cart
    this.state = this.load();
  }

  // ---- localStorage helpers ----
  private load(): CartState {
    try { return JSON.parse(localStorage.getItem(KEY) || '{"items":[]}'); }
    catch { return { items: [] }; }
  }
  private save() {
    localStorage.setItem(KEY, JSON.stringify(this.state));
  }

  // ---- query helpers (optional, handy for header badges) ----
  items(): CartItem[] { return this.state.items; }
  count(): number { return this.state.items.reduce((s,i)=>s+i.qty, 0); }
  subtotal(): number { return this.state.items.reduce((s,i)=>s+i.qty*i.pricePhp, 0); }

  // ---- REQUIRED by your component ----
  add(item: Omit<CartItem, 'qty'>, qty: number = 1): void {
    const ex = this.state.items.find(x => x.id === item.id);
    if (ex) ex.qty += qty;
    else this.state.items.push({ ...item, qty: Math.max(1, qty) });
    this.save();
  }

  // ---- useful extras for cart page ----
  setQty(id: number, qty: number): void {
    const it = this.state.items.find(x => x.id === id);
    if (!it) return;
    it.qty = Math.max(1, qty);
    this.save();
  }

  remove(id: number): void {
    this.state.items = this.state.items.filter(x => x.id !== id);
    this.save();
  }

  clear(): void {
    this.state.items = [];
    this.save();
  }
}
