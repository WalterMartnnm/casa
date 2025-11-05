import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Perfume } from '../model/perfume';

// What the API actually sends (relaxed)
type PerfumeDto = {
  id: number | string;
  perfumeName?: string;
  name?: string;
  brand: string;
  occasion?: string | null;
  pricePhp: number | string;
  volumeMl?: number | string | null;
  category?: string | null;
  imageUrl?: string | null;
  stock?: number | string | null;   // may be missing / string
};

@Injectable({ providedIn: 'root' })
export class PerfumeService {
  // adjust if your endpoint is different (e.g. /api/products)
  private readonly base = '/api/perfumes';
  constructor(private http: HttpClient) {}

  getAll(): Observable<Perfume[]> {
    return this.http.get<PerfumeDto[]>(this.base).pipe(map(d => d.map(toPerfume)));
  }

  getByOccasion(occasion: string): Observable<Perfume[]> {
    return this.http
      .get<PerfumeDto[]>(`${this.base}?occasion=${encodeURIComponent(occasion)}`)
      .pipe(map(d => d.map(toPerfume)));
  }
}

/** Normalize DTO -> app model (guarantee correct types & stock present) */
function toPerfume(p: PerfumeDto): Perfume {
  return {
    id: Number(p.id),
    perfumeName: p.perfumeName ?? p.name ?? '',
    brand: p.brand ?? '',
    occasion: String(p.occasion ?? ''),   // ← force to ''
    pricePhp: Number(p.pricePhp),
    volumeMl: p.volumeMl != null ? Number(p.volumeMl) : null, // or 0 if you prefer
    category: String(p.category ?? ''),   // ← force to ''
    imageUrl: p.imageUrl ?? null,         // or String(p.imageUrl ?? '')
    stock: Number(p.stock ?? 0),
  };
}
