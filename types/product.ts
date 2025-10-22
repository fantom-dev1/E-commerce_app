export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  rating: number;
  reviews: number;
  sold: number;
  onStock?: number;
  category: string;
  isFavorite: boolean;
}