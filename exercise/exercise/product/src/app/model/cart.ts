export interface CartItem {
  id: number;        // perfume id
  name: string;      // perfumeName
  brand: string;
  pricePhp: number;
  imageUrl?: string;
  qty: number;
}

import { Perfume } from './perfume';
export interface CartItem { product: Perfume; qty: number; }