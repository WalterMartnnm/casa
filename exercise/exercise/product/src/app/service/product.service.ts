import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Perfume } from '../model/perfume';
import { ProductCategory } from '../model/product-category';

// Relaxed DTO from backend
type PerfumeDto = {
  id: number | string;
  perfumeName?: string;
  name?: string;
  brand?: string;
  occasion?: string | null;
  pricePhp: number | string;
  volumeMl?: number | string | null;
  category?: string | null;
  imageUrl?: string | null;
  stock?: number | string | null;
};

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly base = '/api/perfumes';
  constructor(private http: HttpClient) {}

  /** What main-body/product-category consume */
  getData(): Observable<ProductCategory[]> {
    return this.http.get<PerfumeDto[]>(this.base).pipe(
      map(list => list.map(toPerfume)),
      map(groupByCategory) // Perfume[] -> ProductCategory[] (with Perfume[])
    );
  }
}

/* -------- helpers -------- */

function toPerfume(p: PerfumeDto): Perfume {
  return {
    id: Number(p.id),
    perfumeName: p.perfumeName ?? p.name ?? '',
    brand: p.brand ?? '',
    occasion: p.occasion ?? null,
    pricePhp: Number(p.pricePhp),
    volumeMl: p.volumeMl != null ? Number(p.volumeMl) : null,
    category: p.category ?? null,
    imageUrl: p.imageUrl ?? null,
    stock: Number(p.stock ?? 0),
  };
}

function groupByCategory(products: Perfume[]): ProductCategory[] {
  const by = new Map<string, Perfume[]>();
  for (const p of products) {
    const key = (p.category ?? 'Uncategorized').trim() || 'Uncategorized';
    if (!by.has(key)) by.set(key, []);
    by.get(key)!.push(p);
  }
  return Array.from(by.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([categoryName, prods]) => ({
      categoryName,
      products: prods.sort((x, y) => x.perfumeName.localeCompare(y.perfumeName)),
    }));
}
