import type { Cart, CartItem, MenuItem } from './types';

/**
 * Cart utility functions - shared between web and mobile
 */
export class CartUtils {
  /**
   * Calculate total from items
   */
  static calculateTotal(items: CartItem[]): number {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  /**
   * Add item to cart or increase quantity
   */
  static addItem(cart: Cart, item: MenuItem): Cart {
    const existingItem = cart.items.find(i => i.id === item.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      const cartItem: CartItem = {
        ...item,
        quantity: 1,
      };
      cart.items.push(cartItem);
    }

    return {
      ...cart,
      total: this.calculateTotal(cart.items),
    };
  }

  /**
   * Remove item from cart
   */
  static removeItem(cart: Cart, itemId: string): Cart {
    return {
      items: cart.items.filter(i => i.id !== itemId),
      total: this.calculateTotal(cart.items.filter(i => i.id !== itemId)),
    };
  }

  /**
   * Update item quantity
   */
  static updateQuantity(cart: Cart, itemId: string, quantity: number): Cart {
    if (quantity <= 0) {
      return this.removeItem(cart, itemId);
    }

    const item = cart.items.find(i => i.id === itemId);
    if (item) {
      item.quantity = quantity;
    }

    return {
      ...cart,
      total: this.calculateTotal(cart.items),
    };
  }

  /**
   * Clear cart
   */
  static clearCart(): Cart {
    return {
      items: [],
      total: 0,
    };
  }

  /**
   * Get cart items count
   */
  static getItemCount(items: CartItem[]): number {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }

  /**
   * Format price with currency symbol
   */
  static formatPrice(price: number, currency: string = '₹'): string {
    return `${currency}${price.toFixed(2)}`;
  }

  /**
   * Generate order number based on timestamp
   */
  static generateOrderNumber(prefix: string = 'MJB'): string {
    return `${prefix}-${Date.now()}`;
  }

  /**
   * Format order date
   */
  static formatOrderDate(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleString('en-IN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }

  /**
   * Validate checkout data
   */
  static validateCheckout(userName: string, orderType: 'Dine-in' | 'Delivery'): boolean {
    return userName.trim().length > 0 && (['Dine-in', 'Delivery'].includes(orderType));
  }
}

/**
 * Format message for WhatsApp
 */
export function formatWhatsAppMessage(
  orderNumber: string,
  userName: string,
  orderType: string,
  items: CartItem[],
  total: number
): string {
  const itemsList = items
    .map(item => `• ${item.name} x${item.quantity} = ₹${(item.price * item.quantity).toFixed(2)}`)
    .join('\n');

  return `Hi, I would like to place an order at Mumbai Jan Biryani!\n\n📋 *Order Details*\nOrder Number: ${orderNumber}\nName: ${userName}\nOrder Type: ${orderType}\n\n🍛 *Items Ordered*\n${itemsList}\n\n💰 *Total: ₹${total.toFixed(2)}*\n\nPlease confirm my order. Thank you!`;
}

/**
 * Generate WhatsApp link
 */
export function getWhatsAppLink(message: string, phoneNumber: string): string {
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}
