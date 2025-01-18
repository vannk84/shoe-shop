export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface CartItem {
  productId: number;
  quantity: number;
}
