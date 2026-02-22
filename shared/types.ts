// Shared type definitions for both web and mobile app

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: 'Biryani' | 'Appetizers' | 'Desserts' | 'Beverages';
  image: string;
  description: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  userName: string;
  orderType: 'Dine-in' | 'Delivery';
  timestamp: Date;
}

export interface PdfInvoiceData {
  orderNumber: string;
  userName: string;
  orderType: string;
  items: CartItem[];
  total: number;
  timestamp: string;
}

export interface InvoiceData extends PdfInvoiceData {}

export interface CheckoutFormData {
  userName: string;
  orderType: 'Dine-in' | 'Delivery';
}

export interface CartState {
  items: CartItem[];
  total: number;
  lastUpdated: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
