export interface UserProfile {
  email: string | undefined;
  email_verified: boolean;
  name: string;
  nickname: string;
  picture: string;
  sub: string;
  updated_at: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: Error | null;
  user: UserProfile | null;
}

export interface AuthError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

// composables/useAuth.ts
const error = useState<AuthError | null>('authError', () => null)

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