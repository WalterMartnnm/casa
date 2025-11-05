export interface Perfume {
  id: number;
  perfumeName: string;
  brand: string;
  pricePhp: number;

  occasion?: string | null;
  category?: string | null;      // ← change from `string` to `string | null`
  imageUrl?: string | null;
  volumeMl?: number | null;

  stock: number;
}