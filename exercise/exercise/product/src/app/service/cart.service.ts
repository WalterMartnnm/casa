import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

/** --- Models --- */
export interface CartItem {
  id: number;
  name: string;
  brand: string;
  pricePhp: number;
  imageUrl?: string;
  /** NEW: stock available for this item (used to clamp qty in UI) */
  stock: number;
  qty: number;
}
export interface CartState { items: CartItem[]; }

const KEY = 'gmart_cart';

@Injectable({ providedIn: 'root' })
export class CartService {
  /** in-memory state + subject */
  private state: CartState = this.load();
  private stateSubject = new BehaviorSubject<CartState>(this.state);

  /** reactive streams */
  readonly state$    = this.stateSubject.asObservable();
  readonly items$:    Observable<CartItem[]> = this.state$.pipe(map(s => s.items));
  readonly count$:    Observable<number>     = this.state$.pipe(map(s => s.items.reduce((a,i)=>a + i.qty, 0)));
  readonly subtotal$: Observable<number>     = this.state$.pipe(map(s => s.items.reduce((a,i)=>a + i.qty * i.pricePhp, 0)));

  constructor(private http: HttpClient) {}

  /** sync helpers (unchanged) */
  items(): CartItem[] { return this.state.items; }
  count(): number { return this.state.items.reduce((a,i)=>a + i.qty, 0); }
  subtotal(): number { return this.state.items.reduce((a,i)=>a + i.qty * i.pricePhp, 0); }

  /** ------------ Mutations ------------ */

  /**
   * Add item to cart. Clamps quantity so it never exceeds `stock`.
   * Usage: addToCart({ id, name, brand, pricePhp, imageUrl, stock }, qty?)
   */
  addToCart(item: Omit<CartItem,'qty'>, qty: number = 1): void {
    if (item.stock <= 0) return; // nothing available

    const items = this.state.items.slice();
    const idx = items.findIndex(x => x.id === item.id);

    if (idx >= 0) {
      const current = items[idx];
      const nextQty = Math.min(current.qty + qty, current.stock);
      items[idx] = { ...current, qty: nextQty };
    } else {
      items.push({ ...item, qty: Math.min(Math.max(1, qty), item.stock) });
    }

    this.state.items = items;
    this.commit();
  }

  /** Set explicit quantity (clamped 1..stock) */
  setQty(id: number, qty: number): void {
    const it = this.state.items.find(x => x.id === id);
    if (!it) return;
    const next = Math.max(1, Math.min(qty, it.stock));
    if (next === it.qty) return;
    it.qty = next;
    this.commit();
  }

  /** Convenience: +1 (respects stock) */
  inc(id: number): void {
    const it = this.state.items.find(x => x.id === id);
    if (!it) return;
    if (it.qty < it.stock) { it.qty += 1; this.commit(); }
  }

  /** Convenience: -1 (min 1) */
  dec(id: number): void {
    const it = this.state.items.find(x => x.id === id);
    if (!it) return;
    if (it.qty > 1) { it.qty -= 1; this.commit(); }
  }

  remove(id: number): void {
    this.state.items = this.state.items.filter(x => x.id !== id);
    this.commit();
  }

  clear(): void {
    this.state.items = [];
    this.commit();
  }

  /** ------------ Checkout ------------ */

  /**
   * Calls Spring Boot: POST /api/orders/checkout
   * Body: { items: [{ productId, qty }] }
   * On success, you can clear the cart in the component.
   */
  checkout() {
    const payload = {
      items: this.state.items.map(i => ({ productId: i.id, qty: i.qty }))
    };
    return this.http.post<{ok:boolean; message?:string; updated?:{id:number; stock:number}[]}>(
      '/api/orders/checkout',
      payload
    );
  }
  /** ------------ Persistence ------------ */
  private load(): CartState {
    try { return JSON.parse(localStorage.getItem(KEY) || '{"items":[]}'); }
    catch { return { items: [] }; }
  }
  private save(): void { localStorage.setItem(KEY, JSON.stringify(this.state)); }
  private commit(): void {
    this.save();
    this.stateSubject.next({ ...this.state, items: [...this.state.items] });
  }
}
