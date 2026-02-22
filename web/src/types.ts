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

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  userName: string;
  orderType: 'Dine-in' | 'Delivery';
  timestamp: Date;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export interface PdfInvoiceData {
  orderNumber: string;
  userName: string;
  orderType: string;
  items: CartItem[];
  total: number;
  timestamp: string;
}
