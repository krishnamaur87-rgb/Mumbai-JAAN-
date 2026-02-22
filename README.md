# 🍛 Mumbai Jan Biryani - Food Ordering Website

A premium multi-page food ordering website for Mumbai Jan Biryani built with **Vanilla TypeScript**, **Vite**, and **Tailwind CSS**. Features a fully functional cart system, PDF invoice generation, and WhatsApp integration.

## ✨ Features

### Phase 1 ✅ (Complete)
- **Multi-page Website**: Home, Menu, and Admin Dashboard pages
- **Full Menu System**: 11 items across 4 categories (Biryani, Appetizers, Desserts, Beverages)
- **Shopping Cart**: Add/Remove items, adjust quantities, auto-calculate totals
- **Search & Filter**: Real-time search and category filtering
- **PDF Invoice Generation**: Professional invoices using jsPDF
- **WhatsApp Integration**: Send orders directly to WhatsApp with formatted messages
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Premium Theme**: Brand colors (Orange #ff9f1c, Dark #1a1a1a, White)
- **TypeScript**: Full type safety with custom interfaces

### Phase 2 🚀 (Planned)
- Admin authentication with secure login
- Real-time order management dashboard
- Order status tracking
- Sales analytics dashboard
- Menu management
- Customer order history
- Export reports

## 📁 Project Structure

```
Mumbai-JAAN-/
├── index.html                 # Home page
├── menu.html                  # Menu page with cart
├── dashboard.html             # Admin page
├── src/
│   ├── types.ts              # TypeScript interfaces
│   ├── utils.ts              # Cart, Invoice, WhatsApp utilities
│   ├── main.ts               # Home page logic
│   ├── menu.ts               # Menu page logic
│   ├── dashboard.ts          # Dashboard page logic
│   └── style.css             # Styles
├── vite.config.ts            # Vite configuration
├── tsconfig.json             # TypeScript config
├── tailwind.config.js        # Tailwind config
├── postcss.config.js         # PostCSS config
└── package.json
```

## 🛠 Tech Stack

- **Frontend**: Vanilla TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **PDF Generation**: jsPDF
- **Storage**: LocalStorage

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

Visit `http://localhost:5173` to see the application.

## 💻 Features in Detail

### Home Page
- Hero section with brand introduction
- Featured items showcase
- Navigation to menu
- Footer with contact info

### Menu Page
- Browse all 11 menu items
- Search functionality
- Category filtering
- Floating shopping cart
- Add/remove items
- Quantity adjustment

### Checkout Flow
1. Add items to cart
2. Review and adjust quantities
3. Click checkout
4. Enter name and select order type
5. Auto-download PDF invoice
6. Send via WhatsApp (optional)

### PDF Invoice
- Professional template
- Order details
- Itemized list
- Total amount
- Order number

## 🎨 Design

- **Color Scheme**: Orange (#ff9f1c), Dark (#1a1a1a), White
- **Responsive**: Mobile-first design
- **Animations**: Smooth transitions and hover effects
- **Accessibility**: WCAG compliant

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers

## 🔧 Customization

### Add Menu Items
Edit `src/menu.ts` and add to `menuItems` array

### Change WhatsApp Number
Update `src/utils.ts` line with phone number

### Modify Colors
Edit `tailwind.config.js` theme section

## 📄 License

Educational project - Free to use and modify

---

**Made with ❤️ for Mumbai Jan Biryani**
