# ⚡ Quick Reference Card

## 🚀 Essential Commands

```bash
# Setup
npm install

# Development
npm run dev          # http://localhost:5173
npm run lint         # Type check

# Production
npm run build        # Build dist/
npm run preview      # Preview build
```

## 📁 Key Files

| File | Purpose | Lines |
|------|---------|-------|
| `src/types.ts` | Type definitions | 35 |
| `src/utils.ts` | Cart, PDF, WhatsApp | 160 |
| `src/main.ts` | Home page | 300 |
| `src/menu.ts` | Menu & checkout | 350 |
| `index.html` | Home page | 20 |
| `menu.html` | Menu page | 20 |
| `vite.config.ts` | Build config | 25 |

## 🎨 Colors

```
#ff9f1c  Orange (Primary)
#1a1a1a  Dark (Background)
#ffffff  White (Text)
```

## 📱 Responsive

```
Mobile:  < 640px
Tablet:  640px - 1024px
Desktop: > 1024px
```

## 🛒 Cart API

```typescript
CartManager.addItem(item)              // Add to cart
CartManager.removeItem(id)             // Remove item
CartManager.updateQuantity(id, qty)    // Change qty
CartManager.getCart()                  // Get current
CartManager.clearCart()                // Empty cart
```

## 📄 PDF API

```typescript
InvoiceGenerator.generatePDF(data)

// Data structure:
{
  orderNumber: string,
  userName: string,
  orderType: 'Dine-in' | 'Delivery',
  items: CartItem[],
  total: number,
  timestamp: string
}
```

## 💬 WhatsApp API

```typescript
WhatsAppIntegration.getWhatsAppLink(data)
// Returns: https://wa.me/[PHONE]?text=[MESSAGE]
```

## 📦 Data Types

```typescript
MenuItem          // Item definition
CartItem          // Item + quantity
Cart              // {items[], total}
Order             // Complete order
PdfInvoiceData    // Invoice data
```

## 🔧 Common Tasks

### Add Menu Item
Edit `src/menu.ts` → `menuItems` array

### Change WhatsApp Number
Edit `src/utils.ts` → line ~113: `const phoneNumber = '...'`

### Update Colors
Edit `tailwind.config.js` → colors section

### Add Category
Edit `src/types.ts` → MenuItem category union

### Modify Styling
Edit `src/style.css` or `tailwind.config.js`

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Port in use | Change port in `vite.config.ts` |
| Styles not working | `npm install` → `npm run dev` |
| TypeScript errors | `npm run lint` for details |
| PDF not downloading | Check browser console |
| WhatsApp not opening | Verify phone number format |

## 📊 Build Sizes

```
Total:          376 KB
Gzipped:        ~180 KB
CSS:            17 KB
Menu JS:        373 KB (jsPDF)
```

## 🌐 URLs

```
Home:      /
Menu:      /menu
Dashboard: /dashboard
Dev:       http://localhost:5173
```

## ✅ Testing Checklist

- [ ] Home page loads
- [ ] Menu page loads
- [ ] Can add items to cart
- [ ] Cart updates correctly
- [ ] Checkout works
- [ ] PDF downloads
- [ ] WhatsApp opens
- [ ] Mobile responsive
- [ ] No console errors

## 📝 Documentation

- `README.md` - Overview
- `IMPLEMENTATION_GUIDE.md` - Setup
- `API_REFERENCE.md` - Full API
- `TESTING_GUIDE.md` - Testing
- `PROJECT_SUMMARY.md` - Summary

## 🚀 Deployment

```bash
# Vercel
vercel --prod

# Netlify
netlify deploy --prod --dir=dist

# GitHub Pages
# Push dist/ to gh-pages branch
```

## 📞 Help

1. Check IMPLEMENTATION_GUIDE.md
2. Review API_REFERENCE.md
3. See TESTING_GUIDE.md for issues
4. Check browser console for errors

---

**Version**: 1.0.0 | **Status**: ✅ Production Ready
