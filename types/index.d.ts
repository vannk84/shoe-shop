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
  quantity: number;
  subTotal: number;
  product: Product;
}

export interface CCInfo {
  cardNumber: string;
  expiryMonth: number;
  expiryYear: number;
  cvv: string;
  amount: number;
  currency?: string;
}

export interface LineItem extends Product {
  quantity: number;
  subTotal: number;
}

export interface ShippingInfo {
  firstName: string;
  lastName: string;
  phone: string;
  country: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
}