# ⚙️ API & Configuration Reference

## Configuration Files

### vite.config.ts
Controls build and development server settings.

```typescript
server: {
  port: 5173,           // Dev server port
  strictPort: false     // Allow port fallback
}

build: {
  outDir: 'dist',       // Output directory
  rollupOptions: {
    input: {            // Multi-page entries
      main: 'index.html',
      menu: 'menu.html',
      dashboard: 'dashboard.html'
    }
  }
}
```

### tailwind.config.js
Styling and theme configuration.

```javascript
colors: {
  primary: '#ff9f1c',   // Brand orange
  dark: '#1a1a1a',      // Dark background
  light: '#ffffff'      // White text
}

content: [             // Files to scan for classes
  './index.html',
  './menu.html',
  './dashboard.html',
  './src/**/*.{js,ts}'
]
```

### tsconfig.json
TypeScript compiler options.

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "strict": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"]
  }
}
```

## TypeScript API Reference

### CartManager

**Add Item to Cart**
```typescript
import { CartManager } from './utils';
import type { MenuItem } from './types';

const item: MenuItem = { /* ... */ };
CartManager.addItem(item);
```

**Remove Item from Cart**
```typescript
CartManager.removeItem('item-id');
```

**Update Quantity**
```typescript
CartManager.updateQuantity('item-id', 5);
```

**Get Current Cart**
```typescript
const cart = CartManager.getCart();
console.log(cart.items);  // CartItem[]
console.log(cart.total);  // number
```

**Clear Cart**
```typescript
CartManager.clearCart();
```

### InvoiceGenerator

**Generate and Download PDF**
```typescript
import { InvoiceGenerator } from './utils';
import type { PdfInvoiceData } from './types';

const invoiceData: PdfInvoiceData = {
  orderNumber: 'MJB-1234567890',
  userName: 'John Doe',
  orderType: 'Delivery',
  items: [ /* CartItem[] */ ],
  total: 1299.50,
  timestamp: new Date().toLocaleString()
};

InvoiceGenerator.generatePDF(invoiceData);
// Downloads as: Mumbai_Jan_Biryani_Order_MJB-1234567890.pdf
```

### WhatsAppIntegration

**Get WhatsApp Share Link**
```typescript
import { WhatsAppIntegration } from './utils';

const whatsappUrl = WhatsAppIntegration.getWhatsAppLink(invoiceData);
window.open(whatsappUrl, '_blank');
```

**Message Format** (Auto-generated)
```
Hi, I would like to place an order at Mumbai Jan Biryani!

📋 *Order Details*
Order Number: MJB-1234567890
Name: John Doe
Order Type: Delivery

🍛 *Items Ordered*
• Hyderabadi Biryani x2 = ₹598.00
• Seekh Kabab x1 = ₹199.00

💰 *Total: ₹797.00*

Please confirm my order. Thank you!
```

## Data Types & Interfaces

### MenuItem
```typescript
interface MenuItem {
  id: string;           // Unique identifier
  name: string;         // Item name
  price: number;        // Price in rupees
  category: 'Biryani' | 'Appetizers' | 'Desserts' | 'Beverages';
  image: string;        // Image URL
  description: string;  // Item description
}
```

### CartItem (extends MenuItem)
```typescript
interface CartItem extends MenuItem {
  quantity: number;     // Quantity in cart
}
```

### Cart
```typescript
interface Cart {
  items: CartItem[];    // Items in cart
  total: number;        // Total amount
}
```

### Order
```typescript
interface Order {
  id: string;           // Order ID
  items: CartItem[];    // Ordered items
  total: number;        // Order total
  userName: string;     // Customer name
  orderType: 'Dine-in' | 'Delivery';
  timestamp: Date;      // Order time
}
```

### PdfInvoiceData
```typescript
interface PdfInvoiceData {
  orderNumber: string;  // e.g., MJB-1234567890
  userName: string;     // Customer name
  orderType: string;    // 'Dine-in' or 'Delivery'
  items: CartItem[];    // Items ordered
  total: number;        // Total amount
  timestamp: string;    // Formatted date/time
}
```

## LocalStorage API

Cart data is stored in localStorage under the key `mumbai_jaan_cart`.

### Stored Format
```json
{
  "items": [
    {
      "id": "1",
      "name": "Hyderabadi Biryani",
      "price": 299,
      "category": "Biryani",
      "image": "https://...",
      "description": "...",
      "quantity": 2
    }
  ],
  "total": 598
}
```

### Access Pattern
```typescript
const cart = localStorage.getItem('mumbai_jaan_cart');
const parsedCart = JSON.parse(cart || '{}');
```

## DOM API Usage

### Navbar Navigation
```typescript
// Uses document.getElementById('navbar')
// Dynamically renders navigation component
```

### Menu Container
```typescript
// Uses document.getElementById('menu-container')
// Renders filters and product grid
```

### Floating Cart
```typescript
// Uses document.getElementById('floating-cart')
// Fixed position, right side of screen
// Sticky at 50.25rem top position (after navbar)
```

### Modals & Dialogs

**Order Type Selection Modal**
```typescript
const modal = document.createElement('div');
modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
document.body.appendChild(modal);
```

## HTML Page Entry Points

### index.html
```html
<script type="module" src="/src/main.ts"></script>
```
- Hero section
- Featured items
- Footer navigation

### menu.html
```html
<script type="module" src="/src/menu.ts"></script>
```
- Full menu with 11 items
- Search & filter controls
- Shopping cart (floating)
- Checkout functionality

### dashboard.html
```html
<script type="module" src="/src/dashboard.ts"></script>
```
- Admin login (Phase 2 placeholder)
- Feature roadmap
- Development notes

## CSS Classes & Utilities

### Layout Classes
```
max-w-7xl      // Container max width
mx-auto        // Center horizontally
px-4, py-8     // Padding
```

### Color Classes
```
bg-dark        // Dark background (#1a1a1a)
bg-primary     // Orange background (#ff9f1c)
text-light     // White text (#ffffff)
text-primary   // Orange text
```

### Responsive Classes
```
sm:             // Small (640px)
md:             // Medium (768px)
lg:             // Large (1024px)
```

## Customization Hooks

### Add Custom Font
**File: tailwind.config.js**
```javascript
fontFamily: {
  sans: ['Your Font', 'sans-serif'],
}
```

### Add Custom Colors
**File: tailwind.config.js**
```javascript
colors: {
  customColor: '#ABC123',
}
```

### Add Custom Animations
**File: src/style.css**
```css
@keyframes customAnimation {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-custom {
  animation: customAnimation 0.5s ease-in;
}
```

## Environment Variables (Phase 2)

### Planned Structure
```
.env.local
├── VITE_WHATSAPP_NUMBER=919876543210
├── VITE_API_URL=https://api.example.com
├── VITE_STRIPE_KEY=pk_test_...
└── VITE_RAZORPAY_KEY=rzp_test_...
```

### Usage in Code
```typescript
const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER;
const apiUrl = import.meta.env.VITE_API_URL;
```

## Event Handling Patterns

### Button Click Events
```typescript
document.getElementById('btn')?.addEventListener('click', (e: Event) => {
  const target = e.target as HTMLElement;
  // Handle event
});
```

### Form Submission
```typescript
document.getElementById('form')?.addEventListener('submit', (e: Event) => {
  e.preventDefault();
  // Handle form
});
```

### Cart Change Events
```typescript
// No event system - uses direct function calls
CartManager.addItem(item);      // Update cart
updateFloatingCart();             // Refresh UI
```

## Error Handling

### Null Safety
```typescript
const itemId = element?.getAttribute('data-id');
if (itemId) {
  // Safe to use itemId
}
```

### Type Guards
```typescript
const cart = CartManager.getCart();
const item = cart.items.find(i => i.id === id);
if (item) {
  // item is CartItem
}
```

### Validation
```typescript
if (cart.items.length === 0) {
  alert('Cart is empty!');
  return;
}
```

---

**Last Updated**: February 2025
