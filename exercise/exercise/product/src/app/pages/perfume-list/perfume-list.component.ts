import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PerfumeService } from '../../service/perfume.service';
import { CartService } from '../../service/cart.service';
import { Perfume } from '../../model/perfume';

@Component({
  selector: 'app-perfume-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perfume-list.component.html',
  styleUrls: ['./perfume-list.component.css']
})
export class PerfumeListComponent implements OnInit {
  // UI data
  perfumes: Perfume[] = [];
  private allPerfumes: Perfume[] = [];
  loading = false;

  occasions = ['Date Night'];  // extend later if needed
  selectedOccasion = 'Date Night';

  // Local occasion mapping (frontend only)
  private readonly OCC_BY_ID: Record<number, string> = {
    1:'Date Night',  2:'Date Night',  3:'Date Night',  4:'Date Night',  5:'Date Night',
    6:'Date Night',  7:'Date Night',  8:'Date Night',  9:'Date Night', 10:'Date Night',
    11:'Date Night', 12:'Date Night', 13:'Date Night', 14:'Date Night', 15:'Date Night',
    16:'Date Night', 17:'Date Night', 18:'Date Night', 19:'Date Night', 20:'Date Night',
    21:'Date Night', 22:'Date Night', 23:'Date Night', 24:'Date Night', 25:'Date Night',
    26:'Date Night', 27:'Date Night'
  };

  // trackBy to avoid *ngFor churn
  trackById = (_: number, p: Perfume) => p?.id ?? _;

  constructor(
    private perfumesSvc: PerfumeService,
    private cart: CartService
  ) {}

  ngOnInit(): void {
    this.loadAll(); // initial load
  }

  // made PUBLIC so the template can call it (e.g., “Show All” button)
  loadAll(): void {
    this.loading = true;
    this.perfumesSvc.getAll().subscribe({
      next: (list: Perfume[]) => {
        this.allPerfumes = list ?? [];
        this.applyOccasionFilter(); // show filtered immediately
        this.loading = false;
      },
      error: () => {
        this.allPerfumes = [];
        this.perfumes = [];
        this.loading = false;
      }
    });
  }

  /** Called by the “Show perfumes” button */
  filterByOccasion(): void {
    this.applyOccasionFilter();
  }

  /** Called by the “Show All” button */
  showAll(): void {
    this.perfumes = [...this.allPerfumes];
  }

  private applyOccasionFilter(): void {
    const wanted = (this.selectedOccasion || '').toLowerCase();
    this.perfumes = this.allPerfumes.filter(
      p => (this.OCC_BY_ID[p.id] || '').toLowerCase() === wanted
    );
  }

  addToCart(p: Perfume): void {
    this.cart.addToCart(
      {
        id: p.id,
        name: p.perfumeName,
        brand: p.brand,
        pricePhp: p.pricePhp,
        imageUrl: p.imageUrl ?? undefined,
        stock: p.stock
      },
      1
    );
    alert(`Added: ${p.perfumeName}`);
  }

  normalizeSrc(u?: string | null): string {
    if (!u || !u.trim()) return '/assets/placeholder.png';
    return u.startsWith('/') ? u : '/' + u;
  }

  onImgErr(ev: Event): void {
    (ev.target as HTMLImageElement).src = '/assets/placeholder.png';
  }
}
